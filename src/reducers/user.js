import * as actionTypes from "./actions";

const initialState = {
	currentUser: null,
	token: null,
};

const user = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_USER:
			return {
				...state,
				currentUser: action.user,
				token: action.token,
			};
		case actionTypes.LOGOUT:
			return {
				...state,
				currentUser: null,
				token: null,
			};
		default:
			return {
				...state,
			};
	}
};

export default user;
