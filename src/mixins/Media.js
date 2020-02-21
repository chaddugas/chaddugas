//not being used, but saving file because it might be helpful later
export default {
	data() {
		return {
			media: null,
			isTouchDevice: false,
      mediaSm: process.isClient
        ? window.matchMedia("(min-width: 650px)")
        : null,
			mediaLg: process.isClient
				? window.matchMedia("(min-width: 1100px)")
				: null,
			mediaXl: process.isClient
				? window.matchMedia("(min-width: 1400px)")
				: null
		}
	},
  methods: {
    checkMedia() {
      if (this.mediaXl.matches) {
				this.media = "xl";
			}
			else if (this.mediaLg.matches) {
				this.media = "lg";
      } else if (this.mediaSm.matches) {
        this.media = "sm";
      } else {
        this.media = "xs";
      }
    }
	},
	created() {
    if (process.isClient) this.checkMedia();
    if (process.isClient) {
			try {
				document.createEvent("TouchEvent");
				this.isTouchDevice = true
			} catch { this.isTouchDevice = false }
		}
	},
  mounted() {
    if (process.isClient) this.mediaXl.addListener(this.checkMedia);
    if (process.isClient) this.mediaLg.addListener(this.checkMedia);
    if (process.isClient) this.mediaSm.addListener(this.checkMedia);
  }
}