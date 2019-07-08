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


const initEvent = (hero,keyConfig) => {
	let set = new Set()
	let timer
	document.addEventListener('keydown', function(evnet) {
		if(hero.state === 0) return // 掉落状态一些按键失效

		// if(!set.has(evnet.key)) {}
		set.add(evnet.key)
		perform()

	}, false)
	document.addEventListener('keyup', function(evnet) {
		set.delete(evnet.key)
		perform()
	}, false)

	let eventStr = ''

	const perform = () => {
		// debugger
		console.log(eventStr)
		for (let item of set.keys()) {
			eventStr += item
			
		}
		switch (eventStr) {
			case 'w':
				let tar = down(hero,world)
				hero.jump(tar)
				eventStr = ''
				break;
			case  'a':
				hero.left()
				eventStr = ''
				break;
			case 'd':
				hero.right()
				eventStr = ''
				break;
			case 'dj':
				// debugger
				hero.rightJump()
				// eventStr = 'd'
				break;
		}

	}
	return perform
}


export default initEvent