import React from 'react';

const Button = ({ onClick }) => (
	<div className="proceed-btn">
		<span
			tabIndex="0"
			role="button"
			onClick={onClick}
			style={{ borderColor: 'rgb(0, 0, 0)' }}
			className="block-button text-bordered"
		>
			<span className="bg" />
			<span className="text" style={{ color: 'rgb(0, 0, 0)' }}>Proceed to the simulation</span>
		</span>
	</div>
);

export default Button;
