<template lang="pug">
	section.sectionHead
		.secttionHead-parallax(:style="style")
		.sectionHead-content
			h1.sectionHead-main {{$static.banner.edges[0].node.main}}
			h4.sectionHead-super {{$static.banner.edges[0].node.super}}
			h4.sectionHead-sub {{$static.banner.edges[0].node.sub}}
</template>

<static-query>
query Banner {
	banner: allMainBanner {
		edges {
			node {
				super
				main
				sub
				image
			}
		}
	}
}
</static-query>

<script>
import Parallax from "@/mixins/Parallax";
export default {
  name: "Banner",
  mixins: [Parallax],
  computed: {
		style() {
			return {
				...this.background,
				...this.transform
			}
		},
    background() {
      return {
        "background-image": `url(${this.$static.banner.edges[0].node.image})`
      };
    }
  },
  methods: {
    log(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="scss" scoped>
.sectionHead {
  position: relative;
  display: flex;
  align-items: flex-end;
  height: 100vh;
  padding: 110px 0 60px;
  box-shadow: inset 0 -8px 8px -8px rgba(0, 0, 0, 0.5);
  overflow: hidden;
	z-index: 1;
  @media (min-width: 641px) {
    align-items: center;
    justify-content: center;
    padding: 110px 0;
  }
}

.secttionHead-parallax {
  position: absolute;
  top: -500px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(100% + 500px);
  background-position: 50% 50%;
  background-size: cover;
	will-change: transform;
	z-index: -1;
}

.sectionHead-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 20px;
  @media (min-width: 641px) {
    width: auto;
  }
}

.sectionHead-main,
.sectionHead-super,
.sectionHead-sub {
  position: relative;
  padding: 0;
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
}

.sectionHead-main {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  order: 2;
  margin: 5px 0;
  white-space: nowrap;
  font-size: 30px;
  &:before,
  &:after {
    position: relative;
    top: 3px;
    flex-shrink: 1;
    width: 50px;
    height: 3px;
    content: "";
    background: #fff;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    @media (min-width: 641px) {
      width: 70px;
      height: 5px;
    }
  }
  &:before {
    margin-right: 10px;
  }
  &:after {
    margin-left: 10px;
  }
  @media (min-width: 641px) {
    margin: 10px 0;
    font-size: 40px;
  }
}

.sectionHead-super,
.sectionHead-sub {
  margin: 0;
  font-weight: 300;
}

.sectionHead-super {
  order: 1;
  font-size: 18px;
  @media (min-width: 641px) {
    font-size: 25px;
  }
}

.sectionHead-sub {
  order: 3;
  font-size: 14px;
  @media (min-width: 641px) {
    font-size: 20px;
  }
}
</style>