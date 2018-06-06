import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import each from 'jest-each';

import makeStubWalletProvider from '../wallet/provider/stub-provider';
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
			password: 'password',
		},
	};

	let store;
	let actions;
	let twoFactorMock;

	beforeEach(() =>
	{
		twoFactorMock =
		{
			generateSecret: () => ({ base32: 'base32secret' }),
		};

		actions = authActions(makeStubProtocol(), makeStubWalletProvider(), twoFactorMock);
		store = mockStore(initialState);
	});

	it('should create a 2fa secret', async () =>
	{
		actions = authActions(makeStubProtocol(true), makeStubWalletProvider(), twoFactorMock);

		await store.dispatch(actions.generate2FASecret());

		const lastAction = store.getActions()[store.getActions().length - 1];

		expect(lastAction.type).toEqual(t.SET_2FA_SECRET);
		expect(lastAction.value).toEqual({ base32: 'base32secret' });
	});

	it('should not use 2fa if not enabled', async () =>
	{
		const protocol = makeStubProtocol();
		actions = authActions(protocol, makeStubWalletProvider());

		const state =
		{
			auth:
			{
				twoFactorToken: 'something',
				user:
				{
					username: 'bob',
					twoFactorSecret: 'something',
				},
			},
			flow:
			{
				enable2FA: false,
			},
		};

		store = mockStore(state);

		await store.dispatch(actions.createUser());

		expect(protocol.getCreateParams().twoFactorSecret).toBe(undefined);
		expect(protocol.getCreateParams().twoFactorToken).toBe(undefined);
	});

	each([
		['create user', authActions(makeStubProtocol(true), makeStubWalletProvider()).createUser],
		['login', authActions(makeStubProtocol(true), makeStubWalletProvider()).login],
	]).it('should give error for %s', (_, action) =>
		store.dispatch(action()).then(() =>
		{
			const lastAction = store.getActions()[store.getActions().length - 1];

			expect(lastAction).toEqual(
				{
					type: t.LOGIN_ATTEMPT_FINISHED,
					errorMessage: 'error message',
				});
		}));

	each([
		['create user', authActions(makeStubProtocol(), makeStubWalletProvider()).createUser],
		['login', authActions(makeStubProtocol(), makeStubWalletProvider()).login],
	]).it('should dispatch username error if username is empty for %s', async (_, action) =>
	{
		const noUsernameState =
		{
			auth:
			{
				user:
				{
					username: '',
				},
				password: 'password',
			},
		};

		store = mockStore(noUsernameState);

		await store.dispatch(action());

		const lastAction = store.getActions()[store.getActions().length - 1];

		expect(lastAction.type).toEqual(t.SET_USERNAME_ERROR);
	});

	each([
		['create user', authActions(makeStubProtocol(), makeStubWalletProvider()).createUser],
		['login', authActions(makeStubProtocol(), makeStubWalletProvider()).login],
	]).it('should dispatch username error if user is undefined for %s', async (_, action) =>
	{
		store = mockStore({});

		await store.dispatch(action());

		const lastAction = store.getActions()[store.getActions().length - 1];

		expect(lastAction.type).toEqual(t.SET_USERNAME_ERROR);
	});

	each([
		['create user', authActions(makeStubProtocol(), makeStubWalletProvider()).createUser],
		['login', authActions(makeStubProtocol(), makeStubWalletProvider()).login],
	]).it('should dispatch password error for %s', async (_, action) =>
	{
		const noPasswordState =
		{
			auth:
			{
				user:
				{
					username: 'Bob',
				},
			},
		};

		store = mockStore(noPasswordState);

		await store.dispatch(action());

		const lastAction = store.getActions()[store.getActions().length - 1];

		expect(lastAction.type).toEqual(t.SET_PASSWORD_ERROR);
	});

	it('should give error for login', () =>
	{
		actions = authActions(makeStubProtocol(true));

		return store.dispatch(actions.login()).then(() =>
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
	]).it('should dispatch for %s', (_, action) => store.dispatch(action()).then(() =>
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

