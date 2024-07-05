import { Vector2 } from '../services/Vector2.js'; // Importa a classe Vector2 do arquivo 'Vector2.js' na pasta 'services'

/**
 * Cores utilizadas na aplicação.
 * @typedef {Object} Colors
 * @property {string} text - Cor do texto.
 * @property {string} background - Cor de fundo.
 * @property {string} primary - Cor primária.
 * @property {string} secondary - Cor secundária.
 * @property {string} accent - Cor de destaque.
 */
export const colors = {
    text: 'rgb(240, 232, 249)', // Cor do texto
    background: 'rgb(11, 5, 19)', // Cor de fundo
    primary: 'rgb(176, 148, 225)', // Cor primária
    secondary: 'rgb(139, 90, 39)', // Cor secundária
    accent: 'rgb(160, 201, 65)', // Cor de destaque
};


/**
 * Cópia das cores padrão.
 * @type {Object}
 */
export const colorsReset = { ...colors }; // Cópia das cores padrão

/**
 * Configurações da cena de física.
 * @typedef {Object} PhysicsScene
 * @property {Vector2} gravity - O vetor de gravidade.
 * @property {number} dt - O intervalo de tempo.
 * @property {Vector2|null} worldSize - O tamanho do mundo.
 * @property {number|null} cScale - A escala de conversão.
 * @property {number|null} simWidth - A largura da simulação.
 * @property {number|null} simHeight - A altura da simulação.
 * @property {boolean} paused - Indicador de pausa.
 * @property {Ball[]} balls - A lista de bolas na cena.
 * @property {number} restitution - O coeficiente de restituição.
 * @property {number} radius - O raio das bolas.
 * @property {number} numBalls - O número de bolas.
 * @property {number} delayToAppear - O atraso para aparecer.
 * @property {boolean} showFrameRate - Indicador de exibição da taxa de quadros.
 * @property {number} frameRate - A taxa de quadros.
 */
export const physicsScene = {
    gravity: new Vector2(0.0, -3.8),
    dt: 1.0 / 60.0,
    worldSize: null,
    cScale: null,
    simWidth: null,
    simHeight: null,
    paused: false,
    balls: [],
    restitution: 0.8,
    radius: 0.2,
    numBalls: 10,
    delayToAppear: 250,
    showFrameRate: false,
    frameRate: 0,
};


/**
 * Cópia das configurações padrão da cena de física.
 * @type {Object}
 */
export const physicsSceneReset = { ...physicsScene }; // Cópia das configurações padrão da cena de física
