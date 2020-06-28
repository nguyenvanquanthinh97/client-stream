import React from 'react';
import { connect } from 'react-redux';

import GoogleButton from './GoogleButton';
import * as actions from '../actions';
import Spinner from './Spinner';

class GoogleAuth extends React.Component {
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId: '797062833037-0fd1tp03q4man9mbqk8pl3ct3nbseoro.apps.googleusercontent.com',
					scope: 'profile email'
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();

					this.onAuthChangeListener(this.auth.isSignedIn.get());
					this.auth.isSignedIn.listen(this.onAuthChangeListener);
				});
		});
	}

	onAuthChangeListener = (isLoggedIn) => {
		const { signIn, signOut } = this.props;
		if (isLoggedIn) {
			const currentUser = this.auth.currentUser.get();
			const userProfile = currentUser.getBasicProfile();

			const userId = currentUser.getId();
			const img = userProfile.getImageUrl();
			const name = userProfile.getName();
			const email = userProfile.getEmail();

			const userInfo = {
				img,
				name,
				email
			};

			signIn(userId, userInfo);
		} else {
			signOut();
		}
	};

	onSigninClick = () => {
		this.auth.signIn();
	};

	onSignoutClick = () => {
		this.auth.signOut();
	};

	renderButton = () => {
		const { isLoggedIn } = this.props;

		if (isLoggedIn === null) {
			return <Spinner />;
		} else if (isLoggedIn) {
			return <GoogleButton label={'SIGN OUT'} onButtonClick={this.onSignoutClick} />;
		} else {
			return <GoogleButton label={'SIGN IN WITH GOOGLE'} onButtonClick={this.onSigninClick} />;
		}
	};

	render() {
		return <div>{this.renderButton()}</div>;
	}
}

const mapStateToProps = (state) => ({
	isLoggedIn: state.auth.isLoggedIn
});

const mapDispatchToProps = (dispatch) => ({
	signIn: (userId, userInfo) => dispatch(actions.signIn(userId, userInfo)),
	signOut: () => dispatch(actions.signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);
