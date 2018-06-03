import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import flowActions from '../../modules/flow/actions';
import walletActions from '../../modules/wallet/actions';

const SendConfirmationDialog = (
	{
		open,
		amount,
		receiver,
		onCancel,
		onConfirm,
	}) =>
	(
		<Dialog open={open}>
			<DialogTitle>Perform Transaction</DialogTitle>
			<DialogContent>
				Are you sure you want to transfer <b>{amount}</b> Wei to <b>{receiver}</b>
			</DialogContent>
			<DialogActions>
				<Button onClick={onCancel} color="primary">
					Cancel
				</Button>
				<Button onClick={onConfirm} color="primary">
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);

SendConfirmationDialog.propTypes =
{
	open: PropTypes.bool.isRequired,
	onCancel: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
	amount: PropTypes.number.isRequired,
	receiver: PropTypes.string.isRequired,
};

const mapStateToProps = state =>
	({
		open: state.flow.sendConfirmationOpen,
		amount: state.wallet.amount,
		receiver: state.wallet.receiver,
	});

const mapDispatchToProps = dispatch =>
	({
		onCancel: () => dispatch(flowActions.setSendConfirmationOpen(false)),
		onConfirm: () => dispatch(walletActions.startTransaction()),
	});

export default connect(mapStateToProps, mapDispatchToProps)(SendConfirmationDialog);
