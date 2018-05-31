import config from '../../../config';
import utils from './utils';

const makeProtocol = (keyGen = config.keyGenerator, authApi = config.authApi) =>
	({
		createUser: async (user, password, secret, progressCallback = () => undefined) =>
		{
			progressCallback(0, 'Generating Encryption Key');

			const authenticationKeyProgess = progress => progressCallback(progress * 0.5, 'Generating Authentication Key');
			const encryptionKeyProgess = progress => progressCallback(0.5 + (progress * 0.5), 'Generating Encryption Key');

			const salt1 = utils.getRandomSalt();
			const salt2 = utils.getRandomSalt();

			const authenticationKey = await keyGen(password, salt1, authenticationKeyProgess);
			const encryptionKey = await keyGen(password, salt2, encryptionKeyProgess);

			const secretText = JSON.stringify(secret);
			const encryptedSecret = utils.encryptAES(secretText, encryptionKey);

			const result = await authApi.createUser(
				user.username,
				encryptedSecret,
				salt1,
				salt2,
				authenticationKey);

			progressCallback(1, 'Finished');

			return result;
		},

		login: async (username, password, progressCallback = () => undefined) =>
		{
			progressCallback(0, 'Retrieving data from server');

			const salt1 = await authApi.getSalt1();

			const { cipher, salt2 } = await authApi.getWallet(username);

			// Assume keyGen takes almost 100% of the time
			const modifiedProgressCb = progress => progressCallback(progress, 'Generating Decryption Key');

			const decryptionKey = await keyGen(password, salt2, modifiedProgressCb);

			const secretJson = utils.decryptAES(cipher, decryptionKey);

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
		},
	});

export default makeProtocol;
