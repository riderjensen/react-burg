import React, { Component } from 'react';

import Auxil from '../../hoc/auxil';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 1,
			bacon: 1,
			cheese: 2,
			meat: 2,
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