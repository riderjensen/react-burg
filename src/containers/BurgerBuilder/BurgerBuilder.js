import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxil from '../../hoc/Auxil/auxil';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
	state = {
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
		return sum > 0;
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

		this.props.history.push('/checkout');
	}

	render() {
		const disableInfo = {
			...this.props.ings
		}
		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0
		}
		let orderSummary = null;
		let burger = this.state.error ? <p>INgredients can not be loaded</p> : <Spinner />
		if (this.props.ings) {
			burger = (
				<Auxil>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disableInfo}
						purchasable={this.updatePurchaseState(this.props.ings)}
						price={this.props.price}
						ordered={this.purchaseHandler}
					/>
				</Auxil>
			)
			orderSummary = <OrderSummary
				purchaseCancelled={this.purchaseCancelHandler}
				purchaseContinued={this.purchaseContinueHandler}
				ingredients={this.props.ings}
				totalPrice={this.props.price}
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

const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
		onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));