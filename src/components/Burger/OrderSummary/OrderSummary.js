import React from 'react';

import Auxil from '../../../hoc/auxil';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
	const ingredientSummary = Object.keys(props.ingredients).map(item => {
		return <li key={item}><span style={{ textTransform: 'capitalize' }}>{item}</span>: {props.ingredients[item]}</li>
	})
	return (
		<Auxil>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>
				{ingredientSummary}
			</ul>
			<p>Total Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
			<p>Continue to checkout?</p>
			<Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
			<Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
		</Auxil>
	);
}
export default OrderSummary;