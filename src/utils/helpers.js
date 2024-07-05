import { colors } from './constants.js'; // Importa as cores da paleta de cores definida no arquivo 'constants.js'

/**
 * Função para adicionar um atraso assíncrono.
 * @param {number} ms - O tempo de atraso em milissegundos.
 * @returns {Promise<void>} Uma promessa que resolve após o tempo especificado.
 */
export const delay = async (ms) => {
    await new Promise((resolve) => setTimeout(resolve, ms)); // Aguarda o tempo especificado
};

/**
 * Gera um número aleatório entre um intervalo especificado.
 * @param {number} max - O valor máximo do intervalo (exclusivo).
 * @param {number} min - O valor mínimo do intervalo.
 * @returns {number} Um número aleatório no intervalo [min, max).
 */
export const rnd = (max, min) => Math.random() * (max - min) + min;

/**
 * Converte um valor RGB para seu equivalente hexadecimal de 2 dígitos.
 * @param {number} value - O valor a ser convertido.
 * @returns {string} O valor hexadecimal de 2 dígitos.
 */
const rgbToHexDigit = (value) => {
    const hex = value.toString(16).padStart(2, '0'); // Converte para hexadecimal e adiciona zero à esquerda se necessário
    return hex;
};

/**
 * Converte uma string RGB para seu equivalente hexadecimal de 3 dígitos.
 * @param {string} rgb - A string no formato "rgb(r,g,b)".
 * @returns {string} A cor no formato hexadecimal de 3 dígitos.
 * @throws {Error} Se a entrada não estiver no formato correto.
 * @example
 * console.log(rgbToHex3("rgb(255,255,255)")); // Saída: #fff
 * @example
 * console.log(rgbToHex3("rgb(102,205,170)")); // Saída: #6ca
 */
export const rgbToHex3 = (rgb) => {
    // Extrai os valores RGB da string
    const rgbValues = rgb.match(/\d+/g).map(Number);

    if (rgbValues.length !== 3) {
        throw new Error('Entrada RGB inválida. Deve estar no formato "rgb(r,g,b)"');
    }

    const [r, g, b] = rgbValues;
    return `#${rgbToHexDigit(r)}${rgbToHexDigit(g)}${rgbToHexDigit(b)}`;
};

/**
 * Define estilos para o canvas e o corpo do documento.
 * @param {HTMLCanvasElement} canvas - O elemento canvas para o qual os estilos serão aplicados.
 */
export const setStyles = (canvas) => {
    document.body.style.backgroundColor = colors.background; // Define a cor de fundo do corpo do documento
    canvas.style.border = `${colors.text} 1px solid`; // Define a borda do canvas com a cor do texto da paleta de cores
};
