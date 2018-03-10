import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

const ListButton = (props) =>
{
	return (
		<ListItem button onClick={props.onClick}>
			<ListItemIcon>
				{props.icon}
			</ListItemIcon>
			<ListItemText primary={props.text} />
		</ListItem>
	);
};

ListButton.propTypes =
{
	onClick: PropTypes.func.isRequired,
	icon: PropTypes.object.isRequired,
	text: PropTypes.string.isRequired
};

export default ListButton;
