<template>
  <drop-down @setLanguage="setLanguage"></drop-down>
  <h1>Translate your numbers into words!</h1>
  <input-number :language="language" @numberTranslated="setNumber"></input-number>
  <br>
  <h2>{{translatedNumber}}</h2>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DropDown from "@/components/DropDown.vue";
import InputNumber from "@/components/InputNumber.vue";

@Options({
  components: {
    InputNumber,
    DropDown,
  },
})
export default class App extends Vue {
  language = 'EN'
  translatedNumber = '';
  setLanguage(language: string) {
    this.language = language;
  }

  setNumber(translatedNumber: string) {
    this.translatedNumber = translatedNumber;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
