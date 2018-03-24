import dependencies from '../../../dependencies';
import utils from './utils';

const defaultKeyGenerator = utils.keyGenerator(2 ** 18);

const createUser = (user, password, secret, keyGenerator, progressCallback = () => undefined) =>
{
	const keyGen = keyGenerator || defaultKeyGenerator;
	const salt = utils.getRandomSalt();

	progressCallback(0, 'Generating Encryption Key');

	return new Promise((resolve) =>
	{
		// Assume keyGen takes almost 100% of the time
		const modifiedProgressCb = progress => progressCallback(progress, 'Generating Encryption Key');

		resolve(keyGen(password, salt, modifiedProgressCb));
	}).then((key) =>
	{
		const secretText = JSON.stringify(secret);
		const encryptedSecret = utils.encryptAES(secretText, key);

		return dependencies.authApi.createUser(user.username, encryptedSecret, salt);
	}).then((result) =>
	{
		progressCallback(1, 'Finished');
		return result;
	});
};

const login = (username, password, keyGenerator, progressCallback = () => undefined) =>
{
	const keyGen = keyGenerator || defaultKeyGenerator;
	let cipher;
	let salt;

	progressCallback(0, 'Retrieving data from server');

	return new Promise((resolve) =>
	{
		resolve(dependencies.authApi.getWallet(username));
	}).then((result) =>
	{
		salt = result.salt;
		cipher = result.cipher;

		// Assume keyGen takes almost 100% of the time
		const modifiedProgressCb = progress => progressCallback(progress, 'Generating Encryption Key');

		return keyGen(password, salt, modifiedProgressCb);
	}).then((key) =>
	{
		const secretJson = utils.decryptAES(cipher, key);

		let secret;

		try
		{
			secret = JSON.parse(secretJson);
		}
		catch (err)
		{
			throw Error('Wrong password');
		}

		progressCallback(1, 'Finished');
		return secret;
	});
};

export default
{
	createUser,
	login,
};
