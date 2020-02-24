<template lang="pug">
	section.hero(:class="{'is-hidden': hidden, 'is-loaded': loaded}")
		.hero-scroller(:style="{transform: scrollPush}") Scroll
		.hero-inner
			.hero-bg
				app-hero-cell(
					v-for="item in total",
					:key="item",
					:item="item",
					:active="active",
					:hidden="hidden",
					:all="all")
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
			loaded: false,
      all: [],
      active: [],
      inactive: [],
      last: 0,
      hidden: false,
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
      const top = window.pageYOffset;
      const height = window.innerHeight;
      const endPoint = height * 0.8;
      const scroll = top < endPoint ? top / endPoint : 1;

			const complete = scroll === 1 && this.last === 1;

      if (complete) {
        if (top < height * 1.5) {
          this.scrollPush = `translateY(${(top - endPoint) / 1.5}px)`;
        }
        return;
      }

      let from = scroll > this.last ? "active" : "inactive";
      let to = scroll > this.last ? "inactive" : "active";
      let perc = scroll > this.last ? scroll : 1 - scroll;

      let moveTotal = Math.floor((this[to].length + this[from].length) * perc);

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

      if (!this.active.length && !this.hidden) {
				this.hidden = scroll > this.last ? true : false;
      } else if (this.active.length && this.hidden) {
        this.hidden = false;
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }

      this.last = scroll;
    },
    initCells() {
      let cells = [...Array(this.total + 1).keys()];
      cells.shift();
      cells = cells.filter(cell => {
        if (this.media === "xs") return ![1, 2, 4, 5].includes(cell);
        if (this.media === "sm") return ![1, 2, 5, 6].includes(cell);
        if (this.media === "lg") return ![1, 2, 6, 7].includes(cell);
        if (this.media === "xl") return ![1, 2, 7, 8].includes(cell);
      });

      cells = cells.filter((item, i) => (Math.random() >= 0.8 ? false : true));
			this.all = [...cells];
			this.active = [...this.all]
      setTimeout(() => {
			this.flip();
			this.loaded = true;
			}, 500);
    }
  },
  created() {
    if (process.isClient) {
      this.initCells();
      window.addEventListener("scroll", this.flip);
    }
	},
	beforeDestroy() {
		if (process.isClient) window.removeEventListener("scroll", this.flip);
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
	transition: 0.25s ease;
	opacity: 0;
	pointer-events: none;
	&.is-loaded {
		opacity: 1;
		pointer-events: all;
	}
  &.is-hidden {
    .hero-inner {
      transform: translateY(-100%);
      transition: transform 1.5s ease;
    }
    .hero-scroller {
      opacity: 0.8;
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
  transition: opacity 0.75s ease;
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
  pointer-events: none;
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
  pointer-events: all;
}
</style>