import React from 'react';
import { connect } from 'react-redux';

import menuTypes from '../modules/flow/menuTypes';

const ActiveMenuTitle = ({activeMenu}) =>
{
	switch (activeMenu)
	{
		case menuTypes.CREATE_USER:
			return 'Create User';
		case menuTypes.LOGIN:
			return 'Login';
	}
};

const mapStateToProps = (state) =>
({
	activeMenu: state.flow.activeMenu
});

export default connect(mapStateToProps)(ActiveMenuTitle);
