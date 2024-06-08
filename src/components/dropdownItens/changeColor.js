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

const createColorInput = (dataCor, value, title) => {
    return {
        type: 'input',
        props: {
            type: 'color',
            oninput: changeColorHandle,
            'data-cor': dataCor,
            value: rgbToHex3(value),
            title: title
        }
    };
};

const input1 = createColorInput('primary', colors.primary, 'Cor do fundo');
const input2 = createColorInput('secondary', colors.secondary, 'Cor principal da bola');
const input3 = createColorInput('accent', colors.accent, 'Cor secundaria da bola');

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
