import { showFrameRateHandle } from '../../services/handle.js'

const spanText = {
	type: null,
	props: { nodeValue: `Mostrar fps: ` },
}

const span = {
	type: 'span',
	props: {
		children: [spanText],
	},
}

const input = {
	type: 'input',
	props: {
		type: 'checkbox',
		oninput: showFrameRateHandle,
		'data-name': 'showFps',
	},
}

/**
 * Cria um checkbox para mostrar ou ocultar a taxa de quadros por segundo (fps).
 * @returns {Object} Um elemento de checkbox para mostrar ou ocultar a taxa de quadros por segundo (fps).
 */
export const checkbox = {
	type: 'label',
	props: {
		class: 'label-config row',
		children: [span, input],
		title: "Se marcado mostra o fps."
	},
}
