import React, { PureComponent } from 'react';
import { omit } from 'lodash';

import inputs from './constants/inputs';
import Button from './components/button';
import Options from './components/options';
import InputBox from './components/inputBox';
import Simulation from './components/simulation';

export default
class App extends PureComponent {
	constructor() {
		super();
		this.state = {
			N: 4,
			dt: 0.1,
			index: -1,
			m: [ 2, 1, 1, 2 ],
			x0: [ -2, -1, 1, 2 ],
			y0: [ 0, 0, 0, 0 ],
			u0: [ 0, 0, 0, 0 ],
			v0: [ -1, -2, 2, 1 ],
			experimentNumber: 0,
		};
	}

	sanitize = (value) => {
		if (value !== '') {
			return parseInt(value, 10);
		}
		return 0;
	}

	setFieldValue = (e, fieldKey) => {
		const { index } = this.state;
		const sanitizedValue = this.sanitize(e.target.value);
		const oldArray = this.state[fieldKey];
		const newArray = [
			...oldArray.slice(0, index),
			sanitizedValue,
			...oldArray.slice(index + 1),
		];
		this.setState({ [fieldKey]: newArray });
	}

	setNumberOfBodies = (e) => {
		const sanitizedValue = this.sanitize(e.target.value);
		this.setState({ N: sanitizedValue });
	}

	setCurrentBodyIndex = (e) => {
		const sanitizedValue = this.sanitize(e.target.value);
		this.setState({ index: sanitizedValue });
	}

	setTimeStep = (e) => {
		const sanitizedValue = this.sanitize(e.target.value);
		this.setState({ dt: sanitizedValue });
	}

	openExperiment = () => {
		this.setState({ experimentNumber: this.state.experimentNumber + 1 });
	}

	render() {
		const data = omit(this.state, [ 'experimentNumber', 'index' ]);
		const { experimentNumber, N, index } = this.state;
		return (
			<div className="container">
				<ul className="inputs-container">
					<InputBox
						defaultValue={4}
						name="Number of bodies"
						onChange={this.setNumberOfBodies}
					/>
					<Options
						numberOfItems={N}
						onChange={this.setCurrentBodyIndex}
					/>
					<InputBox
						name="TimeStep"
						defaultValue={100}
						onChange={this.setTimeStep}
					/>
					{ inputs.map(inputData => (
						<InputBox
							{...inputData}
							key={inputData.name}
							defaultValue={this.state[inputData.fieldKey][index]}
							onChange={(e) => { this.setFieldValue(e, inputData.fieldKey); }}
						/>
					))}
				</ul>
				<Button onClick={this.openExperiment} />
				{!!experimentNumber &&
				<div>
					<Simulation
						data={data}
						experimentNumber={experimentNumber}
					/>
				</div>
				}
			</div>
		);
	}
}
