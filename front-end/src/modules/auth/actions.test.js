import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import t from './actionTypes';
import actions from './actions';
import dependencies from '../../dependencies';
import stubApi from './api/stubApi';
import stubProtocol from './protocol/stubProtocol';

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
				username: 'bob'
			}
		}
	};

	let store;

	beforeEach(() =>
	{
		dependencies.authApi = stubApi;
		dependencies.authProtocol = stubProtocol;
		stubProtocol.options.shouldFail = false;

		store = mockStore(initialState);
	});

	it('should give error for create user', () =>
	{
		stubProtocol.options.shouldFail = true;

		return store.dispatch(actions.createUser('password')).then(() =>
		{
			const lastAction = store.getActions()[store.getActions().length - 1];
	
			expect(lastAction).toEqual(
			{
				type: t.LOGIN_ATTEMPT_FINISHED,
				errorMessage: 'error message'
			});
		});
	});

	it('should give error for login', () =>
	{
		stubProtocol.options.shouldFail = true;

		return store.dispatch(actions.login('password')).then(() =>
		{
			const lastAction = store.getActions()[store.getActions().length - 1];
	
			expect(lastAction).toEqual(
			{
				type: t.LOGIN_ATTEMPT_FINISHED,
				errorMessage: 'error message'
			});
		});
	});
	
	it('should dispatch for create user', () =>
	{
		return store.dispatch(actions.createUser('password')).then(() =>
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
					message: 'message'
				}
			});

			expect(secondToLastAction).toEqual(
			{
				type: t.LOGIN_ATTEMPT_FINISHED,
				errorMessage: undefined
			});

			expect(lastAction).toEqual(
			{
				type: t.LOG_IN,
				user: initialState.auth.user
			});
		});
	});

	it('should dispatch for login', () =>
	{
		return store.dispatch(actions.login('password')).then(() =>
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
					message: 'message'
				}
			});
	
			expect(secondToLastAction).toEqual(
			{
				type: t.LOGIN_ATTEMPT_FINISHED,
				errorMessage: undefined
			});

			expect(lastAction).toEqual(
			{
				type: t.LOG_IN,
				user: initialState.auth.user
			});
		});
	});
});

