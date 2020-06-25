import * as actionTypes from '../actions/actionTypes';

const initialState = {
	isLoggedIn: null,
	userId: null,
	userInfo: null
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SIGN_IN: {
			return {
				...state,
				isLoggedIn: true,
				userId: action.payload.userId,
				userInfo: action.payload.userInfo
			};
		}
		case actionTypes.SIGN_OUT: {
			return {
				...state,
				isLoggedIn: false,
				userId: null,
				userInfo: null
			};
		}
		default:
			return state;
	}
};

export default authReducer;
