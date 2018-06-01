import utils from './utils';

import makeProtocol from './protocol';
import stubApi from '../api/stub-api';

describe('Protocol', () =>
{
	let protocol;
	const testKeyGenerator = utils.makeKeyGenerator(1);

	const createArguments =
	[
		{ username: 'kurt' }, // User
		'start123', // Password
		{ topSecret: 'yes' }, // Secret
	];

	const { username } = createArguments[0];
	const password = createArguments[1];
	const secret = createArguments[2];

	beforeEach(() =>
	{
		protocol = makeProtocol(testKeyGenerator, testKeyGenerator, stubApi);
	});

	it('creates a user', async () =>
	{
		await protocol.createUser(...createArguments);
		expect(stubApi.getState().username).toEqual('kurt');
	});

	it('creates and returns secret', async () =>
	{
		await protocol.createUser(...createArguments);
		const result = await protocol.login('kurt', 'start123');

		expect(result.topSecret).toEqual('yes');
	});

	it('creates the correct authentication key', async () =>
	{
		await protocol.createUser(...createArguments);

		const { salt1, authenticationKey } = stubApi.getState();
		const ak = await testKeyGenerator(password, salt1);

		expect(authenticationKey).toEqual(ak);
	});

	it('updates progress correctly when logging in', async () =>
	{
		let previousProgress = 0;

		const progressCallback = (p) =>
		{
			expect(p).toBeGreaterThanOrEqual(previousProgress);
			previousProgress = p;
		};

		await protocol.createUser(...createArguments, progressCallback);

		expect(previousProgress).toEqual(1);

		previousProgress = 0;

		await protocol.login(username, password, progressCallback);

		expect(previousProgress).toEqual(1);
	});

	it('encrypts secret correctly and stores on api when creating', async () =>
	{
		await protocol.createUser(...createArguments);

		const { salt2 } = stubApi.getState();
		const key = await testKeyGenerator(password, salt2);

		const decryptedCipher = utils.decryptAES(stubApi.getState().cipher, key);
		const decryptedSecret = JSON.parse(decryptedCipher);
		expect(decryptedSecret).toEqual(secret);
	});

	it('fails to login if wrong password supplied', async () =>
	{
		await protocol.createUser({ username: 'bob' }, 'bob', {});

		let error;

		try
		{
			await protocol.login('bob', 'alice');
		}
		catch (err)
		{
			error = err;
		}

		expect(error).not.toBeNull();
	});
});
