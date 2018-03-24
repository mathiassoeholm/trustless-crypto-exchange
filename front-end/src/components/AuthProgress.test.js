import React from 'react';
import each from 'jest-each';
import { shallow } from 'enzyme';

import { AuthProgress } from './AuthProgress';

describe('AuthProgress', () =>
{
	let props;
	let wrapper;

	const authProgress = () =>
	{
		if (!wrapper)
		{
			wrapper = shallow(<AuthProgress {...props} />);
		}

		return wrapper;
	};

	beforeEach(() =>
	{
		props =
		{
			title: 'test title',
			progress: 0.5,
			message: 'test message',
			open: true,
		};

		wrapper = undefined;
	});

	it('renders without crashing', () =>
	{
		expect(authProgress().exists()).toBe(true);
	});

	it('shows the title', () =>
	{
		expect(authProgress().findWhere(n => n.text().includes(props.title)).length).toBe(1);
	});

	it('shows the message', () =>
	{
		expect(authProgress().findWhere(n => n.text().includes(props.message)).length).toBe(1);
	});

	it('uses the progress', () =>
	{
		props.progress = 1;
		const withProgress = authProgress().debug();

		wrapper = undefined;

		props.progress = 0;
		const withoutProgress = authProgress().debug();

		expect(withProgress).not.toBe(withoutProgress);
	});
});
