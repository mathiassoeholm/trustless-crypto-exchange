import scrypt from 'scrypt-js';
import buffer from 'buffer';
import crypto from 'crypto';
import aesjs from 'aes-js';

import api from './api';

const dependencies = { api };

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

const generateKey = (password, salt, progressCallback) =>
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

const createUser = (user, password, progressCallback = () => {}) =>
{
	let salt = getRandomSalt();

	progressCallback(0, "Generating Encryption Key");

	return new Promise((resolve, reject) =>
	{
		// Generating the key with scrypt corresponds to
		// 60% of the entire create user protocol
		const modifiedProgressCb = (progress) => progressCallback(progress * 0.6, "Generating Encryption Key");

		resolve(generateKey(password, salt, modifiedProgressCb));
	})
	.then((key) =>
	{
		const secret =
		{
			username: user.username
		};

		const secretText = JSON.stringify(secret);
		const encryptedSecret = encryptAES(secretText, key);

		return dependencies.api.createUser(user.username, encryptedSecret, salt);
	})
	.then((result) =>
	{
		progressCallback(1, "Finished");
		return result;
	});
};

const login = (username, password, progressCallback = () => {}) =>
{
	let cipher;

	progressCallback(0, "Retrieving data from server");	

	return new Promise((resolve, reject) =>
	{
		resolve(dependencies.api.getWallet(username));
	})
	.then((result) =>
	{
		const salt = result.salt;
		cipher = result.cipher;

		// Assume server call takes 20% time
		progressCallback(0.2, "Generating Encryption Key");

		// Generating the key with scrypt corresponds to
		// 60% of the entire create user protocol
		const modifiedProgressCb = (progress) => progressCallback(progress * 0.6 + 0.2, "Generating Encryption Key");

		return generateKey(password, salt, modifiedProgressCb);
	})
	.then((key) =>
	{
		const secretJson = decryptAES(cipher, key);

		const secret = JSON.parse(secretJson);

		if(secret.username !== username)
		{
			throw 'Wrong password';
		}

		progressCallback(1, "Finished");
		return secret;
	});
};

export default
{
	createUser,
	login,
	dependencies
};
