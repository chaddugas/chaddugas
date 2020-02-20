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
	* {
		&:last-child {
			margin-bottom: 0;
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
  background: $white;
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
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 10%;
    right: 40%;
    z-index: -1;
    background-image: linear-gradient(
      to bottom right,
      rgba($gray, 0.35),
      rgba($gray, 0.35) 50%,
      transparent 50%,
      transparent
    );
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0%;
    bottom: 40%;
    right: 0;
    z-index: -1;
    background-image: linear-gradient(
      to bottom left,
      rgba($gray, 0.35),
      rgba($gray, 0.35) 50%,
      transparent 50%,
      transparent
    );
  }
}

.contact-info,
.contact-wysiwyg {
  width: 100%;
  pointer-events: none;
  padding: 25px;
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
  font-size: 24px;
  font-weight: 700;
  font-family: $headings;
  color: $onyx;
  margin-bottom: 10px;
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
  background: $white;
  transition: 0.25s ease;
  cursor: pointer;
  position: relative;
  padding: 15px;
  &::before {
    content: "";
    position: relative;
    padding-top: 100%;
    display: block;
  }
  &::after {
    position: absolute;
    top: -2.5px;
    left: -2.5px;
    right: -2.5px;
    bottom: -2.5px;
    z-index: -1;
    content: "";
  }
  @media (min-width: $lg) {
    flex: 0 0 calc(25% - 20px);
    width: calc(25% - 20px);
    padding: 20px;
  }
  &:hover {
    box-shadow: 0 0 3px 1px rgba($black, 0.08), 0 0 20px rgba($black, 0.05);
    transform: scale(1.035, 1.035);
  }
  &:nth-child(4n-3) {
    .contact-logo {
      color: $purple;
    }
  }
  &:nth-child(4n-2) {
    .contact-logo {
      color: $onyx;
    }
  }
  &:nth-child(4n-1) {
    .contact-logo {
      color: $sky;
    }
  }
  &:nth-child(4n) {
    .contact-logo {
      color: $red;
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
  @media (min-width: $md) {
    font-size: 50px;
  }
}

.contact-name {
  font-weight: 700;
  text-align: center;
  font-size: 0.75rem;
  color: $onyx;
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