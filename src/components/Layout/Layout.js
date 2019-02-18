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

	sideDrawerToggleHandler = () => {
		this.setState(previousState => {
			return {
				showSideDrawer: !previousState.showSideDrawer
			}
		})
	}

	render() {
		return (
			<Auxil>
				<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
				<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Auxil>
		)
	}
}

export default Layout;