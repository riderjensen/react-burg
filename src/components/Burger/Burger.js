import React from 'react';
import classes from './Burger.css';

import BurgerIngrdient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
	const transformedIngredients = Object.keys(props.ingredients).map(item => {
		return [...Array(props.ingredients[item])].map((_, i) => {
			return <BurgerIngrdient key={item + i} type={item} />
		})
	});
	return (
		<div className={classes.Burger}>
			<BurgerIngrdient type="bread-top" />
			{transformedIngredients}
			<BurgerIngrdient type="bread-bottom" />
		</div>
	);
}
export default burger;