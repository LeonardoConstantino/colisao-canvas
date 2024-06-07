// src/components/dropdown.js
// const path = require('path')
import { renderElement } from '../utils/renderElement.js'
import { divBtn } from './dropdownItens/btns.js'
import { checkbox } from './dropdownItens/showFrameRate.js'
import { sliderRestitution } from './dropdownItens/sliderRestitution.js'
import {
	sliderGravityX,
	sliderGravityY,
} from './dropdownItens/sliderGravity.js'
import { sliderRaioBola } from './dropdownItens/sliderRaio.js'
import { sliderNumBalls } from './dropdownItens/sliderNumBalls.js'
import { colorpick } from './dropdownItens/changeColor.js'

import iconeConfig from '../assets/images/icone-config.svg';
// import iconeConfig from path.resolve(__dirname, '../assets/images/icone-config.svg');

const icone = {
	type: 'i',
	props: {
		class: 'icone-config',
		style: `background-image: url(${iconeConfig})`,
	},
}

const dropbtn = {
	type: 'button',
	props: {
		class: 'dropbtn',
		title: 'Configure a animação',
		children: [icone],
	},
}

const getLi = (...component) => {
	return {
		type: 'li',
		props: {
			children: [...component],
		},
	}
}

const ul = {
	type: 'ul',
	props: {
		class: 'dropdown-content',
		children: [
			getLi(divBtn),
			getLi(checkbox),
			getLi(sliderRestitution),
			getLi(sliderGravityX, sliderGravityY),
			getLi(sliderRaioBola),
			getLi(sliderNumBalls),
			getLi(colorpick),
		],
	},
}

export const createDropdown = (ele) => {
	const dropdown = {
		type: 'div',
		props: {
			class: 'dropdown',
			children: [dropbtn, ul],
		},
	}
	return renderElement(dropdown, true, ele)
}
