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

const AccountDetails = ({ classes, balance, address }) =>
	(
		<Paper className={classes.root}>
			<Typography variant="headline">Your Account</Typography>
			<Grid container spacing={8}>
				<Grid item xs={12} lg={6}>
					<Typography variant="subheading">Balance: {balance}$</Typography>
				</Grid>

				<Grid item xs={12} lg={6}>
					<Typography variant="subheading">Address: {address}</Typography>
				</Grid>
			</Grid>
		</Paper>
	);

AccountDetails.propTypes =
{
	classes: PropTypes.object.isRequired,
	balance: PropTypes.number.isRequired,
	address: PropTypes.string.isRequired,
};

const mapStateToProps = state =>
	({
		balance: state.wallet.balance ? state.wallet.balance : 0,
		address: state.wallet.secret ? state.wallet.secret.address : 'Invalid address',
	});

export default connect(mapStateToProps)(withStyles(styles)(AccountDetails));
