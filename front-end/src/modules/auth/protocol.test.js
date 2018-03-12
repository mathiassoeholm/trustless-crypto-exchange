import protocol from './protocol';
import stubApi from './api/stubApi';

// We use the stub api for testing purposes
protocol.dependencies.api = stubApi;

it('creates a user', async () =>
{
	await protocol.createUser({username: 'kurt'}, 'start123');
});

it('creates and stores secret', async () =>
{
	await protocol.createUser({username: 'kurt'}, 'start123');
	const result = await protocol.login('kurt', 'start123');

	expect(result.username).toEqual('kurt');
});

it('updates progress correctly when logging in', async () =>
{
	let previousProgress = 0;

	const progressCallback = (p) =>
	{
		expect(p).toBeGreaterThanOrEqual(previousProgress);
		previousProgress = p;
	};

	await protocol.createUser({username: 'kurt'}, 'start123', progressCallback);

	expect(previousProgress).toEqual(1);

	previousProgress = 0;

	await protocol.login('kurt', 'start123', progressCallback);

	expect(previousProgress).toEqual(1);
});
