import { renderElement } from '../utils/renderElement.js'

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
