import React from 'react';

const GoogleButton = ({ label, onButtonClick }) => {
	return (
		<button onClick={onButtonClick} className="ui google red button">
			<i className="google icon" />
			{label}
		</button>
	);
};

export default GoogleButton;
