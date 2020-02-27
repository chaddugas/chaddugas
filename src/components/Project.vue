<template lang="pug">
	.project(:class="{active, 'is-opening': opening, 'is-closing': closing, 'is-loaded': loaded}", @click="close")
		.project-inner(@click.stop="toggle", @transitionend.self="transitionend")
			.project-content
				.project-data
					.project-image
						picture
							//- source(:srcset="project.photo.substring(0, project.photo.length - 4) + '.webp'")
							img(v-lazy="project.photo")
						a(:href="project.link", target="_blank", @click.stop="")
							picture
								//- source(:srcset="project.secondary_photo.substring(0, project.secondary_photo.length - 4) + '.webp'")
								img(v-lazy="project.secondary_photo")
							span view
					.project-name
						h3 {{ project.title }}
				Markdown.project-wysiwyg {{ project.description }}
		
</template>

<script>
import { ProjectBus } from "@/EventBus.js";
export default {
  name: "Project",
  props: ["project", "loaded"],
  data() {
    return {
      active: false,
      opening: false,
      closing: false
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
    },
    transitionend(e) {
      this.opening = false;
      this.closing = false;
    }
  },
  watch: {
    active(to, from) {
      if (to) {
        this.opening = true;
      } else {
        this.closing = true;
      }
    }
  },
  mounted() {
    ProjectBus.$on("toggled", el => (this.$el != el ? this.close() : false));
  }
};
</script>

<style lang="scss">
.project-wysiwyg {
  h1 {
    margin: 0 0 1.25rem;
    width: auto;
    padding: 0;
    font-weight: 300;
    line-height: 1.4;
    font-family: $body;
    font-size: 2rem;
  }
  p {
    margin: 0 0 1rem;
    &:last-of-type {
      margin-bottom: 2rem;
    }
  }
  blockquote {
    display: flex;
    margin: auto -0.25rem 0;
    padding: 1rem 0 0;
    border: none;
    flex-wrap: wrap;
    p {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;
      margin: 0 0.25rem 0.5rem;
      font-size: 0.75rem;
      font-style: normal;
      @each $color in $palette {
        &:nth-child(#{length($palette)}n-#{length($palette)
            -
            index($palette, $color)}) {
          background: $color;
          color: choose-contrast-color($color);
        }
      }
      &:last-of-type {
        margin: 0 0.25rem 0.5rem;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.project {
  position: relative;
  z-index: -1;
  flex: 0 0 calc(50% - 20px);
  width: calc(50% - 20px);
  margin: 0 10px 20px;
  opacity: 0;
  transform: rotateY(-180deg);
  backface-visibility: hidden;
  transform-style: preserve-3d;
  &.is-loaded {
    opacity: 1;
    transform: rotateY(0deg);
  }
  @for $i from 0 through 20 {
    &:nth-child(#{$i}) {
      transition: opacity 375ms #{375ms + ($i * 150ms)} ease,
        transform 750ms #{$i * 150ms} ease;
    }
  }
  &.active {
    z-index: 2;
  }
  &.is-closing {
    z-index: 1;
  }
  &.is-opening {
    z-index: 3;
  }
  &.is-opening,
  &.is-closing {
    .project-image {
      transition-duration: 250ms;
    }
  }
  &:before {
    content: "";
    display: block;
    position: relative;
    padding-top: 100%;
  }
  @media (min-width: $md) {
    flex: 0 0 calc(33.333% - 20px);
    width: calc(33.333% - 20px);
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
  transition: 500ms ease;
  will-change: height, width, top, left;
  @media (hover: hover) {
    &:hover {
      .is-opening &,
      .is-closing & {
        &:hover {
          .project-name {
            opacity: 0;
          }
        }
      }
      .project-name {
        opacity: 1;
      }
      .project-image {
        transform: scale(1.075, 1.075);
        opacity: 0.075;
      }
    }
  }
}

.project-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  pointer-events: none;
  background-color: lighten($onyx, 10%);
  transform: scale(1, 1);
  position: relative;
  @supports (mix-blend-mode: screen) {
    transition: 500ms ease;
  }
}

.project-data {
  z-index: 1;
  position: relative;
  width: 100%;
  max-width: 100%;
  @supports (mix-blend-mode: screen) {
    transition: 500ms ease;
    will-change: width, max-width;
  }
}

.project-image {
  position: relative;
  transform: scale(1, 1);
  z-index: 1;
  transition: 700ms ease;
  will-change: transform, opacity;
  picture,
	img,
  a {
    transition: 250ms ease;
    max-width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 1;
		object-fit: cover;
    pointer-events: none;
  }
	picture {
		object-fit: cover;
	}
  a {
    opacity: 0;
    &:hover {
      span {
        background: $red;
        color: choose-contrast-color($red);
      }
      &::before {
        opacity: 1;
      }
    }
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      content: "";
      background: rgba($black, 0.25);
      opacity: 0;
      transition: 0.25s ease;
    }
    span {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: block;
      text-align: center;
      background: $onyx;
      padding: 0.3875rem;
      font-size: 0.875rem;
      font-weight: 300;
      text-transform: lowercase;
      font-family: $headings;
      transition: 0.25s ease;
      pointer-events: none;
      opacity: 0;
    }
  }
  &::before {
    content: "";
    position: relative;
    display: block;
    padding-top: 100%;
    transition: 0.25s ease;
  }
}

.project-name {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  font-size: 14px;
  padding: 5px;
  pointer-events: none;
  text-transform: uppercase;
  background: lighten($onyx, 5%);
  margin: 0;
  opacity: 0;
  z-index: 2;
  transform: translateY(-50%);
  transition: 250ms ease;
  @media (min-width: $xs) {
    font-size: 16px;
  }
  @media (min-width: $sm) {
    font-size: 20px;
    padding: 20px;
  }
}

.project-wysiwyg {
  margin: 2rem 1.25rem 1.25rem;
  opacity: 0;
  visibility: hidden;
  will-change: opacity;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
}

.project.active {
  .project-inner {
    height: calc(200% + 20px);
    width: calc(200% + 20px);
  }
  .project-content {
    overflow-y: auto;
    pointer-events: all;
  }
  .project-image {
    transform: scale(1, 1);
    opacity: 1;
    margin: 20px 20px 0;
    &::before {
      padding-top: 50%;
    }
    & > picture {
      opacity: 0;
    }
    a {
      opacity: 1;
      span {
        opacity: 1;
        pointer-events: all;
      }
    }
  }
  .project-name {
    display: none;
  }
  .project-wysiwyg {
    opacity: 1;
    visibility: visible;
    @supports (mix-blend-mode: screen) {
      transition: 250ms 500ms ease;
    }
  }
  &:nth-child(2) {
    .project-inner {
      top: 0;
      left: calc(-100% - 20px);
    }
  }
  &:nth-child(2n + 3) {
    .project-inner {
      top: calc(-100% - 20px);
      left: 0;
    }
  }
  &:nth-child(2n + 4) {
    .project-inner {
      top: calc(-100% - 20px);
      left: calc(-100% - 20px);
    }
  }
  @media (min-width: $md) {
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