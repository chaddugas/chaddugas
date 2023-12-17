<template lang="pug">
#portfolio(@mousemove="logMousePosition" :class="{loaded}")
  Hero(:loaded="loaded")
  Background(:loaded="loaded" :mouse="mouse")
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import Background from './components/Background_SVG.vue';
import Hero from './components/Hero.vue';

const loaded = ref(false);

const mouse = reactive({ x: 0, y: 0 });

const logMousePosition = (event: MouseEvent): void => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
};

onMounted(() => {
  setTimeout(() => {
    loaded.value = true;
  }, 500)
});
</script>

<style lang="scss" scoped>
#portfolio {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  width: 100vw;
  padding: 0;
  margin: 0;
  grid-area: 1 / 1 / 2 / 2;

  &.loaded {
    &::before {
      transform: translateY(0);
    }
  }

  &::before {
    content: '';
    display: block;
    grid-area: 1 / 1 / 2 / 2;
    background: linear-gradient(-40deg,#27249c -9.14%,#177aee 46.7%,#4a19d2 86.65%);
    transform: translateY(-100%);
    transition: 0.5s 0.2s ease-out;
    will-change: transform;
  }
}
</style>
