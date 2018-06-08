import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import walletActions from '../../../modules/wallet/actions';

const Information = ({
	amount,
	onAmountChanged,
	receiver,
	onReceiverChanged,
	onClickedNext,
	onClickedCancel,
}) =>
	(
		<div>
			<DialogTitle>
				Send Ethereum
			</DialogTitle>

			<DialogContent>
				<TextField
					fullWidth
					id="amountField"
					label="Amount"
					margin="normal"
					type="number"
					value={amount}
					onChange={onAmountChanged}
				/>
				<br />
				<TextField
					fullWidth
					id="receiverField"
					label="Receiver"
					margin="normal"
					value={receiver}
					onChange={onReceiverChanged}
				/>
			</DialogContent>
			<DialogActions>
				<Button variant="raised" color="primary" onClick={onClickedCancel}>
					Cancel
				</Button>
				<Button variant="raised" color="primary" onClick={onClickedNext}>
					Next
				</Button>
			</DialogActions>
		</div>
	);

Information.propTypes =
{
	amount: PropTypes.number.isRequired,
	onAmountChanged: PropTypes.func.isRequired,
	receiver: PropTypes.string.isRequired,
	onReceiverChanged: PropTypes.func.isRequired,
	onClickedNext: PropTypes.func.isRequired,
	onClickedCancel: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
	({
		onAmountChanged: event => dispatch(walletActions.changeAmount(event.target.value)),
		onReceiverChanged: event => dispatch(walletActions.changeReceiver(event.target.value)),
	});

export default connect(null, mapDispatchToProps)(Information);
