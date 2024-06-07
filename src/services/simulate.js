import { Vector2 } from './Vector2.js';

function handleBallCollision(ball1, ball2, restitution) {
	const EPSILON = 1e-10

	// Calcula a direção da colisão
	const direction = new Vector2()
	direction.subtractVectors(ball2.pos, ball1.pos)
	const distance = direction.length()

	// Verifica se as bolas estão colidindo
	if (distance < EPSILON || distance > ball1.radius + ball2.radius) return

	direction.scale(1.0 / distance) // Normaliza a direção

	// Corrige a posição das bolas para evitar sobreposição
	const overlap = ball1.radius + ball2.radius - distance
	const correction = overlap / 2.0
	ball1.pos.add(direction.clone().scale(-correction))
	ball2.pos.add(direction.clone().scale(correction))

	// Calcula as velocidades na direção da colisão
	const velocity1 = ball1.vel.dot(direction)
	const velocity2 = ball2.vel.dot(direction)

	// Calcula as novas velocidades após a colisão
	const mass1 = ball1.mass
	const mass2 = ball2.mass

	const newVelocity1 =
		(velocity1 * (mass1 - mass2) + 2 * mass2 * velocity2) / (mass1 + mass2)
	const newVelocity2 =
		(velocity2 * (mass2 - mass1) + 2 * mass1 * velocity1) / (mass1 + mass2)

	// Aplicar o coeficiente de restituição
	const finalVelocity1 = newVelocity1 * restitution
	const finalVelocity2 = newVelocity2 * restitution

	// Atualiza as velocidades das bolas na direção da colisão
	ball1.vel.add(direction.clone().scale(finalVelocity1 - velocity1))
	ball2.vel.add(direction.clone().scale(finalVelocity2 - velocity2))
}

// ------------------------------------------------------

const  handleWallCollision = (ball, worldSize) => {
	function collide(axis, maxBound) {
		if (ball.pos[axis] < ball.radius) {
			ball.pos[axis] = ball.radius
			ball.vel[axis] = -ball.vel[axis]
		} else if (ball.pos[axis] > maxBound - ball.radius) {
			ball.pos[axis] = maxBound - ball.radius
			ball.vel[axis] = -ball.vel[axis]
		}
	}

	collide('x', worldSize.x)
	collide('y', worldSize.y)
}

// simulation -------------------------------------------------------

export const simulate = (physicsScene) => {
	for (let i = 0; i < physicsScene.balls.length; i++) {
		const ball1 = physicsScene.balls[i]
		ball1.simulate(physicsScene.dt, physicsScene.gravity)

		for (let j = i + 1; j < physicsScene.balls.length; j++) {
			const ball2 = physicsScene.balls[j]
			handleBallCollision(ball1, ball2, physicsScene.restitution)
		}
		handleWallCollision(ball1, physicsScene.worldSize)
	}
}