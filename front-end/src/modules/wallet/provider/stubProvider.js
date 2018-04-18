export default (shouldFail = false, balance = 0) =>
{
	let currentBalance = balance;

	const generateSecret = () => new Promise((resolve) =>
	{
		resolve({});
	});

	const sendCurrency = (secret, to, amount) => new Promise((resolve, reject) =>
	{
		currentBalance -= amount;
		resolve();
	});

	const getBalance = () => new Promise((resolve) =>
	{
		resolve(currentBalance);
	});

	return {
		generateSecret,
		sendCurrency,
		getBalance,
	};
};
