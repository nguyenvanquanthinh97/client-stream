import React from 'react';
import { connect } from 'react-redux';

import { createStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamCreate = (props) => {
	const { createStream } = props;
	const onFormSubmit = ({ title, description }) => {
		createStream(title, description);
	};

	return <StreamForm onFormSubmit={onFormSubmit} />;
};

export default connect(null, { createStream })(StreamCreate);
