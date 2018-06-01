import React from 'react';
import each from 'jest-each';
import { shallow } from 'enzyme';

import menuTypes from '../modules/flow/menu-types';
import { ActiveMenuTitle } from './ActiveMenuTitle';

each(
	[
		['create', menuTypes.CREATE_USER],
		['login', menuTypes.LOGIN],
		['wallet', menuTypes.WALLET],
	]).it('returns valid title for %s', (_, menuType) =>
{
	shallow(<ActiveMenuTitle activeMenu={menuType} />);
});

it('throws an error on invalid menu type', () =>
{
	expect(() =>
	{
		shallow(<ActiveMenuTitle activeMenu="Invalid" />);
	}).toThrow();
});
