<template lang="pug">
	section.hero(:class="{'is-hidden': hide}")
		canvas.hero-canvas
		.hero-inner
			.hero-bg
				app-hero-cell(
					v-for="item in 25",
					:key="item", 
					:item="item",
					:active_cells="active_cells")
			.hero-content
				app-hero-logo(:flipped="false")
</template>

<script>
import HeroLogo from "@/components/HeroLogo";
import HeroCell from "@/components/HeroCell";
import Canvas from "@/mixins/Canvas"

export default {
  name: "Hero",
  mixins: [Canvas],
  components: {
    appHeroLogo: HeroLogo,
    appHeroCell: HeroCell
  },
  data() {
    return {
      active_cells: [],
      inactive_cells: [],
      prevPercentScroll: 0,
      scrollStyle: {},
      hide: false
    };
  },
  methods: {
    flip() {
      const total = window.innerHeight * 0.6;
      const percentScroll =
        window.pageYOffset < total ? window.pageYOffset / total : 1;

      if (
        (percentScroll === 1 && this.prevPercentScroll === 1) ||
        percentScroll === this.prevPercentScroll
      )
        return;

      let from =
        percentScroll > this.prevPercentScroll ? "active_cells" : "inactive_cells";
      let to =
        percentScroll > this.prevPercentScroll ? "inactive_cells" : "active_cells";
      let multiplier =
        percentScroll > this.prevPercentScroll ? percentScroll : 1 - percentScroll;
      let moveTotal = Math.floor(
        (this.active_cells.length + this.inactive_cells.length) * multiplier
      );

      if (this[from].length) {
        while (this[to].length < moveTotal) {
          this[to].push(
            ...this[from].splice(
              Math.floor(Math.random() * this[from].length),
              1
            )
          );
        }
      }
      if (percentScroll > this.prevPercentScroll && !this.active_cells.length) {
        this.hide = true;
      } else if (percentScroll < this.prevPercentScroll) {
        this.hide = false;
      }
      this.prevPercentScroll = percentScroll;
    }
  },
  created() {
    let active_cells = [...Array(25).keys()].filter(
      key => ![1, 2, 6, 7].includes(key)
    );
    this.active_cells = active_cells.filter((item, i) =>
      Math.random() >= 0.65 ? false : true
    );
  },
  mounted() {
    if (process.isClient) this.flip();
    if (process.isClient) window.addEventListener("scroll", this.flip);
  }
};
</script>

<style lang="scss" scoped>
.hero {
  height: 100vh;
  width: 100vw;
  z-index: 10;
	margin: 0 0 -50px;
	position: relative;
  &.is-hidden {
    .hero-inner {
      transform: translateY(-130%) scale(1.3, 1.3);
    }
	}
	&::after {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 3rem;
		background: linear-gradient(to top, rgba($gray, 1), rgba($gray, 0));
		content: '';
		z-index: 9;
	}
}

.hero-canvas {
	position: absolute;
	left: 0;
	bottom: 0;
	right: 0;
	height: 40%;
	width: 100%;
	z-index: 8;
}

.hero-inner {
  background: $onyx;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vmax;
  width: 100vmax;
  max-width: 260vmin;
  transition: transform 1.5s ease;
  transform: translateY(0) scale(1, 1);
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.hero-bg,
.hero-content {
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(5, 1fr);
  z-index: 1;
  height: 100%;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  pointer-events: none;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.hero-content {
  grid-template-areas:
    "l l . . ."
    "l l . . ."
    ". . . . ."
    ". . . . ."
    ". . . . .";
}

.logo {
  position: relative;
  grid-area: l;
}
</style>