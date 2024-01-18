<template lang="pug">
#projects.section
  .section__title
    h2 Projects
  .section__content
    .projects
      Project(v-for="project in projects" :key="project.id" :project="project")
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePortfolioStore } from '../store';
import Project from './Project.vue';

const store = usePortfolioStore();

const projects = computed(() => store.projects);

</script>

<style lang="scss" scoped>
.projects {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0 1rem;
}
</style>