<template lang="pug">
	section.hero(:class="{'is-hidden': hide}")
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
      interval: null
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
    preventScroll() {
      window.scrollBy(
        0,
        document.querySelector(".scrollPoint").getBoundingClientRect().top
      );
      setTimeout(() => {
        clearInterval(this.interval);
      }, 900);
    },
    flip() {
      const total = window.innerHeight * 0.9;
      const percentScroll =
        window.pageYOffset < total ? window.pageYOffset / total : 1;

      if (
        (percentScroll === 1 && this.prevPercentScroll === 1) ||
        percentScroll === this.prevPercentScroll
      )
        return;

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
        this.interval = setInterval(this.preventScroll, 1);
      } else if (percentScroll < this.prevPercentScroll) {
        this.hide = false;
      }
      this.prevPercentScroll = percentScroll;
    }
  },
  created() {
		let active_cells = [1, 2, 3]
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
      Math.random() >= 0.65 ? false : true
    );
    this.all_cells = [...this.active_cells];
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
    content: "";
    z-index: 9;
  }
}

.hero-inner {
  background: $onyx;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 500vw;
  width: 100vw;
  transition: transform 1.5s ease;
  transform: translateY(0) scale(1, 1);
  z-index: 10;
  display: flex;
  flex-direction: column;
  @media (min-width: $sm) {
    height: 300vw;
    width: 100vw;
  }
  @media (min-width: $lg) {
    height: 200vw;
    width: 100vw;
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