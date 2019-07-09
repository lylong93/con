import Hero from './hero'
import World from './world'
import Sold from './sold'
import initEvent from './control'

const canvas = document.querySelector("#world")

var herobg=document.getElementById("img");
var worldbg=document.getElementById("bg");
var soldbg=document.getElementById("soldbg");


const ctx = canvas.getContext('2d')

let hero = new Hero(herobg,'lyl')
let world = new World(worldbg)
let solder = new Sold(soldbg)

let solds = []
const creatSold =() => {
	console.log('ok')
	let solder = new Sold(soldbg)
	solds.push(solder)
}

let pretime = 0
const draw =()=> {
	if((new Date().getTime() - pretime)>2000) {
		creatSold()
		pretime = new Date().getTime()
	}
	// creatSold()
	let {screen} = world

	ctx.clearRect(0,0,600,400)
	ctx.drawImage(worldbg,screen.l,0,380,224,0,0,760,448);

	let isLand = _land(hero,world)
	drop(hero,world,isLand)

	if(hero.ddd) {
		hero.drop(jk)
	}
	
	ctx.drawImage(herobg,hero.cut.x,hero.cut.y,hero.cut.sx,hero.cut.sy,hero.offset.x,hero.offset.y, hero.size.x,hero.size.y);
	
	hero.fires.forEach(item => {
		item.x = item.x+2
		ctx.drawImage(herobg,hero.fiEl[0],hero.fiEl[1],hero.fiEl[2],hero.fiEl[3],item.x,item.y,100,20);
	})

	solds.forEach(item=> {
		let {cut,size,offset}= item
		ctx.drawImage(soldbg,cut.x,cut.y,cut.sx,cut.sy,offset.x,offset.y, size.x,size.y);
		item.left()

		let isLand = _land(item,world)
		drop(item,world,isLand)

		//减少生命
		if(item.offset.y == hero.offset.y) {
			let _offset= parseInt(item.offset.x) - parseInt(hero.offset.x)
			if(Math.abs(_offset)<15) {
				hero.death() 
			}
		}
		//子弹击中
		for (var i = 0;i<hero.fires.length;i++) {
			let _offset =Math.abs(hero.fires[i].x - item.offset.x)
			if(_offset<100 && item.offset.y+ 20 === hero.fires[i].y) {
				// solds.splice()
				let sindex = solds.indexOf(item)

				let findex = hero.fires.indexOf(hero.fires[i])

				solds.splice(sindex,1)
				hero.fires.splice(findex,1)

			}
		}

	})
		
}


initEvent(hero)

// 判断掉落
let target;//目标点
const _land =(hero,world) => {
	// 状态为1 在陆地
	// 为 0 运动过程中,不检测
	// console.log(hero.state)
	if(hero.state === 0) return true
	let {offset} = hero;
	let land = world.land

	let ly= offset.y //当前y

	let arr = land[ly]

	for(let i=0;i<arr.length;i++) {
			let item = arr[i]
			if(offset.x>=item[0] && offset.x<= item[1]) {
				//在区间内
				return true
			}
	}
	
	let ns = Object.keys(land)
	let i =ns .indexOf(ly+'')
	target = ns[i+1]
	return false
}

const drop = (hero,world,isLand)=> {
	if(isLand && !hero.droping) {
		return
	}
	else if(hero.ddd){
	 return
	}
	else {
		hero.drop(target)
	}
}


// 判断上跃
const down =(hero,world)=> {

	let {offset} = hero;
	let land = world.land;
	let ly= offset.y

	let ns = Object.keys(land)

	let i =ns .indexOf(ly+'')
	let k = ns[i-1]
	let arr = land[k]

	if(!arr) {
		return -1
	}

	for(let i=0;i<arr.length;i++) {
			let item = arr[i]
			if(offset.x>=item[0] && offset.x<= item[1]) {
				// 可以上跃
				
				return k
			}
	}
	return -1
}
// 下跳
let jk //下落目标点
const udown =(hero,world)=> {

	let {offset} = hero;
	let land = world.land;
	let ly= offset.y

	let ns = Object.keys(land)

	let i =ns .indexOf(ly+'')
	let k = ns[i+1]
	jk = k
	return k
}

//侧方运动
const ldwon = (hero,hx,world) => {
	if(hero.droping) return
	let {offset} = hero;
	let land = world.land;
	let ly= offset.y

	let ns = Object.keys(land)

	let k  = -1//需要去对比的y轴

	ns.forEach(item => {
		if(Math.abs(ly-item)<5) {
			 k = item
			return
		}
	})
	
	let arr = land[k]
	// console.log( land[k])
	// console.log( hx)
	if(!arr) {
		return -1
	}

	for(let i=0;i<arr.length;i++) {
			let item = arr[i]
			if(hx>=item[0] && hx<= item[1]) {
				
				return k
			}
	}
	return -1
}

const run =() => {
	draw()
	requestAnimationFrame(run)
}
run()

export {ldwon,down,hero,world,udown}