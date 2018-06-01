import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CreateUserIcon from '@material-ui/icons/Face';
import LoginIcon from '@material-ui/icons/VpnKey';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';

import ListButton from './ListButton';
import flowActions from '../modules/flow/actions';
import AuthActions from '../modules/auth/actions';
import menuTypes from '../modules/flow/menuTypes';

const authActions = AuthActions();

const MenuButtons = ({ isLoggedIn, username, dispatch }) =>
{
	const onButtonClick = menuType => () =>
	{
		dispatch(flowActions.changeMenu(menuType));
	};

	const onLogoutClick = () =>
	{
		dispatch(authActions.logout());
	};

	if (!isLoggedIn)
	{
		return (
			<List>
				<ListButton text="Create User" icon={<CreateUserIcon />} onClick={onButtonClick(menuTypes.CREATE_USER)} />
				<ListButton text="Login" icon={<LoginIcon />} onClick={onButtonClick(menuTypes.LOGIN)} />
			</List>
		);
	}

	return (
		<List>
			<ListButton text="Wallet" icon={<WalletIcon />} onClick={onButtonClick(menuTypes.WALLET)} />
			<Divider />
			<ListSubheader>Logged in as: <b>{username}</b></ListSubheader>
			<ListButton text="Logout" icon={<LogoutIcon />} onClick={onLogoutClick} />
		</List>
	);
};

const mapStateToProps = state =>
	({
		isLoggedIn: state.auth.isLoggedIn,
		username: state.auth.isLoggedIn ? state.auth.user.username : null,
	});

MenuButtons.propTypes =
{
	isLoggedIn: PropTypes.bool.isRequired,
	username: PropTypes.string.isRequired,
	dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(MenuButtons);
