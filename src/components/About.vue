<template lang="pug">
#about.section.section--small.section--right.section--dark(ref="outer")
  .about__inner(ref="inner")
    .section__title
      h2 Hi, I'm Chad
    .section__content
      p With a decade of experience in front-end engineering, including eight years in the agency space working on enterprise level projects, I thrive on tackling challenges and constantly expanding my skill set.

      p My love for learning and exploring new technologies has been a constant in my career. I'm always looking for ways to improve and I'm a firm believer in the power of collaboration and teamwork.


</template>

<!-- <script setup lang="ts">
import {ref, onMounted} from 'vue';
import gsap from 'gsap';

const outer = ref(null);
const inner = ref(null);

onMounted(() => {
  if (!outer.value || !inner.value) return;

  gsap.to(inner.value, {
    scrollTrigger: {
      trigger: inner.value,
      endTrigger: '#projects',
      start: 'bottom bottom',
      end: 'top top',
      scrub: true,
    },
    y: '100%',
  });
});
</script> -->

<style lang="scss" scoped>
#about {
  position: relative;
  height: 90vh;
  z-index: 0;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    background: linear-gradient(to left, $green, $teal);
    z-index: -1;
  }
}

.about__inner {
  position: sticky;
  top: 0;
  // will-change: transform;
}
</style>