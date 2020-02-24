<template lang='pug'>
	.hero-cell(:class="{flipped}")
		.cell-flipper(v-if="live")
			.cell-face.cell-face--front(:style="{transitionDelay}")
				.cell-fill(:style="style")
			.cell-face.cell-face--back(:style="{transitionDelay}")
</template>

<script>
export default {
  name: "HeroCell",
  props: ["item", "active", "all", "hidden"],
  data() {
    return {
      colors: JSON.parse(getComputedStyle(document.body).getPropertyValue('--palette')),
      style: {},
      transitionDelay: "0ms"
    };
  },
  computed: {
    live() {
      return this.all.includes(this.item);
    },
    flipped() {
      if (!this.live) return false;
      return !this.active.includes(this.item);
    }
  },
  watch: {
    hidden(to, from) {
      if (from) {
        this.transitionDelay = `${Math.floor(Math.random() * 750)}ms`;
      } else this.transitionDelay = "0ms";
    }
  },
  created() {
    this.style = {
      background: this.colors[Math.floor(Math.random() * this.colors.length)]
    };
  }
};
</script>

<style lang='scss' scoped>
.hero-cell {
  position: relative;
  display: flex;
  perspective: 1000px;
  $r: 1;
  $c: 1;
  @for $n from 1 through 45 {
    @if $c > 3 {
      $c: 1;
      $r: $r + 1;
    }
    @if $r > 15 {
      $r: 1;
    }
    &:nth-child(#{$n}) {
      grid-row-start: #{$r};
      grid-row-end: #{$r + 1};
      grid-column-start: #{$c};
      grid-column-end: #{$c + 1};
    }
    $c: $c + 1;
  }
  $r: 1;
  $c: 1;
  @media (min-width: $sm) {
    @for $n from 1 through 48 {
      @if $c > 4 {
        $c: 1;
        $r: $r + 1;
      }
      @if $r > 12 {
        $r: 1;
      }
      &:nth-child(#{$n}) {
        grid-row-start: #{$r};
        grid-row-end: #{$r + 1};
        grid-column-start: #{$c};
        grid-column-end: #{$c + 1};
      }
      $c: $c + 1;
    }
  }
  $r: 1;
  $c: 1;
  @media (min-width: $lg) {
    @for $n from 1 through 50 {
      @if $c > 5 {
        $c: 1;
        $r: $r + 1;
      }
      @if $r > 10 {
        $r: 1;
      }
      &:nth-child(#{$n}) {
        grid-row-start: #{$r};
        grid-row-end: #{$r + 1};
        grid-column-start: #{$c};
        grid-column-end: #{$c + 1};
      }
      $c: $c + 1;
    }
  }
  $r: 1;
  $c: 1;
  @media (min-width: $xl) {
    @for $n from 1 through 72 {
      @if $c > 6 {
        $c: 1;
        $r: $r + 1;
      }
      @if $r > 12 {
        $r: 1;
      }
      &:nth-child(#{$n}) {
        grid-row-start: #{$r};
        grid-row-end: #{$r + 1};
        grid-column-start: #{$c};
        grid-column-end: #{$c + 1};
      }
      $c: $c + 1;
    }
  }
}

.cell-flipper {
  transform-style: preserve-3d;
  height: 100%;
  width: 100%;
  position: relative;
  .flipped & {
    .cell-face {
      &--front {
        opacity: 0;
        transform: translateZ(1px) rotateY(180deg);
      }
      &--back {
        opacity: 1;
        transform: translateZ(1px) rotateY(0deg);
      }
    }
  }
}

.cell-face {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: opacity 0.4s ease, transform 0.8s ease;
  transform: translateZ(1px) rotateY(0deg);
  opacity: 1;
  transform-style: preserve-3d;
  &--back {
    transform: translateZ(1px) rotateY(-180deg);
    opacity: 0;
  }
}

.cell-fill {
  width: 100%;
}
</style>