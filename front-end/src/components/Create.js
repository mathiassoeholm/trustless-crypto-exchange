import React from 'react';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';

import UserForm from './UserForm';
import AuthActions from '../modules/auth/actions';
import AuthProgress from './AuthProgress';
import flowActions from '../modules/flow/actions';
import menuTypes from '../modules/flow/menu-types';

const authActions = AuthActions();

const Create = (props) =>
{
	const onClickedButton = () =>
	{
		if (props.enable2FA)
		{
			props.generate2FASecret();
			props.goToNextPage();
		}
		else
		{
			props.createUser();
		}
	};

	return (
		<div>
			<UserForm onClickedButton={onClickedButton} buttonText={props.enable2FA ? 'Next' : 'Create'} >
				<FormControlLabel
					control={
						<Checkbox
							checked={props.enable2FA}
							onChange={props.onChanged2FACheckbox}
							color="primary"
						/>
					}
					label="Enable 2FA"
				/>
			</UserForm>
			<AuthProgress title="Creating user" />
		</div>
	);
};

Create.propTypes =
{
	enable2FA: PropTypes.bool.isRequired,
	onChanged2FACheckbox: PropTypes.func.isRequired,
	goToNextPage: PropTypes.func.isRequired,
	createUser: PropTypes.func.isRequired,
	generate2FASecret: PropTypes.func.isRequired,
};

const mapStateToProps = state =>
	({
		enable2FA: state.flow.enable2FA,
	});

const mapDispatchToProps = dispatch =>
	({
		goToNextPage: () => dispatch(
			authActions.validateAndGoToMenu(menuTypes.TWO_FACTOR_CREATE)),
		createUser: () => dispatch(authActions.createUser()),
		onChanged2FACheckbox: event => dispatch(flowActions.setEnable2FA(event.target.checked)),
		generate2FASecret: () => dispatch(authActions.generate2FASecret()),
	});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
