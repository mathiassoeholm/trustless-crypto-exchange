import utils from './utils';

describe('Auth Utils', () =>
{
	it('generates random salt of correct length', () =>
	{
		const salt = utils.getRandomSalt();
		
		// Since the salt is generated in hex, a symbol is 4 bits or 1/2 bytes. 
		// Since we generate 16 byte salts, 32 symbols are expected.
		expect(salt.length).toEqual(32);
	});

	it('generates scrypt key and reports progress', async () =>
	{
		const salt = utils.getRandomSalt();
		const password = "test";

		let previousProgress = 0;

		const key = await utils.generateKey(password, salt, (progress) =>
		{
			previousProgress = progress;
		});
	
		expect(previousProgress).toEqual(1);
		expect(key).toBeDefined();
	});

	it('encrypts and decrypts successfully', async () =>
	{

	});
});
