import * as actionTypes from './actionTypes';

export const signIn = (userId, userInfo) => {
	return {
		type: actionTypes.SIGN_IN,
		payload: {
			userId,
			userInfo
		}
	};
};

export const signOut = () => {
	return {
		type: actionTypes.SIGN_OUT
	};
};
