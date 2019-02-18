import React, { Component } from 'react';
import Auxil from '../../hoc/auxil';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: true
	}
	sideDrawerClosedHandler = () => {
		this.setState({
			showSideDrawer: false
		})
	}

	render() {
		return <Auxil>
			<Toolbar />
			<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
			<main className={classes.Content}>
				{this.props.children}
			</main>
		</Auxil>
	}
}

export default Layout;