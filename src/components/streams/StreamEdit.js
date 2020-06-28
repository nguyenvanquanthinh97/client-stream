import React from 'react';
import { connect } from 'react-redux';

import { editStream, fetchStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
	componentDidMount() {
		const { match, fetchStream } = this.props;
		fetchStream(match.params.id);
	}

	onFormSubmit = ({ title, description }) => {
		const { stream, editStream } = this.props;
		editStream(stream._id, title, description);
	};

	render() {
		const { stream } = this.props;
		return <StreamForm initialValues={stream} onFormSubmit={this.onFormSubmit} edit/>;
	}
}

const mapStateToProps = (state, { match }) => ({
	stream: state.streams[match.params.id]
});

export default connect(mapStateToProps, { editStream, fetchStream })(StreamEdit);
