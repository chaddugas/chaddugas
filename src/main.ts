import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { disableBodyScroll } from 'body-scroll-lock-upgrade';
import App from './App.vue';

import {
  default as gsap,
  ScrollTrigger,
  SplitText,
} from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, SplitText);
disableBodyScroll(document.querySelector('#fixed') as HTMLElement);

const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

const pinia = createPinia();
const app = createApp(App);

const wrapper = document.querySelector('#wrapper') as HTMLElement;
const content = document.querySelector('#content') as HTMLElement;
const modals = document.querySelector('#modals') as HTMLElement;

app.provide('wrapper', wrapper);
app.provide('content', content);
app.provide('modals', modals);

app.use(pinia);
app.mount('#app');
