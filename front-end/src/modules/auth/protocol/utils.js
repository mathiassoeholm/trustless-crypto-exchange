import scrypt from 'scrypt-js';
import crypto from 'crypto';
import aesjs from 'aes-js';

const bytesToBase64String = bytes =>
	btoa(String.fromCharCode.apply(null, bytes));

const getRandomSalt = () => crypto.randomBytes(16).toString('hex').normalize('NFKC');

const encryptAES = (secret, key, keyIsBuffer = true) =>
{
	const keyBytes = keyIsBuffer ? key : aesjs.utils.utf8.toBytes(key);

	const secretBytes = aesjs.utils.utf8.toBytes(secret);

	const aesCtr = new aesjs.ModeOfOperation.ctr(keyBytes, new aesjs.Counter(5));
	const encryptedBytes = aesCtr.encrypt(secretBytes);

	// We convert to HEX for easy storage
	const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

	return encryptedHex;
};

const decryptAES = (cipher, key, keyIsBuffer = true) =>
{
	const keyBytes = keyIsBuffer ? key : aesjs.utils.utf8.toBytes(key);

	// We store the encrypted secret as HEX
	const encryptedBytes = aesjs.utils.hex.toBytes(cipher);

	const aesCtr = new aesjs.ModeOfOperation.ctr(keyBytes, new aesjs.Counter(5));
	const decryptedBytes = aesCtr.decrypt(encryptedBytes);

	const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

	return decryptedText;
};

const makeKeyGenerator = N =>
	(password, salt, progressCallback = () => undefined) =>
		new Promise((resolve, reject) =>
		{
			// TODO: Investigate normalize
			const passwordBuffer = Buffer.from(password.normalize('NFKC'));
			const saltBuffer = Buffer.from(salt);

			const r = 8;
			const p = 1;

			// We're using AES 256, so keys need to be 256 bits / 32 bytes
			const keyLength = 32;

			scrypt(passwordBuffer, saltBuffer, N, r, p, keyLength, (error, progress, key) =>
			{
				if (error)
				{
					reject(error);
				}
				else if (key)
				{
					resolve(key);
				}
				else
				{
					progressCallback(progress);
				}
			});
		});


export default
{
	bytesToBase64String,
	getRandomSalt,
	encryptAES,
	decryptAES,
	makeKeyGenerator,
};
