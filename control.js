import {down,hero,world} from './index'


const keyConfig = {
	up: 'w',
	down: 's',
	left: 'a',
	right: 'd'
}

const debounce = (fn, obj) => {
	let timer
	return function() {
		if (timer) {
			return
		}
		timer = setTimeout(function() {
			fn.call(obj)
			clearTimeout(timer)
			timer = null
		}, 100)
	}
}


const initEvent = (hero) => {
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
		let eventStr = ''
		for (let item of set.keys()) {
			eventStr += item
		}
		switch (eventStr) {
			case 'w':
				let tar = down(hero,world)
				hero.jump(tar)
				break;
			case 'd':
				// world.updata()
				console.log(hero.offset)
				hero.right()
				break;
			case 't':
				hero.rightJump()
				break;
		}

	}
}


export default initEvent