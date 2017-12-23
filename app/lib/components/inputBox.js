import React from 'react';

const InputBox = ({ defaultValue, name, onChange }) => (
	<li className="input-wrapper">
		<input
			type="number"
			onChange={onChange}
			placeholder={
				`${name} (${defaultValue !== undefined ? `Default: ${defaultValue}` : 'Choose a body'})`
			}
		/>
	</li>
);

export default InputBox;
