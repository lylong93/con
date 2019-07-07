import {world} from './index'


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

		this.action  

		this.droping = false
		
		this.speed = 6;
		//裁剪位置
		this.cut;
		//帧
		this.fram;
		//
		this.offset= {
			x:320,
			y:216
		}
		this.timer =null
	}
	// 更新帧
	updata() {
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
				this.offset.y = tar
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
		if(this.timer) return
		// this.state = 0
		this.action = 'walk'
		this._walk(
			this.runEl,
			()=> {
				// world.screen.l+=this.speed// 移动地图	
				world.updata(this.speed)

			})
		.then(()=>{
			this.action  = null
			// this.state = 1
		})
	}
	rightJump(fn) {
		if(this.timer) return
		this.state = 0
		const x = () => {
			this.offset.x +=this.speed
		}

		this.up(x)
		.then(()=> {
			return this.down(x)
		})
		.then(()=> {
			this.state = 1
		})

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
				// 终止标记
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
		console.log(tar)
		if(Math.abs(this.offset.y-tar)<10) {
			this.offset.y = tar
			this.state = 1
			this.droping = false
			return
		}
		this.state = 0
		this.droping = true
		this.offset.y+=2
	}

	/**
	els 变换视图
	fn  其他附加
	**/
	_walk(els,fn) {
	let zhen = 60
	if(this.action === 'walk') {
		zhen  = 120
	}
	return new Promise ( (resolve,rejcet)=> {
		let i=0;
		this.timer = setInterval(()=> {
			if(fn) fn()
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
		// this.state = 1
		this.fram = this.runEl[0]
		this.updata()
	}
	stop() {
		clearInterval(this.timer)
		this.stand()
		this.timer = null
	}


}

export default Person