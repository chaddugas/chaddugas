<template lang="pug">
	header.headerMain
		.header-mainContainer
			.headerMain-logo
				img.logo-full(src='@/assets/images/logo.svg')
				img.logo-empty(src='@/assets/images/logo-empty.svg')
			.headerMain-nav
				nav.navMain
					ul
						li(
							v-for="item in $static.nav.edges",
							:class="{'has-children': item.node.subs.length}")
							a(:href='item.node.link') {{ item.node.title }}
								span
							ul(v-if="item.node.subs.length")
								li(v-for="sub in item.node.subs")
									a(:href="sub.link" target='_blank')
										i(:class="sub.icon")
				.headerMain-mobileToggle.icon-menu
</template>

<static-query>
query Nav {
	nav: allMainNav(sortBy: "order") {
		edges {
			node {
				title
				link
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
    return {};
  },
  methods: {
    navigate() {}
  }
};
</script>

<style lang="scss" scoped>
</style>