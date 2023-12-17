<template lang="pug">
#root(ref="root")
</template>


<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import * as THREE from 'three';
import gsap from 'gsap';

THREE.ColorManagement.enabled = true;

const root = ref<HTMLElement | null>(null);

const height = ref(window.innerHeight);
const width = ref(window.innerWidth);
const size = computed(() => Math.min(width.value, height.value));

const points = ref(20);
const count = ref(20);

const baseUnit = computed(() => size.value / 100);
const pathRadius = computed(() => baseUnit.value * 6);
const circleRadius = computed(() => baseUnit.value * 2);

// Scene setup
const scene = new THREE.Scene();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const camera = new THREE.PerspectiveCamera(75, width.value / height.value, 0.1, 1000);
camera.position.z = 200;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(width.value, height.value);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.gammaFactor = 2.2;
renderer.gammaOutput = true;

const texture = createGradientTexture();
texture.needsUpdate = true;
texture.colorSpace = THREE.SRGBColorSpace;

const circles = ref(Array.from({ length: count.value }, (_, i) => {
  const angle = ((2 * Math.PI * i) / points.value) + Math.PI / 5;
  const x = Math.round(pathRadius.value * Math.cos(angle));
  const y = Math.round(pathRadius.value * Math.sin(angle));

  const geometry = new THREE.CircleGeometry(circleRadius.value, 500);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    blending: THREE.CustomBlending,
    blendEquation: THREE.SubtractEquation,
    blendSrc: THREE.OneFactor,
    blendDst: THREE.OneMinusSrcColorFactor,
  });
  const circle = new THREE.Mesh(geometry, material);
  circle.position.set(x, y, 0);
  circle.scale.set(0, 0, 1);
  circle.originalPosition = new THREE.Vector3(x, y, 0);
  circle.userData.isPopped = false;

  scene.add(circle);
  return circle;
}));


let pulse: GSAPTimeline;
const bootstrapStaticAnimations = () => {
  if (pulse) pulse.kill();

  pulse = gsap.timeline({
    delay: 3,
    repeat: -1,
    repeatDelay: 10,
    repeatRefresh: true,
    paused: true,
    onUpdate: () => renderer.render(scene, camera),
  });

  circles.value.forEach((circle): void => {
    const individualPulse = gsap.to(circle.scale, {
      x: 1.15,
      y: 1.15,
      duration: 0.4,
      yoyo: true,
      repeat: 1,
    });

    pulse.add(individualPulse, '<+=0.1');
  });

  gsap.to(circles.value.map(circle => circle.scale), {
    x: 1,
    y: 1,
    ease: 'power2.out',
    duration: 1,
    stagger: { each: 0.1 },
    onUpdate: () => renderer.render(scene, camera),
    onComplete() {
      pulse.play();
    }
  });
  renderer.render(scene, camera);
};


onMounted(() => {
  if (root.value) {
    root.value.appendChild(renderer.domElement);
    window.addEventListener('mousemove', handleDisplacement, false);
    bootstrapStaticAnimations();
  }
});


// Function to create gradient texture
function createGradientTexture(): THREE.CanvasTexture {
  let canvas: OffscreenCanvas | HTMLCanvasElement;
  let context: any;

  if ('OffscreenCanvas' in window) {
    // Use OffscreenCanvas if supported
    canvas = new OffscreenCanvas(2000, 2000);
    context = canvas.getContext('2d') as any;
  } else {
    // Fallback to regular canvas
    canvas = document.createElement('canvas');
    canvas.width = 2000;
    canvas.height = 2000;
    context = canvas.getContext('2d') as any;
  }

  // Create gradient
  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, 'rgba(255, 186, 25, 1)');
  gradient.addColorStop(0.5, 'rgba(198, 84, 159, 1)');
  gradient.addColorStop(1, 'rgba(238, 37, 83, 1)');

  // Apply gradient to canvas
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  return new THREE.CanvasTexture(canvas);
}

function reformCircle(circle) {
  if (!circle.userData.isPopped) return;

  circle.userData.isPopped = false;
  circle.material.depthTest = true;
  circle.material.blending = THREE.CustomBlending;
  circle.material.blendEquation = THREE.SubtractEquation;
  circle.material.blendSrc = THREE.OneFactor;
  circle.material.blendDst = THREE.OneMinusSrcColorFactor;

  gsap.set(circle.scale, {
    x: 0, // Scale back down
    y: 0,
    onStart() {
      () => renderer.render(scene, camera)
    },
    onComplete() {
      () => renderer.render(scene, camera)
    },
  });

  gsap.set(circle.material, {
    opacity: 1, // Fade back in
    onUpdate: () => renderer.render(scene, camera)
  });

  gsap.to(circle.scale, {
    x: 1,
    y: 1,
    duration: 0.2,
    ease: 'power4.out',
    onUpdate: () => renderer.render(scene, camera)
  });

  gsap.to(circle.material, {
    opacity: 1,
    duration: 0.35,
    ease: 'power4.out',
    onUpdate: () => renderer.render(scene, camera)
  });
}

function popCircle(circle) {
  if (circle.userData.isPopped) return;

  circle.userData.isPopped = true;

  gsap.to(circle.scale, {
    x: 2, // Scale up
    y: 2,
    duration: 0.2,
    ease: 'power4.out'
  });

  circle.material.depthTest = false;
  circle.material.blending = THREE.NormalBlending;
  gsap.to(circle.material, {
    opacity: 0, // Fade out
    duration: 0.35,
    ease: 'power4.out',
    onUpdate: () => renderer.render(scene, camera),
  });
}

function displaceCircle(circle) {
  const dx = mouse.x - circle.originalPosition.x;
  const dy = mouse.y - circle.originalPosition.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const direction = { x: -dx / distance, y: -dy / distance };

  const forceMultiplier = baseUnit.value;
  const forceMagnitude = (1 / (distance / 20 + 1));
  const forceCoefficient = forceMultiplier * forceMagnitude;

  // Calculate target position based on mouse distance
  const targetX = circle.originalPosition.x + direction.x * forceCoefficient;
  const targetY = circle.originalPosition.y + direction.y * forceCoefficient;

  gsap.to(circle.position, {
    x: targetX,
    y: targetY,
    duration: 0.1,
    onUpdate: () => renderer.render(scene, camera)
  });

  const popThreshold = baseUnit.value * 6.8; // Adjust this threshold as needed
  const displacedDistance = Math.sqrt(targetX * targetX + targetY * targetY);

  if (displacedDistance > popThreshold) {
    popCircle(circle);
  } else if (circle.userData.isPopped) {
    reformCircle(circle);
  }
};

function handleDisplacement(event) {
  // Convert mouse coordinates to Three.js world space
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update raycaster with new mouse position
  raycaster.setFromCamera(mouse, camera);

  // Convert the mouse position to world coordinates
  const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
  vector.unproject(camera);
  const dir = vector.sub(camera.position).normalize();
  const distance = -camera.position.z / dir.z;
  const pos = camera.position.clone().add(dir.multiplyScalar(distance));

  // Update actual mouse position in world coordinates
  mouse.x = pos.x;
  mouse.y = pos.y;

  // Displace each circle
  circles.value.forEach(displaceCircle);
};


</script>


<style lang="scss" scoped>
#root {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: -1;

  canvas {
    mix-blend-mode: overlay;
  }
}
</style>