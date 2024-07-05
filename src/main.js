/**
 * Importa todos os arquivos CSS da pasta assets/styles e subdiretórios.
 * @param {WebpackRequireContext} r - Contexto de importação fornecido pela função require.context.
 */
const importAll = (r) => r.keys().forEach(r)
importAll(require.context('./assets/styles/', true, /\.css$/))

import { createCanvas } from './components/canvas.js'; // Importa a função createCanvas do arquivo 'canvas.js' na pasta 'components'
import { physicsScene } from './utils/constants.js'; // Importa a constante physicsScene do arquivo 'constants.js' na pasta 'utils'
import { setStyles } from './utils/helpers.js'; // Importa a função setStyles do arquivo 'helpers.js' na pasta 'utils'
import { sizeCanvasHandle } from './utils/sizeCanvasHandle.js'; // Importa a função sizeCanvasHandle do arquivo 'sizeCanvasHandle.js' na pasta 'utils'
import { setupScene } from './services/setupScene.js'; // Importa a função setupScene do arquivo 'setupScene.js' na pasta 'services'
import { update } from './services/update.js'; // Importa a função update do arquivo 'update.js' na pasta 'services'
import {
    clickCanvasHandle,
    mousemoveHandle,
    keypressHandle,
} from './services/handle.js'; // Importa as funções clickCanvasHandle, mousemoveHandle e keypressHandle do arquivo 'handle.js' na pasta 'services'
import { createDropdown } from './components/dropdown.js'; // Importa a função createDropdown do arquivo 'dropdown.js' na pasta 'components'


/**
 * Event listener que é chamado quando o DOM é completamente carregado.
 * Inicializa a aplicação.
 * @event DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app'); // Elemento HTML com id 'app' onde a aplicação será montada
    const canvas = createCanvas(); // Cria um elemento de canvas

    const sizeCanvas = sizeCanvasHandle(canvas, window); // Manipula o tamanho do canvas

    const { cScale } = sizeCanvas; // Escala do canvas

    setStyles(canvas); // Define estilos para o canvas

    setupScene(); // Configura a cena inicial

    update(physicsScene, canvas, sizeCanvas, 60); // Atualiza a cena

    // Event listener para cliques no canvas
    canvas.addEventListener('click', () => {
        clickCanvasHandle();
    });

    // Event listener para movimento do mouse sobre o canvas
    canvas.addEventListener('mousemove', (e) => {
        mousemoveHandle(e, canvas, cScale);
    });

    // Event listener para pressionamento de teclas
    window.addEventListener('keypress', keypressHandle);

    createDropdown(app); // Cria um dropdown e adiciona ao elemento 'app'

    app.append(canvas); // Adiciona o canvas ao elemento 'app'
});
