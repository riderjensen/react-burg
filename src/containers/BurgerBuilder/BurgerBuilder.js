import React, { Component } from 'react';

import Auxil from '../../hoc/auxil';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		}
	}

	render() {
		return (
			<Auxil>
				<Burger ingredients={this.state.ingredients} />
				<div>Build Controls</div>
			</Auxil>
		);
	}
}

export default BurgerBuilder;