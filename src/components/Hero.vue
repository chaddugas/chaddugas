<template lang="pug">
#hero(:class="{loaded: props.loaded}")
  .inner
    div.main
      h1.title
        span(ref="title_0") Chad
        span(ref="title_1") Dugas
      h2.sub(ref="sub") Senior Frontend Engineer
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue';
import { default as gsap, SplitText } from 'gsap/all';

const modals = inject<HTMLElement>('modals');

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
    onComplete: () => {
      modals?.classList.remove('initial');
    },
  });

  const splitTitles = [
    new SplitText(title_0.value, { type: 'words chars' }),
    new SplitText(title_1.value, { type: 'words chars' }),
    new SplitText(sub.value, { type: 'words chars' }),
  ];

  intro.set(
    [
      splitTitles[0].chars,
      splitTitles[1].chars,
      splitTitles[2].chars,
    ],
    {
      rotateX: 80,
      translateY: '-20px',
      opacity: 0,
      visibility: 'hidden',
    }
  );

  intro.to(
    [splitTitles[0].chars, splitTitles[1].chars],
    {
      rotateX: 0,
      translateY: '0px',
      opacity: 1,
      visibility: 'visible',
      duration: 0.3,
      stagger: {
        each: 0.05,
      },
    },
    '<'
  );

  intro.to(
    [splitTitles[2].chars],
    {
      rotateX: 0,
      translateY: '0px',
      opacity: 1,
      visibility: 'visible',
      duration: 0.3,
      stagger: {
        each: 0.05,
      },
    },
    '>'
  );

  setTimeout(() => {
    intro.play();
  }, 2000);
});
</script>

<style lang="scss" scoped>
#hero {
  --rail: min(9ch, 60vw);
  grid-area: 1 / 1 / 2 / 2;
  font-size: 7.5rem;
  display: flex;
  position: relative;
  height: var(--s_height);
  // overflow: hidden;

  &.loaded {
    .inner::before {
      transform: translateY(0);
    }

    .main {
      transform: translateY(0);
    }
  }
}

.inner {
  display: flex;
  align-items: start;
  width: var(--rail);
  position: relative;
  padding: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to left, $pink, $berry);
    transform: translateY(100%);
    transition: transform 0.5s ease-out;
    will-change: transform;
  }
}

.main {
  @include fluid(padding-top, 0.5rem, 2rem);
  @include fluid(padding-inline, 1.5rem, 3rem);
  @include fluid(padding-bottom, 1.5rem, 3rem);
  display: flex;
  flex-direction: column;
  user-select: none;
  gap: 1rem;
  transform: translateY(calc(-100% - 1rem));
  transition: transform 0.5s 1s ease-out;
  z-index: 20;
  will-change: transform;
  background: $black;
  color: $white;
  mix-blend-mode: darken;
  position: sticky;
  top: 1rem;
  // margin: 1rem;
}

.title {
  @include fluid(font-size, 4rem, 7.5rem);
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.5ch;
  align-self: start;
  font-size: 7.5rem;
  text-transform: uppercase;
  line-height: 1;
  font-weight: 700;
  margin: 0;
  padding: 0;

  span {
    visibility: hidden;

    &:deep(> div) {
      display: flex !important;
    }
  }
}

.sub {
  @include fluid(font-size, 2rem, 4rem);
  align-self: start;
  text-transform: uppercase;
  line-height: 1;
  font-weight: 700;
  margin: 0;
  padding: 0;
  visibility: hidden;
}
</style>
