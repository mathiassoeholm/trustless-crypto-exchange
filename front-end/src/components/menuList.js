// This file is shared across the demos.

import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import CreateUserIcon from 'material-ui-icons/Face';
import LoginIcon from 'material-ui-icons/VpnKey';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';



export default (
  <div>
    <ListItem button>
      <ListItemIcon>
        <CreateUserIcon />
      </ListItemIcon>
      <ListItemText primary="Create User" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LoginIcon />
      </ListItemIcon>
      <ListItemText primary="Login" />
    </ListItem>
  </div>
);