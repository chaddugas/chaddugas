import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const usePortfolioStore = defineStore('portfolio', () => {
  const projects = reactive([
    {
      id: '(01)',
      title: 'American Campus Communities',
      url: 'https://www.americancampus.com/',
      img: '/images/acc.webp',
      roles: ['client-facing', 'lead', 'dev',],
      color: 'var(--berry)'
    },
    {
      id: '(02)',
      title: 'Best Range Hoods',
      url: 'https://www.bestrangehoods.com/',
      img: '/images/brh.webp',
      roles: ['client-facing', 'dev'],
      color: 'var(--purple)'
    },
    {
      id: '(03)',
      title: 'BlueModus',
      url: 'https://www.bluemodus.com/',
      img: '/images/bm.webp',
      roles: ['design', 'lead', 'dev'],
      color: 'var(--blue)'
    },
    {
      id: '(04)',
      title: 'Essenz 3D',
      url: 'https://www.livanova.com/cardiopulmonary/en-us/essenz-3d',
      img: '/images/e3d.png',
      roles: ['client-facing', 'design', 'lead', 'dev'],
      color: 'var(--green)'
    },
  ]);

  const socials = reactive([
    {
      title: 'CodePen',
      url: 'https://codepen.io/chadd',
      icon: 'codepen',
    },
    {
      title: 'LinkedIn',
      url: 'https://www.linkedin.com/in/chaddugas',
      icon: 'linkedin',
    },
    {
      title: 'Résumé',
      url: '/files/chad-dugas_resume.pdf',
      icon: 'resume',
    },
    {
      title: 'GitHub',
      url: 'https://github.com/chaddugas',
      icon: 'github',
    },
  ]);

  const isActive = ref(false);
  const activeProject = ref<Project | null>(null);

  const activeOpenPromise = ref<Promise<void> | null>(null);
  const activeOpenPromiseResolver = ref<(() => void) | null>(null);
  const resolveActiveOpenPromise = () => {
    activeOpenPromiseResolver.value?.();
  }

  const activeClosePromise = ref<Promise<void> | null>(null);
  const activeClosePromiseResolver = ref<(() => void) | null>(null);
  const resolveActiveClosePromise = () => {
    activeClosePromiseResolver.value?.();
  }

  const setActiveProject = (project: Project) => {
    activeProject.value = project;
  }
  const open = (project: Project) => {
    isActive.value = true;
    setActiveProject(project);
    activeClosePromise.value = new Promise((resolve) => {
      activeClosePromiseResolver.value = resolve;
    });
  }

  const clearActiveProject = () => {
    activeProject.value = null;
  }
  const close = async () => {
    isActive.value = false;
    await activeClosePromise.value;
    clearActiveProject();
    activeOpenPromise.value = new Promise((resolve) => {
      activeOpenPromiseResolver.value = resolve;
    });
  }

  activeOpenPromise.value = new Promise((resolve) => {
    activeOpenPromiseResolver.value = resolve;
  });

  return {
    projects,
    socials,
    isActive,
    activeProject,
    activeOpenPromise,
    activeOpenPromiseResolver,
    resolveActiveOpenPromise,
    activeClosePromise,
    activeClosePromiseResolver,
    resolveActiveClosePromise,
    setActiveProject,
    clearActiveProject,
    open,
    close
  }
})