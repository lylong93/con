import {down,hero,world,udown} from './index'

// const debounce = (fn, obj) => {
// 	let timer
// 	return function() {
// 		if (timer) {
// 			return
// 		}
// 		timer = setTimeout(function() {
// 			fn.call(obj)
// 			clearTimeout(timer)
// 			timer = null
// 		}, 100)
// 	}
// }


const initEvent = (hero,keyConfig) => {
	let set = new Set()
	let timer
	document.addEventListener('keydown', function(evnet) {
		if(hero.state === 0) return // 掉落状态一些按键失效
		set.add(evnet.key)
		perform()
	}, false)
	document.addEventListener('keyup', function(evnet) {
		set.delete(evnet.key)
		perform()
	}, false)

	
	const perform = () => {
		// debugger
		let eventStr=''
		for (let item of set.keys()) {
			eventStr +=item
			
		}
		switch (eventStr) {
			case 'w':
				let tar = down(hero,world)
				hero.jump(tar)
				break;
			case 's':
				 udown(hero,world)

				hero.dd()
				break;
			case 'a':
				hero.left()
				break;
			case 'd':
				hero.right()
				break;
			case 't':
				let tar1 = down(hero,world)
				hero.rightJump(tar1)
				break;
			case 'j':
				hero.fire()
				break;
		}

	}
	return perform
}


export default initEvent