import {world,ldwon} from './index'
import initEvent from './control'

class Person {
	constructor(base) {
		this.base = base
		// 大小
		this.size ={
			x:30,
			y:60
		}
		// 状态 
		// drop 0
		// land 1
		this.state =1
		this.end = false
		this.action  

		this.droping = false
		this.ddd =false
		this.speed = 6;
		//裁剪位置
		this.cut;
		//帧
		this.fram;
		//
		// this.offset= {
		// 	x:320,
		// 	y:216
		// }
		this.timer =null
	}
	// 更新帧
	updata() {
		// console.log(this.cut)
		this.cut = {
			x:this.fram[0],
			y:this.fram[1],
			sx:this.fram[2],
			sy:this.fram[3],
		}
	}

	// 动作
	jump(tar) {
		if(this.timer) return
			this.state = 0
		// 向上跃
		const y =()=> {
			if(Math.abs(this.offset.y-tar)<5) {
				this.offset.y = parseInt(tar)
				return true
			}
		}

		this.up()
		.then(()=> {
			if(tar>0) {
				return this.down(y)
			}else {
				return this.down()
			}
		})
		.then(()=> {
			// this.offset.y = 136
			this.state = 1
		})
	}
	right() {
		// console.log(this.timer)
		if(this.timer) return
		// this.state = 0
	this.action = 'walk'
	this._walk(
		this.runEl,
		()=> {
			world.updata(this.speed)

		})
	.then(()=>{
		this.action  = null
			// this.state = 1
		})
	}
	left() {
		if(this.timer) return
			// this.state = 0
		this.action = 'walk'
		this._walk(
			this.runEl,
			()=> {
					// world.screen.l+=this.speed// 移动地图	
					// world.updata(this.speed)
					this.offset.x -=this.speed
				})
		.then(()=>{
			this.action  = null
				// this.state = 1
			})
	}
	rightJump(tar) {
		this.stop()
		this.state = 0

		const x = () => {
			world.updata(this.speed/2)
			let _x = this.offset.x += this.speed/2
			let tar = ldwon(this,_x,world) 
			if(tar>0 && Math.abs(this.offset.y-tar)<5) {
				// debugger
				this.offset.y = tar
				this.state =1
				this.end = true // 打断后面视图的执行
				this.stop()
				return true
			}

		}
		const move = () => {
			world.updata(this.speed/2)
		}

		this.up(move)
		.then(()=> {
			// debugger
			return this.down(x)
			// this.stop()
		})
		.then(()=> {
			// this.stop()
			this.state = 1
		})
		.catch(()=>  {
			this.state = 1
			this.end = false
		})

	}
	dd(tar) {
		this.ddd = true
	}

	// 分解动作
	up(fn) {
		return this._walk(
			this.upEl,
			()=> {
				if(fn) fn()
					this.offset.y -=this.speed
			}
			)
	}
	down(fn) {
		return this._walk(
			this.upEl,
			() => {
				// 下降过程判断一些终止
				let flag
				if (fn) {
					flag = fn()
				}
				if(!flag) {
					this.offset.y += this.speed
				}

			}
			)
	}
	drop(tar) {
		let a = parseInt(this.offset.y)
		let b = parseInt(tar)

		if(Math.abs(a-b)<5) {
			this.offset.y = parseInt(tar)
			this.state = 1
			this.droping = false
			this.ddd = false
			return
		}

		this.state = 0
		this.droping = true
		this.stop()
		this.offset.y = parseInt(this.offset.y) + 2
	}
	/**
	els 变换视图
	fn  其他附加
	**/
	_walk(els,fn) {
		let zhen = 60
		if(this.action === 'walk') {
			zhen  = 110
		}
		return new Promise ( (resolve,rejcet)=> {
			let i=0;
			this.timer = setInterval(()=> {
				if(fn) fn()
					if(this.end) return rejcet()
						i++
					if(i>els.length-1) {
						i=0
						this.stop()
						resolve()
						return
					}			
					this.fram = els[i]
					this.updata()
				},zhen)
		})
	}
	//站立状态
	stand() {
		// this.state =1
		this.fram = this.runEl[0]
		this.updata()
	}
	stop() {
		this.stand()
		clearInterval(this.timer)
		this.timer = null
		
	}


}

export default Person