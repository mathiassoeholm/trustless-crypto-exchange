import t from './actionTypes';
import deepFreeze from 'deep-freeze';
import reducer from './reducer';

it('logs in and is pure', () =>
{
	const stateBefore =
	{
		isLoggedIn: false,
		user: null
	};

	const user =
	{
		username: "bob"
	};

	const stateAfter =
	{
		isLoggedIn: true,
		user:
		{
			username: 'bob'
		}
	};

	deepFreeze(stateBefore);
	deepFreeze(user);
	
	const newState = reducer(stateBefore, 
	{
		type: t.LOG_IN,
		user
	});

	expect(newState).toEqual(stateAfter);
});

it('does not reuse user object', () =>
{
	const user = 
	{
		username: 'bob',
		personalDetails:
		{
			age: 20
		}
	};

	const newState = reducer(undefined,
	{
		type: t.LOG_IN,
		user
	});

	user.username = 'alice';
	user.personalDetails.age = 5;

	// This requires the reducer to perform a shallow copy
	expect(newState.user.username).toEqual('bob');

	// This requires the reducer to perform a deep copy
	expect(newState.user.personalDetails.age).toEqual(20);
});
