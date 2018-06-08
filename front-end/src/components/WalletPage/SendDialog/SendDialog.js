import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';

import Confirmation from './Confirmation';
import Information from './Information';

import flowActions from '../../../modules/flow/actions';

const styles = theme =>
	({
		dialogPaper:
		{
			minWidth: '40em',
			minHeight: '20em',
		},
	});

const SendDialog = (
	{
		classes,
		step,
		amount,
		receiver,
		closeWindow,
		makeChangeStep,
		open,
	}) =>
{
	const getCurrentDialog = () =>
	{
		if (step === 0)
		{
			return (
				<Information
					amount={amount}
					receiver={receiver}
					onClickedCancel={closeWindow}
					onClickedNext={makeChangeStep(1)}
				/>
			);
		}

		return (
			<Confirmation
				amount={amount}
				receiver={receiver}
				closeWindow={closeWindow}
				onClickedBack={makeChangeStep(0)}
			/>
		);
	};

	return (
		<Dialog classes={{ paper: classes.dialogPaper }} open={open}>
			{getCurrentDialog()}
		</Dialog>
	);
};

SendDialog.propTypes =
{
	classes: PropTypes.object.isRequired,
	step: PropTypes.number.isRequired,
	makeChangeStep: PropTypes.func.isRequired,
	closeWindow: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	amount: PropTypes.number.isRequired,
	receiver: PropTypes.string.isRequired,
};

const mapStateToProps = state =>
	({
		open: state.flow.sendDialogOpen,
		step: state.flow.sendDialogStep,
		amount: state.wallet.amount ? state.wallet.amount : 0,
		receiver: state.wallet.receiver ? state.wallet.receiver : '',
	});

const mapDispatchToProps = dispatch =>
	({
		closeWindow: () => dispatch(flowActions.setSendDialogOpen(false)),
		makeChangeStep: step => () => dispatch(flowActions.setSendDialogStep(step)),
	});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SendDialog));
