// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import DefaultLayout from '~/layouts/Default.vue'
import VueMarkdown from 'vue-markdown'
import VueLazyload from 'vue-lazyload'
import smoothscroll from 'smoothscroll-polyfill'
import '~/assets/scss/1-destyle.css'
 

export default function (Vue, { router, head, isClient }) {
	Vue.use(VueLazyload)
	Vue.component('Layout', DefaultLayout)
	Vue.component('Markdown', VueMarkdown)
	if (process.isClient) {
		smoothscroll.polyfill();
	}
}
