<template lang="pug">
#socials.section.section--small.section--left.section--dark.section--content-blowout
  .section__title
    h2 Let's Connect
  .section__content
    .socials
      Social(v-for="social in socials" :key="social.title" :social="social")

</template>

<script setup lang="ts">
import {computed} from 'vue';
import { usePortfolioStore } from '../store';
import Social from './Social.vue';

const store = usePortfolioStore();
const socials = computed(() => store.socials);

</script>

<style lang="scss" scoped>
#socials {
  position: relative;
  margin: 1rem;

  &::before {
    content: '';
    position: absolute;
    top: -1rem;
    left: -1rem;
    bottom: -1rem;
    width: var(--s_width);
    background: linear-gradient(-45deg, $purple, $magenta);
  }
}
.socials {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>