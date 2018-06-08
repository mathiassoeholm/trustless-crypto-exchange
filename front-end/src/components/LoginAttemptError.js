import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

const LoginAttemptError = props =>
	(props.loginAttemptError ?
		<div>
			<Typography variant="subheading" color="error">{props.loginAttemptError}</Typography>
			<br />
		</div>
		: null);

LoginAttemptError.propTypes =
{
	loginAttemptError: PropTypes.string,
};

LoginAttemptError.defaultProps =
{
	loginAttemptError: undefined,
};

const mapStateToProps = state =>
	({
		loginAttemptError: state.auth.loginAttemptStatus ?
			state.auth.loginAttemptStatus.errorMessage :
			null,
	});

export default connect(mapStateToProps, null)(LoginAttemptError);
