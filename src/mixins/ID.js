//not being used, but saving file because it might be helpful later
export default {
	computed: {
		id() {
			const chars ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789"
			const length = 25
			let id = "_"
			let i = 0
		
			while (i++ <= length) {
				id += chars.charAt(Math.floor(Math.random() * chars.length))
			}
			return id
		}
	}
}