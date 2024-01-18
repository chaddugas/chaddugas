<template lang="pug">
.project(
  ref="project"
  @click="setActive"
  :style="{ '--color': props.project.color }")
  sup.project__id {{ props.project.id }}
  h3.project__title {{ props.project.title }}
  .project__frame(ref="frame")
    img.project__img(v-bind="{src: props.project.img, alt: props.project.title}")


  Teleport(to="#modals")
    .modal(v-if="isActive" ref="modal" :style="{ '--color': props.project.color }")
      nav.modal__nav
        button.modal__close(v-on:click="store.close()")
      header.modal__header
        h1.modal__title {{ props.project.title }}
        a.modal__link(v-bind="{href: props.project.url, target: '_blank'}")
          i.icon-door
          span Visit
      section.modal__content
        .modal__info
          p.modal__sub-title Roles:
          .modal__icons
            span.modal__icon(v-for="icon in icons" :key="icon.name")
              i(v-bind="{class: icon.icon}")
              span {{ icon.name }}
        .modal__frame
          img.modal__img(v-bind="{src: props.project.img, alt: props.project.title}")
</template>

<script setup lang="ts">
import { inject, ref, computed, watchEffect } from "vue";
import { usePortfolioStore } from "../store";
import { useIntersectionObserver } from '@vueuse/core'
import { gsap } from "gsap";
import * as changeCase from "change-case";

const store = usePortfolioStore();
const props = defineProps<{
  project: Project;
}>();

const project = ref<HTMLElement | null>(null);
const frame = ref<HTMLElement | null>(null);
const modal = ref<HTMLElement | null>(null);

const projectIsVisible = ref(false);
const isActive = computed(() => store.activeProject === props.project);
const setActive = () => {
  store.open(props.project as Project);
};

useIntersectionObserver(
  project,
  ([{ isIntersecting }]) => {
    projectIsVisible.value = isIntersecting
  },
);

const icons = computed(() => {
  if (!props.project.roles) return [];
  return props.project.roles.map((role: string) => ({
    name: changeCase.capitalCase(role),
    icon: `icon-${role}`,
  }));
});

const mouse = inject<Mouse>('mouse');
const x = ref('0px');
const y = ref('0px');

watchEffect(async () => {
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

  if (isActive.value) {
    await store.activeOpenPromise;

    gsap.to(modal.value, {
      startAt: {
        '--top': '0'
      },
      duration: 0.85,
      ease: 'power4.in',
      '--top': "100%",
    });
  }
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
  cursor: pointer;

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

    @media (pointer: coarse) {
      display: none;
    }

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
}


.modal {
  display: flex;
  flex-direction: column;
  grid-area: 1 / 1 / 2 / 2;
  gap: 2rem;
  position: sticky;
  top: 0;
  z-index: 2;
  padding: 2rem;
  background: $white;
  width: var(--s_width);
  height: var(--s_height);
  cursor: default;
  overflow-y: auto;
  overscroll-behavior: contain;

  &__nav {
    display: flex;
    position: relative;
  }

  &__close {
    all: unset;
    cursor: pointer;
    position: relative;
    aspect-ratio: 1 / 1;
    width: 60px;
    flex: 0 0 auto;
    align-self: center;

    &::before {
      content: '';
      height: 30px;
      width: 30px;
      position: absolute;
      border-left: 5px solid $black;
      border-bottom: 5px solid $black;
      transform: translateY(-50%) rotate(45deg);
    }

    &::after {
      content: '';
      position: absolute;
      height: 5px;
      width: 100%;
      background: $black;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    margin-top: auto;
  }

  &__title {
    @include fluid(font-size, 2.5rem, 5rem);
    font-weight: 600;
    margin: 0;
    text-transform: uppercase;
    text-align: right;
    color: var(--color);
    line-height: 1;
  }

  &__link {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: var(--color);
    gap: 0.5rem;
    text-decoration: none;
    line-height: 1;
    transition: 0.2s ease-out;

    &:hover {
      color: var(--color);
    }

    i {

      @include fluid(font-size, 2rem, 4rem);
    }

    span {
      @include fluid(font-size, 0.75rem, 1.25rem);
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: auto;

    @include mq(lg) {
      display: grid;
      grid-template-columns: max-content 1fr;
    }
  }

  &__frame {
    display: flex;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      transform: translateY(var(--top, 0));
      opacity: 1;
      background-image: linear-gradient(to right, var(--color), color-mix(in srgb, var(--color) 50%, $black));
      z-index: 1;
      // mix-blend-mode: hard-light;
      // transition: 0.4s ease-in-out;
    }
  }

  &__img {
    max-width: 100%;

    @include mq(lg) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__info {
    display: flex;
    background: var(--color);
    padding: 1.25rem;
    gap: 2rem;

    @include mq(lg) {
      flex-direction: column;
    }
  }

  &__sub-title {
    @include fluid(font-size, 1.5rem, 2.5rem);
    font-weight: 500;
    margin: 0;
    text-transform: uppercase;
    color: $white;
    line-height: 1;
  }

  &__icons {
    display: flex;
    gap: 2rem;
    flex: 0 0 auto;
    justify-content: space-evenly;
    flex: 1 1 100%;

    @include mq(lg) {
      flex-direction: column;
      margin-block: auto;
    }
  }

  &__icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: $white;
    gap: 0.5rem;

    i {
      @include fluid(font-size, 2rem, 6rem, 700px, 1200px);
    }

    span {
      @include fluid(font-size, 0.75rem, 1.5rem);
      text-transform: uppercase;
      font-weight: 400;
      letter-spacing: 1px;
      width: min-content;
      line-height: 1;
    }
  }
}
</style>