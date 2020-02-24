<template lang="pug">
	section#contact.contact
		.contact-content
			.contact-info
				p.contact-infoCopy {{title}}
			
		.contact-items
			a.contact-item(
				v-for="contact in contacts"
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
    return {};
  },
  computed: {
    title() {
      return this.$static.contact.edges[0].node.title;
    },
    contacts() {
      return this.$static.contact.edges[0].node.contacts;
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
  @include container;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: $lg) {
    flex-direction: row;
  }
}

.contact-content {
	@include code('contact', 'platforms', lighten($onyx, 2%));
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
    flex: 0 1 50%;
  }
}

.contact-info {
  width: auto;
  padding: 1rem 2.5rem;
	display: flex;
	align-items: center;
  @media (min-width: $lg) {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
	}
}

.contact-infoCopy {
	font-size: 1.125rem;
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
		background: $slate;
    transition: 0.25s ease;
  }
  @media (min-width: $lg) {
    flex: 0 0 calc(25% - 20px);
    width: calc(25% - 20px);
    padding: 20px;
	}
	@each $color in $palette {
		&:nth-child(#{length($palette)}n-#{length($palette) - index($palette, $color)}) {
			background: $color;
			.contact-inner {
				color: choose-contrast-color($color);
			}
		}
	}
	&:hover {
		&::after {
			right: 0;
			bottom: 0;
		}
		.contact-inner {
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
  transition: 0.3875s ease;
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