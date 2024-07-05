/**
 * Representa uma bola com propriedades físicas e de renderização.
 */
export class Ball {
	/**
	 * Cria uma instância de `Ball`.
	 * @param {number} radius - O raio da bola.
	 * @param {number} mass - A massa da bola.
	 * @param {Vector2} pos - O vetor de posição da bola.
	 * @param {Vector2} vel - O vetor de velocidade da bola.
	 * @param {string} cor1 - A cor principal da bola.
	 * @param {string} cor2 - A cor secundária da bola.
	 */
	constructor(radius, mass, pos, vel, cor1, cor2) {
		this.radius = radius // O raio da bola
		this.mass = mass // A massa da bola
		this.pos = pos.clone() // O vetor de posição da bola
		this.vel = vel.clone() // O vetor de velocidade da bola
		this.cor1 = cor1 // A cor principal da bola
		this.cor2 = cor2 // A cor secundária da bola
	}

	/**
	 * Simula o movimento da bola de acordo com o tempo e a gravidade.
	 * @param {number} dt - O intervalo de tempo.
	 * @param {Vector2} gravity - O vetor de gravidade.
	 */
	simulate(dt, gravity) {
		this.vel.add(gravity, dt) // Atualiza a velocidade com a gravidade
		this.pos.add(this.vel, dt) // Atualiza a posição com base na velocidade
	}
}
