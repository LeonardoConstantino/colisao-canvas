/**
 * Cria um controle deslizante (slider) com rótulo.
 * @param {string} label - O rótulo exibido ao lado do controle deslizante.
 * @param {string} name - O nome do controle deslizante para fins de identificação.
 * @param {number} valorInicial - O valor inicial do controle deslizante.
 * @param {number} max - O valor máximo permitido para o controle deslizante.
 * @param {number} min - O valor mínimo permitido para o controle deslizante.
 * @param {number} step - O incremento do controle deslizante.
 * @param {Function} handle - A função de retorno de chamada chamada quando o valor do controle deslizante é alterado.
 * @param {string} [title=''] - O texto de título exibido quando o cursor é passado sobre o controle deslizante (opcional).
 * @param {string} [eixo] - A informação adicional sobre o eixo do controle deslizante, se aplicável (opcional).
 * @returns {Object} Um elemento de controle deslizante com o rótulo e as configurações especificadas.
 */
export const createSlide = (
	label,
	name,
	valorInicial,
	max,
	min,
	step,
	handle,
	title = '',
	eixo
) => {
	const spanText = {
		type: null,
		props: { nodeValue: `${label}: ` },
	}

	const spanValue = {
		type: 'span',
		props: {
			'data-name': name,
			children: [
				{
					type: null,
					props: { nodeValue: valorInicial },
				},
			],
		},
	}

	const span = {
		type: 'span',
		props: {
			children: [spanText, spanValue],
		},
	}

	const input = {
		type: 'input',
		props: {
			type: 'range',
			min: min,
			max: max,
			step: step,
			value: valorInicial,
			oninput: handle,
		},
	}

	if (eixo) {
		input.props['data-eixo'] = eixo
	}

	return {
		type: 'label',
		props: {
			class: 'label-config',
			children: [span, input],
			title,
		},
	}
}
