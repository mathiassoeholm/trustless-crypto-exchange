import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme =>
	({
		root:
		{
			padding: theme.spacing.unit,
		},
	});

const AccountDetails = ({ classes, balance }) =>
	(
		<Paper className={classes.root}>
			<Typography variant="headline">Your Account</Typography>
			<div>
				<Typography style={{ float: 'left' }} variant="subheading">Balance:</Typography>
				<Typography style={{ float: 'right' }} variant="subheading">{balance}$</Typography>
			</div>
		</Paper>
	);

AccountDetails.propTypes =
{
	classes: PropTypes.object.isRequired,
	balance: PropTypes.number.isRequired,
};

const mapStateToProps = state =>
	({
		balance: state.wallet.balance ? state.wallet.balance : 0,
	});

export default connect(mapStateToProps)(withStyles(styles)(AccountDetails));
