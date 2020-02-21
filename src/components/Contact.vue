<template lang="pug">
	section#contact.contact
		transition-group.contact-content(name="fade", tag="div")
			Markdown.contact-wysiwyg(:class="{hidden: active}", :key="'wysiwyg'") {{ main }}
			.contact-info(v-if="active", :key="'info'") 
				h3.contact-infoName {{heading}}
				p.contact-infoCopy {{content}}
			
		.contact-items
			a.contact-item(
				v-for="contact in contacts"
				@mouseover="setContent(contact)",
				@mouseleave="active = false",
				:href="contact.link",
				target="_blank")
				.contact-inner
					span.contact-logo
						i(:class="contact.logo")
					span.contact-name {{contact.title}}
</template>

<script>
export default {
  name: "Contact",
  data() {
    return {
      active: false,
      active_item: null
    };
  },
  computed: {
    heading() {
      return this.active_item.title;
    },
    content() {
      return this.active_item.info;
    },
    main() {
      return this.$static.contact.edges[0].node.title;
    },
    contacts() {
      return this.$static.contact.edges[0].node.contacts;
    }
  },
  methods: {
    setContent(item) {
      this.active_item = item;
      this.active = true;
    }
  }
};
</script>

<static-query>
query {
  contact: allContact {
    edges {
      node {
				title
        contacts {
					logo
          title
          info 
					link
        }
      }
    }
  }
}
</static-query>

<style lang="scss">
.contact-wysiwyg {
	h1 {
		font-size: 1.75rem !important;
	}
  * {
		font-family: $headings !important;
		font-weight: 400 !important;
		color: $white !important;
		margin-bottom: 1rem !important;
    &:last-child {
      margin-bottom: 0 !important;
    }
  }
}
</style>

<style lang="scss" scoped>
.contact {
  @include container($max: 1200px);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: $lg) {
    flex-direction: row;
  }
}

.contact-content {
	display: flex;
  background: lighten($onyx, 2%);
  align-self: stretch;
  position: relative;
  margin-bottom: 20px;
  min-height: 150px;
  z-index: 1;
  @media (min-width: $lg) {
    margin-right: 20px;
    margin-bottom: 0;
    flex: 0 1 450px;
  }
}

.contact-info,
.contact-wysiwyg {
  width: 100%;
  pointer-events: none;
  padding: 1rem 2.5rem;
	color: $white;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.contact-wysiwyg {
  opacity: 1;
  transition: opacity 0.25s;
  font-size: 1rem;
  &.hidden {
    opacity: 0;
  }
}

.contact-info {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: auto;
}

.contact-infoName {
  font-size: 1.75rem;
  font-weight: 400;
  font-family: $headings;
  margin-bottom: 1rem;
}

.contact-items {
  display: flex;
  flex-wrap: wrap;
  z-index: 1;
  width: calc(100% + 20px);
  margin: 0 -10px -20px;
  @media (min-width: $lg) {
    flex: 1 1 100%;
  }
}

.contact-item {
  flex: 0 0 calc(50% - 20px);
  width: calc(50% - 20px);
	margin: 0 10px 20px;
	background: lighten($onyx, 2%);
  transition: 0.25s ease;
  cursor: pointer;
  position: relative;
  padding: 15px;
  z-index: 1;
  &::before {
    content: "";
    position: relative;
    padding-top: 100%;
    display: block;
    pointer-events: none;
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 100%;
    z-index: -1;
		content: "";
		background: currentColor;
    transition: 0.25s ease;
  }
  @media (min-width: $lg) {
    flex: 0 0 calc(25% - 20px);
    width: calc(25% - 20px);
    padding: 20px;
  }
  &:nth-child(4n-3) {
		color: $purple;
  }
  &:nth-child(4n-2) {
		color: $orange;
  }
  &:nth-child(4n-1) {
		color: $sky;
  }
  &:nth-child(4n) {
		color: $red;
  }
	&:hover {
		&::after {
			right: 0;
			bottom: 0;
		}
		.contact-logo {
			color: $white;
		}
	}
}

.contact-inner {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
	display: flex;
	color: inherit;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
}

.contact-logo {
  font-size: 38px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: $headings;
  line-height: 1;
  margin-bottom: 5px;
  width: 100%;
  text-align: center;
  transition: 0.25s ease;
  @media (min-width: $md) {
    font-size: 50px;
  }
}

.contact-name {
  font-weight: 700;
  text-align: center;
  font-size: 0.75rem;
  color: $white;
  transition: 0.25s ease;
  width: 100%;
  @media (min-width: $md) {
    font-size: 1rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>