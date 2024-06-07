import { sliderRestitutionHandle } from '../../services/handle.js'
import { createSlide } from './createSlider.js'

export const sliderRestitution = createSlide(
	'Elasticidade das bolas',
	'value',
	0.8,
	1,
	0.01,
	0.01,
	sliderRestitutionHandle,
	"Controla a elasticidade das bolas"
)
