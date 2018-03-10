import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CreateUserIcon from 'material-ui-icons/Face';
import LoginIcon from 'material-ui-icons/VpnKey';
import List from 'material-ui/List';

import ListButton from './ListButton';
import flowActions from '../modules/flow/actions';
import menuTypes from '../modules/flow/menuTypes';

const MenuButtons = ({isLoggedIn, dispatch}) =>
{
	const onButtonClick = (menuType) => () =>
	{
		dispatch(flowActions.changeMenu(menuType));
	};

	if(!isLoggedIn)
	{
		return (
			<List>
				<ListButton text="Create User" icon={<CreateUserIcon />} onClick={onButtonClick(menuTypes.CREATE_USER)} />
				<ListButton text="Login" icon={<LoginIcon />} onClick={onButtonClick(menuTypes.LOGIN)} />
			</List>
		);
	}
	else
	{
		return null;
	}
};

const mapStateToProps = (state) =>
({
	isLoggedIn: state.auth.isLoggedIn
});

MenuButtons.propTypes =
{
	isLoggedIn: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps, null)(MenuButtons);
