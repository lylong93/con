class World {
	constructor(bg) {
		this.screen= {
			l:0
		}
		this.land = {
			'155':[[60,2754]],
			'216':[[320,510],[820,960]],
			'283':[[512,576],[702,764]],
			'250':[[1260,1450]],
			'344':[[578,700],[1200,1350]]
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