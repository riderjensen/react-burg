import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: ingName
	}
}

export const removeIngredient = (ingName) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: ingName
	}
}

export const setIngredients = (ing) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ing
	}
}

export const initIngredients = () => {
	return dispatch => {
		axios.get('https://react-burger-62143.firebaseio.com/ingredients.json')
			.then(resp => {
				dispatch(setIngredients(resp.data));
			})
			.catch(err => {
				dispatch(fetchIngredientsFailed());
			});
	}
}

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED
	}
}