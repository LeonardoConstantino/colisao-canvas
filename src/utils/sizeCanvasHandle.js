// Ajusta o tamanho do canvas
import { Vector2 } from '../services/Vector2.js'
import { physicsScene, physicsSceneReset } from './constants.js'
import { setupScene } from '../services/setupScene.js'

export const sizeCanvasHandle = (canvas, window) => {
	const simMinWidth = 2.0
	let cScale = Math.min(canvas.width, canvas.height) / simMinWidth
	let simWidth = canvas.width / cScale
	let simHeight = canvas.height / cScale

	const updateScale = () => {
		cScale = Math.min(canvas.width, canvas.height) / simMinWidth
		simWidth = canvas.width / cScale
		simHeight = canvas.height / cScale

		setupScene()
		// physicsScene.worldSize = new Vector2(simWidth, simHeight)
		physicsScene.worldSize.set(new Vector2(simWidth, simHeight))
		physicsSceneReset.worldSize.set(new Vector2(simWidth, simHeight))
	}
	
	const resizeCanvasHandle = () => {
		canvas.width = window.innerWidth - 12
		canvas.height = window.innerHeight - 12
		
		updateScale()
	}
	
	const convertCoordinates = {
		cX(pos) {
			return pos.x * cScale
		},
		cY(pos) {
			return canvas.height - pos.y * cScale
		},
		updateScale,
	}
	
	physicsScene.worldSize = new Vector2(simWidth, simHeight)
	physicsSceneReset.worldSize = physicsScene.worldSize
	
	resizeCanvasHandle()

	physicsScene.cScale = cScale
	physicsScene.simWidth = simWidth
	physicsScene.simHeight = simHeight

	physicsSceneReset.cScale = cScale
	physicsSceneReset.simWidth = simWidth
	physicsSceneReset.simHeight = simHeight

	window.addEventListener('resize', resizeCanvasHandle)

	return {
		cScale,
		simWidth,
		simHeight,
		convertCoordinates,
	}
}
