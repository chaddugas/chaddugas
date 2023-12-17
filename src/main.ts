import { createApp } from 'vue'
import { default as gsap, ScrollTrigger, SplitText } from 'gsap/all';
import './style.css'
import App from './App.vue'

gsap.registerPlugin(ScrollTrigger, SplitText);

createApp(App).mount('#app')
