let currentBalance;

const makeStubProvider = (shouldFail = false, balance = 1000) =>
{
	currentBalance = balance;

	const failIfShould = () =>
	{
		if (shouldFail)
		{
			throw Error('error');
		}
	};

	const generateSecret = () => new Promise((resolve) =>
	{
		failIfShould();

		resolve({});
	});

	const sendCurrency = (secret, to, amount) => new Promise((resolve) =>
	{
		failIfShould();

		currentBalance -= amount;
		resolve();
	});

	const getBalance = () => new Promise((resolve) =>
	{
		failIfShould();

		resolve(currentBalance);
	});

	return {
		generateSecret,
		sendCurrency,
		getBalance,
	};
};

export default makeStubProvider;
