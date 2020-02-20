<template lang='pug'>
	.hero-cell(:class="{flipped}")
		.cell-flipper(:style="{transitionDelay}")
			.cell-face.cell-face--front
				.cell-fill(:style="style")
			.cell-face.cell-face--back
</template>

<script>
export default {
  name: "HeroCell",
  props: ["item", "active_cells"],
  data() {
    return {
      colors: [
        "#ed4939",
        "#f87117",
        "#adc607",
        "#016FB9",
        "#f4c10d"
      ],
      style: {}
    };
  },
  computed: {
		flipped() {
			return !this.active_cells.includes(this.item)
		},
    transitionDelay() {
      if (this.active_cells.indexOf(this.item)) {
        return `${this.active_cells.indexOf(this.item) * 0.05 * 1000}ms`;
      }
      return "0ms";
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
  @for $n from 1 through 25 {
    @if $c > 5 {
      $c: 1;
      $r: $r + 1;
    }
    @if $r > 5 {
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