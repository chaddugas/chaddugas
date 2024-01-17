import { defineStore } from 'pinia'
import { ref, inject } from 'vue'
import gsap from 'gsap/all'

export const usePortfolioStore = defineStore('portfolio', () => {
  const content = inject<HTMLElement>('content');
  const modals = inject<HTMLElement>('modals');

  const activeProject = ref<string | null>(null);

  const setActiveProject = (id: string) => {
    activeProject.value = id;

    if (!content || !modals) return;

    gsap.to(content, {
      left: '-100%',
      duration: 0.5,
      ease: 'power2.inOut',
      onStart: () => {
        content?.setAttribute('inert', 'true');
        modals?.removeAttribute('inert');
      }
    })
  }

  const clearActiveProject = () => {
    activeProject.value = null;
    if (!content || !modals) return;

    gsap.to(content, {
      left: '0',
      duration: 0.5,
      ease: 'power2.inOut',
      onStart: () => {
        content?.removeAttribute('inert');
        modals?.setAttribute('inert', 'true');
      }
    })
  }

  return {
    activeProject,
    setActiveProject,
    clearActiveProject,
  }
})