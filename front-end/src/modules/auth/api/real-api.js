import axios from 'axios';

import config from '../../../config';

const createUser = async (username, cipher, salt1, salt2, authenticationKey) =>
{
	const body =
	{
		username,
		cipher,
		salt1,
		salt2,
		authenticationKey,
	};

	const response = await axios.post(`${config.apiUrl}/auth/createuser`, body);
	return response.data;
};

const getSalt1 = async (username) =>
{
	const response = await axios.get(`${config.apiUrl}/auth/salt1?username=${username}`);
	return response.data;
};

const getWallet = async (username, authenticationKey) =>
{
	const encodedAuthKey = encodeURIComponent(authenticationKey);

	const response = await axios.get(
		`${config.apiUrl}/auth/privatedata?username=${username}&authenticationKey=${encodedAuthKey}`);

	return response.data;
};

export default
{
	createUser,
	getSalt1,
	getWallet,
};
