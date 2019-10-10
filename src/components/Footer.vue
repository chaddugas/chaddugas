<template lang="pug">
footer.footerMain
	.contained
		.row
			.column.med-12
				p 
					| Copyright © 
					span {{ year }} 
					| Chad Dugas
</template>

<script>
export default {
	name: "Footer",
	props: {set: Function},
	data() {
		return {
			year: new Date().getFullYear()
		}
	},
	methods: {
		set_height() {
			this.set('offset_footer', `${this.$el.offsetHeight}px`)
		},
		add_events() {
			window.addEventListener('resize', this.set_height)
			window.addEventListener('orientationchange', this.set_height)
		},
		remove_events() {
			window.removeEventListener('resize', this.set_height)
			window.removeEventListener('orientationchange', this.set_height)
		}
	},
	mounted() {
		this.set_height()
		this.add_events()
	},
	beforeDestroy() {
		this.remove_events()
	}
}
</script>