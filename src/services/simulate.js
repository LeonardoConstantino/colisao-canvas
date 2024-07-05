import { Vector2 } from './Vector2.js'; // Importa a classe Vector2 do arquivo 'Vector2.js' na pasta 'services'

/**
 * Manipula a colisão entre duas bolas e atualiza suas velocidades.
 * @param {Object} ball1 - Informações sobre a primeira bola.
 * @param {Vector2} ball1.pos - Posição da primeira bola.
 * @param {Vector2} ball1.vel - Velocidade da primeira bola.
 * @param {number} ball1.radius - Raio da primeira bola.
 * @param {number} ball1.mass - Massa da primeira bola.
 * @param {Object} ball2 - Informações sobre a segunda bola.
 * @param {Vector2} ball2.pos - Posição da segunda bola.
 * @param {Vector2} ball2.vel - Velocidade da segunda bola.
 * @param {number} ball2.radius - Raio da segunda bola.
 * @param {number} ball2.mass - Massa da segunda bola.
 * @param {number} restitution - Coeficiente de restituição da colisão.
 */
const handleBallCollision = (ball1, ball2, restitution) => {
    const EPSILON = 1e-10; // Valor de tolerância para evitar falsas colisões

    // Calcula a direção da colisão
    const direction = new Vector2();
    direction.subtractVectors(ball2.pos, ball1.pos); // Vetor da primeira bola à segunda bola
    const distance = direction.length(); // Distância entre as bolas

    // Verifica se as bolas estão colidindo
    if (distance < EPSILON || distance > ball1.radius + ball2.radius) return;

    direction.scale(1.0 / distance); // Normaliza a direção da colisão

    // Corrige a posição das bolas para evitar sobreposição
    const overlap = ball1.radius + ball2.radius - distance; // Quantidade de sobreposição
    const correction = overlap / 2.0; // Correção para cada bola
    ball1.pos.add(direction.clone().scale(-correction)); // Move a primeira bola
    ball2.pos.add(direction.clone().scale(correction)); // Move a segunda bola

    // Calcula as velocidades na direção da colisão
    const velocity1 = ball1.vel.dot(direction);
    const velocity2 = ball2.vel.dot(direction);

    // Calcula as novas velocidades após a colisão
    const mass1 = ball1.mass;
    const mass2 = ball2.mass;
    const newVelocity1 = (velocity1 * (mass1 - mass2) + 2 * mass2 * velocity2) / (mass1 + mass2);
    const newVelocity2 = (velocity2 * (mass2 - mass1) + 2 * mass1 * velocity1) / (mass1 + mass2);

    // Aplica o coeficiente de restituição
    const finalVelocity1 = newVelocity1 * restitution;
    const finalVelocity2 = newVelocity2 * restitution;

    // Atualiza as velocidades das bolas na direção da colisão
    ball1.vel.add(direction.clone().scale(finalVelocity1 - velocity1)); // Atualiza a velocidade da primeira bola
    ball2.vel.add(direction.clone().scale(finalVelocity2 - velocity2)); // Atualiza a velocidade da segunda bola
};


// ------------------------------------------------------

/**
 * Manipula a colisão de uma bola com as paredes do mundo e atualiza sua posição e velocidade.
 * @param {Object} ball - Informações sobre a bola.
 * @param {Vector2} ball.pos - Posição atual da bola.
 * @param {Vector2} ball.vel - Velocidade atual da bola.
 * @param {number} ball.radius - Raio da bola.
 * @param {Object} worldSize - Tamanho do mundo.
 * @param {number} worldSize.x - Largura do mundo.
 * @param {number} worldSize.y - Altura do mundo.
 */
const handleWallCollision = (ball, worldSize) => {
    /**
     * Função interna para tratar a colisão da bola com uma parede em um eixo específico.
     * @param {string} axis - O eixo (x ou y) em que ocorre a colisão.
     * @param {number} maxBound - O limite máximo na direção do eixo.
     */
    const collide = (axis, maxBound) => {
        if (ball.pos[axis] < ball.radius) {
            ball.pos[axis] = ball.radius; // Define a posição da bola para evitar que ela saia da parede
            ball.vel[axis] = -ball.vel[axis]; // Inverte a direção da velocidade para simular o rebote na parede
        } else if (ball.pos[axis] > maxBound - ball.radius) {
            ball.pos[axis] = maxBound - ball.radius; // Define a posição da bola para evitar que ela saia da parede
            ball.vel[axis] = -ball.vel[axis]; // Inverte a direção da velocidade para simular o rebote na parede
        }
    };

    // Verifica e trata a colisão em cada eixo
    collide('x', worldSize.x); // Colisão com as paredes laterais (eixo x)
    collide('y', worldSize.y); // Colisão com as paredes superior e inferior (eixo y)
};


// simulation -------------------------------------------------------

/**
 * Simula o movimento das bolas na cena de física, aplicando gravidade e detectando colisões.
 * @param {Object} physicsScene - Configurações da cena de física.
 * @param {Array<Object>} physicsScene.balls - Array contendo informações sobre as bolas na cena.
 * @param {number} physicsScene.dt - Intervalo de tempo da simulação.
 * @param {Vector2} physicsScene.gravity - Vetor de gravidade aplicado às bolas.
 * @param {number} physicsScene.restitution - Coeficiente de restituição das colisões.
 * @param {Object} physicsScene.worldSize - Tamanho do mundo.
 * @param {number} physicsScene.worldSize.x - Largura do mundo.
 * @param {number} physicsScene.worldSize.y - Altura do mundo.
 */
export const simulate = (physicsScene) => {
    // Loop através de todas as bolas na cena
    for (let i = 0; i < physicsScene.balls.length; i++) {
        const ball1 = physicsScene.balls[i]; // Bola atual
        ball1.simulate(physicsScene.dt, physicsScene.gravity); // Simula o movimento da bola

        // Loop através de todas as outras bolas na cena
        for (let j = i + 1; j < physicsScene.balls.length; j++) {
            const ball2 = physicsScene.balls[j]; // Outra bola
            handleBallCollision(ball1, ball2, physicsScene.restitution); // Verifica e trata a colisão entre as duas bolas
        }

        handleWallCollision(ball1, physicsScene.worldSize); // Verifica e trata a colisão da bola com as paredes do mundo
    }
};
