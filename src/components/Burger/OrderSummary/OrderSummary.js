import React from 'react';

import Auxil from '../../../hoc/auxil';

const OrderSummary = (props) => {
	const ingredientSummary = Object.keys(props.ingredients).map(item => {
		return <li key={item}><span style={{ textTransform: 'capitalize' }}>item</span>: {props.ingredients[item]}</li>
	})
	return (
		<Auxil>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>
				{ingredientSummary}
			</ul>
			<p>Continue to checkout?</p>
		</Auxil>
	);
}
export default OrderSummary;