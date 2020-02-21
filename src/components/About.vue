<template lang="pug">
	section#about.about
		.about-inner(:class="{loaded: loaded}")
			.about-content
				.about-content-scroller
					h3 {{title}}
					Markdown {{ content }}
			a.about-file(:href="file", target="_blank")
				.about-file-inner
					i.fas.fa-check-double
					span My Resume
			span.about-block(
				v-for="cell in Object.keys(cells)",
				@transitionend.self.once="startInterval(cell)")
				.block-flipper(:class="{flipped: cells[cell]}")
					.block-face.block-face--front(:style="{background: colorAssignment[cell][0]}")
					.block-face.block-face--back(:style="{background: colorAssignment[cell][1]}")
</template>

<script>
import ID from "@/mixins/ID";
export default {
  name: "About",
  mixins: [ID],
  data() {
    return {
      loaded: false,
      cells: {0:true, 1:true},
      colorPalette: ["#7b3dba", "#ed4939", "#f87117", "#adc607", "#016FB9", "#f4c10d"],
      colorAssignment: []
    };
  },
  computed: {
    title() {
      return this.$static.about.edges[0].node.title;
    },
    content() {
      return this.$static.about.edges[0].node.content;
    },
    file() {
      return this.$static.about.edges[0].node.file;
    }
  },
  methods: {
    startInterval(i) {
      setInterval(() => {
        this.cells[i] = !this.cells[i];
      }, (Math.random() * 12000) + 3500);
    }
  },
  created() {
    let i = 0;
    while (i++ < 3) {
      this.colorAssignment.push([
        ...this.colorPalette.splice(Math.floor(Math.random() * this.colorPalette.length), 1),
        ...this.colorPalette.splice(Math.floor(Math.random() * this.colorPalette.length), 1)
      ]);
    }
  },
  mounted() {
    setTimeout(() => {
      this.loaded = true;
    }, 200);
  }
};
</script>

<static-query>
query {
  about: allAbout {
    edges {
      node {
				title
				content,
				file
      }
    }
  }
}
</static-query>

<style lang="scss">
.about-inner {
  @include container($max: 1200px);
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr 1fr;
  grid-template-areas:
    "c c"
    "c_1 f"
    "c_2 c_3";
  @media (min-width: $md) {
    grid-template-columns: 1fr 1fr 2fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      "c_1 f c c"
      "c_3 c_2 c c";
  }
  &.loaded {
    .about-block {
      opacity: 1;
    }
  }
}

.about-content {
  grid-area: c;
  background: lighten($onyx, 2%);
  position: relative;
  overflow: hidden;
  &::before,
  &::after {
    position: absolute;
    font-size: 1.5rem;
    font-weight: 700;
    color: lighten($onyx, 18%);
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
    background: lighten($onyx, 2%);
  }
  &::after {
    content: "}";
    font-family: $headings;
    bottom: 0;
    text-align: right;
    padding: 1rem 1.25rem 1.25rem;
    background: linear-gradient(to top, rgba(lighten($onyx, 2%), 1), rgba(lighten($onyx, 2%), 0.85) 50%, rgba(lighten($onyx, 2%), 0.1));
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
  *:last-child {
    margin-bottom: 0;
  }
}

.about-file {
  position: relative;
  grid-area: f;
	background: lighten($onyx, 10%);
  transition: 0.25s ease;
  &::before {
    display: block;
    content: "";
    padding-top: 100%;
    pointer-events: none;
  }
  &:hover {
    color: $yellow;
  }
}

.about-file-inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  i {
    margin-bottom: 1.25rem;
    font-size: 3.25rem;
  }
  span {
    font-size: 1.25;
  }
}

.about-block {
  position: relative;
  opacity: 0;
  transition: opacity 0.5s ease;
  perspective: 1000px;
  &:nth-of-type(1) {
    grid-area: c_1;
  }
  &:nth-of-type(2) {
    grid-area: c_2;
  }
  &:nth-of-type(3) {
    grid-area: c_3;
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