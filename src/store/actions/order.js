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

export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	}
}

export const fetchOrdersFailed = (err) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAILED,
		err: err
	}
}

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	}
}

export const fetchOrders = () => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		axios.get('/orders.json')
			.then(response => {
				const fetchedOrders = [];
				for (let key in response.data) {
					fetchedOrders.push({
						...response.data[key],
						id: key
					})
				}
				dispatch(fetchOrdersSuccess(fetchedOrders));
			})
			.catch(err => {
				dispatch(fetchOrdersFailed(err));
			})
	}
}