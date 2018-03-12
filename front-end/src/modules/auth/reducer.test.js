import t from './actionTypes';
import deepFreeze from 'deep-freeze';
import reducer from './reducer';

it('changes username and is pure', () =>
{
	const stateBefore =
	{
		user:
		{
			username: 'bob'
		}
	};

	const stateAfter =
	{
		user:
		{
			username: 'alice'
		}
	};

	deepFreeze(stateBefore);

	const newState = reducer(stateBefore,
	{
		type: t.CHANGE_USERNAME,
		username: 'alice'
	});

	expect(newState).toEqual(stateAfter);
});

it('logs out and is pure', () =>
{
	const stateBefore =
	{
		isLoggedIn: true,
		user: {}
	};

	const stateAfter =
	{
		isLoggedIn: false,
		user: null
	};

	deepFreeze(stateBefore);

	const newState = reducer(stateBefore,
	{
		type: t.LOG_OUT
	});

	expect(newState).toEqual(stateAfter);
});

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

it('updates login attempt status and is pure', () =>
{
	const stateBefore = 
	{
		loginAttemptStatus:
		{
			progress: 0.8,
			message: "bob"
		}
	};

	const action =
	{
		type: t.PROGRESS_UPDATE,
		status: 
		{
			progress: 0.9,
			message: "alice"
		}
	};

	const stateAfter =
	{
		loginAttemptStatus:
		{
			progress: 0.9,
			message: "alice"
		}
	};

	deepFreeze(stateBefore);
	
	const newState = reducer(stateBefore, action);

	expect(newState).toEqual(stateAfter);
});
