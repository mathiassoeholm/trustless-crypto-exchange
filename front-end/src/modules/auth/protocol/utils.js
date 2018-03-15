import scrypt from 'scrypt-js';
import crypto from 'crypto';
import aesjs from 'aes-js';

const getRandomSalt = () =>
{
	return crypto.randomBytes(16).toString('hex').normalize('NFKC');
};

const encryptAES = (secret, key, keyIsBuffer = true) =>
{
	if(!keyIsBuffer)
	{
		key = aesjs.utils.utf8.toBytes(key);
	}

	const secretBytes = aesjs.utils.utf8.toBytes(secret);

	const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
	const encryptedBytes = aesCtr.encrypt(secretBytes);

	// We convert to HEX for easy storage
	const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

	return encryptedHex;
};

const decryptAES = (cipher, key, keyIsBuffer = true) =>
{
	if(!keyIsBuffer)
	{
		key = aesjs.utils.utf8.toBytes(key);
	}

	// We store the encrypted secret as HEX
	const encryptedBytes = aesjs.utils.hex.toBytes(cipher);

	const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
	const decryptedBytes = aesCtr.decrypt(encryptedBytes);

	const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

	return decryptedText;
};

const generateKey = (password, salt, progressCallback = () => {}) =>
{
	return new Promise((resolve, reject) =>
	{
		// TODO: Investigate normalize
		const passwordBuffer = Buffer.from(password.normalize('NFKC'));
		const saltBuffer = Buffer.from(salt);
		
		const N = 1024, r = 8, p = 1;

		// We're using AES 256, so keys need to be 256 bits / 32 bytes
		const keyLength = 32;

		scrypt(passwordBuffer, saltBuffer, N, r, p, keyLength, (error,  progress, key) =>
		{
			if(error) 
			{
				reject(error);
			}
			else if(key)
			{
				resolve(key);
			}
			else
			{
				progressCallback(progress);
			}
		});
	});
};

export default 
{
	getRandomSalt,
	encryptAES,
	decryptAES,
	generateKey
};
