import React from 'react';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { shallow } from 'enzyme';

import MenuButtons from './MenuButtons';
import authActionTypes from '../modules/auth/action-types';
import flowActionTypes from '../modules/flow/action-types';

import menuTypes from '../modules/flow/menu-types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('MenuButtons', () =>
{
	let wrapper;
	let store;

	let initialState;

	const menuButtons = () =>
	{
		store = mockStore(initialState);

		if (!wrapper)
		{
			wrapper = shallow(<MenuButtons store={store} />).dive();
		}

		return wrapper;
	};

	beforeEach(() =>
	{
		initialState = {
			auth:
			{
				isLoggedIn: true,
				user:
				{
					username: 'bob',
				},
			},
		};

		wrapper = undefined;
	});

	it('renders without crashing', () =>
	{
		expect(menuButtons().exists()).toBe(true);
	});

	it('renders logout button when logged in', () =>
	{
		expect(menuButtons().findWhere(n => n.props().text === 'Logout').length).toBe(1);
	});

	it('dispatches logout action correctly', () =>
	{
		menuButtons().findWhere(n => n.props().text === 'Logout').simulate('click');
		expect(store.getActions()[0].type).toEqual(authActionTypes.LOG_OUT);
	});

	it('renders login menu button when logged out', () =>
	{
		initialState.auth.isLoggedIn = false;
		expect(menuButtons().findWhere(n => n.props().text === 'Login').length).toBe(1);
	});

	it('dispatches change menu action correctly', () =>
	{
		initialState.auth.isLoggedIn = false;
		menuButtons().findWhere(n => n.props().text === 'Login').simulate('click');

		expect(store.getActions()[0]).toEqual(
			{
				type: flowActionTypes.CHANGE_MENU,
				menuType: menuTypes.LOGIN,
			},
		);
	});
});
