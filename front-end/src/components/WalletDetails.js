import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';

import WalletActions from '../modules/wallet/actions';

const walletActions = WalletActions();

const styles = () => ({
	root:
	{
		width: '70%',
		display: 'flex',
		height: '400px',
	},
});

const WalletDetails = ({ amount, onAmountChanged }) =>
	(
		<div>
			<TextField
				id="amountField"
				label="Amount"
				margin="normal"
				type="number"
				value={amount}
				onChange={onAmountChanged}
			/>
		</div>
	);

const mapStateToProps = state =>
	({
		amount: state.wallet.amount ? state.wallet.amount : 0,
	});

const mapDispatchToProps = dispatch =>
	({
		onAmountChanged: event => dispatch(walletActions.changeAmount(event.target.value)),
	});

WalletDetails.propTypes =
{
	amount: PropTypes.number.isRequired,
	onAmountChanged: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletDetails);
