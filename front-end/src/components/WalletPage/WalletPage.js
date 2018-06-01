import React from 'react';

import Grid from '@material-ui/core/Grid';

import SendCurrencyBuilder from './SendCurrency';
import AccountDetails from './AccountDetails';

const SendCurrency = SendCurrencyBuilder();

const WalletPage = () =>
	(
		<Grid container spacing={24}>
			<Grid item xs={12} lg={6}>
				<AccountDetails />
			</Grid>

			<Grid item xs={12} lg={6}>
				<SendCurrency />
			</Grid>
		</Grid>
	);

export default WalletPage;
