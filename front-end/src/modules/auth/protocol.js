import scrypt from 'scrypt-js';
import buffer from 'buffer';
import crypto from 'crypto';
import aesjs from 'aes-js';

import api from './api';

const getRandomSalt = () =>
{
	return aesjs.utils.utf8.fromBytes(crypto.randomBytes(16)).normalize('NFKC');
};

const encryptAES = (secret, key) =>
{
	const secretBytes = aesjs.utils.utf8.toBytes(secret);

	const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
	const encryptedBytes = aesCtr.encrypt(secretBytes);

	// We convert to HEX for easy storage
	const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

	return encryptedHex;
};

const decryptAES = (cipher, key) =>
{
	// We store the encrypted secret as HEX
	const encryptedBytes = aesjs.utils.hex.toBytes(cipher);

	const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
	const decryptedBytes = aesCtr.decrypt(encryptedBytes);

	const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

	return decryptedText;
};

const createUser = (user, password, progressCallback) =>
{
	return new Promise((resolve, reject) =>
	{
		// TODO: Investigate normalize
		const passwordBuffer = Buffer.from(password.normalize('NFKC'));

		const salt = getRandomSalt();
		const saltBuffer = Buffer.from(salt);
		
		const N = 1024, r = 8, p = 1;
		const keyLength = 32;

		scrypt(passwordBuffer, saltBuffer, N, r, p, keyLength, (error, progress, key) =>
		{
			if (error)
			{
				console.log("Error: " + error);

				reject(error);
			}
			else if (key)
			{
				console.log(key);

				// TODO encrypt using AES
				const secret =
				{
					username: user.username
				};

				const secretText = JSON.stringify(secret);
				const encryptedSecret = encryptAES(secretText, key);

				api.createUser(user.username, encryptedSecret, salt).then(result =>
				{
					progressCallback(1);
					resolve(result);
				});
			}
			else
			{
				// Generating the key with scrypt corresponds to
				// 60% of the entire create user protocol
				progressCallback(progress * 0.6);
			}
		});
	});
};

export default
{
	createUser
};
