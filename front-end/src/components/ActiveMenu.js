import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import menuTypes from '../modules/flow/menu-types';
import Login from './Login';
import Create from './Create';
import WalletPage from './WalletPage/WalletPage';
import TwoFactorCreate from './TwoFactorCreate';


export function ActiveMenu({ activeMenu })
{
	switch (activeMenu)
	{
	case menuTypes.CREATE_USER:
		return <Create />;
	case menuTypes.LOGIN:
		return <Login />;
	case menuTypes.WALLET:
		return <WalletPage />;
	case menuTypes.TWO_FACTOR_CREATE:
		return <TwoFactorCreate />;
	default:
		throw new Error('Unknown menu type');
	}
}

const mapStateToProps = state =>
	({
		activeMenu: state.flow.activeMenu,
	});

ActiveMenu.propTypes =
{
	activeMenu: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(ActiveMenu);
