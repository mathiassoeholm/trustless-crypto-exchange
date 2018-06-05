import { connect } from 'react-redux';

import menuTypes from '../modules/flow/menu-types';

export function ActiveMenuTitle({ activeMenu })
{
	switch (activeMenu)
	{
	case menuTypes.CREATE_USER:
		return 'Create User';
	case menuTypes.TWO_FACTOR_CREATE:
		return 'Create User';
	case menuTypes.LOGIN:
		return 'Login';
	case menuTypes.WALLET:
		return 'Wallet';
	default:
		throw new Error('Unknown menu type');
	}
}

const mapStateToProps = state =>
	({
		activeMenu: state.flow.activeMenu,
	});

export default connect(mapStateToProps)(ActiveMenuTitle);
