import React from 'react';
import classes from './Burger.css';

import BurgerIngrdient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
	const transformedIngredients = Object.keys(props.ingredients).map(item => {
		return [...Array(props.ingredients[item])].map((_, i) => {
			return <BurgerIngrdient key={item + i} type={item} />
		})
	}).reduce((arr, el) => {
		return arr.concat(el)
	}, []);
	return (
		<div className={classes.Burger}>
			<BurgerIngrdient type="bread-top" />
			{transformedIngredients.length <= 0 ? <p>Please add some items</p> : transformedIngredients}
			<BurgerIngrdient type="bread-bottom" />
		</div>
	);
}
export default burger;