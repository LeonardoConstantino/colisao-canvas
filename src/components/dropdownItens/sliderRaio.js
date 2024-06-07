import { sliderRaioBolaHandle } from '../../services/handle.js'
import { createSlide } from './createSlider.js'

export const sliderRaioBola = createSlide(
	'Raio das bolas',
	'valueRaio',
	0.2,
	1,
	0.01,
	0.01,
	sliderRaioBolaHandle,
	"Controla o tamanho das bolas."
)
