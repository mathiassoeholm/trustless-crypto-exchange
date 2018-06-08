import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme =>
	({
		root:
		{
			height: '100%',
			padding: theme.spacing.unit * 2,
			textAlign: 'left',
			marginBottom: theme.spacing.unit * 2,
		},

		table:
		{
			minWidth: '200px',
			padding: theme.spacing.unit,
		},

		tableRow:
		{
			borderBottom: '1px solid rgba(0, 0, 0, 0.54);',
		},

		tableCell:
		{
			paddingLeft: theme.spacing.unit,
			paddingRight: theme.spacing.unit,
			paddingTop: theme.spacing.unit * 1.5,
			paddingBottom: theme.spacing.unit * 1.5,
			width: 'auto',
			overflow: 'hidden',
			whiteSpace: 'normal',
			minWidth: '0',
		},

		tableHeader:
		{
			borderBottom: '1px solid rgba(0, 0, 0, 0.54);',
			paddingTop: theme.spacing.unit / 2,
			paddingBottom: theme.spacing.unit / 2,
		},
	});

const TransactionsList = ({ classes, transactions }) =>
{
	let i = 0;

	const getTypography = text =>
		<Typography noWrap variant="body2">{text}</Typography>;

	const parseDate = (transaction) =>
	{
		const date = new Date(Date.parse(transaction.createTime));

		const options =
		{
			day: '2-digit',
			month: '2-digit',
			year: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
		};
		return date.toLocaleDateString('da-DK', options);
	};

	const getTransactionRow = (transaction) =>
	{
		i += 1;

		const didReceive = transactions.received.includes(transaction);
		const sign = didReceive ? '+' : '-';
		const totalColor = didReceive ? 'rgba(0, 187, 0, 0.5)' : 'rgba(187, 0, 0, 0.5)';

		return (
			<Grid item xs={12} key={i} className={classes.tableRow}>
				<Grid container spacing={0}>
					<Grid item xs={3} className={classes.tableCell}>
						{getTypography(parseDate(transaction))}
					</Grid>
					<Grid item xs={1} className={classes.tableCell} style={{ backgroundColor: totalColor }}>
						{getTypography(`${sign} ${transaction.amount}`)}
					</Grid>
					<Grid item xs={4} className={classes.tableCell}>
						{getTypography(transaction.from)}
					</Grid>
					<Grid item xs={4} className={classes.tableCell}>
						{getTypography(transaction.to)}
					</Grid>
				</Grid>
			</Grid>
		);
	};

	const allTransactions = transactions.received.concat(transactions.sent);
	allTransactions.sort((t1, t2) => new Date(t1.createTime) < new Date(t2.createTime));
	const tableRows = allTransactions.map(t => getTransactionRow(t));

	return (
		<Paper className={classes.root}>
			<Typography variant="headline">Previous Transactions</Typography>

			<Grid container spacing={0} className={classes.table}>
				<Grid item xs={12} className={classes.tableHeader}>
					<Grid container spacing={0}>
						<Grid item xs={3} className={classes.tableCell}>
							<Typography variant="subheading">Date</Typography>
						</Grid>
						<Grid item xs={3} className={classes.tableCell}>
							<Typography variant="subheading">Total</Typography>
						</Grid>
						<Grid item xs={3} className={classes.tableCell}>
							<Typography variant="subheading">From</Typography>
						</Grid>
						<Grid item xs={3} className={classes.tableCell}>
							<Typography variant="subheading">To</Typography>
						</Grid>
					</Grid>
				</Grid>

				{tableRows}
			</Grid>
		</Paper>
	);
};

TransactionsList.propTypes =
{
	classes: PropTypes.object.isRequired,
	transactions: PropTypes.object.isRequired,
};

const mapStateToProps = state =>
	({
		transactions: state.wallet.transactions ?
			state.wallet.transactions :
			{ sent: [], received: [] },
	});

export default connect(mapStateToProps)(withStyles(styles)(TransactionsList));
