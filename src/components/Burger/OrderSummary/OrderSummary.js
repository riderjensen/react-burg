import React, { Component } from 'react';

import Auxil from '../../../hoc/auxil';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	render() {
		const ingredientSummary = Object.keys(this.props.ingredients).map(item => {
			return <li key={item}><span style={{ textTransform: 'capitalize' }}>{item}</span>: {this.props.ingredients[item]}</li>
		})
		return (
			<Auxil>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>
					{ingredientSummary}
				</ul>
				<p>Total Price: <strong>{this.props.totalPrice.toFixed(2)}</strong></p>
				<p>Continue to checkout?</p>
				<Button btnType="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
				<Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
			</Auxil>
		);
	}
}

export default OrderSummary;