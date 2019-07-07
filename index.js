import Hero from './hero'
import World from './world'

import initEvent from './control'


const canvas = document.querySelector("#world")

var image=document.getElementById("img");
var bg=document.getElementById("bg");

const ctx = canvas.getContext('2d')

let hero = new Hero(image,'lyl')

let world = new World(bg)


const draw =()=> {
	let {cut,size,offset} = hero
	let {screen} = world

	ctx.clearRect(0,0,600,400)
	ctx.drawImage(bg,screen.l,0,380,224,0,0,760,448);

	let isLand = _land(hero,world)

	drop(hero,world,isLand)

	ctx.drawImage(image,cut.x,cut.y,cut.sx,cut.sy,offset.x,offset.y, size.x,size.y);
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
	if(isLand && !hero.droping) return
	hero.drop(target)
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



const run =() => {
	draw()
	requestAnimationFrame(run)
}
run()


export {down,hero,world}