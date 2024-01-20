<template lang="pug">
#portfolio(
  @mousemove="logMousePosition"
  :class="{loaded}")
  Curtain
  Hero(v-bind="{loaded}")
  Main
  Background(v-if="loaded && !rotated")
</template>

<script setup lang="ts">
import { provide, ref, reactive, watch, onMounted } from 'vue';
import Curtain from './components/Curtain.vue';
import Hero from './components/Hero.vue';
import Main from './components/Main.vue';
import Background from './components/Background.vue';
import { useScreenOrientation } from '@vueuse/core';

const loaded = ref(false);
const mouse = reactive({ x: 0, y: 0 });

const { orientation } = useScreenOrientation();
const rotated = ref(false);

const logMousePosition = (event: MouseEvent): void => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
};

provide('mouse', mouse);

watch(orientation, () => {
  rotated.value = true;
});

onMounted(() => {
  setTimeout(() => {
    loaded.value = true;
  }, 500);
});
</script>

<style lang="scss">
@import './assets/scss/global.scss';
</style>

<style lang="scss" scoped>
#portfolio {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  padding: 0;
  margin: 0;

  &.loaded {
    &::before {
      transform: translateY(0);
    }
  }

  &::before {
    content: '';
    display: block;
    grid-area: 1 / 1 / 2 / 2;
    background: linear-gradient(-40deg, $blue -9.14%, $sky 46.7%, $purple 86.65%);
    transform: translateY(-100%);
    transition: 0.5s 0.2s ease-out;
    will-change: transform;
  }
}
</style>
