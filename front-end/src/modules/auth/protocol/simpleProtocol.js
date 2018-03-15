import dependencies from '../../../dependencies';
import utils from './utils';

const createUser = (user, password, progressCallback = () => {}) =>
{
	let salt = utils.getRandomSalt();

	progressCallback(0, "Generating Encryption Key");

	return new Promise((resolve, reject) =>
	{
		// Generating the key with scrypt corresponds to
		// 60% of the entire create user protocol
		const modifiedProgressCb = (progress) => progressCallback(progress * 0.6, "Generating Encryption Key");

		resolve(utils.generateKey(password, salt, modifiedProgressCb));
	})
	.then((key) =>
	{
		const secret =
		{
			username: user.username
		};

		const secretText = JSON.stringify(secret);
		const encryptedSecret = utils.encryptAES(secretText, key);

		return dependencies.authApi.createUser(user.username, encryptedSecret, salt);
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
		resolve(dependencies.authApi.getWallet(username));
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

		return utils.generateKey(password, salt, modifiedProgressCb);
	})
	.then((key) =>
	{
		const secretJson = utils.decryptAES(cipher, key);

		const secret = JSON.parse(secretJson);

		if(secret.username !== username)
		{
			throw Error('Wrong password');
		}

		progressCallback(1, "Finished");
		return secret;
	});
};

export default
{
	createUser,
	login
};
