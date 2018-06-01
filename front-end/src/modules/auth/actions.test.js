import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import each from 'jest-each';

import makeStubWalletProvider from '../wallet/provider/stubProvider';
import t from './action-types';
import authActions from './actions';
import makeStubProtocol from './protocol/stub-protocol';

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
		actions = authActions(makeStubProtocol(), makeStubWalletProvider());
		store = mockStore(initialState);
	});

	it('should give error for create user', () =>
	{
		actions = authActions(makeStubProtocol(true), makeStubWalletProvider());

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

	it('should dispatch username error if username is empty', async () =>
	{
		const noUsernameState =
		{
			auth:
			{
				user:
				{
					username: '',
				},
			},
		};

		store = mockStore(noUsernameState);

		await store.dispatch(actions.createUser('password'));

		const lastAction = store.getActions()[store.getActions().length - 1];

		expect(lastAction.type).toEqual(t.SET_USERNAME_ERROR);
	});

	it('should dispatch username error if user is undefined for create', async () =>
	{
		store = mockStore({});

		await store.dispatch(actions.createUser('password'));

		const lastAction = store.getActions()[store.getActions().length - 1];

		expect(lastAction.type).toEqual(t.SET_USERNAME_ERROR);
	});

	it('should dispatch username error if user is undefined for login', async () =>
	{
		store = mockStore({});

		await store.dispatch(actions.login('password'));

		const lastAction = store.getActions()[store.getActions().length - 1];

		expect(lastAction.type).toEqual(t.SET_USERNAME_ERROR);
	});

	it('should dispatch password error for create', async () =>
	{
		await store.dispatch(actions.createUser(''));

		const lastAction = store.getActions()[store.getActions().length - 1];

		expect(lastAction.type).toEqual(t.SET_PASSWORD_ERROR);
	});

	it('should dispatch password error for login', async () =>
	{
		await store.dispatch(actions.login(''));

		const lastAction = store.getActions()[store.getActions().length - 1];

		expect(lastAction.type).toEqual(t.SET_PASSWORD_ERROR);
	});

	it('should give error for login', () =>
	{
		actions = authActions(makeStubProtocol(true));

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
		['create user', authActions(makeStubProtocol(), makeStubWalletProvider()).createUser],
		['login', authActions(makeStubProtocol(), makeStubWalletProvider()).login],
	]).it('should dispatch for %s', (_, action) => store.dispatch(action('password')).then(() =>
	{
		const thirdToLastAction = store.getActions()[store.getActions().length - 3];
		const secondToLastAction = store.getActions()[store.getActions().length - 2];
		const lastAction = store.getActions()[store.getActions().length - 1];

		expect(thirdToLastAction).toEqual(
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

