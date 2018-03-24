import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import { LinearProgress } from 'material-ui/Progress';
import Typography from 'material-ui/Typography';

export function AuthProgress({
	title,
	open,
	progress,
	message,
})
{
	return (
		<Dialog open={open} fullWidth>
			<DialogTitle id="simple-dialog-title">{title}</DialogTitle>
			<Typography component="p" style={{ padding: 10 }}>
				{`${message} ${(progress * 100).toFixed(2)}%`}
			</Typography>
			<LinearProgress variant="determinate" value={progress * 100} />
			<br />
		</Dialog>
	);
}

AuthProgress.propTypes =
{
	title: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	progress: PropTypes.number.isRequired,
	message: PropTypes.string.isRequired,
};

const mapStateToProps = state =>
	({
		open: state.auth.isLoggingIn,
		progress: state.auth.loginAttemptStatus ? state.auth.loginAttemptStatus.progress : 0,
		message: state.auth.loginAttemptStatus ? state.auth.loginAttemptStatus.message : '',
	});

export default connect(mapStateToProps)(AuthProgress);
