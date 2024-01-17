<template lang="pug">
#projects.section
  .section__title
    h2 Projects
  .section__content
    .projects
      Project(v-for="project in projects" :key="project.id" v-bind="project")
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Project from './Project.vue';

const projects = reactive([
  {
    id: '(01)',
    title: 'American Campus Communities',
    url: 'https://www.americancampus.com/',
    img: '/images/acc.webp',
    roles: ['dev', 'lead', 'client-facing']
  },
  {
    id: '(02)',
    title: 'Best Range Hoods',
    url: 'https://www.bestrangehoods.com/',
    img: '/images/brh.webp',
    roles: ['dev', 'client-facing']
  },
  {
    id: '(03)',
    title: 'BlueModus',
    url: 'https://www.bluemodus.com/',
    img: '/images/bm.webp',
    roles: ['dev', 'lead', 'design']
  },
  {
    id: '(04)',
    title: 'Essenz 3D',
    url: 'https://www.livanova.com/cardiopulmonary/en-us/essenz-3d',
    img: '/images/e3d.png',
    roles: ['dev', 'lead', 'design', 'client-facing']
  },
]);

</script>

<style lang="scss" scoped>
.projects {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0 1rem;
}

</style>