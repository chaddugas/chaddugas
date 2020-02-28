<template lang="pug">
header.logo
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
  name: "HeroLogo"
};
</script>

<style lang="scss">
.logo {
	position: relative;
	font-family: $headings;
  grid-area: 1 / 1 / 3 / 3;
  background: $slate;
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
	
	&::selection,
	*::selection {
		background: transparent;
		color: inherit;
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
  padding: .875rem;
  transition: opacity 0.4s 0.4s ease;
  text-align: right;
  @media (min-width: $md) {
    padding: 3rem;
  }
}

@keyframes blink {
  0% {
    background: darken($white, 15%);
    color: $slate;
  }
  45% {
    background: darken($white, 15%);
    color: $slate;
  }
  55% {
    background: transparent;
    color: darken($white, 15%);
  }
  100% {
    background: transparent;
    color: darken($white, 15%);
  }
}

.logo-name {
  @include fluid-type(600px, 1450px, 22px, 56px);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  white-space: nowrap;
  color: $white;
  line-height: 1;
	text-transform: uppercase;
	margin-top: auto;
  margin-bottom: 0.5rem;
  @media (min-width: $sm) {
    margin-bottom: 1rem;
  }
}

.logo-title {
  @include fluid-type(600px, 1450px, 16px, 28px);
  text-transform: lowercase;
	margin-bottom: 1rem;
	color: darken($white, 15%);
  @media (min-width: $sm) {
    margin-bottom: 2rem;
  }
  span {
    &:first-child {
      margin-right: 1rem;
    }
    &:last-child {
      background: darken($white, 15%);
      animation: blink 0.75s alternate infinite;
    }
  }
}

.logo-icons {
  @include fluid-type(400px, 2000px, 18px, 60px);
  display: flex;
  color: lighten($slate, 45%);
  justify-content: flex-end;
  align-items: flex-start;
	margin: 0 -0.3875rem;
	opacity: 0.3;
	svg,
	i {
    margin: 0 0.3875rem;
  }
  @media (min-width: $sm) {
    margin: 0 -0.75rem;
		svg,
		i {
      margin: 0 0.75rem;
    }
  }
}
</style>