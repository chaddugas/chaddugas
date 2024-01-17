<template lang="pug">
main#main
  About
  Projects
</template>

<script setup lang="ts">
import About from './About.vue';
import Projects from './Projects.vue';
</script>

<style lang="scss" scoped>
#main {
  display: flex;
  flex-direction: column;
  position: relative;
  background: $orange;
}
</style>
