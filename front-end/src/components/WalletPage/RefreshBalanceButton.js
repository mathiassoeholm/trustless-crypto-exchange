import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

import walletActions from '../../modules/wallet/actions';

const RefreshBalanceButton = ({ classes, isUpdatingBalance, startBalanceUpdate }) =>
{
	if (isUpdatingBalance)
	{
		return <CircularProgress className={classes.icon} />;
	}

	return (
		<IconButton onClick={startBalanceUpdate}>
			<RefreshIcon className={classes.icon} />
		</IconButton>
	);
};

RefreshBalanceButton.propTypes =
{
	classes: PropTypes.object.isRequired,
	isUpdatingBalance: PropTypes.bool.isRequired,
	startBalanceUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = state =>
	({
		isUpdatingBalance: state.wallet.isUpdatingBalance,
	});

const mapDispatchToProps = dispatch =>
	({
		startBalanceUpdate: () => dispatch(walletActions.startBalanceUpdate()),
	});


export default connect(mapStateToProps, mapDispatchToProps)(RefreshBalanceButton);
