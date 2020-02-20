<template lang="pug">
	section#about.about
		.about-inner(:class="{loaded: loaded}")
			.about-content
				.about-content-scroller
					h3 I'm Chad.
					p I'm a Senior Front-end Engineer and Front-end Team Lead, living and working in Colorado. I love to build challenging, visually exciting, and unique applications on the web. 
					p One of my favorite things about development is the massive toolbox of languages, libraries, and methodologies that you can pull from. I am #[em not] one of those people who thinks if you want to be good at design, you have to be bad at logic, or vise-versa. I like to pride myself on being excellent at all aspects of web development. 
					p In anycase, please feel free to have a look at any of my projects, and should the mood strike you, reach out on any to the platforms listed below. 
					p
						strong Cheers!
			span.about-block(
				v-for="color in Object.keys(colors)", 
				:class="`about-block--${color}`",
				@transitionend.self.once="startInterval(color)")
				.block-flipper(:class="{flipped: colors[color]}")
					.block-face.block-face--front
					.block-face.block-face--back
</template>

<script>
import ID from "@/mixins/ID";
export default {
  name: "About",
  mixins: [ID],
  data() {
    return {
      loaded: false,
      colors: { purple: true, sky: true, red: true }
    };
  },
  computed: {},
  methods: {
    startInterval(color) {
      setInterval(() => {
        this.colors[color] = !this.colors[color];
      }, Math.random() * 12000 + 3500);
    }
  },
  mounted() {
    setTimeout(() => {
      this.loaded = true;
    }, 200);
  }
};
</script>

<style lang="scss">
.about-inner {
  @include container($max: 1200px);
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr 1fr;
  grid-template-areas:
    "c c"
    "p r"
    "s .";
  @media (min-width: $md) {
    grid-template-columns: 1fr 1fr 2fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      "p . c c"
      "r s c c";
  }
  &.loaded {
    .about-block {
      opacity: 1;
    }
  }
}

.about-content {
  grid-area: c;
  background: $white;
  position: relative;
  overflow: hidden;
  &::before,
  &::after {
    position: absolute;
    font-size: 1.5rem;
    font-weight: 700;
    color: darken($gray, 5%);
    font-family: $headings;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 2;
  }
  &::before {
    content: "() => {";
    top: 0;
    padding: 1.25rem 1.25rem 0.5rem;
    background: $white;
  }
  &::after {
    content: "}";
    font-family: $headings;
    bottom: 0;
    text-align: right;
    padding: 0.5rem 1.25rem 1.25rem;
    background: linear-gradient(to top, rgba($white, 1), rgba($white, 0.25));
  }
}

.about-content-scroller {
	padding: 4rem 1.5rem 2rem;
	@media (min-width: $sm) {
		padding: 4rem 3rem 2rem;
	}
  @media (min-width: $md) {
		padding: 4rem 4rem 3rem 3rem;
    overflow-y: scroll;
    position: absolute;
    top: 0;
    left: 0;
    right: -1rem;
    bottom: 0;
    height: 100%;
    max-height: 100%;
  }
  h3 {
    font-size: 2rem;
    font-weight: 500;
    margin: 0 0 1rem;
  }
  p {
		line-height: 1.6;
    margin: 0 0 1rem;
  }
}

.about-block {
  position: relative;
  opacity: 0;
  transition: opacity 0.5s ease;
  perspective: 1000px;
  &:nth-of-type(1) {
    grid-area: p;
  }
  &:nth-of-type(2) {
    grid-area: r;
  }
  &:nth-of-type(3) {
    grid-area: s;
  }
  &--purple {
    .block-face--front {
      background: $purple;
    }
    .block-face--back {
      background: $orange;
    }
  }
  &--red {
    .block-face--front {
      background: $red;
    }
    .block-face--back {
      background: $yellow;
    }
  }
  &--sky {
    .block-face--front {
      background: $sky;
    }
    .block-face--back {
      background: $green;
    }
  }
}

.block-flipper {
  transform-style: preserve-3d;
  width: 100%;
	position: relative;
  &::before {
    display: block;
    content: "";
		padding-top: 100%;
		pointer-events: none;
  }
  &.flipped {
    .block-face {
      &--front {
        transform: translateZ(1px) rotateY(180deg);
      }
      &--back {
        transform: translateZ(1px) rotateY(0deg);
      }
    }
  }
}

.block-face {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: transform 1.5s ease;
  transform: translateZ(1px) rotateY(0deg);
  transform-style: preserve-3d;
  backface-visibility: hidden;
  &--back {
    transform: translateZ(1px) rotateY(-180deg);
  }
}
</style>