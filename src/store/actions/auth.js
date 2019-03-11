import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (authData) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData: authData
	}
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		authData: error
	}
}

export const auth = (email, password) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		}
		axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA8H0Gvy6FE0XCaZvn-DX6k-f5kN9AgBKU', authData)
			.then(response => {
				console.log(response);
				dispatch(authFail(response))

			})
			.catch(err => {
				console.log(err);
				dispatch(authFail(err))
			})
	}
}