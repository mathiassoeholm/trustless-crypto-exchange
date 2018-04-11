import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import each from 'jest-each';

import t from './actionTypes';
import authActions from './actions';
import stubProtocol from './protocol/stubProtocol';
import stubWalletProvider from '../wallet/provider/stubProvider';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('auth actions', () =>
{
	const initialState =
	{
		auth:
		{
			user:
			{
				username: 'bob',
			},
		},
	};

	let store;
	let actions;

	beforeEach(() =>
	{
		actions = authActions(stubProtocol(), stubWalletProvider);

		store = mockStore(initialState);
	});

	it('should give error for create user', () =>
	{
		actions = authActions(stubProtocol(true));

		return store.dispatch(actions.createUser('password')).then(() =>
		{
			const lastAction = store.getActions()[store.getActions().length - 1];

			expect(lastAction).toEqual(
				{
					type: t.LOGIN_ATTEMPT_FINISHED,
					errorMessage: 'error message',
				});
		});
	});

	it('should give error for login', () =>
	{
		actions = authActions(stubProtocol(true));

		return store.dispatch(actions.login('password')).then(() =>
		{
			const lastAction = store.getActions()[store.getActions().length - 1];

			expect(lastAction).toEqual(
				{
					type: t.LOGIN_ATTEMPT_FINISHED,
					errorMessage: 'error message',
				});
		});
	});

	each([
		['create user', authActions(stubProtocol(), stubWalletProvider).createUser],
		['login', authActions(stubProtocol(), stubWalletProvider).login],
	]).it('should dispatch for %s', (_, action) => store.dispatch(action('password')).then(() =>
	{
		const firstAction = store.getActions()[0];
		const secondToLastAction = store.getActions()[store.getActions().length - 2];
		const lastAction = store.getActions()[store.getActions().length - 1];

		expect(firstAction).toEqual(
			{
				type: t.PROGRESS_UPDATE,
				status:
				{
					progress: 1,
					message: 'message',
				},
			});

		expect(secondToLastAction).toEqual(
			{
				type: t.LOGIN_ATTEMPT_FINISHED,
				errorMessage: undefined,
			});

		expect(lastAction).toEqual(
			{
				type: t.LOG_IN,
				user: initialState.auth.user,
				secret: {},
			});
	}),
	);
});

