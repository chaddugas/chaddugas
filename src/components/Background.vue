<template lang="pug">
#background(:class="{hidden: store.activeProject}")
  svg(
    x='0px'
    y='0px'
    :viewBox='`0 0 ${canvas.width} ${canvas.height}`'
    xml:space='preserve')
    linearGradient#gradient(
      x1="0"
      y1="0"
      x2="1"
      y2="0")
      stop(offset="0" style="stop-color:var(--stop1)")
      stop(offset="0.5" style="stop-color:var(--stop2)")
      stop(offset="1" style="stop-color:var(--stop3)")
    circle(
      v-for="circle in circles"
      :key="circle.id"
      :id='circle.id'
      :cx='circle.cx'
      :cy='circle.cy'
      :r='circle.r'
      :style="circle.style")
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, inject, watchEffect, onBeforeUnmount } from 'vue';
import { usePortfolioStore } from "../store";
import { useMediaQuery } from '@vueuse/core';
import gsap from 'gsap';

interface Canvas {
  height: number;
  width: number;
  size: number;
  centerX: number;
  centerY: number;
  arc: number;
}

interface Circle {
  id: string;
  r: any;
  cx: any;
  cy: any;
  isPopped: boolean;
  rotate: number;
  x: number;
  y: number;
  scale: number;
  fillOpacity: number;
  strokeWidth: number;
  alpha: number;
  style: string;
}

const store = usePortfolioStore();

const props = defineProps({
  loaded: Boolean,
});

const mouse = inject<Mouse>('mouse');

const initial = ref(true);
const ready = ref(false);

const isTouchScreen = useMediaQuery('(pointer: coarse)');

const height = ref(window.innerHeight);
const width = ref(window.innerWidth);
const size = computed(() => Math.min(width.value, height.value));
const inflation = ref(2);
const offset = ref(0.25);

let pulse: GSAPTimeline;

const canvas: Canvas = reactive({
  height: computed(() => height.value),
  width: computed(() => width.value),
  size: computed(() => size.value),
  arc: computed(() => (size.value / 2) * (inflation.value / 2)),
  centerX: computed(() => width.value * (offset.value + 0.5)),
  centerY: computed(() => height.value * (offset.value + 0.5)),
});

const points = ref(20);
const count = ref(17);

const makeCircles = (): Array<Circle> => {
  return Array.from(
    { length: count.value },
    (_, i): Circle => {
      const angle = (2 * Math.PI * i) / points.value + Math.PI / 5;

      const id = `circle-${i}`;
      const cx = computed(() =>
        Math.round(canvas.centerX + canvas.arc * 1 * Math.cos(angle))
      );
      const cy = computed(() =>
        Math.round(canvas.centerY + canvas.arc * 1 * Math.sin(angle))
      );
      const r = computed(() =>
        Math.round(Math.max(size.value * (inflation.value / 10), 20))
      );

      return {
        id,
        cx,
        cy,
        r,
        isPopped: false,
        rotate: 0,
        x: 0,
        y: 0,
        scale: initial.value ? 0 : 1,
        fillOpacity: 1,
        strokeWidth: 0,
        alpha: 1,
        get style(): string {
          return `
          transform-origin: ${this.cx}px ${this.cy}px;
          transform:
              matrix(
                ${this.scale},
                0,
                0,
                ${this.scale},
                ${this.x},
                ${this.y}
              )
            rotate(${this.rotate}deg);
          stroke: #FBA91950;
          stroke-width: ${this.strokeWidth};
          fill-opacity: ${this.fillOpacity};
          opacity: ${this.alpha};`;
        },
      };
    }
  ).reverse();
};

const circles = ref(makeCircles());

const popCircle = (circle: Circle, displacementX: number, displacementY: number) => {
  const displacedDistance = Math.sqrt(
    displacementX * displacementX + displacementY * displacementY
  );
  const popThreshold = canvas.size * (17 / 200);

  if (displacedDistance > popThreshold) {
    if (circle.isPopped) return;
    circle.isPopped = true;

    const pop = gsap.timeline({
      onComplete() {
        const checkDistance = window.setInterval(() => {
          if (!mouse) return clearInterval(checkDistance);

          const dx = mouse.x - circle.cx;
          const dy = mouse.y - circle.cy;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > popThreshold) {
            clearInterval(checkDistance);
            reform.play();
          }
        }, 100);
      },
    });

    const reform = gsap.timeline({
      paused: true,
      onComplete() {
        circle.isPopped = false;
      },
    });

    pop
      .to(circle, {
        scale: 1.8,
        strokeWidth: 1,
        fillOpacity: 0,
        duration: 0.4,
        ease: 'power4.out',
      })
      .to(
        circle,
        {
          alpha: 0,
          duration: 0.5,
          ease: 'power4.out',
        },
        '<'
      );

    reform.set(circle, {
      x: 0,
      y: 0,
      fillOpacity: 1,
      strokeWidth: 0,
      scale: 0,
    });

    reform.to(
      circle,
      {
        scale: 1,
        alpha: 1,
        duration: 0.5,
        ease: 'power4.out',
      },
      '>'
    );
  }
};

const displaceCircles = (): void => {
  if (isTouchScreen.value) return;
  circles.value.forEach((circle: Circle) => {
    if (!mouse) return;
    const dx = mouse.x - circle.cx;
    const dy = mouse.y - circle.cy;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const direction = { x: -dx / distance, y: -dy / distance };

    const forceMultiplier = canvas.size / 8;
    const forceMagnitude = 1 / (distance / 50 + 1);
    const forceCoefficient = forceMultiplier * forceMagnitude;

    const displacementX = direction.x * forceCoefficient;
    const displacementY = direction.y * forceCoefficient;

    gsap.to(circle, {
      x: displacementX,
      y: displacementY,
      duration: 0.5,
    });

    popCircle(circle, displacementX, displacementY);
  });
};

watchEffect(displaceCircles);

const createPulseAnimation = () => {
  if (pulse) pulse.kill();

  pulse = gsap.timeline({
    delay: 2,
    repeat: -1,
    repeatDelay: 2,
    repeatRefresh: true,
    paused: true,
  });

  circles.value.forEach((circle): void => {
    const individualPulse = gsap.to(circle, {
      startAt: {
        scale: 1,
      },
      scale: 1.15,
      duration: 0.4,
      yoyo: true,
      repeat: 1,
    });

    pulse.add(individualPulse, '<+=0.1');
  });
}

const createScrollAnimation = () => {
  const scrollTrigger = {
    trigger: '#hero',
    endTrigger: '#projects',
    start: 'top top',
    end: 'top bottom-=200',
    scrub: 1,
  };

  gsap.to(inflation, {
    value: 1,
    scrollTrigger
  });
  gsap.to(offset, {
    value: 0,
    scrollTrigger
  });
}

const createIntroAnimation = () => {
  gsap.to(circles.value, {
    scale: 1,
    duration: 1,
    stagger: {
      each: 0.1,
      from: 3,
    },
    ease: 'power4.out',
    delay: 1,
    onUpdate() {
      if (this.progress() > 0.1 && !ready.value) {
        ready.value = true;
      }
    },
    onComplete() {
      initial.value = false;
      pulse.play();
    },
  });
}

const bootstrapStaticAnimations = () => {
  createPulseAnimation();
  if (initial.value) {
    createScrollAnimation();
    createIntroAnimation();
  } else {
    pulse.play();
  }
};

const updateDimensions = (): void => {
  height.value = window.innerHeight;
  width.value = window.innerWidth;

  circles.value = makeCircles();
  bootstrapStaticAnimations();
};

watch(
  () => props.loaded,
  () => {
    if (props.loaded) {
      bootstrapStaticAnimations();
      window.addEventListener('resize', updateDimensions);
    }
  }
);

onBeforeUnmount((): void => {
  window.removeEventListener('resize', updateDimensions);
});
</script>

<style lang="scss" scoped>
#background {
  display: flex;
  pointer-events: none;
  mix-blend-mode: multiply;
  position: fixed;
  inset: 0;

  &.hidden {
    visibility: hidden;
  }
}

svg {
  flex: 0 0 100%;

  circle {
    fill: url(#gradient);
    mix-blend-mode: overlay;
    will-change: transform, opacity, fill-opacity, stroke-width;
  }
}
</style>
