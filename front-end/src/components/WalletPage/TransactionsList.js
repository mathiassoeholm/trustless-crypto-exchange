import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme =>
	({
		root:
		{
			height: '100%',
			padding: theme.spacing.unit * 2,
			textAlign: 'left',
		},
	});

const TransactionsList = ({ classes, transactions }) =>
{
	const getTransactionRow = transaction =>
		(
			<TableRow>
				<TableCell>{transaction.createTime}</TableCell>
				<TableCell>{transaction.amount}</TableCell>
				<TableCell>{transaction.from}</TableCell>
				<TableCell>{transaction.to}</TableCell>
			</TableRow>
		);

	const tableRows = transactions.map(t => getTransactionRow(t));

	return (
		<Paper className={classes.root}>
			<Typography variant="headline">Previous Transactions</Typography>

			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Total</TableCell>
						<TableCell>From</TableCell>
						<TableCell>To</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{tableRows}
				</TableBody>
			</Table>
		</Paper>
	);
};

TransactionsList.propTypes =
{
	classes: PropTypes.object.isRequired,
	transactions: PropTypes.array.isRequired,
};

const mapStateToProps = state =>
	({
		transactions: state.wallet.transactions ? state.wallet.transactions : [],
	});

export default connect(mapStateToProps)(withStyles(styles)(TransactionsList));
