<template lang="pug">
	header.headerMain(:class="{'js-header-fixed': fixed}")
		.header-mainContainer
			.headerMain-logo(@click="navigate(false)")
				img.logo-full(src='@/assets/images/logo.svg')
				img.logo-empty(src='@/assets/images/logo-empty.svg')
			.headerMain-nav
				nav.navMain
					ul
						li(
							v-for="item in $static.nav.edges",
							:class="{'has-children': item.node.subs.length}")
							a(@click='navigate(item.node.link)') {{ item.node.title }}
								span
							ul(v-if="item.node.subs.length")
								li(v-for="sub in item.node.subs")
									a(:href="sub.link" target='_blank')
										i(:class="sub.icon")
				.headerMain-mobileToggle.icon-menu
</template>

<static-query>
query Nav {
	nav: allMainNav(sortBy: "order", order: ASC) {
		edges {
			node {
				title
				link
				order
				subs {
					link
					icon
				}
			}
		}
	}
}
</static-query>

<script>
export default {
  name: "Header",
  data() {
    return {
			fixed: false,
		};
  },
  methods: {
		stick() {
			this.fixed = window.scrollY > 60 ? true : false
		},
		navigate(dest) {
			let top = window.scrollY * -1
			if (dest) {
				top = document.querySelector(dest).getBoundingClientRect().top - this.$el.offsetHeight
			}
			window.scrollBy({
				top,
				behavior: "smooth"
			})
		},
		add_events() {
			window.addEventListener('scroll', this.stick)
		},
		remove_events() {
			window.removeEventListener('scroll', this.stick)
		}
	},
	mounted() {
		this.stick()
		this.add_events()
	},
	beforeDestroy() {
		this.remove_events()
	}
};
</script>

<style lang="scss" scoped>
</style>