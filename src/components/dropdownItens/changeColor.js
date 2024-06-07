import { changeColorHandle } from '../../services/handle.js'
import { colors } from '../../utils/constants.js'
import { rgbToHex3 } from '../../utils/helpers.js'

const span = {
	type: 'span',
	props: {
		children: [
			{
				type: null,
				props: { nodeValue: 'Mude as cores:' },
			},
		],
	},
}

const input1 = {
	type: 'input',
	props: {
		type: 'color',
		oninput: changeColorHandle,
		'data-cor': 'primary',
		value: rgbToHex3(colors.primary),
		title: "Cor do fundo"
	},
}

const input2 = {
	type: 'input',
	props: {
		type: 'color',
		oninput: changeColorHandle,
		'data-cor': 'secondary',
		value: rgbToHex3(colors.secondary),
		title: "Cor principal da bola"
	},
}

const input3 = {
	type: 'input',
	props: {
		type: 'color',
		oninput: changeColorHandle,
		'data-cor': 'accent',
		value: rgbToHex3(colors.accent),
		title: "Cor secundaria da bola"
	},
}

const div = {
	type: 'div',
	props: {
		class: 'div-cores',
		children: [input1, input2, input3],
	},
}

export const colorpick = {
	type: 'div',
	props: {
		class: 'label-config',
		children: [span, div],
	},
}
