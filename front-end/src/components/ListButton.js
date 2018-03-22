import React from 'react';
import PropTypes from 'prop-types';

import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

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
