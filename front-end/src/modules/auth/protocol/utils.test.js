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
		expect(key).not.toBeNull();
		expect(key).not.toEqual(undefined);
	});

	it('encrypts and decrypts successfully', async () =>
	{
		// Key must be 32 bytes
		const key = "12345678912345678912345678912345";

		const secretText = "secret";
		const encryptedText = utils.encryptAES(secretText, key, false);

		expect(encryptedText).not.toEqual(secretText);

		const decryptedText = utils.decryptAES(encryptedText, key, false);

		expect(decryptedText).toEqual(secretText);
	});
});
