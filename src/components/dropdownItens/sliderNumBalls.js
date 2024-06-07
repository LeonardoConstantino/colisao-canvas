import { sliderNumBallsHandle } from '../../services/handle.js'
import { createSlide } from './createSlider.js'

export const sliderNumBalls = createSlide(
	'Quantidade de bolas',
	'valueNumBalls',
	10,
	1000,
	1,
	0.1,
	sliderNumBallsHandle,
	"Controla a quantidade de bolas."
)
