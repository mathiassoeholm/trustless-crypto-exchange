import React from 'react';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';

import UserForm from './UserForm';
import AuthActions from '../modules/auth/actions';
import AuthProgress from './AuthProgress';
import flowActions from '../modules/flow/actions';

const authActions = AuthActions();

const Create = props =>
	(
		<div>
			<UserForm {...props} buttonText="Create">
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

Create.propTypes =
{
	enable2FA: PropTypes.bool.isRequired,
	onChanged2FACheckbox: PropTypes.func.isRequired,
};

const mapStateToProps = state =>
	({
		enable2FA: state.flow.enable2FA,
	});

const mapDispatchToProps = dispatch =>
	({
		onClickedButton: password => dispatch(authActions.createUser(password)),
		onChanged2FACheckbox: event => dispatch(flowActions.setEnable2FA(event.target.checked)),
	});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
