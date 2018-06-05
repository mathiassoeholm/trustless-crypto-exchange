import React from 'react';

import Grid from '@material-ui/core/Grid';

import AccountDetails from './AccountDetails';
import SendDialog from './SendDialog/SendDialog';

const WalletPage = () =>
	(
		<Grid container spacing={24}>
			<Grid item xs={12}>
				<AccountDetails />
			</Grid>

			<SendDialog />
		</Grid>
	);

export default WalletPage;
