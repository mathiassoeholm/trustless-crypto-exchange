import React from 'react';
import { shallow } from 'enzyme';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { UserForm } from './UserForm';

describe('UserForm', () =>
{
	let props;
	let mountedUserForm;
	let buttonCallbackMock;

	const userForm = () =>
	{
		if (!mountedUserForm)
		{
			mountedUserForm = shallow(<UserForm {...props} />);
		}

		return mountedUserForm;
	};

	beforeEach(() =>
	{
		buttonCallbackMock = jest.fn();

		props =
		{
			onClickedButton: buttonCallbackMock,
			buttonText: 'Button',
			username: 'Bob',
			password: 'Pass',
			onChangedUsername: () => undefined,
			onChangedPassword: () => undefined,
			clearPasswordError: () => undefined,
		};

		mountedUserForm = undefined;
	});

	it('always renders a div', () =>
	{
		const divs = userForm().find('div');
		expect(divs.length).toBeGreaterThan(0);
	});

	it('renders the username', () =>
	{
		expect(userForm().find(TextField).first().props().value).toBe('Bob');
	});

	it('sets the button text', () =>
	{
		const button = userForm().find(Button);
		expect(button.props().children).toBe(props.buttonText);
	});
});
