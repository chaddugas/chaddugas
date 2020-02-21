export default {
	data() {
		return {
			c_color: 'rgba(123, 61, 186, 0.3)',
			c_lineWidth: .2,
			c_wrapper: null,
			c_canvas: null,
			c_ctx: null,
			c_page: null,
			c_dotInterval: null,
			c_apexInterval: null
		}
	},
	methods: {
		c_init() {
			this.c_wrapper = this.$el.querySelector('canvas').parentElement
			this.c_canvas = this.$el.querySelector('canvas')
			this.c_ctx = this.c_canvas.getContext('2d')

			this.c_resize()
			this.c_animate()
			
			window.addEventListener('resize', this.c_resize)
		},
		c_resize() {
			this.c_canvas.style.display = 'block'
			this.c_canvas.width = this.c_wrapper.offsetWidth
			this.c_canvas.height = this.c_wrapper.offsetHeight

			this.c_ctx.fillStyle = this.c_color
			this.c_ctx.strokeStyle = this.c_color
			this.c_ctx.lineWidth = this.c_lineWidth
		},
		c_animate() {
			const _this = this

			const apex = {
				x: Math.random() * this.c_canvas.width,
				y: Math.random() * this.c_canvas.height,
				velocity_x: Math.random() * 3,
				velocity_y: Math.random() * 3
			}

			const dots = {
				total: 1000,
				proximity: 80,
				radius: 300,
				array: []
			}

			class Dots {
				constructor() {
					this.x = Math.random() * _this.c_canvas.width
					this.y = Math.random() * _this.c_canvas.height
					this.velocity_x = (Math.random()*0.75)
					this.velocity_y = (Math.random()*0.75)
					this.radius = (Math.random() * 0.5) + 1
					this.draw()
				}

				static connect() {
					let i = 0
					do {
						let j = 0
						do {
							let i_dot = dots.array[i];
							let j_dot = dots.array[j];

							let in_radius_x = Math.abs(i_dot.x - apex.x) < dots.radius
							let in_radius_y = Math.abs(i_dot.y - apex.y) < dots.radius
							let in_radius = in_radius_x && in_radius_y

							let in_proximity_x = Math.abs(i_dot.x - j_dot.x) < dots.proximity
							let in_proximity_y = Math.abs(i_dot.y - j_dot.y) < dots.proximity
							let in_proximity = in_proximity_x && in_proximity_y

							if (in_radius && in_proximity) {
								_this.c_ctx.beginPath();
								_this.c_ctx.moveTo(i_dot.x, i_dot.y);
								_this.c_ctx.lineTo(j_dot.x, j_dot.y);
								_this.c_ctx.stroke();
								_this.c_ctx.closePath();
							}

						} while (j++ < dots.total - 1)
					} while (i++ < dots.total - 1)
				}

				static move() {
					let i = 0
					do {
						let dot = dots.array[i]

						if (dot.y < 0 || dot.y > _this.c_canvas.height) {
							dot.velocity_y = - dot.velocity_y;
						}
						else if (dot.x < 0 || dot.x > _this.c_canvas.width) {
							dot.velocity_x = - dot.velocity_x;
						}_this.c_ctx.fillStyle
						dot.x += dot.velocity_x;
						dot.y += dot.velocity_y;
					} while (i++ < dots.total - 1)
				}

				draw() {
					_this.c_ctx.beginPath();
					_this.c_ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
					// _this.c_ctx.fill();
				}
			}

			const draw = () => {
				let i = 0;
				this.c_ctx.clearRect(0, 0, this.c_canvas.width, this.c_canvas.height);
				if (!dots.array.length) {
					do {
						dots.array.push(new Dots());
					} while (i++ < dots.total - 1)
				}
				else {
					dots.array.forEach(dot => dot.draw())
				}
				Dots.connect();
				Dots.move();
			}

			draw()

			const moveApex = () => {
				if (apex.y < 0 || apex.y > _this.c_canvas.height) {
					apex.velocity_x = apex.velocity_x;
					apex.velocity_y = - apex.velocity_y;
				}
				else if (apex.x < 0 || apex.x > _this.c_canvas.width) {
					apex.velocity_x = - apex.velocity_x;
					apex.velocity_y = apex.velocity_y;
				}
				apex.x += apex.velocity_x;
				apex.y += apex.velocity_y;
			}

			this.c_dotInterval = setInterval(draw, 30)
			this.c_apexInterval = setInterval(moveApex, 30)
		}
	},
	mounted() {
		if (process.isClient) {
			this.c_init()
		}
	}
}