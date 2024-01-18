<template lang="pug">
Teleport(to="#curtain")
  .curtain
    .curtain__item(v-for="item in count" ref="curtain" :key="item")
</template>

<script setup lang="ts">
import { ref, computed, inject, watch } from 'vue';
import { usePortfolioStore } from '../store';
import { useWindowSize } from '@vueuse/core';
import { gsap } from 'gsap';

const store = usePortfolioStore();

const color = computed(() => {
  if (!store.activeProject) return 'var(--lightGray)';
  return store.activeProject?.color;
})

const curtain = ref<HTMLElement[] | null>(null);
const { width } = useWindowSize();
const count = computed(() => {
  const refCount = 12;
  const refWidth = 1400;

  return Math.ceil(refCount * width.value / refWidth);
});

const content = inject<HTMLElement>('content');
const modals = inject<HTMLElement>('modals');

watch(() => store.isActive, () => {
  if (!content || !modals || !curtain.value) return;

  gsap.fromTo(
    curtain.value,
    {
      scaleY: 0,
      transformOrigin: 'top left',
    },
    {
      scaleY: 1,
      duration: 0.75,
      stagger: 0.05,
      ease: 'power4.out',
      onComplete: () => {
        if (store.isActive) {
          content?.setAttribute('inert', 'true');
          modals?.removeAttribute('inert');
        }
        else {
          content?.removeAttribute('inert');
          modals?.setAttribute('inert', 'true');

          store.resolveActiveClosePromise();
        }
        gsap.to(
          curtain.value,
          {
            scaleY: 0,
            duration: 0.75,
            stagger: 0.05,
            ease: 'power4.in',
            onComplete: () => {
              if (store.isActive) {
                store.resolveActiveOpenPromise();
              }
            }
          }
        )
      }
    }
  )
})

</script>

<style lang="scss" scoped>
.curtain {
  display: flex;
  position: fixed;
  inset: var(--inset);
  z-index: 3000;

  &__item {
    transform: scaleY(0);
    transform-origin: top left;
    flex: 1 1 0;
    background: v-bind("color");
    transition: background 0.75s ease-in-out;
    position: relative;

    &::after {
      position: absolute;
      content: '';
      top: 0;
      bottom: 0;
      left: -2px;
      right: -2px;
      background: inherit;
    }
  }
}
</style>