/**
 * Classe que representa um vetor 2D e fornece métodos para operações vetoriais.
 */
export class Vector2 {
    /**
     * Cria uma instância de Vector2.
     * @param {number} [x=0.0] - A coordenada x do vetor.
     * @param {number} [y=0.0] - A coordenada y do vetor.
     */
    constructor(x = 0.0, y = 0.0) {
        /** @type {number} */
        this.x = x;
        /** @type {number} */
        this.y = y;
    }

    /**
     * Define as coordenadas do vetor.
     * @param {Vector2} v - O vetor cujas coordenadas serão copiadas.
     */
    set(v) {
        this.x = v.x;
        this.y = v.y;
    }

    /**
     * Cria uma cópia do vetor.
     * @returns {Vector2} Um novo vetor com as mesmas coordenadas.
     */
    clone() {
        return new Vector2(this.x, this.y);
    }

    /**
     * Adiciona um vetor escalado por um fator ao vetor atual.
     * @param {Vector2} v - O vetor a ser adicionado.
     * @param {number} [s=1.0] - O fator de escala.
     * @returns {Vector2} O vetor resultante.
     */
    add(v, s = 1.0) {
        this.x += v.x * s;
        this.y += v.y * s;
        return this;
    }

    /**
     * Define as coordenadas do vetor atual como a soma de dois vetores.
     * @param {Vector2} a - O primeiro vetor.
     * @param {Vector2} b - O segundo vetor.
     * @returns {Vector2} O vetor resultante.
     */
    addVectors(a, b) {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        return this;
    }

    /**
     * Subtrai um vetor escalado por um fator do vetor atual.
     * @param {Vector2} v - O vetor a ser subtraído.
     * @param {number} [s=1.0] - O fator de escala.
     * @returns {Vector2} O vetor resultante.
     */
    subtract(v, s = 1.0) {
        this.x -= v.x * s;
        this.y -= v.y * s;
        return this;
    }

    /**
     * Define as coordenadas do vetor atual como a diferença entre dois vetores.
     * @param {Vector2} a - O primeiro vetor.
     * @param {Vector2} b - O segundo vetor.
     * @returns {Vector2} O vetor resultante.
     */
    subtractVectors(a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        return this;
    }

    /**
     * Calcula o comprimento (magnitude) do vetor.
     * @returns {number} O comprimento do vetor.
     */
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Escala o vetor por um fator.
     * @param {number} s - O fator de escala.
     * @returns {Vector2} O vetor resultante.
     */
    scale(s) {
        this.x *= s;
        this.y *= s;
        return this;
    }

    /**
     * Calcula o produto escalar com outro vetor.
     * @param {Vector2} v - O vetor com o qual calcular o produto escalar.
     * @returns {number} O produto escalar.
     */
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
}
