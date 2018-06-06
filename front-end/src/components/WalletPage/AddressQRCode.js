import React from 'react';
import PropTypes from 'prop-types';
import qrCode from 'qrcode';

import images from '../../images';

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
		const qrCodeSrc = this.state.dataSrc ? this.state.dataSrc : images.qrcode;

		return <img className={this.props.className} src={qrCodeSrc} alt="QR Code" />;
	}
}

AddressQRCode.propTypes =
{
	className: PropTypes.string.isRequired,
	address: PropTypes.string.isRequired,
};

export default AddressQRCode;
