import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme =>
	({
		root:
		{
			height: '100%',
			padding: theme.spacing.unit * 2,
			textAlign: 'left',
		},
	});

const TransactionsList = ({ classes }) =>
	(
		<Paper className={classes.root}>
			<Typography variant="headline">Previous Transactions</Typography>
			<Typography variant="subheading">Not implemented</Typography>
		</Paper>
	);

export default withStyles(styles)(TransactionsList);
