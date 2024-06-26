import { createButtonIcone } from '../../components/button.js'
import {
	btnPauseHandler,
	btnResetHandler,
	btnRecomecarHandler,
} from '../../services/handle.js'

import playIcone from '../../assets/images/play-pause.svg'
import recomecaIcone from '../../assets/images/replay.svg'
import resetIcone from '../../assets/images/reset-settings.svg'

const btnPause = createButtonIcone(
	playIcone,
	btnPauseHandler,
	'Pausar ou começar a animação.'
)

const btnRecomecar = createButtonIcone(
	recomecaIcone,
	btnRecomecarHandler,
	'Recomeçar a animação'
)

const btnReset = createButtonIcone(
	resetIcone,
	btnResetHandler,
	'Resetar as configurações e reiniciar a animação'
)

export const divBtn = {
	type: 'div',
	props: {
		class: 'div-cores',
		children: [btnPause, btnRecomecar, btnReset],
	},
}
