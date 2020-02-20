<template lang="pug">
header.logo(:class="{'is-flipped': flipped}")
	.logo-inner
		h1.logo-name Chad Dugas
		h2.logo-title
			span >
			| Senior Front-end Enginee#[span r]
		.logo-icons
			i.fab.fa-html5
			i.fab.fa-css3
			i.fab.fa-js-square
			i.fab.fa-vuejs
			i.fab.fa-node-js
</template>

<script>
export default {
	name: "HeroLogo",
	props: ["flipped"]
};
</script>

<style lang="scss">
.logo {
	background: $purple;
	transition: 0.25s ease;
  transition: opacity 0.6s ease, transform 0.8s ease;
  transform: translateZ(1px) rotateY(0deg);
  opacity: 1;
	transform-style: preserve-3d;
	&.is-flipped {
		opacity: 0;
		transform: translateZ(1px) rotateY(180deg);
		.logo-inner {
			opacity: 0;
			transition: opacity 0.4s ease;
		}
	}
}

.logo-inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.5rem;
  transition: opacity 0.4s 0.4s ease;
	text-align: right;
	color: $white;
  @media (min-width: $md) {
    padding: 3rem;
  }
}

@keyframes blink {
  0% {
    background: $white;
    color: $purple;
  }
  45% {
    background: $white;
    color: $purple;
  }
  55% {
    background: transparent;
    color: $white;
  }
  100% {
    background: transparent;
    color: $white;
  }
}

.logo-name {
  @include fluid-type(600px, 1450px, 28px, 56px);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  white-space: nowrap;
  color: $white;
  line-height: 1;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.logo-title {
  @include fluid-type(600px, 1450px, 18px, 28px);
  margin-bottom: 2rem;
	text-transform: lowercase;
  span {
    &:first-child {
      margin-right: 1rem;
    }
    &:last-child {
      background: $white;
      animation: blink 0.75s alternate infinite;
    }
  }
}

.logo-icons {
  @include fluid-type(600px, 1450px, 20px, 36px);
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  margin: 0 -0.5rem;
  i {
    margin: 0 0.5rem;
  }
}
</style>