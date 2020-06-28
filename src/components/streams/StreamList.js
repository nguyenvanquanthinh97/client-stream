import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams, editStream, deleteStream } from '../../actions';

class StreamList extends React.Component {
	componentDidMount() {
		this.props.fetchStreams();
	}

	renderManager = (id) => {
		const { editStream, deleteStream } = this.props;
		return (
			<div className="right floated content">
				<Link to={`/streams/edit/${id}`} className="ui button primary">
					EDIT
				</Link>
				<Link to={`/streams/delete/${id}`} className="ui button negative">
					DELETE
				</Link>
			</div>
		);
	};

	renderList = (streams) => {
		const { userId } = this.props;
		return streams.map((stream) => (
			<div key={stream._id} className="item">
				{stream.userId === userId && this.renderManager(stream._id)}
				<i className="large video middle aligned icon" />
				<div className="content">
					<Link to={`/streams/${stream._id}`} className="header">
						{stream.title}
					</Link>
					<div className="description">{stream.description}</div>
				</div>
			</div>
		));
	};

	render() {
		const { streams } = this.props;
		return (
			<div>
				<h1>Streams</h1>
				<div className="ui relaxed divided list">{this.renderList(streams)}</div>
				<Link to="/streams/new" className="ui right floated positive button">
					CREATE NEW STREAM
				</Link>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	streams: Object.values(state.streams),
	userId: state.auth.userId
});

export default connect(mapStateToProps, { fetchStreams, editStream, deleteStream })(StreamList);
