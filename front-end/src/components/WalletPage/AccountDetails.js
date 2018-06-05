import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

import flowActions from '../../modules/flow/actions';

const styles = theme =>
	({
		root:
		{
			padding: theme.spacing.unit,
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
	});

const AccountDetails = ({ classes, balance, address, onClickedSend }) =>
	(
		<Paper className={classes.root}>
			<div>
				Test
			</div>

			<div style={{ textAlign: 'left' }}>
				<Typography variant="headline">Your Account</Typography>
				<br />
				<Typography noWrap variant="subheading">Address: {address}</Typography>
				<br />
				<Typography variant="subheading">Balance: {balance} Ether</Typography>
			</div>

			<div className={classes.buttonParent}>
				<IconButton onClick={onClickedSend}>
					<SendIcon style={{ width: '30px', height: '30px' }} />
				</IconButton>
			</div>
		</Paper>
	);

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
