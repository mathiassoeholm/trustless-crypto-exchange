import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import MoreIcon from '@material-ui/icons/MoreVert';

import flowActions from '../../modules/flow/actions';
import RefreshBalanceButton from './RefreshBalanceButton';
import AddressQRCode from './AddressQRCode';

const styles = theme =>
	({
		root:
		{
			padding: theme.spacing.unit * 2,
			position: 'relative',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'flex-start',
		},

		buttonParent:
		{
			position: 'absolute',
			top: 0,
			right: 8,
			display: 'flex',
			zIndex: '10',
		},

		icon:
		{
			width: '30px',
			height: '30px',
		},

		textParent:
		{
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-around',
			textAlign: 'left',
		},

		qrcodeImage:
		{
			height: '10em',
			padding: theme.spacing.unit,
		},
	});

const AccountDetails = (
	{
		classes,
		balance,
		address,
		onClickedSend,
	}) =>
{
	return (
		<Paper className={classes.root}>
			<AddressQRCode className={classes.qrcodeImage} address={address} />

			<div className={classes.textParent}>
				<Typography variant="headline">Your Account</Typography>
				<br />
				<Typography noWrap variant="subheading">Address: {address}</Typography>
				<br />
				<Typography variant="subheading">Balance: {balance} Ether</Typography>
			</div>

			<div className={classes.buttonParent}>
				<RefreshBalanceButton classes={classes} />
				<IconButton onClick={onClickedSend}>
					<SendIcon className={classes.icon} />
				</IconButton>
				<IconButton>
					<MoreIcon className={classes.icon} />
				</IconButton>
			</div>
		</Paper>
	);
};

AccountDetails.propTypes =
{
	classes: PropTypes.object.isRequired,
	balance: PropTypes.number.isRequired,
	address: PropTypes.string.isRequired,
	onClickedSend: PropTypes.func.isRequired,
};

const mapStateToProps = state =>
	({
		balance: state.wallet.balance ? state.wallet.balance : 0,
		address: state.wallet.secret ? state.wallet.secret.address : 'Invalid address',
	});

const mapDispatchToProps = dispatch =>
	({
		onClickedSend: () => dispatch(flowActions.setSendDialogOpen(true)),
	});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountDetails));
