import React from 'react';

const Options = ({ numberOfItems, onChange }) => (
	<li className="input-wrapper">
		<select
			defaultValue={-1}
			onChange={onChange}
		>
			<option value={-1} disabled>Select body NO.</option>
			{
				Array(numberOfItems).fill(true).map((_, idx) =>
					<option value={idx} key={idx}>Body {idx + 1}</option>)
			}
		</select>
	</li>
);

export default Options;
