<template lang="pug">
	Layout
		main(@click="closeAll")
			app-hero
			.scrollPoint
			app-projects
			app-about
			app-contact
</template>

<script>
import Hero from "@/components/Hero"
import About from "@/components/About"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"

import { ProjectBus } from "@/EventBus.js";
export default {
	name: "Home",
  components: {
    appHero: Hero,
    appAbout: About,
    appProjects: Projects,
    appContact: Contact,
	},
	methods: {
		closeAll() {
      ProjectBus.$emit("toggled", this.$el);
		}
	}
};
</script>

<style lang="scss" scoped>

.scrollPoint {
	scroll-snap-align: start;
	scroll-snap-stop: always;
}
</style>
