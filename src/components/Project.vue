<template lang="pug">
.project(ref="project" @click="store.setActiveProject(props.id)")
  sup.project__id {{ props.id }}
  h3.project__title {{ props.title }}
  .project__frame(ref="frame")
    img.project__img(v-bind="{src: props.img, alt: props.title}")


  Teleport(to="#modals")
    .project__modal(v-if="store.activeProject === props.id")
      header.project__header
        h1.project__heading {{ props.title }}
        button.project__close(v-on:click="store.clearActiveProject()")
      img.project__full-img(v-bind="{src: props.img, alt: props.title}")
      .project__info
        .project__icon(v-for="icon in icons" :key="icon.name")
          i(v-bind="{class: icon.icon}")
          span {{ icon.name }}
    
</template>

<script setup lang="ts">
import { inject, ref, computed, watchEffect } from "vue";
import { usePortfolioStore } from "../store";
import { useIntersectionObserver } from '@vueuse/core'
import { gsap } from "gsap";
import * as changeCase from "change-case";

const store = usePortfolioStore();

const props = defineProps({
  id: String,
  title: String,
  description: String,
  url: String,
  img: String,
  roles: Array<string>,
});

const project = ref<HTMLElement | null>(null);
const frame = ref<HTMLElement | null>(null);

const projectIsVisible = ref(false);

useIntersectionObserver(
  project,
  ([{ isIntersecting }]) => {
    projectIsVisible.value = isIntersecting
  },
);


const icons = computed(() => {
  if (!props.roles) return [];
  return props.roles.map(role => ({
    name: changeCase.capitalCase(role),
    icon: `icon-${role}`,
  }));
});

const mouse = inject<Mouse>('mouse');
const x = ref('0px');
const y = ref('0px');

watchEffect(() => {
  if (!projectIsVisible.value) return;

  gsap.to(x, {
    duration: 0.7,
    ease: 'power2.out',
    overwrite: true,
    value: `${mouse?.x || project.value?.offsetLeft}px`
  });
  gsap.to(y, {
    duration: 0.7,
    ease: 'power2.out',
    overwrite: true,
    value: `${mouse?.y || project.value?.offsetTop}px`
  });
});


</script>

<style lang="scss" scoped>
.project {
  @include fluid(font-size, 1.25rem, 2.5rem);
  @include fluid(padding-block, 1.25rem, 2.5rem);
  @include fluid(--left, 2rem, 4rem);
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: auto;
  grid-column: 1 / -1;
  grid-row: span 1;
  font-weight: 300;
  padding-inline: 1rem;
  border-bottom: 1px solid $lightGray;
  position: relative;
  transition: 0.2s ease-out;

  &:nth-child(1) {
    --color: var(--berry);
  }

  &:nth-child(2) {
    --color: var(--purple);
  }

  &:nth-child(3) {
    --color: var(--green);
  }

  &:nth-child(4) {
    --color: var(--blue);
  }

  &:nth-child(5) {
    --color: var(--sky);
  }

  &:nth-child(6) {
    --color: var(--pink);
  }

  &:nth-child(7) {
    --color: var(--teal);
  }

  &:nth-child(8) {
    --color: var(--orange);
  }

  &__id,
  &__title {
    cursor: pointer;
    transition: 0.4s ease-out;
    transform: translateX(var(--left));
    z-index: 2;
  }

  &:hover {
    background: var(--color);
    color: $white;
    z-index: 3;

    .project__id,
    .project__title {
      transform: translateX(0);
    }

    .project__frame {
      height: 250px;
    }

    .project__img {
      transform: scale(1);
    }
  }

  &__id {
    grid-area: 1 / 1 / 2 / 2;
  }

  &__title {
    grid-area: 1 / 2 / 2 / 3;
    margin: 0;
    font-weight: 400;
  }

  &__frame {
    position: fixed;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    top: v-bind("y");
    left: v-bind("x");
    height: 0;
    width: 444px;
    transition: height 0.4s ease-in-out;
    transform: translateY(-50%) translateX(-50%);
    overflow: hidden;
    pointer-events: none;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      opacity: 0.8;
      background: var(--color);
      z-index: 1;
      mix-blend-mode: overlay;
      transition: 0.4s ease-in-out;
    }
  }

  &__img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    transform: scale(1.4);
    transition: 2s ease;
  }

  &__modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    grid-area: 1 / 1 / 2 / 2;
    gap: 2rem;
    position: relative;
    z-index: 2;
    padding: 2rem;
    background: var(--color);

    &:nth-child(1) {
      --color: var(--berry);
    }

    &:nth-child(2) {
      --color: var(--purple);
    }

    &:nth-child(3) {
      --color: var(--green);
    }

    &:nth-child(4) {
      --color: var(--blue);
    }

    &:nth-child(5) {
      --color: var(--sky);
    }

    &:nth-child(6) {
      --color: var(--pink);
    }

    &:nth-child(7) {
      --color: var(--teal);
    }

    &:nth-child(8) {
      --color: var(--orange);
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  &__heading {
    @include fluid(font-size, 2rem, 4rem);
    font-weight: 400;
    margin: 0;
    text-transform: uppercase;
  }

  &__close {
    all: unset;
    cursor: pointer;
    position: relative;
    aspect-ratio: 1 / 1;
    width: 60px;
    flex: 0 0 auto;

    &::before,
    &::after {
      content: '';
      position: absolute;
      height: 5px;
      width: 100%;
      background: $white;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      transition: 0.4s ease-in-out;
    }

    &::after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  &__full-img {
    height: auto;
    width: 100%;
  }

  &__info {
    display: flex;
    gap: 2rem;
  }

  &__icon {
    display: flex;
    flex-direction: column;
    align-items: center;

    i {
      @include fluid(font-size, 3rem, 6rem);
      color: $white;
    }

    span {
      @include fluid(font-size, 0.75rem, 1.5rem);
      text-transform: uppercase;
      color: $white;
      font-weight: 400;
      letter-spacing: 1px;
      width: min-content;
    }
  }
}
</style>