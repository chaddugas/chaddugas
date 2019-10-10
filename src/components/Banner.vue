<template lang="pug">
section.sectionHead(style="{backgroundImage: $static.banner[0].node.image}")
	.sectionhead-content
		h1 $static.banner[0].node.main
		h2 $static.banner[0].node.super
		h2 $static.banner[0].node.sub
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
export default {
	
}
</script>