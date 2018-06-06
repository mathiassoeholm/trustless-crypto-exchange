import React from 'react';
import { mount } from 'enzyme';
import TestIcon from '@material-ui/icons/ExitToApp';

import ListButton from './ListButton';

describe('ListButton', () =>
{
	let props;
	let wrapper;
	let onClickMock;

	const listButton = () =>
	{
		if (!wrapper)
		{
			wrapper = mount(<ListButton {...props} />);
		}

		return wrapper;
	};

	beforeEach(() =>
	{
		onClickMock = jest.fn();

		props =
		{
			onClick: onClickMock,
			icon: <TestIcon />,
			text: '',
		};

		wrapper = undefined;
	});

	it('renders without crashing', () =>
	{
		expect(listButton().exists()).toBe(true);
	});

	it('renders the text', () =>
	{
		props.text = 'test';

		// Not using findWhere() the .html() breaks when using mount:
		// Github issue: https://github.com/airbnb/enzyme/issues/1566
		expect(listButton().debug().includes(props.text)).toBe(true);
	});

	it('renders the icon', () =>
	{
		expect(listButton().find(TestIcon).length).toBe(1);
	});

	it('calls onClick correctly', () =>
	{
		listButton().simulate('click');

		expect(onClickMock.mock.calls.length).toBe(1);
	});
});
