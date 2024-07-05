import { simulate } from './simulate.js' // Importa a função simulate do arquivo 'simulate.js'
import { draw } from './draw.js' // Importa a função draw do arquivo 'draw.js'

/**
 * Atualiza a simulação e desenha o próximo quadro na tela.
 * @param {Object} physicsScene - Configurações da cena de física.
 * @param {HTMLCanvasElement} canvas - O elemento canvas onde a simulação será desenhada.
 * @param {Object} sizeCanvas - Objeto contendo propriedades relacionadas ao tamanho do canvas.
 * @param {number} [frameRate=60] - Taxa de quadros por segundo.
 */
export const update = (physicsScene, canvas, sizeCanvas, frameRate = 60) => {
	const frameInterval = 1000 / frameRate // Intervalo de tempo entre quadros (em milissegundos)
	let lastTime = performance.now() // Tempo da última atualização
	let frameCount = 0 // Contador de quadros
	let fps = 0 // Taxa de quadros por segundo
	let lastFpsUpdate = performance.now() // Última atualização da taxa de quadros

	/**
	 * Loop principal do jogo.
	 * @param {number} currentTime - Tempo atual.
	 */
	const loop = (currentTime) => {
		const deltaTime = currentTime - lastTime // Tempo desde a última atualização

		if (deltaTime >= frameInterval) {
			lastTime = currentTime - (deltaTime % frameInterval)

			if (!physicsScene.paused) {
				simulate(physicsScene) // Simula a física
				draw(canvas, physicsScene, sizeCanvas) // Desenha o próximo quadro na tela
			}

			// Atualiza o contador de quadros
			frameCount++
			const timeSinceLastFpsUpdate = currentTime - lastFpsUpdate

			if (timeSinceLastFpsUpdate >= 1000) {
				fps = frameCount
				frameCount = 0
				lastFpsUpdate = currentTime

				physicsScene.frameRate = fps // Atualiza a taxa de quadros na cena de física
			}
		}

		requestAnimationFrame(loop) // Chama recursivamente o próximo quadro
	}

	requestAnimationFrame(loop) // Inicia o loop de atualização dos quadros
}
