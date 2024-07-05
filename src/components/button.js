/**
 * Cria um botão com texto.
 * @param {string} text - O texto a ser exibido no botão.
 * @param {Function} onClick - A função de retorno de chamada a ser executada quando o botão é clicado.
 * @returns {Object} Um elemento de botão com o texto especificado e a função de retorno de chamada.
 */
export const createButtonText = (text, onClick) => {
	return {
		type: 'button',
		props: {
			class: 'btn',
			onClick,
			children: [{ type: null, props: { nodeValue: text } }],
		},
	}
}

/**
 * Cria um botão com um ícone.
 * @param {string} iconeUrl - O URL da imagem do ícone a ser exibido no botão.
 * @param {Function} onClick - A função de retorno de chamada a ser executada quando o botão é clicado.
 * @param {string} [title=''] - O texto de título exibido quando o cursor é passado sobre o botão (opcional).
 * @returns {Object} Um elemento de botão com o ícone especificado e a função de retorno de chamada.
 */
export const createButtonIcone = (iconeUrl, onClick, title='') => {
	const icone = {
		type: 'i',
		props: {
			class: 'icone-config',
			style: `background-image: url(${iconeUrl})`,
		}
	}

	return {
		type: 'button',
		props: {
			class: 'btn',
			title,
			onClick,
			children: [icone],
		},
	}
}
