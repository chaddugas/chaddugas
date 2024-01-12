import { createApp } from 'vue'
import { default as gsap, ScrollSmoother, ScrollTrigger, SplitText } from 'gsap/all';
import './style.css'
import App from './App.vue'

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, SplitText);

const smoother = ScrollSmoother.create({
  wrapper: '#wrapper',
  content: '#content',
  smooth: 1,
  effects: true,
  normalizeScroll: true,
});

smoother.paused(true);

createApp(App).mount('#app');
