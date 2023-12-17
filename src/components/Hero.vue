<template lang="pug">
#hero(:class="{loaded: props.loaded}")
  .inner
    template(v-for="i in 2")
      div(:class="{main: i === 1, shadow: i === 2}" :aria-hidden="i === 2")
        h1.title
          span(ref="title_0") Chad
          span(ref="title_1") Dugas
        h2.sub(ref="sub") Senior Frontend Engineer
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { default as gsap, SplitText } from 'gsap/all';

const title_0 = ref(null);
const title_1 = ref(null);
const sub = ref(null);

const props = defineProps({
  loaded: Boolean,
});

onMounted(() => {
  if (!title_0.value || !title_1.value || !sub.value) return;

  const intro = gsap.timeline({
    paused: true,
  });

  const splitTitles = [
    new SplitText(title_0.value[0], { type: 'words chars' }),
    new SplitText(title_0.value[1], { type: 'words chars' }),
    new SplitText(title_1.value[0], { type: 'words chars' }),
    new SplitText(title_1.value[1], { type: 'words chars' }),
    new SplitText(sub.value[0], { type: 'words chars' }),
    new SplitText(sub.value[1], { type: 'words chars' })
  ];


  intro.set([splitTitles[0].chars, splitTitles[1].chars, splitTitles[2].chars, splitTitles[3].chars, splitTitles[4].chars, splitTitles[5].chars], {
    rotateX: 80,
    translateY: '-20px',
    opacity: 0,
    visibility: 'hidden',
  });

  intro.to([splitTitles[0].chars, splitTitles[2].chars], {
    rotateX: 0,
    translateY: '0px',
    opacity: 1,
    visibility: 'visible',
    duration: 0.3,
    stagger: {
      each: 0.05,
    },
  }, '<');

  intro.to([splitTitles[1].chars, splitTitles[3].chars], {
    rotateX: 0,
    translateY: '0px',
    opacity: 1,
    visibility: 'visible',
    duration: 0.3,
    stagger: {
      each: 0.05,
    },
  }, '<');

  intro.to([splitTitles[4].chars], {
    rotateX: 0,
    translateY: '0px',
    opacity: 1,
    visibility: 'visible',
    duration: 0.3,
    stagger: {
      each: 0.05,
    },
  }, '>');

  intro.to([splitTitles[5].chars], {
    rotateX: 0,
    translateY: '0px',
    opacity: 1,
    visibility: 'visible',
    duration: 0.3,
    stagger: {
      each: 0.05,
    },
  }, '<');

  setTimeout(() => {
    intro.play();
  }, 2000);
});
</script>

<style lang="scss" scoped>
#hero {
  --rail: min(9ch, 50vw);
  grid-area: 1 / 1 / 2 / 2;
  font-size: 7.5rem;
  display: flex;
  align-items: end;
  position: relative;

  &.loaded {
    &::before {
      transform: translateY(0);
    }

    .main,
    .shadow {
      transform: translateY(0);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: var(--rail);
    background: linear-gradient(to left, #FBA919, #C6549F 40%, #EE2553);
    transform: translateY(100%);
    transition: transform 0.5s ease-out;
    will-change: transform;
  }
}

.inner {
  display: flex;
  flex-direction: column;
  width: 100vw;
  position: relative;
  padding: 0;
}

.main,
.shadow {
  display: flex;
  flex-direction: column;
  padding: 3rem;
  user-select: none;
  gap: 1rem;
  transform: translateY(100%);
  transition: transform 0.5s 1s ease-out;
  z-index: 20;
  will-change: transform;
}

.main {
  clip-path: polygon(0 0, var(--rail) 0, var(--rail) 100%, 0 100%, 0 0);
  align-self: start;
  background-color: #080808;
  color: #fff;
  mix-blend-mode: darken;
}

.shadow {
  // display: none;
  position: absolute;
  inset: 0;
  clip-path: polygon(var(--rail) 0, 100% 0, 100% 100%, var(--rail) 100%, var(--rail) 0);
  color: #fff;
}

.title {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5ch;
  align-self: start;
  font-size: 7.5rem;
  text-transform: uppercase;
  line-height: 1;
  font-weight: 700;
  margin: 0;
  padding: 0;

  span {
    visibility: hidden;
  }
}

.sub {
  align-self: start;
  font-size: 4rem;
  text-transform: uppercase;
  line-height: 1;
  font-weight: 700;
  margin: 0;
  padding: 0;
  visibility: hidden;
}
</style>