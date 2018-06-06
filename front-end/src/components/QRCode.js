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

class QRCode extends React.Component
{
	state = {};

	componentDidMount()
	{
		this.updateQR();
	}

	componentDidUpdate(prevProps)
	{
		if (prevProps.data !== this.props.data || !this.state.dataSrc)
		{
			this.updateQR();
		}
	}

	updateQR()
	{
		qrCode.toDataURL(this.props.data, { margin: 1, scale: 8 })
			.then(url => this.setState({ dataSrc: url }));
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

QRCode.propTypes =
{
	classes: PropTypes.object.isRequired,
	data: PropTypes.string.isRequired,
};

export default withStyles(styles)(QRCode);
