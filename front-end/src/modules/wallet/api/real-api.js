import axios from 'axios';

import config from '../../../config';

const unknownError = error => Error(`Unknown server error occured: ${error.response.status}`);

const addTransaction = async (from, to, amount) =>
{
	const body =
	{
		from,
		to,
		amount,
	};

	try
	{
		const response = await axios.post(`${config.apiUrl}/transaction`, body);
		return response.data;
	}
	catch (error)
	{
		throw unknownError(error);
	}
};

const getTransactions = async (address) =>
{
	try
	{
		const response = await axios.get(`${config.apiUrl}/transactions?address=${address}`);
		return response.data;
	}
	catch (error)
	{
		throw unknownError(error);
	}
};

export default
{
	getTransactions,
	addTransaction,
};
