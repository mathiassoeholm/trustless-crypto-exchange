import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

const ListButton = (props) =>
{
	const onClick = () =>
	{
		props.onClick(props.index);
	};

	return (
		<ListItem button onClick={onClick}>
			<ListItemIcon>
				{props.icon}
			</ListItemIcon>
			<ListItemText primary={props.title} />
		</ListItem>
	);
};

ListButton.propTypes =
{
	onClick: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
	icon: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired
};

export default ListButton;
