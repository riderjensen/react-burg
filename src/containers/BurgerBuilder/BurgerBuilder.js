import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxil from '../../hoc/Auxil/auxil';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {
	state = {
		purchasing: false,
	}

	componentDidMount() {
		this.props.onInitIngredients();
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
		if (this.props.isAuthenticated) {
			this.setState({
				purchasing: true
			})
		} else {
			this.props.onSetAuthRedirectPath('/checkout')
			this.props.history.push('/auth');
		}

	}

	purchaseCancelHandler = () => {
		this.setState({
			purchasing: false
		})
	}

	purchaseContinueHandler = () => {
		this.props.onInitPurchase();
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
		let burger = this.props.error ? <p>Ingredients can not be loaded</p> : <Spinner />
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
						isAuth={this.props.isAuthenticated}
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
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));