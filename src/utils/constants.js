import { Vector2 } from '../services/Vector2.js';

export const colors = {
	text: 'rgb(240, 232, 249)',
	background: 'rgb(11, 5, 19)',
	primary: 'rgb(176, 148, 225)',
	secondary: 'rgb(139, 90, 39)',
	accent: 'rgb(160, 201, 65)',
}

export const colorsReset = {...colors}

export const physicsScene = {
	gravity: new Vector2(0.0, -3.8),
	dt: 1.0 / 60.0,
	worldSize: null,
	cScale: null,
	simWidth: null,
	simHeight: null,
	paused: false,
	balls: [],
	restitution: 0.8,
	radius: 0.2,
	numBalls: 10,
	delayToAppear: 250,
	showFrameRate: false,
	frameRate: 0
}

export const physicsSceneReset = {...physicsScene}