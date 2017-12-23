import React, { PureComponent } from 'react';
import { Stage, Layer, Circle, Text } from 'react-konva';

const G = 6.673e-11;

class Simulation extends PureComponent {
	constructor(props) {
		super(props);
		const {
			dt, m, x0, y0, u0, v0,
		} = props.data;
		this.state = {
			dt,
			m,
			x: x0,
			y: y0,
			u: u0,
			v: v0,
			t: 0,
		};
		this.colors = x0.map(this.generateRandomColor);
	}

	componentDidMount() {
		const { dt } = this.state;
		this.request = setInterval(this.tick, dt * 100);
	}

	componentWillUnmount() {
		clearInterval(this.request);
	}

calculateDistance = (x1, y1, x2, y2) => Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2));

calculateAcceleration = (starId) => {
	const { m, x, y } = this.state;

	let calculatedForceX = 0;
	let calculatedForceY = 0;

	m.forEach((_, id) => {
		if (id !== starId) {
			const distance = this.calculateDistance(x[starId], y[starId], x[id], y[id]);
			const force = (G * m[starId] * m[id]) / (distance ** 2);
			const cos = (x[starId] - x[id]) / distance;
			const sin = (y[starId] - y[id]) / distance;
			calculatedForceX += force * cos;
			calculatedForceY += force * sin;
		}
	});

	return {
		ax: -(calculatedForceX / m[starId]),
		ay: -(calculatedForceY / m[starId]),
	};
}

rungeKutta = (starId) => {
	const {
		dt, u, v, x, y,
	} = this.state;
	// x0 + (v * dt) + (a * (dt**2) / 2);
	// v0 + a * dt;

	const { ax, ay } = this.calculateAcceleration(starId);
	const dx1 = u[starId];
	const dy1 = v[starId];
	const dvx1 = ax;
	const dvy1 = ay;

	const dx2 = u[starId] + (dx1 * (dt / 2));
	const dy2 = v[starId] + (dy1 * (dt / 2));
	const dvx2 = ax + (dvx1 * (dt / 2));
	const dvy2 = ay + (dvy1 * (dt / 2));

	const dx3 = u[starId] + (dx2 * (dt / 2));
	const dy3 = v[starId] + (dy2 * (dt / 2));
	const dvx3 = ax + (dvx2 * (dt / 2));
	const dvy3 = ay + (dvy2 * (dt / 2));

	const dx4 = u[starId] + (dx3 * (dt));
	const dy4 = v[starId] + (dy3 * (dt));
	const dvx4 = ax + (dvx3 * (dt));
	const dvy4 = ay + (dvy3 * (dt));

	const newX = x[starId] + ((dt / 6) * (dx1 + (2 * dx2) + (2 * dx3) + dx4));
	const newY = y[starId] + ((dt / 6) * (dy1 + (2 * dy2) + (2 * dy3) + dy4));
	const newU = u[starId] + ((dt / 6) * (dvx1 + (2 * dvx2) + (2 * dvx3) + dvx4));
	const newV = v[starId] + ((dt / 6) * (dvy1 + (2 * dvy2) + (2 * dvy3) + dvy4));

	return {
		newX, newY, newU, newV,
	};
}

tick = () => {
	const {
		x, y, u, v, dt, t,
	} = this.state;
	const newState = {
		x, y, u, v,
	};
	x.forEach((_, idx) => {
		const {
			newX, newY, newU, newV,
		} = this.rungeKutta(idx);
		newState.x[idx] = newX;
		newState.y[idx] = newY;
		newState.u[idx] = newU;
		newState.v[idx] = newV;
	});
	this.setState({ ...newState, t: t + dt });
}

generateRandomColor = () => {
	const redValue = Math.floor(Math.random() * 256).toString(16);
	const greenValue = Math.floor(Math.random() * 256).toString(16);
	const blueValue = Math.floor(Math.random() * 256).toString(16);
	return `#${redValue}${greenValue}${blueValue}`;
}

render() {
	const {
		m, x, y, t,
	} = this.state;
	console.log(x);
	const width = window.innerWidth;
	const height = window.innerHeight - 400;
	// width = 120m
	// ? = 100m
	return (
		<Stage
			width={width}
			height={height}
			className="simulation-container"
		>
			<Layer>
				<Text
					x={width / 2}
					align="center"
					text={`Elapsed Time: ${t}`}
				/>
				{ m.map((planetMass, id) => (
					<Circle
						x={x[id] + 200}
						y={y[id] + 200}
						fill={this.colors[id]}
						radius={planetMass * 10}
						key={`${planetMass}-${id}`}
					/>
				))}
			</Layer>
		</Stage>
	);
}
}

export default Simulation;
