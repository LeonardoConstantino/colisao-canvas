// src/components/button.js

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
