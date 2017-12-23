import React from 'react';
import ReactDOM from 'react-dom';

import './scss/base.scss';
import App from './lib/App';

const ApplicationRoot = () => (
	<div id="root">
		<App />
	</div>
);

ReactDOM.render(
	<ApplicationRoot />,
	document.getElementById('root'),
);
