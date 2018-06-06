import axios from 'axios';

import config from '../../../config';

const unknownError = error => Error(`Unknown server error occured: ${error.response.status}`);

const createUser = async (username, cipher, salt1, salt2, authenticationKey, twoFactorSecret, twoFactorToken) =>
{
	const body =
	{
		username,
		cipher,
		salt1,
		salt2,
		authenticationKey,
		twoFactorSecret,
		twoFactorToken,
	};

	try
	{
		const response = await axios.post(`${config.apiUrl}/auth/createuser`, body);
		return response.data;
	}
	catch (error)
	{
		if (error.response.status === 400)
		{
			throw Error(error.response.data);
		}

		throw unknownError(error);
	}
};

const getSalt1 = async (username) =>
{
	try
	{
		const response = await axios.get(`${config.apiUrl}/auth/salt1?username=${username}`);
		return response.data;
	}
	catch (error)
	{
		if (error.response.status === 400)
		{
			throw Error('Not account exists with the specified username');
		}

		throw unknownError(error);
	}
};

const getWallet = async (username, authenticationKey) =>
{
	const encodedAuthKey = encodeURIComponent(authenticationKey);

	try
	{
		const response = await axios.get(
			`${config.apiUrl}/auth/privatedata?username=${username}&authenticationKey=${encodedAuthKey}`);

		return response.data;
	}
	catch (error)
	{
		if (error.response.status === 403)
		{
			throw Error('Invalid username or password');
		}

		throw unknownError(error);
	}
};

const storeTransaction = async (from, to, amount) =>
{
	const body =
	{
		from,
		to,
		amount,
	};

	try
	{
		const response = await axios.post(`${config.apiUrl}/transactions`, body);
		return response.data;
	}
	catch (error)
	{
		throw unknownError(error);
	}
};

export default
{
	createUser,
	getSalt1,
	getWallet,
};
