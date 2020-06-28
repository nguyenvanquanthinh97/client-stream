import * as actionTypes from './actionTypes';
import stream from '../api/stream';
import history from '../history';

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

export const fetchStreams = () => {
	return async (dispatch) => {
		const response = await stream.get('/streams');

		dispatch({
			type: actionTypes.FETCH_STREAMS,
			payload: response.data.streams
		});
	};
};

export const fetchStream = (id) => {
	return async (dispatch) => {
		const response = await stream.get(`/streams/${id}`);

		dispatch({
			type: actionTypes.FETCH_STREAM,
			payload: response.data.stream
		});
	};
};

export const createStream = (title, description) => {
	return async (dispatch, getState) => {
		const { userId } = getState().auth;

		const response = await stream.post('/streams', { title, description, userId });

		dispatch({
			type: actionTypes.CREATE_STREAM,
			payload: response.data.stream
		});
		history.push('/');
	};
};

export const editStream = (id, title, description) => {
	return async (dispatch, getState) => {
		const { userId } = getState().auth;

		const response = await stream.put(`/streams/${id}`, { title, description, userId });

		dispatch({
			type: actionTypes.EDIT_STREAM,
			payload: response.data.stream
		});
		history.push('/');
	};
};

export const deleteStream = (id) => {
	return async (dispatch, getState) => {
		const { userId } = getState().auth;

		await stream.delete(`/streams/${id}?userId=${userId}`);
		dispatch({
			type: actionTypes.DELETE_STREAM,
			payload: id
		});
		history.push('/');
	};
};
