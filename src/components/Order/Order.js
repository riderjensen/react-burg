import React from 'react';
import classes from './Order.css';

const Order = (props) => {
	return (
		<div className={classes.Order}>
			<p>Ingredients: Salad ()</p>
			<p>Price: <strong>USD </strong></p>
		</div>
	);
}
export default Order;