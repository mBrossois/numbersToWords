<template>
  <div class="input-group flex-nowrap">
    <span class="input-group-text" id="addon-wrapping">Number</span>
    <input id="numberInput" v-model="numberInput" type="number" class="form-control number"
           placeholder="Fill in a number" pattern="[0-9]" min="0" step="1" aria-label="Number"
           aria-describedby="addon-wrapping">
    <button @click="onClick" class="btn btn-outline-secondary" type="button">Translate</button>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {hundredsToWord, singleToWord, tensToWord, tenToWord} from "@/utils/transformNumbersNL";
import {watch} from "vue";
import {Prop} from "vue-property-decorator";
import {hundredsToWordEN, singleToWordEN, tensToWordEN, tenToWordEN} from "@/utils/transformNumbersEN";

@Options({
})
export default class InputNumber extends Vue {
  @Prop() language!: string;

  numberInput = 0
  and = 'and';
  specialAnd = 'and';
  hundred = 'hundred';
  thousand = 'thousand '
  million = 'million '
  billion = 'billion '

  mounted() {
    console.log(this.language)
    watch(
        () => this.language,
        (current: string, previous: string) => {
          if(current === 'NL') {
            this.and = 'en';
            this.specialAnd = 'ën';
            this.hundred = 'honderd';
            this.thousand = 'duizend '
            this.million = 'miljoen '
            this.billion = 'biljoen '
          } else {
            this.and = 'and';
            this.specialAnd = 'and';
            this.hundred = 'hundred';
            this.thousand = 'thousand '
            this.million = 'million '
            this.billion = 'billion '
          }
        }
    );
  }

  onClick() {
    const splitNumber = this.splitNumber();
    const lengthOfNumbers = splitNumber.length - 1;

    let totalWord = ''

    splitNumber.forEach((numb: string, index: number) => {
      if(lengthOfNumbers - index === 3) {
        totalWord += (this.language === 'NL' ? this.digitsToWordNL(numb) : this.digitsToWordEN(numb)) + this.billion;
      } else if(lengthOfNumbers - index === 2) {
        totalWord += (this.language === 'NL' ? this.digitsToWordNL(numb) : this.digitsToWordEN(numb))  + this.million;
      } else if( lengthOfNumbers - index === 1) {
        totalWord += (this.language === 'NL' ? this.digitsToWordNL(numb) : this.digitsToWordEN(numb))  + this.thousand;
      } else {
        totalWord += (this.language === 'NL' ? this.digitsToWordNL(numb) : this.digitsToWordEN(numb)) ;
      }
    })
    this.$emit('numberTranslated', totalWord)
  }

  getTenNL(splitNumb: string[]) {
    return splitNumb[0] === '1' ?
        tenToWord[splitNumb[0] + splitNumb[1]] :
        singleToWord[splitNumb[1]] + (splitNumb[1] === '2' || splitNumb[1] === '3' ? this.specialAnd : this.and) + tensToWord[splitNumb[0]] + 'tig'
  }

  digitsToWordNL(numb: string) {
    let word = ''
    let splitOnDigit = numb.split('');
    let numbWordLength = splitOnDigit.length;
    if (numbWordLength === 3) {
      word = hundredsToWord[splitOnDigit[0]] + this.hundred + this.getTenNL([splitOnDigit[1], splitOnDigit[2]])
    } else if (numbWordLength === 2) {
     word = this.getTenNL(splitOnDigit);
    } else if (numbWordLength === 1) {
      word = singleToWord[splitOnDigit[0]]
    }
    return word;
  }

  getTenEN(splitNumb: string[]) {
    return splitNumb[0] === '1' ?
        tenToWordEN[splitNumb[0] + splitNumb[1]] :
        tensToWordEN[splitNumb[0]] + 'ty' + singleToWordEN[splitNumb[1]]
  }


  digitsToWordEN(numb: string) {
    let word = ''
    let splitOnDigit = numb.split('');
    let numbWordLength = splitOnDigit.length;
    if (numbWordLength === 3) {
      word = hundredsToWordEN[splitOnDigit[0]] + this.hundred + (splitOnDigit[1] !== '0' || splitOnDigit[2] !== '0' ? this.and : '') + this.getTenEN([splitOnDigit[1], splitOnDigit[2]])
    } else if (numbWordLength === 2) {
     word = this.getTenEN(splitOnDigit);
    } else if (numbWordLength === 1) {
      word = singleToWordEN[splitOnDigit[0]]
    }
    return word;
  }

  splitNumber(): string[] {
    // transform to string to use length
    const numberToString = this.numberInput.toString();
    const lengthFirstWord: number = numberToString.length % 3;

    let splitWords = [];
    if (lengthFirstWord > 0) {
      splitWords.push(numberToString.substring(0, lengthFirstWord))
    }
    for (let i = lengthFirstWord; i < numberToString.length; i += 3) {
      splitWords.push(numberToString.substring(i, i + 3));
    }

    return splitWords

  }

}
</script>

<style>
.input-group.flex-nowrap {
  justify-content: center;
}

#numberInput.form-control.number {
  flex: unset;
  width: 15em;
}
</style>
