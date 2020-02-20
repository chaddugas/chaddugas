<template lang="pug">
	Layout
		main
			app-hero
			app-projects
			app-about
			app-contact
</template>

<script>
import Hero from "@/components/Hero"
import About from "@/components/About"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
export default {
	name: "Home",
  components: {
    appHero: Hero,
    appAbout: About,
    appProjects: Projects,
    appContact: Contact,
  }
};
</script>

<style lang="scss" scoped>

.scrollPoint {
	scroll-snap-align: start;
	scroll-snap-stop: always;
}
</style>
