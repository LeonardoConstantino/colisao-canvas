import { Vector2 } from '../services/Vector2.js'; // Importa a classe Vector2 do arquivo 'Vector2.js' na pasta 'services'
import { physicsScene, physicsSceneReset } from './constants.js'; // Importa as constantes physicsScene e physicsSceneReset do arquivo 'constants.js' na pasta atual
import { setupScene } from '../services/setupScene.js'; // Importa a função setupScene do arquivo 'setupScene.js' na pasta 'services'

/**
 * Função para ajustar o tamanho do canvas e definir algumas propriedades relacionadas.
 * @param {HTMLCanvasElement} canvas - O elemento canvas a ser manipulado.
 * @param {Window} window - A janela do navegador.
 * @returns {Object} - Um objeto contendo propriedades relacionadas ao tamanho do canvas.
 */
export const sizeCanvasHandle = (canvas, window) => {
    const simMinWidth = 2.0; // Largura mínima da simulação
    let cScale = Math.min(canvas.width, canvas.height) / simMinWidth; // Escala de conversão entre unidades de simulação e pixels
    let simWidth = canvas.width / cScale; // Largura da simulação
    let simHeight = canvas.height / cScale; // Altura da simulação

    /**
     * Atualiza a escala de conversão e redefine algumas propriedades relacionadas.
     */
    const updateScale = () => {
        cScale = Math.min(canvas.width, canvas.height) / simMinWidth;
        simWidth = canvas.width / cScale;
        simHeight = canvas.height / cScale;

        setupScene(); // Configura a cena com os novos valores
        physicsScene.worldSize.set(new Vector2(simWidth, simHeight)); // Atualiza o tamanho do mundo da cena de física
        physicsSceneReset.worldSize.set(new Vector2(simWidth, simHeight)); // Atualiza o tamanho do mundo da cena de física de reset
    };

    /**
     * Manipula o redimensionamento do canvas.
     */
    const resizeCanvasHandle = () => {
        canvas.width = window.innerWidth - 12; // Ajusta a largura do canvas
        canvas.height = window.innerHeight - 12; // Ajusta a altura do canvas

        updateScale(); // Atualiza a escala de conversão e as propriedades relacionadas
    };

    /**
     * Objeto para conversão de coordenadas.
     * @namespace
     * @property {Function} cX - Converte a coordenada x na escala da simulação para coordenada em pixels no eixo x do canvas.
     * @property {Function} cY - Converte a coordenada y na escala da simulação para coordenada em pixels no eixo y do canvas.
     * @property {Function} updateScale - Função para atualizar a escala de conversão e redefinir propriedades relacionadas.
     */
    const convertCoordinates = {
        cX(pos) {
            return pos.x * cScale;
        },
        cY(pos) {
            return canvas.height - pos.y * cScale;
        },
        updateScale,
    };

    // Inicialização das propriedades relacionadas ao tamanho do mundo da cena de física
    physicsScene.worldSize = new Vector2(simWidth, simHeight);
    physicsSceneReset.worldSize = physicsScene.worldSize;

    resizeCanvasHandle(); // Redimensiona o canvas

    // Define as propriedades relacionadas ao tamanho e escala da simulação nas cenas de física
    physicsScene.cScale = cScale;
    physicsScene.simWidth = simWidth;
    physicsScene.simHeight = simHeight;

    physicsSceneReset.cScale = cScale;
    physicsSceneReset.simWidth = simWidth;
    physicsSceneReset.simHeight = simHeight;

    // Adiciona um event listener para redimensionamento da janela
    window.addEventListener('resize', resizeCanvasHandle);

    // Retorna um objeto contendo as propriedades relacionadas ao tamanho do canvas
    return {
        cScale,
        simWidth,
        simHeight,
        convertCoordinates,
    };
};
