let currentBalance = 0;

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

// Testing function
const setBalance = (amount) =>
{
	currentBalance = amount;
};

export default
{
	generateSecret,
	sendCurrency,
	getBalance,
	setBalance,
};
