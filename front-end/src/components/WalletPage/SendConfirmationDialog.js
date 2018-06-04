import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Typography from '@material-ui/core/Typography';

import flowActions from '../../modules/flow/actions';
import walletActions from '../../modules/wallet/actions';

const styles = theme =>
	({
		wrapper:
		{
			margin: theme.spacing.unit,
			position: 'relative',
		},

		buttonProgress:
		{
			color: green[500],
			position: 'absolute',
			top: '50%',
			left: '50%',
			marginTop: -12,
			marginLeft: -12,
		},

		successTitle:
		{
			color: green[500],
		},

		errorTitle:
		{
			color: red[500],
		},
	});

const SendConfirmationDialog = (
	{
		classes,
		open,
		amount,
		receiver,
		closeWindow,
		onConfirm,
		transactionStatus,
	}) =>
{
	const confirmDialog = () => (
		<Dialog open={open}>
			<DialogTitle>Perform Transaction</DialogTitle>
			<DialogContent>
				Are you sure you want to transfer <b>{amount}</b> Ether to <b>{receiver}</b>
			</DialogContent>
			<DialogActions>
				<Button disabled={Boolean(transactionStatus)} onClick={closeWindow} color="primary">
					Cancel
				</Button>
				<div className={classes.wrapper}>
					<Button disabled={Boolean(transactionStatus)} onClick={onConfirm} color="primary">
						Confirm
					</Button>
					{ Boolean(transactionStatus) &&
						<CircularProgress size={24} className={classes.buttonProgress} /> }
				</div>
			</DialogActions>
		</Dialog>
	);

	const failDialog = () => (
		<Dialog open={open}>
			<DialogTitle color="error">
				<div className={classes.errorTitle}>
					Transaction Failed
				</div>
			</DialogTitle>
			<DialogContent>
				<p>The transaction of <b>{amount}</b> Ether to <b>{receiver} failed</b></p>
				<Typography color="error" variant="subheading" align="center">
					{transactionStatus.error.message}
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeWindow} color="primary">
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);

	const successDialog = () => (
		<Dialog open={open}>
			<DialogTitle>
				<div className={classes.successTitle}>
					Transaction Succeeded
				</div>
			</DialogTitle>
			<DialogContent>
				<p>The transaction of <b>{amount}</b> Ether to <b>{receiver} succeeded</b></p>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeWindow} color="primary">
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);

	if (!transactionStatus || !transactionStatus.isFinished)
	{
		return confirmDialog();
	}
	else if (transactionStatus.error)
	{
		return failDialog();
	}

	return successDialog();
};

SendConfirmationDialog.propTypes =
{
	classes: PropTypes.object.isRequired,
	open: PropTypes.bool.isRequired,
	closeWindow: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
	amount: PropTypes.number,
	receiver: PropTypes.string,
	transactionStatus: PropTypes.object,
};

SendConfirmationDialog.defaultProps =
{
	amount: 0,
	receiver: '',
};

const mapStateToProps = state =>
	({
		open: state.flow.sendConfirmationOpen,
		amount: state.wallet.amount,
		receiver: state.wallet.receiver,

		transactionStatus: state.wallet.transactionStatus,
	});

const mapDispatchToProps = dispatch =>
	({
		closeWindow: () => dispatch(flowActions.setSendConfirmationOpen(false)),
		onConfirm: () => dispatch(walletActions.startTransaction()),
	});

export default connect(mapStateToProps, mapDispatchToProps)(
	withStyles(styles)(SendConfirmationDialog));
