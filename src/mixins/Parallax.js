export default {
	data() {
		return {
			p_distance: 300,
			p_start: 0,
			p_end: 0,
			p_state: 'translateY(0)',
			p_o_state: 1
		}
	},
	computed: {
		p_transform() {
			return { 'transform': this.p_state, 'opacity': this.p_o_state }
		}
	},
	methods: {
		p_update() {
			this.p_start = this.$el.offsetTop
			this.p_end = this.$el.offsetHeight * -1
		},
		p_move() {
			let client = process.isClient
			let desktop = window.matchMedia("(min-width: 850px)").matches
			let visibleRatio = window.innerHeight > window.innerWidth * .8
			let safeSize = window.matchMedia("(min-width: 1190px)").matches && window.matchMedia("(min-height: 1190px)").matches
			let top = this.$el.getBoundingClientRect().top
			let move = 0

			if (client && desktop && (visibleRatio || safeSize)) move = this.between(top, this.p_start, this.p_end) * this.p_distance

			move = move > this.p_distance ? this.p_distance : move

			this.p_o_state = 1 - (move/this.p_distance)
			this.p_state = `translateY(-${move}px)`
		},
		between(val, min, max, percent = false) {
			let upper = val - min;
			let lower = max - min;
			let result = (upper / lower);

			if (percent) {
				result = result * 100;
			}

			result = parseFloat(result.toFixed(8));

			return result;
		}
	},
	mounted() {
		if (process.isClient) {
			window.addEventListener('scroll', this.p_move)
			window.addEventListener('resize', this.p_update)
			window.addEventListener('orientationchange', this.p_update)
			this.p_update()
			this.p_move()
		}
	},
	beforeDestroy() {
		if (process.isClient) {
			window.removeEventListener('scroll', this.p_move)
			window.removeEventListener('resize', this.p_update)
			window.removeEventListener('orientationchange', this.p_update)
		}
	}
}