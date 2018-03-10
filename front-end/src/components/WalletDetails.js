import React from 'react';
import PropTypes from 'prop-types';

const styles = theme => ({
	root: 
	{
		width: '70%',
		display: "flex",
		height: "400px"
	}
});

const WalletDetails = props =>
{
	return (
		<div style={styles.root}/>
	);
};

export default WalletDetails;
