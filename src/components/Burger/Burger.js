import React from 'react';
import classes from './Burger.css';

import BurgerIngrdient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
	return (
		<div className={classes.Burger}>
			<BurgerIngrdient type="bread-top" />
			<BurgerIngrdient type="cheese" />
			<BurgerIngrdient type="meat" />
			<BurgerIngrdient type="bread-bottom" />
		</div>
	);
}
export default burger;