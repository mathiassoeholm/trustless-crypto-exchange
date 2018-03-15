import simpleProtocol from './simpleProtocol';
import stubApi from '../api/stubApi';
import dependencies from '../../../dependencies';
import each from 'jest-each';

// We use the stub api for testing purposes
dependencies.authApi = stubApi;

each(
[
	["Simple Protocol", simpleProtocol]
]).describe('%s', (protocolName, protocol) =>
{
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
});
