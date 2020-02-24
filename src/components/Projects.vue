<template lang="pug">
	section#projects.projects
		.projects-inner
			.projects-title
				h2
					span My 
					span Recent
					span Work
			app-project(
				v-for="(project, i) in projects", 
				:key="i", 
				:loaded="loaded",
				:project="project")
</template>

<script>
import Project from "./Project";

export default {
  name: "Projects",
  components: {
    appProject: Project
  },
  data() {
    return {
      loaded: false
    };
  },
  computed: {
    projects() {
      let projects = this.$static.projects.edges[0].node.projects;
      projects = projects.filter(project => project.visible);
      return projects;
    }
  },
  methods: {
    checkScroll() {
      const height = window.innerHeight;
      const top = this.$el.getBoundingClientRect().top;

      if (top < height * 0.6666) this.loaded = true;
    }
  },
  mounted() {
    this.checkScroll();
    window.addEventListener("scroll", this.checkScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.checkScroll);
  }
};
</script>

<static-query>
query {
  projects:allProjects {
    edges {
      node {
        projects {
          title
          photo
					secondary_photo
          description
					link
          visible
        }
      }
    }
  }
}
</static-query>

<style lang="scss" scoped>
.projects {
  @include container($max: 1580px);
}

.projects-inner {
  display: flex;
  flex-wrap: wrap;
  width: calc(100% + 40px);
  margin: 0 -20px -20px;
  position: relative;
  z-index: 3;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.projects-title {
  position: relative;
  z-index: -1;
  flex: 0 0 calc(50% - 20px);
  width: calc(50% - 20px);
  margin: 0 10px 20px;
  background: lighten($onyx, 2%);
  transition: none;
  transition-delay: 0;
  @media (min-width: $xs) {
    padding: 30px;
  }
  @media (min-width: $sm) {
    padding: 40px;
  }
  @media (min-width: $md) {
    flex: 0 0 calc(33.333% - 20px);
    width: calc(33.333% - 20px);
  }
  h2 {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    height: 100%;
    width: 100%;
    text-align: right;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 22px;
    line-height: 1.1;
    text-transform: uppercase;
    @media (min-width: $xs) {
      font-size: 28px;
    }
    @media (min-width: $sm) {
      font-size: 45px;
    }
    @media (min-width: $md) {
      font-size: 50px;
      line-height: 1.2;
    }
    @media (min-width: $lg) {
      font-size: 55px;
    }
    @media (min-width: $xl) {
      font-size: 65px;
    }
    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      white-space: nowrap;
    }
  }
}
</style>