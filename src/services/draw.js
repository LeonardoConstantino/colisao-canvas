import { colors } from '../utils/constants.js'

const fontUrl =
	'https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2'

let showLog = true

const loadFont = async (ctx, maxAttempts = 10, interval = 500) => {
	const fontFace = new FontFace('PressStart2P', `url(${fontUrl})`)
	let attempts = 0

	const tryLoadFont = async () => {
		try {
			await fontFace.load()
			document.fonts.add(fontFace)
			ctx.font = '16px PressStart2P'
			if (showLog) {
				console.log('Fonte carregada com sucesso.')
				showLog = false
			}
		} catch (err) {
			attempts++
			if (showLog) {
				console.error(
					`Erro ao carregar a fonte na tentativa ${attempts}:`,
					err
				)
			}
			if (attempts < maxAttempts) {
				setTimeout(tryLoadFont, interval)
			} else {
				ctx.font = 'bold 20px Monospace'
				if (showLog) {
					console.error(
						'Não foi possível carregar a fonte após várias tentativas.'
					)
					showLog = false
				}
			}
		}
	}

	tryLoadFont()
}

const drawRoundedRect = (ctx, x, y, width, height, radius, fillColor) => {
	ctx.beginPath()
	ctx.moveTo(x + radius, y)
	ctx.lineTo(x + width - radius, y)
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
	ctx.lineTo(x + width, y + height - radius)
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
	ctx.lineTo(x + radius, y + height)
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
	ctx.lineTo(x, y + radius)
	ctx.quadraticCurveTo(x, y, x + radius, y)
	ctx.closePath()
	ctx.fillStyle = fillColor
	ctx.fill()
}

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

	ctx.fillStyle = textColor
	ctx.globalAlpha = 0.4

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
	ctx.globalAlpha = 0.8
	ctx.fillStyle = textColor
	ctx.fillText(text, x, y)

	// Restaurar o estado do contexto
	ctx.restore()
}

export const draw = async (canvas, physicsScene, sizeCanvas) => {
	const ctx = canvas.getContext('2d')
	await loadFont(ctx)
	const { cScale, convertCoordinates } = sizeCanvas
	// Limpa o canvas
	ctx.fillStyle = colors.primary
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	// Função para criar gradiente radial
	const createGradient = (x, y, radius, c1, c2) => {
		// console.log(x, y, radius, c1, c2)
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

	// Desenha todas as bolas da cena física
	physicsScene.balls.forEach((ball) => {
		const x = convertCoordinates.cX(ball.pos)
		const y = convertCoordinates.cY(ball.pos)
		const radius = cScale * ball.radius

		// Define o estilo de preenchimento com o gradiente radial
		ctx.fillStyle = createGradient(x, y, radius, ball.cor1, ball.cor2)

		// Desenha um círculo representando a bola
		ctx.beginPath()
		ctx.arc(x, y, radius, 0.0, 2.0 * Math.PI)
		ctx.closePath()
		ctx.fill()
	})

	if (physicsScene.showFrameRate) {
		drawTextWithBackground(
			ctx,
			physicsScene.frameRate,
			27,
			38,
			colors.text,
			colors.background
		)
	}
}
