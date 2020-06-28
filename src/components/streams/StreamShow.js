import React from 'react';
import { connect } from 'react-redux';
import flvjs from 'flv.js';

import { fetchStream } from '../../actions';
import Spinner from '../Spinner';

class StreamShow extends React.Component {
	constructor(props) {
		super(props);

		this.videoRef = React.createRef();
	}

	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
		this.subcribeStream();
	}

	componentDidUpdate() {
		this.subcribeStream()
	}

	componentWillUnmount() {
		this.stream.destroy();
	}

	subcribeStream() {
		const { stream } = this.props;
		if (this.stream || !stream) {
			return;
		}
		this.stream = flvjs.createPlayer({
			type: 'flv',
			url: `http://localhost:8000/live/${stream._id}.flv`
		});

		this.stream.attachMediaElement(this.videoRef.current);
		this.stream.load();
	}

	render() {
		const { stream } = this.props;

		if (!stream) return <Spinner />;

		const { title, description } = stream;

		return (
			<div>
				<video ref={this.videoRef} style={{width: '100%'}} controls />
				<h1>{title}</h1>
				<h5>{description}</h5>
			</div>
		);
	}
}

const mapStateToProps = (state, { match }) => ({
	stream: state.streams[match.params.id]
});

export default connect(mapStateToProps, { fetchStream })(StreamShow);
