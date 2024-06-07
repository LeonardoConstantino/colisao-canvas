/**
 * Retorna um número aleatório dentro de um intervalo especificado.
 * @param {number} [minimo=0] - O valor mínimo do intervalo (inclusivo).
 * @param {number} [maximo=100] - O valor máximo do intervalo (inclusivo).
 * @returns {number} Um número aleatório dentro do intervalo especificado.
 * @example
 * Caso de teste 1: Intervalo padrão (0 a 100)
 * console.log("Caso de teste 1 - Intervalo padrão (0 a 100):")
 * console.log(numeroAleatorio())
 *
 * Caso de teste 2: Intervalo personalizado (10 a 20)
 * console.log("Caso de teste 2 - Intervalo personalizado (10 a 20):")
 * console.log(numeroAleatorio(10, 20))
 *
 * Caso de teste 3: Intervalo personalizado (1000 a 2000)
 * console.log("Caso de teste 3 - Intervalo personalizado (1000 a 2000):")
 * console.log(numeroAleatorio(1000, 2000))
 *
 * Caso de teste 4: Intervalo invertido (50 a 30) - Será invertido automaticamente
 * console.log(
 * 	"Caso de teste 4 - Intervalo invertido (50 a 30) - Será invertido automaticamente:"
 * )
 * console.log(numeroAleatorio(50, 30))
 *
 * Caso de teste 5: Parâmetros inválidos (strings)
 * console.log("Caso de teste 5 - Parâmetros inválidos (strings):")
 * console.log(numeroAleatorio("abc", "def"))
 */
export const numeroAleatorio = (minimo = 0, maximo = 100) => {
	// Verifica se os parâmetros são números válidos
	if (
		typeof minimo !== "number" ||
		typeof maximo !== "number" ||
		isNaN(minimo) ||
		isNaN(maximo)
	) {
		console.warn(
			"Os parâmetros devem ser números válidos. Retornando número aleatório entre 0 e 100."
		)
		minimo = 0
		maximo = 100
	}

	// Garante que minimo seja menor ou igual a maximo
	if (minimo > maximo) {
		;[minimo, maximo] = [maximo, minimo]
	}

	// Gera um número aleatório dentro do intervalo [minimo, maximo]
	return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo
}

const teste = () => {
	// Caso de teste 1: Intervalo padrão (0 a 100)
	console.log("Caso de teste 1 - Intervalo padrão (0 a 100):")
	console.log(numeroAleatorio())

	// Caso de teste 2: Intervalo personalizado (10 a 20)
	console.log("Caso de teste 2 - Intervalo personalizado (10 a 20):")
	console.log(numeroAleatorio(10, 20))

	// Caso de teste 3: Intervalo personalizado (1000 a 2000)
	console.log("Caso de teste 3 - Intervalo personalizado (1000 a 2000):")
	console.log(numeroAleatorio(1000, 2000))

	// Caso de teste 4: Intervalo invertido (50 a 30) - Será invertido automaticamente
	console.log(
		"Caso de teste 4 - Intervalo invertido (50 a 30) - Será invertido automaticamente:"
	)
	console.log(numeroAleatorio(50, 30))

	// Caso de teste 5: Parâmetros inválidos (strings)
	console.log("Caso de teste 5 - Parâmetros inválidos (strings):")
	console.log(numeroAleatorio("abc", "def"))
}

// teste()
