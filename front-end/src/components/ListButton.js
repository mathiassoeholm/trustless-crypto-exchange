import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const ListButton = props =>
	(
		<ListItem button onClick={props.onClick}>
			<ListItemIcon>
				{props.icon}
			</ListItemIcon>
			<ListItemText primary={props.text} />
		</ListItem>
	);

ListButton.propTypes =
{
	onClick: PropTypes.func.isRequired,
	icon: PropTypes.node.isRequired,
	text: PropTypes.string.isRequired,
};

export default ListButton;
