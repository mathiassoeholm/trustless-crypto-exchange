import React from 'react';
import each from 'jest-each';
import { shallow } from 'enzyme';

import menuTypes from '../modules/flow/menuTypes';
import { ActiveMenu } from './ActiveMenu';

describe('ActiveMenu', () =>
{
	each(
		[
			['create', menuTypes.CREATE_USER],
			['login', menuTypes.LOGIN],
			['wallet', menuTypes.WALLET],
		])
		.it('renders %s menu', (_, menuType) =>
		{
			const wrapper = shallow(<ActiveMenu activeMenu={menuType} />);
			expect(wrapper.exists()).toBe(true);
		});
});
