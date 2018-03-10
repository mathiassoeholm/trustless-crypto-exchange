import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import menuTypes from '../modules/flow/menuTypes';
import Login from './Login';
import Create from './Create';
import WalletDetails from './WalletDetails';

const ActiveMenu = ({ activeMenu }) =>
{
	switch (activeMenu)
	{
		case menuTypes.CREATE_USER:
			return <Create />;
		case menuTypes.LOGIN:
			return <Login />;
		case menuTypes.WALLET:
			return <WalletDetails />;
	}
};

const mapStateToProps = (state) =>
({
	activeMenu: state.flow.activeMenu
});

ActiveMenu.propTypes =
{
	activeMenu: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(ActiveMenu);
