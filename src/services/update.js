import { simulate } from './simulate.js';
import { draw } from './draw.js';

export const update = (physicsScene, canvas, sizeCanvas, frameRate = 60) => {
    const frameInterval = 1000 / frameRate; // Intervalo de tempo entre quadros (em milissegundos)
    let lastTime = performance.now();
    let frameCount = 0;
    let fps = 0;
    let lastFpsUpdate = performance.now();

    const loop = (currentTime) => {
        const deltaTime = currentTime - lastTime;

        if (deltaTime >= frameInterval) {
            lastTime = currentTime - (deltaTime % frameInterval);

            if (!physicsScene.paused) {
                simulate(physicsScene);
                draw(canvas, physicsScene, sizeCanvas);
            }

            // Contador de frames
            frameCount++;
            const timeSinceLastFpsUpdate = currentTime - lastFpsUpdate;

            if (timeSinceLastFpsUpdate >= 1000) {
                fps = frameCount;
                frameCount = 0;
                lastFpsUpdate = currentTime;

				physicsScene.frameRate = fps;
            }
        }

        requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
};
