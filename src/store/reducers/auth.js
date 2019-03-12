import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
const initState = {
	token: null,
	userId: null,
	error: null,
	loading: false,
};

const authStart = (state, action) => {
	return updateObject(state, { error: null, loading: true })
}

const authSuccess = (state, action) => {
	return updateObject(state, {
		token: action.idToken,
		userId: action.userId,
		error: null,
		loading: false
	})
}

const authFail = (state, action) => {
	return updateObject(state, {
		error: action.error,
		loading: false
	})
}

const authLogOut = (state, action) => {
	// logout broken, unsure why
	return updateObject(state, { idToken: null, userId: null })
}

const reducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START: return authStart(state, action)
		case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
		case actionTypes.AUTH_FAIL: return authFail(state, action)
		case actionTypes.AUTH_LOGOUT: return authLogOut(state, action)
		default:
			return state;
	}
}



export default reducer;