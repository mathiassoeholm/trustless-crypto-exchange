import React from 'react';
import { connect } from 'react-redux';

import UserForm from './UserForm';
import authActions from '../modules/auth/actions';

import AuthProgress from './AuthProgress';

const mapDispatchToProps = dispatch =>
	({
		onClickedButton: password => dispatch(authActions.createUser(password)),
	});

const Create = props =>
	(
		<div>
			<UserForm {...props} buttonText="Create" />
			<AuthProgress title="Creating user" />
		</div>
	);

export default connect(null, mapDispatchToProps)(Create);
