import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AccountDetails from './AccountDetails';
import SendDialog from './SendDialog/SendDialog';
import TransactionsList from './TransactionsList';

const styles = theme =>
	({
		root:
		{
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
		},
	});

const WalletPage = ({ classes }) =>
	(
		<div className={classes.root}>
			<div>
				<AccountDetails />
			</div>

			<div style={{ flexGrow: 1, marginTop: '8px' }}>
				<TransactionsList />
			</div>

			<SendDialog />
		</div>
	);

WalletPage.propTypes =
{
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WalletPage);
