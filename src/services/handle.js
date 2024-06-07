import { numeroAleatorio } from '../utils/numeroAleatorio.js'
import { colors, physicsScene } from '../utils/constants.js'
import { Vector2 } from './Vector2.js'
import { setupScene } from './setupScene.js'

export const clickCanvasHandle = () => {
	for (let i = 0; i < physicsScene.balls.length / 2; i++) {
		const idx = numeroAleatorio(0, physicsScene.balls.length - 1)
		physicsScene.balls[idx].vel.set(
			new Vector2(-1.0 + 5 * Math.random(), 5 * Math.random())
		)
	}
}

export const mousemoveHandle = (e, canvas, cScale) => {
	const rect = canvas.getBoundingClientRect()

	const mousePos = {
		x: (e.clientX - rect.left) / cScale,
		y: (canvas.height - (e.clientY - rect.top)) / cScale,
	}
	if (physicsScene.balls.length > 0) {
		physicsScene.balls[0].pos.set(mousePos)
		physicsScene.balls[0].vel.set(new Vector2(0, 0))
		physicsScene.balls[0].cor1 = colors.secondary
		physicsScene.balls[0].cor2 = colors.text
	}
}

export const keypressHandle = (e) => {
	if (e.key.toLowerCase() === 'p') {
		physicsScene.paused = !physicsScene.paused
	}
}

export const btnPauseHandler = () => {
	physicsScene.paused = !physicsScene.paused
}

export const btnRecomecarHandler = () => {
	setupScene()
}

export const btnResetHandler = () => {
	location.reload()
}

export const sliderRestitutionHandle = (e) => {
	physicsScene.restitution = +e.target.value
	document.querySelector('[data-name="value"]').innerText = e.target.value
}

export const sliderGravityHandle = (e) => {
	const eixoYValue = document.querySelector("[data-eixo='y']").value
	const eixoXValue = document.querySelector("[data-eixo='x']").value

	document.querySelector('[data-name="valueX"]').innerText = eixoXValue
	document.querySelector('[data-name="valueY"]').innerText = eixoYValue

	physicsScene.gravity.set(new Vector2(+eixoXValue, +eixoYValue))
}

export const sliderRaioBolaHandle = (e) => {
	physicsScene.radius = +e.target.value

	physicsScene.balls.forEach((bola) => {
		bola.radius = physicsScene.radius
	})

	document.querySelector('[data-name="valueRaio"]').innerText = (
		+e.target.value * 10
	).toFixed(2)
}

export const sliderNumBallsHandle = (e) => {
	physicsScene.numBalls = +e.target.value

	setupScene()

	document.querySelector('[data-name="valueNumBalls"]').innerText =
		+e.target.value
}

export const changeColorHandle = (e) => {
	const cor = e.target.dataset.cor
	const value = e.target.value

	colors[cor] = value

	const mudarCor = (cor) => {
		physicsScene.balls.forEach((bola) => {
			bola[cor] = e.target.value
		})
	}

	if (cor === 'secondary') {
		mudarCor('cor1')
	}

	if (cor === 'accent') {
		mudarCor('cor2')
	}
}

export const showFrameRateHandle = () => {
	physicsScene.showFrameRate = !physicsScene.showFrameRate
}
