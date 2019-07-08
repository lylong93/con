class World {
	constructor(bg) {
		this.screen= {
			l:0
		}
		this.land = {
			'155':[[60,2754]],
			'216':[[320,510],[828,960],[3200,3650]],
			'283':[[512,576],[702,764]],
			'344':[[578,700]]
		}
	}
	updata(val) {
		let values= Object.values(this.land)
		values.forEach(item=> {
			item.forEach( eve=> {
				eve[0] -=val*2
				eve[1] -=val*2
			})
		})
		this.screen.l+=val
		// console.log(values[1])
	}
}

export default World