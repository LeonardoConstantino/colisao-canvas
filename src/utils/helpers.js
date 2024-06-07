import { colors } from './constants.js';

export const delay = async (ms) => {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

export const rnd = (max, min) => Math.random() * (max - min) + min

const rgbToHexDigit = (value) => {
  const hex = value.toString(16).padStart(2, '0');
    return hex;
};

/**
* Converte uma string RGB para hexadecimal de 3 dígitos.
* @param {string} rgb - A string no formato "rgb(r,g,b)".
* @returns {string} A cor no formato hexadecimal de 3 dígitos.
* @throws {Error} Se a entrada não estiver no formato correto.
*
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

export const setStyles = (canvas) => {
	document.body.style.backgroundColor = colors.background
	canvas.style.border = `${colors.text} 1px solid`
};