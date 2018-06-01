import React from 'react';
import { mount } from 'enzyme';
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
			mountedUserForm = mount(<UserForm {...props} />);
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
			onChangedUsername: () => undefined,
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

	it('has a single password field', () =>
	{
		expect(userForm().find('input#password').length).toBe(1);
	});

	it('updates password field and calls callback correctly', () =>
	{
		const pwField = userForm().find('input#password').first();
		pwField.simulate('change', { target: { value: 'pass' } });

		userForm().find(Button).simulate('click');
		expect(buttonCallbackMock.mock.calls.length).toBe(1);
		expect(buttonCallbackMock.mock.calls[0][0]).toBe('pass');
	});
});
