import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import {
  default as gsap,
  ScrollSmoother,
  ScrollTrigger,
  SplitText,
} from 'gsap/all';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, SplitText);

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
