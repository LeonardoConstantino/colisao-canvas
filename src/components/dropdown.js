// src/components/dropdown.js
/**
 * Renderiza um elemento na página.
 * @param {HTMLElement} element - O elemento a ser renderizado.
 */
import { renderElement } from '../utils/renderElement.js';

/**
 * Importa o componente do botão da lista suspensa.
 */
import { divBtn } from './dropdownItens/btns.js';

/**
 * Importa o componente de checkbox para mostrar a taxa de quadros.
 */
import { checkbox } from './dropdownItens/showFrameRate.js';

/**
 * Importa o componente do controle deslizante de restituição.
 */
import { sliderRestitution } from './dropdownItens/sliderRestitution.js';

/**
 * Importa os componentes de controle deslizante de gravidade nos eixos X e Y.
 */
import {
    sliderGravityX,
    sliderGravityY,
} from './dropdownItens/sliderGravity.js';

/**
 * Importa o componente do controle deslizante de raio da bola.
 */
import { sliderRaioBola } from './dropdownItens/sliderRaio.js';

/**
 * Importa o componente do controle deslizante do número de bolas.
 */
import { sliderNumBalls } from './dropdownItens/sliderNumBalls.js';

/**
 * Importa o componente de seleção de cor.
 */
import { colorpick } from './dropdownItens/changeColor.js';

/**
 * Importa o ícone de configurações.
 */
import iconeConfig from '../assets/images/icone-config.svg';


/**
 * Objeto representando um ícone configurável.
 * @type {Object}
 * @property {string} type - O tipo de elemento HTML.
 * @property {Object} props - As propriedades do elemento.
 * @property {string} props.class - A classe CSS do elemento.
 * @property {string} props.style - O estilo CSS do elemento.
 */
const icone = {
    type: 'i',
    props: {
        class: 'icone-config', // A classe CSS do ícone
        style: `background-image: url(${iconeConfig})`, // O estilo CSS com a imagem de fundo
    },
};

/**
 * Objeto representando um botão de lista suspensa.
 * @type {Object}
 * @property {string} type - O tipo de elemento HTML.
 * @property {Object} props - As propriedades do elemento.
 * @property {string} props.class - A classe CSS do elemento.
 * @property {string} props.title - O título do botão.
 * @property {Array<Object>} props.children - Os elementos filhos do botão.
 */
const dropbtn = {
    type: 'button',
    props: {
        class: 'dropbtn', // A classe CSS do botão
        title: 'Configure a animação', // O título do botão
        children: [icone], // Os elementos filhos do botão
    },
};


/**
 * Retorna um objeto representando um elemento de lista (<li>) com os componentes fornecidos como filhos.
 * @param {...Object} component - Os componentes a serem incluídos como filhos do elemento de lista.
 * @returns {Object} Um objeto representando um elemento de lista (<li>) com os componentes fornecidos como filhos.
 */
const getLi = (...component) => {
    return {
        type: 'li',
        props: {
            children: [...component], // Os componentes fornecidos como filhos do elemento de lista
        },
    };
};


/**
 * Objeto representando uma lista não ordenada (<ul>) com itens de lista.
 * @type {Object}
 * @property {string} type - O tipo de elemento HTML.
 * @property {Object} props - As propriedades do elemento.
 * @property {string} props.class - A classe CSS do elemento.
 * @property {Array<Object>} props.children - Os elementos filhos da lista.
 */
const ul = {
    type: 'ul',
    props: {
        class: 'dropdown-content', // A classe CSS da lista
        children: [ // Os itens de lista como filhos da lista
            getLi(divBtn), // Item de lista contendo um botão
            getLi(checkbox), // Item de lista contendo uma caixa de seleção
            getLi(sliderRestitution), // Item de lista contendo um controle deslizante para restituição
            getLi(sliderGravityX, sliderGravityY), // Item de lista contendo controles deslizantes para gravidade nos eixos X e Y
            getLi(sliderRaioBola), // Item de lista contendo um controle deslizante para o raio da bola
            getLi(sliderNumBalls), // Item de lista contendo um controle deslizante para o número de bolas
            getLi(colorpick), // Item de lista contendo um seletor de cores
        ],
    },
};


/**
 * Cria e renderiza um dropdown no elemento fornecido.
 * @param {HTMLElement} ele - O elemento onde o dropdown será renderizado.
 * @returns {HTMLElement} O elemento raiz do dropdown renderizado.
 */
export const createDropdown = (ele) => {
    const dropdown = {
        type: 'div',
        props: {
            class: 'dropdown', // A classe CSS do dropdown
            children: [dropbtn, ul], // O botão e a lista do dropdown como filhos
        },
    };
    return renderElement(dropdown, true, ele); // Renderiza o dropdown dentro do elemento fornecido
};

