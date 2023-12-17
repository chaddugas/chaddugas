<template lang="pug">
svg(
  @mousemove="handleDisplacement"
  x='0px'
  y='0px'
  :viewBox='`0 0 ${spatialData.width} ${spatialData.height}`'
  :style='`enable-background:new 0 0 ${spatialData.width} ${spatialData.height};`'
  xml:space='preserve')
  linearGradient#gradient(x1="0" x2="1" y1="0" y2="0.5")
    stop(offset="0" style="stop-color:#FBA919")
    stop(offset="0.5" style="stop-color:#C6549F")
    stop(offset="1" style="stop-color:#EE2553")
  g
    circle(
      v-for="circle in spatialData.coordinates"
      ref="circles" 
      :key="circle.id"
      :id='circle.id'
      :cx='circle.initialX'
      :cy='circle.initialY'
      :r='circle.radius'
      :data-cx='circle.x'
      :data-cy='circle.y'
      :data-radius='circle.radius')
</template>


<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { readData } from '../assets/utils';
import gsap from 'gsap';

const circles = ref<Array<SVGCircleElement> | null>(null);
const pulse = gsap.timeline({
  repeat: -1,
  repeatDelay: 10,
  paused: true,
  repeatRefresh: true,
});

const useFinalPositions = ref(false);

const height = ref(window.innerHeight);
const width = ref(window.innerWidth);

const mousePos = ref({ x: 0, y: 0 });

interface SpatialCoordinate {
  id: string;
  x: number;
  y: number;
  radius: number;
  initialX: number;
  initialY: number;
}

interface SpatialData {
  height: number;
  width: number;
  coordinates: SpatialCoordinate[];
}

const spatialData = computed(():SpatialData => {
  const x0 = width.value / 2;
  const y0 = height.value / 2;
  const arcRadius = Math.min(x0, y0) * 0.6;
  const radius = Math.round(Math.max(arcRadius * (5 / 17), 20));
  const items = 22;
  const rotationAngle = Math.PI / 9;
  const coordinates = [];

  for (let i = 0; i < items; i++) {
    const id = `circle-${i}`;
    const angle = 2 * Math.PI * i / items - rotationAngle;
    const x = Math.round(x0 + arcRadius * Math.cos(angle));
    const y = Math.round(y0 + arcRadius * Math.sin(angle));
    const initialX = useFinalPositions.value ? x : i % 2 === 0 ? radius * -2 : radius * 2 + width.value;
    const initialY = useFinalPositions.value ? y : i % 3 === 0 ? radius * -2 : radius * 2 + height.value;

    coordinates.push({ id, x, y, radius, initialX, initialY });
  }

  coordinates.reverse();

  return {
    height: height.value,
    width: width.value,
    coordinates
  };
});

const displaceCircle = (circle: SVGCircleElement): void => {
  const originalX = readData(circle, 'cx');
  const originalY = readData(circle, 'cy');
  const originalR = readData(circle, 'radius');

  const dx = mousePos.value.x - originalX;
  const dy = mousePos.value.y - originalY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const direction = { x: -dx / distance, y: -dy / distance };

  const forceMultiplier = Math.min(width.value, height.value) * (8 / 64);
  const forceMagnitude = (1 / (distance / 50 + 1));
  const forceCoefficient = forceMultiplier * forceMagnitude;

  const displacementX = direction.x * forceCoefficient;
  const displacementY = direction.y * forceCoefficient;

  const angle = (Math.atan2(displacementY, displacementX)) * (180 / Math.PI);

  const popSize = Math.max(originalR * (forceMagnitude * 2.5), originalR);

  const displacedDistance = Math.sqrt(displacementX * displacementX + displacementY * displacementY);

  const popThreshold = (Math.min(height.value, width.value)) * (17 / 150);

  gsap.to(circle, {
    x: displacementX,
    y: displacementY,
    '--rotate': angle,
    duration: 0.5
  });

  if (displacedDistance > popThreshold) {
    if (readData(circle, 'isPopped')) return;
    circle.dataset.isPopped = 'true';

    const popAndReform = gsap.timeline({ paused: true });

    popAndReform.add(gsap.to(circle, {
      r: () => popSize,
      stroke: '#FBA91970',
      strokeWidth: 2,
      fillOpacity: 0,
      duration: 0.2,
      ease: 'power4.out',
    }));

    popAndReform.add(gsap.to(circle, {
      alpha: 0,
      duration: 0.3,
      ease: 'power4.out',
      onComplete() {
        popAndReform.pause();
        const checkDistance = setInterval(() => {
          const dx = mousePos.value.x - originalX;
          const dy = mousePos.value.y - originalY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 140) {
            popAndReform.resume();
            clearInterval(checkDistance);
          }
        }, 100);
      }
    }), '<');

    popAndReform.add(gsap.fromTo(circle, {
      x: originalX,
      y: originalY,
      r: 0,
      stroke: 'none',
      strokeWidth: 0,
      fillOpacity: 1,
    }, {
      r: originalR,
      alpha: 1,
      duration: 0.25,
      ease: 'power4.out',
      onComplete() {
        circle.dataset.isPopped = 'false';
      }
    }), '>');

    popAndReform.play();
  }
};

const handleDisplacement = (event: MouseEvent): void => {
  mousePos.value = { x: event.clientX, y: event.clientY };
  if (!circles.value) return;
  circles.value.forEach(displaceCircle);
};

const initStaticAnimation = (): void => {
  const timeline = gsap.timeline({ paused: true });

  if (!circles.value) return;

  timeline.to(circles.value,
    {
      cx: (...[, circle]: [any, SVGElement]) => readData(circle, 'cx'),
      cy: (...[, circle]: [any, SVGElement]) => readData(circle, 'cy'),
      duration: 1,
      stagger: { each: 0.1, from: 'random' },
      ease: 'power4.out',
      delay: 2,
      onComplete() {
        useFinalPositions.value = true;
        timeline.revert();
        pulse.play();
      }
    });

  circles.value.forEach((circle):void => {
    const individualPulse = gsap.to(circle, {
      r: () => Math.max(readData(circle, 'radius') * 1.2, 35),
      duration: 0.4,
      yoyo: true,
      repeat: 1,
      onComplete() {
        gsap.set(circle, { r: null });
      }
    });

    pulse.add(individualPulse, '<+=0.1');
  });

  timeline.play();
}

const updateDimensions = ():void => {
  height.value = window.innerHeight;
  width.value = window.innerWidth;
};

onMounted((): void => {
  if (!circles.value) return;
  window.addEventListener('resize', updateDimensions);
  initStaticAnimation();
});

onBeforeUnmount((): void => {
  window.removeEventListener('resize', updateDimensions);
});
</script>


<style lang="scss" scoped>
svg {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100vh;
  width: 100vw;
  z-index: -1;

  circle {
    fill: url(#gradient);
    mix-blend-mode: overlay;
  }
}
</style>