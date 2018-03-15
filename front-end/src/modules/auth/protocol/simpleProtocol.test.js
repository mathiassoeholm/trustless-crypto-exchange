import simpleProtocol from './simpleProtocol';
import stubApi from '../api/stubApi';
import dependencies from '../../../dependencies';
import each from 'jest-each';
import utils from './utils';

// We use the stub api for testing purposes
dependencies.authApi = stubApi;

each(
[
	["Simple Protocol", simpleProtocol]
]).describe('%s', (protocolName, protocol) =>
{
	it('creates a user', async () =>
	{
		await protocol.createUser({username: 'kurt'}, 'start123', {});
		expect(stubApi.getState().username).toEqual('kurt');
	});

	it('creates and stores secret', async () =>
	{
		await protocol.createUser({username: 'kurt'}, 'start123', {username: 'kurt'});
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

		await protocol.createUser({username: 'kurt'}, 'start123', {}, progressCallback);

		expect(previousProgress).toEqual(1);

		previousProgress = 0;

		await protocol.login('kurt', 'start123', progressCallback);

		expect(previousProgress).toEqual(1);
	});

	it('encrypts secret correctly and stores on api when creating', async () =>
	{
		// TODO: Place secret as argument
		const username = "bob";

		const secret = 
		{
			username
		};
		
		const password = "password";
		
		await protocol.createUser({username}, password, secret);

		const salt = stubApi.getState().salt;
		const key = await utils.generateKey(password, salt);

		const decryptedCipher = utils.decryptAES(stubApi.getState().cipher, key);
		const decryptedSecret = JSON.parse(decryptedCipher);
		expect(decryptedSecret).toEqual(secret);
	});
});
