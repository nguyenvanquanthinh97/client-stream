import _ from 'lodash';

import * as actionTypes from '../actions/actionTypes';

const streamReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.FETCH_STREAMS: {
			//Without lodash (convert array => object)
			// return Object.assign({}, state, ...action.payload.map((stream) => ({ [stream._id]: stream })));
			return _.mapKeys(action.payload, '_id');
		}

		case actionTypes.FETCH_STREAM: {
			return { ...state, [action.payload._id]: action.payload };
		}

		case actionTypes.EDIT_STREAM: {
			return { ...state, [action.payload._id]: action.payload };
		}

		case actionTypes.CREATE_STREAM: {
			return { ...state, [action.payload._id]: action.payload };
		}

		case actionTypes.DELETE_STREAM: {
			return _.omit(state, action.payload);
		}

		default:
			return state;
	}
};

export default streamReducer;
