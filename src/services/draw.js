import { colors } from '../utils/constants.js' // Importa as cores do arquivo 'constants.js' na pasta 'utils'

let showLog = true // Flag para controlar a exibição de mensagens de log

/**
 * Carrega a fonte PressStart2P de forma assíncrona e adiciona ao documento.
 * @param {number} [maxAttempts=10] - O número máximo de tentativas de carregamento da fonte.
 * @param {number} [interval=500] - O intervalo de tempo entre as tentativas de carregamento da fonte, em milissegundos.
 */
const loadFont = async (maxAttempts = 10, interval = 500) => {
	const fontUrl =
		'https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2' // URL da fonte PressStart2P

	const fontFace = new FontFace('PressStart2P', `url(${fontUrl})`) // Cria uma instância de FontFace com a URL da fonte
	let attempts = 0 // Contador de tentativas de carregamento

	/**
	 * Tenta carregar a fonte de forma assíncrona.
	 */
	const tryLoadFont = async () => {
		try {
			await fontFace.load() // Aguarda o carregamento da fonte
			document.fonts.add(fontFace) // Adiciona a fonte carregada ao documento
			if (showLog) {
				console.log('Fonte carregada com sucesso.') // Exibe mensagem de sucesso no console
				showLog = false // Define showLog como falso para evitar mensagens repetidas
			}
		} catch (err) {
			attempts++ // Incrementa o número de tentativas
			if (showLog) {
				console.error(
					`Erro ao carregar a fonte na tentativa ${attempts}:`,
					err
				) // Exibe mensagem de erro no console
			}
			if (attempts < maxAttempts) {
				setTimeout(tryLoadFont, interval) // Tenta carregar novamente após um intervalo de tempo
			} else {
				if (showLog) {
					console.error(
						'Não foi possível carregar a fonte após várias tentativas.'
					) // Exibe mensagem de erro no console
					showLog = false // Define showLog como falso para evitar mensagens repetidas
				}
			}
		}
	}

	tryLoadFont() // Inicia o processo de carregamento da fonte
}

loadFont() // Inicia o carregamento da fonte

/**
 * Desenha um retângulo arredondado no contexto do canvas.
 * @param {CanvasRenderingContext2D} ctx - O contexto do canvas onde o retângulo será desenhado.
 * @param {number} x - A coordenada x do canto superior esquerdo do retângulo.
 * @param {number} y - A coordenada y do canto superior esquerdo do retângulo.
 * @param {number} width - A largura do retângulo.
 * @param {number} height - A altura do retângulo.
 * @param {number} radius - O raio dos cantos arredondados do retângulo.
 * @param {string} fillColor - A cor de preenchimento do retângulo.
 */
const drawRoundedRect = (ctx, x, y, width, height, radius, fillColor) => {
	ctx.beginPath() // Inicia um novo caminho de desenho
	ctx.moveTo(x + radius, y) // Move para a posição inicial no topo do retângulo
	ctx.lineTo(x + width - radius, y) // Desenha uma linha reta até o canto superior direito
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius) // Desenha um quarto de círculo no canto superior direito
	ctx.lineTo(x + width, y + height - radius) // Desenha uma linha reta até o canto inferior direito
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height) // Desenha um quarto de círculo no canto inferior direito
	ctx.lineTo(x + radius, y + height) // Desenha uma linha reta até o canto inferior esquerdo
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius) // Desenha um quarto de círculo no canto inferior esquerdo
	ctx.lineTo(x, y + radius) // Desenha uma linha reta até o canto superior esquerdo
	ctx.quadraticCurveTo(x, y, x + radius, y) // Desenha um quarto de círculo no canto superior esquerdo
	ctx.closePath() // Fecha o caminho de desenho
	ctx.fillStyle = fillColor // Define a cor de preenchimento
	ctx.fill() // Preenche o retângulo com a cor especificada
}

/**
 * Desenha texto com um fundo colorido no contexto do canvas.
 * @param {CanvasRenderingContext2D} ctx - O contexto do canvas onde o texto será desenhado.
 * @param {string} text - O texto a ser desenhado.
 * @param {number} x - A coordenada x da posição do texto.
 * @param {number} y - A coordenada y da posição do texto.
 * @param {string} [textColor='black'] - A cor do texto. Padrão é 'black'.
 * @param {string} [bgColor='white'] - A cor do fundo. Padrão é 'white'.
 * @param {number} [padding=10] - O espaçamento entre o texto e o fundo. Padrão é 10 pixels.
 * @param {number} [borderRadius=6] - O raio dos cantos arredondados do fundo. Padrão é 6 pixels.
 */
const drawTextWithBackground = (
	ctx,
	text,
	x,
	y,
	textColor = 'black',
	bgColor = 'white',
	padding = 10,
	borderRadius = 6
) => {
	// Salvar o estado do contexto para restaurar depois
	ctx.save()

	ctx.fillStyle = textColor // Define a cor do texto
	ctx.globalAlpha = 0.4 // Define a transparência global

	// Medir as dimensões do texto
	const textMetrics = ctx.measureText(text)
	const textWidth = textMetrics.width
	const textHeight =
		textMetrics.actualBoundingBoxAscent +
		textMetrics.actualBoundingBoxDescent

	// Desenhar o retângulo de fundo
	drawRoundedRect(
		ctx,
		x - padding,
		y - textHeight - padding - 2,
		textWidth + 2 * padding,
		textHeight + 2 * padding,
		borderRadius,
		bgColor
	)

	// Desenhar o texto
	ctx.globalAlpha = 0.8 // Redefine a transparência global
	ctx.fillStyle = textColor // Redefine a cor do texto
	ctx.fillText(text, x, y) // Desenha o texto

	// Restaurar o estado do contexto
	ctx.restore()
}

/**
 * Desenha a cena física no canvas.
 * @param {HTMLCanvasElement} canvas - O elemento canvas onde a cena será desenhada.
 * @param {object} physicsScene - O objeto contendo a cena física a ser desenhada.
 * @param {object} sizeCanvas - O objeto contendo informações sobre o tamanho do canvas.
 * @param {number} sizeCanvas.cScale - O fator de escala do canvas.
 * @param {object} sizeCanvas.convertCoordinates - O objeto contendo funções para conversão de coordenadas.
 * @param {function} sizeCanvas.convertCoordinates.cX - Função para converter coordenada x.
 * @param {function} sizeCanvas.convertCoordinates.cY - Função para converter coordenada y.
 */
export const draw = (canvas, physicsScene, sizeCanvas) => {
	const ctx = canvas.getContext('2d') // Obter o contexto 2D do canvas
	const { cScale, convertCoordinates } = sizeCanvas // Extrair informações sobre o tamanho do canvas
	// Limpar o canvas
	ctx.fillStyle = colors.primary
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	/**
	 * Cria um gradiente radial para preenchimento.
	 * @param {number} x - A coordenada x do centro do gradiente.
	 * @param {number} y - A coordenada y do centro do gradiente.
	 * @param {number} radius - O raio do gradiente.
	 * @param {string} c1 - A cor no ponto inicial do gradiente.
	 * @param {string} c2 - A cor no ponto final do gradiente.
	 * @returns {CanvasGradient} O gradiente radial criado.
	 */
	const createGradient = (x, y, radius, c1, c2) => {
		const gradient = ctx.createRadialGradient(
			x,
			y,
			radius / 20,
			x,
			y,
			radius
		)
		gradient.addColorStop(1, c1)
		gradient.addColorStop(0, c2)
		return gradient
	}

	// Desenhar todas as bolas da cena física
	physicsScene.balls.forEach((ball) => {
		const x = convertCoordinates.cX(ball.pos)
		const y = convertCoordinates.cY(ball.pos)
		const radius = cScale * ball.radius

		// Definir o estilo de preenchimento com o gradiente radial
		ctx.fillStyle = createGradient(x, y, radius, ball.cor1, ball.cor2)

		// Desenhar um círculo representando a bola
		ctx.beginPath()
		ctx.arc(x, y, radius, 0.0, 2.0 * Math.PI)
		ctx.closePath()
		ctx.fill()
	})

	// Se a opção de exibir a taxa de quadros estiver ativada
	if (physicsScene.showFrameRate) {
		ctx.font = '16px PressStart2P' // Define a fonte
		drawTextWithBackground(
			ctx,
			physicsScene.frameRate,
			27,
			38,
			colors.text,
			colors.background
		) // Desenha o texto da taxa de quadros com fundo
	}
}
