import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxil from '../Auxil/auxil';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: false
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
				<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} isAuth={this.props.isAuthenticated} />
				<SideDrawer open={this.state.showSideDrawer} isAuth={this.props.isAuthenticated} closed={this.sideDrawerClosedHandler} />
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Auxil>
		)
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	};
}

export default connect(mapStateToProps)(Layout);