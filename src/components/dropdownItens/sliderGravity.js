import { sliderGravityHandle } from '../../services/handle.js'
import { createSlide } from './createSlider.js'

export const sliderGravityX = createSlide(
	'Vento',
	'valueX',
	'0',
	10,
	-10,
	0.01,
	sliderGravityHandle,
	"Controla a direção e a velocidade do vento.",
	"x"
)

export const sliderGravityY = createSlide(
	'Gravidade',
	'valueY',
	-3.8,
	10,
	-10,
	0.01,
	sliderGravityHandle,
	"Controla a gravidade.",
	"y"
)
