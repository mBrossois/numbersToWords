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
import {Prop} from "vue-property-decorator";
import {transformNumberToWord} from "@/utils/transform-numbers";

@Options({})
export default class InputNumber extends Vue {
  @Prop() language!: string;
  numberInput = 0;

  onClick() {
    // Return the number as a word
    this.$emit('numberTranslated', transformNumberToWord(this.numberInput, this.language))
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
