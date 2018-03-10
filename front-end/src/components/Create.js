import React from 'react';
import UserForm from './UserForm';
import authActions from '../modules/auth/actions';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) =>
({
	onClickedButton: (password) => dispatch(authActions.createUser(password))
});

let Create = (props) =>
{
	return (
		<UserForm {...props} buttonText="Create"/>
	);
};

Create = connect(null, mapDispatchToProps)(Create);

export default Create;
