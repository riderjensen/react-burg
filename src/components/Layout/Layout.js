import React from 'react';
import Auxil from '../../hoc/auxil';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => (
	<Auxil>
		<Toolbar />
		<SideDrawer />
		<main className={classes.Content}>
			{props.children}
		</main>
	</Auxil>
);

export default layout;