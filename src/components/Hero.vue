<template lang="pug">
	section.hero(:class="{'is-hidden': hide}")
		.hero-scroller(:style="scrollPush") Scroll
		.hero-inner
			.hero-bg
				app-hero-cell(
					v-for="item in total",
					:key="item", 
					:item="item",
					:active_cells="active_cells",
					:all_cells="all_cells")
			.hero-content
				app-hero-logo
</template>

<script>
import HeroLogo from "@/components/HeroLogo";
import HeroCell from "@/components/HeroCell";
import Media from "@/mixins/Media";

export default {
  name: "Hero",
  mixins: [Media],
  components: {
    appHeroLogo: HeroLogo,
    appHeroCell: HeroCell
  },
  data() {
    return {
      active_cells: [],
      inactive_cells: [],
      all_cells: [],
      prevPercentScroll: 0,
      hide: false,
      scrollPush: null
    };
  },
  computed: {
    total() {
      if (this.media === "xs") return 45;
      if (this.media === "sm") return 48;
      if (this.media === "lg") return 50;
      if (this.media === "xl") return 72;
    }
  },
  methods: {
    flip() {
      const total = window.innerHeight * 0.8;
      const percentScroll =
        window.pageYOffset < total ? window.pageYOffset / total : 1;

      const complete = percentScroll === 1 && this.prevPercentScroll === 1;
      const noChange = percentScroll === this.prevPercentScroll;

      if (complete || noChange) {
        if (window.pageYOffset < window.innerHeight * 1.5) {
          this.scrollPush = `transform: translateY(${(window.pageYOffset -
            window.innerHeight * 0.8) /
            1.5}px)`;
        }
        return;
      }

      let from =
        percentScroll > this.prevPercentScroll
          ? "active_cells"
          : "inactive_cells";
      let to =
        percentScroll > this.prevPercentScroll
          ? "inactive_cells"
          : "active_cells";
      let multiplier =
        percentScroll > this.prevPercentScroll
          ? percentScroll
          : 1 - percentScroll;
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
      if (
        percentScroll > this.prevPercentScroll &&
        !this.active_cells.length &&
        !this.hide
      ) {
        this.hide = true;
      } else if (percentScroll < this.prevPercentScroll) {
        this.hide = false;
      }
      this.prevPercentScroll = percentScroll;
    },
    initCells() {
      let active_cells = [1, 2, 3];
      if (process.isClient) {
        active_cells = [...Array(this.total + 1).keys()];
        active_cells.shift();
        active_cells = active_cells.filter(cell => {
          if (this.media === "xs") return ![1, 2, 4, 5].includes(cell);
          if (this.media === "sm") return ![1, 2, 5, 6].includes(cell);
          if (this.media === "lg") return ![1, 2, 6, 7].includes(cell);
          if (this.media === "xl") return ![1, 2, 7, 8].includes(cell);
        });
      }

      this.active_cells = active_cells.filter((item, i) =>
        Math.random() >= 0.8 ? false : true
      );
      this.all_cells = [...this.active_cells];
    }
  },
  created() {
    this.initCells();
    if (process.isClient) this.flip();
    if (process.isClient) window.addEventListener("scroll", this.flip);
	}
};
</script>

<style lang="scss" scoped>
.hero {
  z-index: 10;
  margin: 0 0 -50px;
  position: relative;
  width: 100vw;
  height: 180vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  &.is-hidden {
    .hero-inner {
      transform: translateY(-100%);
    }
    .hero-scroller {
      opacity: 0.8;
      transition: opacity 0.75s ease;
    }
  }
}

@keyframes pulse {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.35;
  }
}

.hero-scroller {
  color: rgba($white, 0.5);
  font-size: 0.875rem;
  text-transform: lowercase;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  margin-bottom: 50vh;
  transition: opacity 0.5s ease;
  will-change: transform, opacity;
  letter-spacing: 1px;
  &::before,
  &::after {
    height: 0.75rem;
    width: 0.75rem;
    border-top: 2px solid;
    border-right: 2px solid;
    content: "";
    transform: rotate(-45deg);
    animation: pulse 1s linear alternate infinite;
  }
  &::after {
    transform: rotate(135deg);
    animation-delay: 0.35s;
    animation-duration: 1.3s;
  }
}

.hero-inner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  transition: transform 1.5s ease;
  will-change: transform;
  transform: translateY(0);
  z-index: 10;
  display: flex;
  flex-direction: column;
  height: 500vw;
  @media (min-width: $sm) {
    height: 300vw;
  }
  @media (min-width: $lg) {
    height: 200vw;
  }
}

.hero-bg,
.hero-content {
  display: grid;
  grid-template-rows: repeat(15, 1fr);
  grid-template-columns: repeat(3, 1fr);
  z-index: 1;
  height: 100%;
  padding: 20px;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  @media (min-width: $sm) {
    grid-template-rows: repeat(12, 1fr);
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: $lg) {
    grid-template-rows: repeat(10, 1fr);
    grid-template-columns: repeat(5, 1fr);
  }
  @media (min-width: $xl) {
    grid-template-rows: repeat(12, 1fr);
    grid-template-columns: repeat(6, 1fr);
  }
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}
</style>