import { renderElement } from '../utils/renderElement.js'

/**
 * Cria um elemento canvas com as dimensões especificadas.
 * @param {number} [width=window.innerWidth] - A largura do canvas. O valor padrão é a largura do viewport do navegador.
 * @param {number} [height=window.innerHeight] - A altura do canvas. O valor padrão é a altura do viewport do navegador.
 * @returns {HTMLCanvasElement} O elemento canvas criado.
 */
export const createCanvas = (
	width = window.innerWidth,
	height = window.innerHeight
) => {
	const canvas = {
		type: 'canvas',
		props: {
			width,
			height,
		},
	}

	return renderElement(canvas)
}
