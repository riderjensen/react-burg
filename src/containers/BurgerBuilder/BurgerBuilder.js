import React, { Component } from 'react';

import Auxil from '../../hoc/Auxil/auxil';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	componentDidMount() {
		// axios.get('https://react-burger-62143.firebaseio.com/ingredients.json')
		// 	.then(resp => {
		// 		this.setState({ ingredients: resp.data })
		// 	})
		// 	.catch(err => {
		// 		this.setState({ error: true })
		// 	});
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients).map(item => {
			return ingredients[item]
		}).reduce((total, el) => {
			return total + el;
		}, 0)
		this.setState({ purchasable: sum > 0 })
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients
		})
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;

		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients
		})
		this.updatePurchaseState(updatedIngredients);
	}

	purchaseHandler = () => {
		this.setState({
			purchasing: true
		})
	}

	purchaseCancelHandler = () => {
		this.setState({
			purchasing: false
		})
	}

	purchaseContinueHandler = () => {

		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		}
		queryParams.push('price=' + this.state.totalPrice);
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		});
	}

	render() {
		const disableInfo = {
			...this.state.ingredients
		}
		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0
		}
		let orderSummary = null;
		let burger = this.state.error ? <p>INgredients can not be loaded</p> : <Spinner />
		if (this.state.ingredients) {
			burger = (
				<Auxil>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabled={disableInfo}
						purchasable={this.state.purchasable}
						price={this.state.totalPrice}
						ordered={this.purchaseHandler}
					/>
				</Auxil>
			)
			orderSummary = <OrderSummary
				purchaseCancelled={this.purchaseCancelHandler}
				purchaseContinued={this.purchaseContinueHandler}
				ingredients={this.state.ingredients}
				totalPrice={this.state.totalPrice}
			/>
		}

		if (this.state.loading) {
			orderSummary = <Spinner />
		}

		return (
			<Auxil>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
					{orderSummary}
				</Modal>
				{burger}
			</Auxil>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);