import React from 'react';
import UserForm from './UserForm';
import authActions from '../modules/auth/actions';
import { connect } from 'react-redux';

import AuthProgress from './AuthProgress';

const mapDispatchToProps = (dispatch) =>
({
	onClickedButton: (password) => dispatch(authActions.createUser(password))
});

let Create = (props) =>
{
	return (
		<div>
			<UserForm {...props} buttonText="Create"/>
			<AuthProgress title="Creating user"/>
		</div>
	);
};

Create = connect(null, mapDispatchToProps)(Create);

export default Create;
