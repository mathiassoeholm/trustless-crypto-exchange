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

		let progress = 0;

		const key = await utils.generateKey(password, salt, (progress) =>
		{
			progress = 1;
		});
	
		expect(progress).toEqual(1);
		expect(key).toBeDefind();
	});

	it('encrypts and decrypts successfully', async () =>
	{
		
	});
});
