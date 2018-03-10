import React from 'react';
import { connect } from 'react-redux';

import menuTypes from '../modules/flow/menuTypes';
import Login from './Login';
import Create from './Create';

const ActiveMenu = ({ activeMenu }) =>
{
	switch (activeMenu)
	{
		case menuTypes.CREATE_USER:
			return <Create />;
		case menuTypes.LOGIN:
			return <Login />;
	}
};

const mapStateToProps = (state) =>
({
	activeMenu: state.flow.activeMenu
});

export default connect(mapStateToProps)(ActiveMenu);
