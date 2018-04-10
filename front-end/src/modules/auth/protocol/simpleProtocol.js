import config from '../../../config';
import utils from './utils';

export default (keyGen = config.keyGenerator, authApi = config.authApi) =>
	({
		createUser: (user, password, secret, progressCallback = () => undefined) =>
		{
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

				return authApi.createUser(user.username, encryptedSecret, salt);
			}).then((result) =>
			{
				progressCallback(1, 'Finished');
				return result;
			});
		},

		login: (username, password, progressCallback = () => undefined) =>
		{
			let cipher;
			let salt;

			progressCallback(0, 'Retrieving data from server');

			return new Promise((resolve) =>
			{
				resolve(authApi.getWallet(username));
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
		},
	});
