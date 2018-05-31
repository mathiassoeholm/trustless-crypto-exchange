import Web3 from 'web3';

const provider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3 = new Web3(provider);

export default () =>
{
	const generateSecret = () => new Promise((resolve) =>
	{
		const newAccount = web3.eth.accounts.create();

		resolve({
			address: newAccount.address,
			privateKey: newAccount.privateKey,
		});
	});

	const sendCurrency = (secret, to, amount) =>
	{
		const account = web3.eth.accounts.privateKeyToAccount(secret.privateKey);

		return account.signTransaction({
			to,
			from: account.address,
			value: amount,
			gas: '21000',
		})
			.then((transaction) =>
			{
				console.log(transaction);
				return web3.eth.sendSignedTransaction(transaction.rawTransaction);
			});
	};

	const getBalance = secret => web3.eth.getBalance(secret.address);

	return {
		generateSecret,
		sendCurrency,
		getBalance,
	};
};
