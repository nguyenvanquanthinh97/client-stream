import React from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal';
import { fetchStream, deleteStream } from '../../actions';
import history from '../../history';
import Spinner from '../Spinner';

class StreamDelete extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	renderActions() {
		const { deleteStream, stream } = this.props;
		return (
			<React.Fragment>
				<button onClick={() => deleteStream(stream._id)} className="ui button primary">
					DELETE
				</button>
				<button onClick={() => history.push('/')} className="ui button">
					CANCEL
				</button>
			</React.Fragment>
		);
	}

	renderContent(stream) {
		if (!stream) {
			return <Spinner />;
		}
		return `DO YOU WANT TO DELETE: ${stream}`;
	}

	render() {
		const { stream } = this.props;
		return (
			<Modal
				onDismiss={() => history.push('/')}
				header={'DELETE STREAM'}
				content={this.renderContent(stream)}
				actions={this.renderActions()}
			/>
		);
	}
}

const mapStateToProps = (state, { match }) => ({
	stream: state.streams[match.params.id]
});

export default connect(mapStateToProps, { deleteStream, fetchStream })(StreamDelete);
