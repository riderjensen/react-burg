import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	}
}

export const purchaseBurgerFailed = (errorMsg) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: errorMsg
	}
}

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	}
}

export const purchaseBurger = (orderData) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios.post('/orders.json', orderData)
			.then(resp => {
				dispatch(purchaseBurgerSuccess(resp.data.name, orderData))

			})
			.catch(err => {
				console.log(err)
				dispatch(purchaseBurgerFailed(err))
			});
	}
}

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	}
}