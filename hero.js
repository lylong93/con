import Person from './person'

class Hero extends Person{
	constructor(base,name) {
		super(base)	
		this.name = name
		this.health = 5
		this.runEl = [
			[1,42,16,35],
			[17,42,19,35],
			[37,42,20,35],
			// [57,42,18,35],
			// [75,42,18,35],
			// [94,42,20,35],

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
		this.fiEl = [81,7,40,10]
		this.offset= {
			x:320,
			y:216
		}

		this.fires =[]
		this.init()
	}
	init() {
		this.stand()
	}
	death(){
		// this.up()
	}
	fire(){
		this.fires.push({
			x:this.offset.x+50,
			y:this.offset.y+20
		})
	}
}

export default Hero