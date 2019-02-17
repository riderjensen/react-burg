import React, { Component } from 'react';

import Auxil from '../../hoc/auxil';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
	render() {
		return (
			<Auxil>
				<Burger />
				<div>Build Controls</div>
			</Auxil>
		);
	}
}

export default BurgerBuilder;