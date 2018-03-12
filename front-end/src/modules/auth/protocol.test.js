import protocol from './protocol';
import stubApi from './api/stubApi';

// We use the stub api for testing purposes
protocol.dependencies.api = stubApi;

it('creates', async () =>
{
	await protocol.createUser({username: 'kurt'}, 'start123');
});

it('creates and stores secret', async () =>
{
	await protocol.createUser({username: 'kurt'}, 'start123');
	const result = await protocol.login('kurt', 'start123');

	expect(result.username).toEqual('kurt');
});
