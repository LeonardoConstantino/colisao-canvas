import { numeroAleatorio } from '../utils/numeroAleatorio.js'; // Importa a função numeroAleatorio do arquivo 'numeroAleatorio.js' na pasta 'utils'
import { colors, physicsScene } from '../utils/constants.js'; // Importa as cores e as configurações da cena de física do arquivo 'constants.js' na pasta 'utils'
import { Vector2 } from './Vector2.js'; // Importa a classe Vector2 do arquivo 'Vector2.js' na mesma pasta
import { setupScene } from './setupScene.js'; // Importa a função setupScene do arquivo 'setupScene.js' na mesma pasta
import { rnd } from '../utils/helpers.js';

/**
 * Manipula o evento de clique no canvas, alterando aleatoriamente as velocidades das bolas na cena.
 */
export const clickCanvasHandle = () => {
    // Loop através de metade das bolas na cena
    for (let i = 0; i < physicsScene.balls.length / 2; i++) {
        const idx = numeroAleatorio(0, physicsScene.balls.length - 1); // Obtém um índice aleatório de uma bola na cena
        // Define uma nova velocidade aleatória para a bola selecionada
        physicsScene.balls[idx].vel.set(
            new Vector2(rnd(-5,5), rnd(-5,5))
        );
    }
};


/**
 * Manipula o evento de movimento do mouse no canvas, ajustando a posição da primeira bola para seguir o cursor.
 * @param {MouseEvent} e - O evento do mouse.
 * @param {HTMLCanvasElement} canvas - O elemento canvas onde a simulação está ocorrendo.
 * @param {number} cScale - O fator de escala do canvas.
 */
export const mousemoveHandle = (e, canvas, cScale) => {
    const rect = canvas.getBoundingClientRect(); // Obtém as coordenadas do canvas
    // Calcula a posição do mouse no espaço da simulação
    const mousePos = {
        x: (e.clientX - rect.left) / cScale,
        y: (canvas.height - (e.clientY - rect.top)) / cScale,
    };
    // Verifica se há pelo menos uma bola na cena
    if (physicsScene.balls.length > 0) {
        // Define a posição da primeira bola para seguir o cursor do mouse
        physicsScene.balls[0].pos.set(mousePos);
        // Define a velocidade da primeira bola como zero para evitar movimentos indesejados
        physicsScene.balls[0].vel.set(new Vector2(0, 0));
        // Define as cores da primeira bola para destacar sua interação com o mouse
        physicsScene.balls[0].cor1 = colors.secondary;
        physicsScene.balls[0].cor2 = colors.text;
    }
};

/**
 * Manipula o evento de pressionar uma tecla, pausando ou retomando a simulação quando a tecla 'p' é pressionada.
 * @param {KeyboardEvent} e - O evento de teclado.
 */
export const keypressHandle = (e) => {
    if (e.key.toLowerCase() === 'p') {
        physicsScene.paused = !physicsScene.paused; // Alterna o estado de pausa da simulação
    }
};

/**
 * Manipula o evento de clique em um botão para pausar ou retomar a simulação.
 */
export const btnPauseHandler = () => {
    physicsScene.paused = !physicsScene.paused; // Alterna o estado de pausa da simulação
};

/**
 * Manipula o evento de clique em um botão para reiniciar a simulação.
 */
export const btnRecomecarHandler = () => {
    setupScene(); // Reinicia a cena de física
};


/**
 * Manipula o evento de clique em um botão para recarregar a página, reiniciando a simulação.
 */
export const btnResetHandler = () => {
    location.reload(); // Recarrega a página
};

/**
 * Manipula o evento de alteração de um controle deslizante para ajustar o coeficiente de restituição das colisões.
 * @param {Event} e - O evento de alteração.
 */
export const sliderRestitutionHandle = (e) => {
    physicsScene.restitution = +e.target.value; // Define o coeficiente de restituição com o valor do controle deslizante
    // Atualiza o valor exibido do coeficiente de restituição
    document.querySelector('[data-name="value"]').innerText = e.target.value;
};

/**
 * Manipula o evento de alteração de um controle deslizante para ajustar a gravidade da cena.
 * @param {Event} e - O evento de alteração.
 */
export const sliderGravityHandle = (e) => {
    const eixoYValue = document.querySelector("[data-eixo='y']").value; // Obtém o valor do controle deslizante para o eixo Y
    const eixoXValue = document.querySelector("[data-eixo='x']").value; // Obtém o valor do controle deslizante para o eixo X
    // Atualiza os valores exibidos para a componente X e Y da gravidade
    document.querySelector('[data-name="valueX"]').innerText = eixoXValue;
    document.querySelector('[data-name="valueY"]').innerText = eixoYValue;
    // Define o vetor de gravidade com os valores dos controles deslizantes
    physicsScene.gravity.set(new Vector2(+eixoXValue, +eixoYValue));
};

/**
 * Manipula o evento de alteração de um controle deslizante para ajustar o raio das bolas na cena.
 * @param {Event} e - O evento de alteração.
 */
export const sliderRaioBolaHandle = (e) => {
    physicsScene.radius = +e.target.value; // Define o raio das bolas com o valor do controle deslizante
    // Atualiza o valor exibido do raio das bolas
    document.querySelector('[data-name="valueRaio"]').innerText = (+e.target.value * 10).toFixed(2);
    // Atualiza o raio de todas as bolas na cena
    physicsScene.balls.forEach((bola) => {
        bola.radius = physicsScene.radius;
    });
};


/**
 * Manipula o evento de alteração de um controle deslizante para ajustar o número de bolas na cena.
 * @param {Event} e - O evento de alteração.
 */
export const sliderNumBallsHandle = (e) => {
    physicsScene.numBalls = +e.target.value; // Define o número de bolas com o valor do controle deslizante
    setupScene(); // Reinicia a cena com o novo número de bolas
    // Atualiza o valor exibido do número de bolas
    document.querySelector('[data-name="valueNumBalls"]').innerText = +e.target.value;
};

/**
 * Manipula o evento de alteração de um controle de cor para alterar as cores das bolas na cena.
 * @param {Event} e - O evento de alteração.
 */
export const changeColorHandle = (e) => {
    const cor = e.target.dataset.cor; // Obtém o nome da cor a ser alterada
    const value = e.target.value; // Obtém o novo valor da cor
    colors[cor] = value; // Atualiza a cor no objeto de cores
    // Função para aplicar a nova cor às bolas correspondentes
    const mudarCor = (cor) => {
        physicsScene.balls.forEach((bola) => {
            bola[cor] = e.target.value; // Define a cor correspondente para cada bola
        });
    };
    // Se a cor alterada for 'secondary', aplica a nova cor ao atributo 'cor1' das bolas
    if (cor === 'secondary') {
        mudarCor('cor1');
    }
    // Se a cor alterada for 'accent', aplica a nova cor ao atributo 'cor2' das bolas
    if (cor === 'accent') {
        mudarCor('cor2');
    }
};

/**
 * Manipula o evento de clique em um botão para mostrar ou ocultar a taxa de quadros por segundo (FPS) na cena.
 */
export const showFrameRateHandle = () => {
    physicsScene.showFrameRate = !physicsScene.showFrameRate; // Alterna o estado de exibição da taxa de quadros por segundo
};

