import { Vector2 } from '../services/Vector2.js'
import { Ball } from '../services/Ball.js'
import { colors, physicsScene } from '../utils/constants.js'
import { delay, rnd } from '../utils/helpers.js'

const createBall = (radius, mass, pos, vel) => {
	return new Ball(
		radius,
		mass,
		pos.clone(),
		vel.clone(),
		colors.secondary,
		colors.accent
	)
}

const addBall = (simWidth, simHeight) => {
	let mass = Math.PI * physicsScene.radius ** 2
	let pos = new Vector2(rnd(simWidth, 0), simHeight)
	let vel = new Vector2(rnd(1, -1), rnd(1, -1))

	return createBall(physicsScene.radius, mass, pos, vel)
}

export const setupScene = async () => {
	physicsScene.balls = [] // Limpa a lista de bolas
	for (let i = 0; i < physicsScene.numBalls; i++) {
		if (physicsScene.balls.length > physicsScene.numBalls - 1) return
		physicsScene.balls.push(
			addBall(physicsScene.simHeight, physicsScene.simHeight)
		)
		await delay(physicsScene.delayToAppear)
	}
}
