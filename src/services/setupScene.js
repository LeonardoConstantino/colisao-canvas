import { Vector2 } from '../services/Vector2.js'; // Importa a classe Vector2 do arquivo 'Vector2.js' na pasta 'services'
import { Ball } from '../services/Ball.js'; // Importa a classe Ball do arquivo 'Ball.js' na pasta 'services'
import { colors, physicsScene } from '../utils/constants.js'; // Importa as cores e as configurações da cena de física do arquivo 'constants.js' na pasta 'utils'
import { delay, rnd } from '../utils/helpers.js'; // Importa a função delay e rnd do arquivo 'helpers.js' na pasta 'utils'

/**
 * Cria uma nova bola com os parâmetros especificados.
 * @param {number} radius - Raio da bola.
 * @param {number} mass - Massa da bola.
 * @param {Vector2} pos - Posição inicial da bola.
 * @param {Vector2} vel - Velocidade inicial da bola.
 * @returns {Ball} Uma nova instância da classe Ball.
 */
const createBall = (radius, mass, pos, vel) => {
    return new Ball(
        radius,
        mass,
        pos.clone(), // Clone da posição para evitar alterações acidentais
        vel.clone(), // Clone da velocidade para evitar alterações acidentais
        colors.secondary, // Cor de preenchimento da bola
        colors.accent // Cor da borda da bola
    );
};

/**
 * Adiciona uma nova bola à cena com posição e velocidade aleatórias.
 * @param {number} simWidth - Largura da simulação.
 * @param {number} simHeight - Altura da simulação.
 * @returns {Ball} Uma nova instância da classe Ball.
 */
const addBall = (simWidth, simHeight) => {
    let mass = Math.PI * physicsScene.radius ** 2; // Calcula a massa da bola (área do círculo)
    let pos = new Vector2(rnd(simWidth, 0), simHeight); // Posição aleatória dentro da largura da simulação e na parte superior da tela
    let vel = new Vector2(rnd(1, -1), rnd(1, -1)); // Velocidade aleatória em ambas as direções

    return createBall(physicsScene.radius, mass, pos, vel); // Retorna uma nova bola criada com os parâmetros especificados
};

/**
 * Configura a cena de física, adicionando bolas com atrasos graduais para visualização.
 */
export const setupScene = async () => {
    physicsScene.balls = []; // Limpa a lista de bolas na cena
    for (let i = 0; i < physicsScene.numBalls; i++) {
        if (physicsScene.balls.length > physicsScene.numBalls - 1) return; // Verifica se o número máximo de bolas foi alcançado
        physicsScene.balls.push(addBall(physicsScene.simHeight, physicsScene.simHeight)); // Adiciona uma nova bola à cena
        await delay(physicsScene.delayToAppear); // Aguarda um tempo para a próxima bola aparecer
    }
};
