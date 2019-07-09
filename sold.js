import Person from './person'

class Sold extends Person{
	constructor(base,name) {
		super(base)	
		this.name = name
		this.health = 5
		this.runEl = [
			[1,1,17,35],
			[18,1,19,35],
			[39,1,20,35],
			[55,1,20,35],
			[72,1,20,35],
			[93,1,20,35],
			[109,1,20,35],

		]
		this.upEl = [
			[117,42,16,35],
			[135,42,20,35],
			[157,42,16,35],
			[175,42,20,35],
			[117,42,16,35],
			[135,42,20,35],
			[157,42,16,35],
			[175,42,20,35],
			[117,42,16,35],
			[135,42,20,35],
			[157,42,16,35],

		]
		this.dEl = [
			[117,42,16,35],
			[135,42,20,35],
			[157,42,16,35],
			[175,42,20,35],
		]
		this.offset= {
			x:760,
			y:155
		}
		this.init()
	}
	init() {
		this.stand()
	}
	offHealth(){
		this.health --
	}
}

export default Sold