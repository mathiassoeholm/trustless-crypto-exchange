import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { Typography } from 'material-ui';

import DefaultWalletActions from '../modules/wallet/actions';

const WalletDetails = ({
	amount,
	onAmountChanged,
	receiver,
	onReceiverChanged,
	onClickedSubmit,
}) =>
	(
		<Grid container spacing={24}>
			<Grid item xs={12} lg={6}>
				<Paper>
					<Typography variant="headline">Your account</Typography>
				</Paper>
			</Grid>

			<Grid item xs={12} lg={6}>
				<Paper>
					<Typography variant="headline">Send Ethereum</Typography>

					<TextField
						id="amountField"
						label="Amount"
						margin="normal"
						type="number"
						value={amount}
						onChange={onAmountChanged}
					/>
					<br />
					<TextField
						id="receiverField"
						label="Receiver"
						margin="normal"
						value={receiver}
						onChange={onReceiverChanged}
					/>
					<br />
					<Button id="submitButton" variant="raised" color="primary" onClick={onClickedSubmit}>
						Perform Transaction
					</Button>
				</Paper>
			</Grid>
		</Grid>
	);

WalletDetails.propTypes =
{
	amount: PropTypes.number.isRequired,
	onAmountChanged: PropTypes.func.isRequired,
	receiver: PropTypes.string.isRequired,
	onReceiverChanged: PropTypes.func.isRequired,
	onClickedSubmit: PropTypes.func.isRequired,
};

export default (WalletActions) =>
{
	const walletActions = WalletActions ? WalletActions() : DefaultWalletActions();

	const mapStateToProps = state =>
		({
			amount: state.wallet.amount ? state.wallet.amount : 0,
			receiver: state.wallet.receiver ? state.wallet.receiver : '',
		});

	const mapDispatchToProps = dispatch =>
		({
			onAmountChanged: event => dispatch(walletActions.changeAmount(event.target.value)),
			onReceiverChanged: event => dispatch(walletActions.changeReceiver(event.target.value)),
			onClickedSubmit: () => dispatch(walletActions.performTransaction()),
		});

	return connect(mapStateToProps, mapDispatchToProps)(WalletDetails);
};
