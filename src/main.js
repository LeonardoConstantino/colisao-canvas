// Importa todos os arquivos CSS da pasta assets/styles e subdiretórios

const importAll = (r) => r.keys().forEach(r)
importAll(require.context('./assets/styles/', true, /\.css$/))

import { createCanvas } from './components/canvas.js'
import { physicsScene } from './utils/constants.js'
import { setStyles } from './utils/helpers.js'
import { sizeCanvasHandle } from './utils/sizeCanvasHandle.js'
import { setupScene } from './services/setupScene.js'
import { update } from './services/update.js'
import {
	clickCanvasHandle,
	mousemoveHandle,
	keypressHandle,
} from './services/handle.js'
import { createDropdown } from './components/dropdown.js'

document.addEventListener('DOMContentLoaded', () => {
	const app = document.getElementById('app')
	const canvas = createCanvas()

	const sizeCanvas = sizeCanvasHandle(canvas, window)

	const { cScale } = sizeCanvas

	setStyles(canvas)

	setupScene()
	update(physicsScene, canvas, sizeCanvas, 60)

	canvas.addEventListener('click', () => {
		clickCanvasHandle()
	})

	canvas.addEventListener('mousemove', (e) => {
		mousemoveHandle(e, canvas, cScale)
	})

	window.addEventListener('keypress', keypressHandle)

	createDropdown(app)

	app.append(canvas)
})
