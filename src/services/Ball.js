export class Ball {
	constructor(radius, mass, pos, vel, cor1, cor2) {
		this.radius = radius
		this.mass = mass
		this.pos = pos.clone()
		this.vel = vel.clone()
		this.cor1 = cor1
		this.cor2 = cor2
	}
	simulate(dt, gravity) {
		this.vel.add(gravity, dt)
		this.pos.add(this.vel, dt)
	}
}