<template>
  <div class="dropdown language">
    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
      {{ activeLanguage }}
    </a>

      <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <li><a class="dropdown-item" :class="activeLanguage === 'EN' ? 'active' : ''" @click="setActiveLanguage('EN')">EN</a></li>
      <li><a class="dropdown-item" :class="activeLanguage === 'NL' ? 'active':''" @click="setActiveLanguage('NL')">NL</a></li>
    </ul>
  </div>
</template>

<script lang="ts">

import {Options, Vue} from "vue-class-component";

@Options({})
export default class DropDown extends Vue {
  activeLanguage = 'EN'

  setActiveLanguage(language: string) {
    this.activeLanguage = language;
    this.$emit('setLanguage', this.activeLanguage)
  }

}

</script>

<style>
.dropdown.language {
  position: fixed;
  right: 2em;
  top: 2em;
  z-index: 100;
}
</style>
