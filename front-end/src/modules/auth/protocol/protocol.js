import config from '../../../config';
import utils from './utils';

const authKeyPercentage = 0.2;

const makeProtocol = (
	encKeyGen = config.slowKeyGenerator,
	authKeyGen = config.fastKeyGenerator,
	authApi = config.authApi) =>
	({
		createUser: async (user, password, secret, progressCallback = () => undefined) =>
		{
			progressCallback(0, 'Generating Encryption Key');

			const authenticationKeyProgess = progress => progressCallback(progress * authKeyPercentage, 'Generating Authentication Key');
			const encryptionKeyProgess = progress => progressCallback(authKeyPercentage + (progress * (1 - authKeyPercentage)), 'Generating Encryption Key');

			const salt1 = utils.getRandomSalt();
			const salt2 = utils.getRandomSalt();

			const authenticationKey = await authKeyGen(password, salt1, authenticationKeyProgess);
			const encryptionKey = await encKeyGen(password, salt2, encryptionKeyProgess);

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

			const { salt1 } = await authApi.getSalt1(username);

			const authenticationKeyProgess = progress => progressCallback(progress * authKeyPercentage, 'Generating Authentication Key');
			const authenticationKey = await authKeyGen(password, salt1, authenticationKeyProgess);

			const { cipher, salt2 } = await authApi.getWallet(username, authenticationKey);

			const decryptionKeyProgess = progress => progressCallback(authKeyPercentage + (progress * (1 - authKeyPercentage)), 'Generating Decryption Key');
			const decryptionKey = await encKeyGen(password, salt2, decryptionKeyProgess);

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
