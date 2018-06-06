import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import qrCode from 'qrcode';

import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme =>
	({
		qrcodeImage:
		{
			position: 'relative',
			height: '10em',
			width: '10em',
			padding: theme.spacing.unit,
		},

		spinner:
		{
			position: 'absolute',
			top: '50%',
			marginTop: '-30px',
			marginLeft: '-30px',
		},
	});

class AddressQRCode extends React.Component
{
	state = {};

	componentDidUpdate(prevProps)
	{
		if (prevProps.address !== this.props.address || !this.state.dataSrc)
		{
			qrCode.toDataURL(this.props.address, { margin: 1, scale: 8 })
				.then(url => this.setState({ dataSrc: url }));
		}
	}

	render()
	{
		if (!this.state.dataSrc)
		{
			return (
				<div className={this.props.classes.qrcodeImage}>
					<CircularProgress size={60} className={this.props.classes.spinner} />
				</div>
			);
		}

		return <img className={this.props.classes.qrcodeImage} src={this.state.dataSrc} alt="QR Code" />;
	}
}

AddressQRCode.propTypes =
{
	classes: PropTypes.object.isRequired,
	address: PropTypes.string.isRequired,
};

export default withStyles(styles)(AddressQRCode);
