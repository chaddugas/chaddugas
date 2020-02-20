<template lang="pug">
	.project(:class="{active}", :style="`background-image: url(${project.photo})`", @click.self="close")
		.project-inner(@click="toggle")
			.project-content
				.project-data
					.project-image
						img(:src="project.photo")
						img(:src="project.secondary_photo || project.photo")
					.project-name
						h3 {{ project.title }}
				Markdown.project-wysiwyg {{ project.description }}
		
</template>

<script>
import { ProjectBus } from "@/EventBus.js";
export default {
  name: "Project",
  props: ["project"],
  data() {
    return {
			active: false
    };
  },
  methods: {
    toggle() {
      this.$el.querySelector(".project-content").scrollTop = 0;
      this.active = !this.active;
      ProjectBus.$emit("toggled", this.$el);
    },
    close() {
      this.active = false;
    }
  },
  mounted() {
    ProjectBus.$on("toggled", el => (this.$el != el ? this.close() : false));
  }
};
</script>

<style lang="scss" scoped>
.project {
  position: relative;
  z-index: -1;
  flex: 0 0 calc(50% - 5px);
  width: calc(50% - 5px);
  margin: 0 2.5px 5px;
  transition: z-index 0ms linear;
  transition-delay: 500ms;
  background-size: 0 0;
  &:before {
    content: "";
    display: block;
    position: relative;
    padding-top: 100%;
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-size: cover;
    background-position: 50% 50%;
    background-image: inherit;
    filter: grayscale(50%);
    opacity: 0.25;
  }
  @media (min-width: $md) {
    flex: 0 0 calc(33.333% - 20px);
    width: calc(33.333% - 20px);
    margin: 0 10px 20px;
  }
}

.project-inner {
  display: flex;
  position: absolute;
  overflow: hidden;
  cursor: pointer;
  height: calc(100% + 0px);
  width: calc(100% + 0px);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  @supports (mix-blend-mode: screen) {
    transition: 500ms ease;
    will-change: height, width, top, left;
    @media (hover: hover) {
      &:hover {
        .project-name {
          opacity: 1;
          transform: translateY(0);
        }
        .project-image {
          transform: scale(1.15, 1.15);
          filter: grayscale(0%) brightness(60%);
        }
      }
    }
  }
}

.project-content {
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  pointer-events: none;
  background-color: $white;
  transform: scale(1, 1);
  position: relative;
  @supports (mix-blend-mode: screen) {
    transition: 500ms ease;
  }
  &:before {
    content: "";
    position: absolute;
    top: 20%;
    left: 0;
    bottom: 0;
    right: 40%;
    z-index: -1;
    background-image: linear-gradient(
      to top right,
      rgba($gray, 0.45),
      rgba($gray, 0.45) 50%,
      transparent 50%,
      transparent
    );
  }
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 20%;
    top: 60%;
    right: 0;
    z-index: -1;
    background-image: linear-gradient(
      to top left,
      rgba($gray, 0.45),
      rgba($gray, 0.45) 50%,
      transparent 50%,
      transparent
    );
  }
}

.project-data {
  z-index: 1;
  position: relative;
  width: 100%;
  max-width: 100%;
  float: left;
  @supports (mix-blend-mode: screen) {
    transition: 500ms ease;
    will-change: width, max-width;
  }
}

.project-image {
  position: relative;
  transform: scale(1, 1);
  z-index: 1;
  @supports (mix-blend-mode: screen) {
    transition: 500ms ease;
    will-change: transform, filter;
  }
  img {
		transition: 250ms ease;
    max-width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 1;
    &:nth-child(2) {
      opacity: 0;
    }
  }
  &::before {
    content: "";
    position: relative;
    display: block;
    padding-top: 100%;
  }
}

.project-name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 14px;
  color: $black;
  padding: 5px;
  pointer-events: none;
  text-transform: uppercase;
  background: $white;
  margin: 0;
  opacity: 0;
  transform: translateY(100%);
  z-index: 2;
  @supports (mix-blend-mode: screen) {
    mix-blend-mode: screen;
    transition: 500ms ease;
    will-change: opacity transform;
  }
  @media (min-width: $xs) {
    font-size: 16px;
  }
  @media (min-width: $sm) {
    font-size: 20px;
    padding: 20px;
  }
}

.project-wysiwyg {
  margin: 20px;
  opacity: 0;
  visibility: hidden;
  will-change: opacity;
}

.project.active {
  z-index: 2;
  transition-delay: 0ms;
  .project-inner {
    height: calc(200% + 5px);
    width: calc(200% + 5px);
    box-shadow: 0 0 3px 1px rgba($black, 0.08), 0 0 20px rgba($black, 0.05);
    @media (min-width: $md) {
      height: calc(200% + 20px);
      width: calc(200% + 20px);
    }
  }
  .project-content {
    overflow-y: auto;
    pointer-events: all;
  }
  .project-data {
    width: 350px;
		max-width: 40%;
		@media (min-width: $md) {
			width: 475px;
			max-width: 55%;
		}
  }
  .project-image {
		transform: scale(1, 1);
		filter: none;
    margin: 20px 20px 10px;
    img {
      opacity: 0;
      &:nth-child(2) {
        opacity: 1;
      }
    }
  }
  .project-name {
    transform: translateY(0);
    opacity: 0;
  }
  .project-wysiwyg {
    opacity: 1;
    visibility: visible;
    @supports (mix-blend-mode: screen) {
      transition: 250ms 700ms ease;
    }
  }
  &:nth-child(2) {
    .project-inner {
      top: 0;
      left: calc(-100% - 5px);
    }
  }
  &:nth-child(2n + 3) {
    .project-inner {
      top: calc(-100% - 5px);
      left: 0;
    }
  }
  &:nth-child(2n + 4) {
    .project-inner {
      top: calc(-100% - 5px);
      left: calc(-100% - 5px);
    }
  }
  @media (min-width: $md) {
    &:nth-child(2) {
      .project-inner {
        top: 0;
        left: calc(-100% - 20px);
      }
    }
    &:nth-child(3) {
      .project-inner {
        top: 0;
        left: calc(-200% - 40px);
      }
    }
    &:nth-child(3n + 4) {
      .project-inner {
        top: calc(-100% - 20px);
        left: 0;
      }
    }
    &:nth-child(3n + 5) {
      .project-inner {
        top: calc(-100% - 20px);
        left: calc(-100% - 20px);
      }
    }
    &:nth-child(3n + 6) {
      .project-inner {
        top: calc(-100% - 20px);
        left: calc(-200% - 40px);
      }
    }
  }
}
</style>