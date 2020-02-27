<template lang="pug">
	section#projects.projects
		.projects-inner
			.projects-title
				h3
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
  @include container($max: 1430px);
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
	@include code('work', 'projects', lighten($onyx, 2%));
  z-index: -1;
  flex: 0 0 calc(50% - 20px);
  width: calc(50% - 20px);
  margin: 0 10px 20px;

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
  h3 {
		@include fluid-type(400px, 1450px, 16px, 40px);
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    height: 100%;
    width: 100%;
		font-weight: 500;
		font-family: $headings;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    line-height: 1.2;
		text-transform: uppercase;
    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      white-space: nowrap;
    }
  }
}
</style>