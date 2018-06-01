import Web3 from 'web3';

const provider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3 = new Web3(provider);

const bankAccountSecret =
	{
		privateKey: '0x0b1c6953f6ce7e5d55d341c6d2f64c64c660a6ad4c36606cdc275e20297ed0c7' 
	};

export default () =>
{
	const sendCurrency = (secret, to, amount) =>
	{
		const account = web3.eth.accounts.privateKeyToAccount(secret.privateKey);
		console.log(account);

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

	const generateSecret = () =>
	{
		const newAccount = web3.eth.accounts.create();

		return sendCurrency(bankAccountSecret, newAccount.address, 1000000000000000000)
			.then(() =>
				({
					address: newAccount.address,
					privateKey: newAccount.privateKey,
				}));
	};

	const getBalance = secret => web3.eth.getBalance(secret.address);

	return {
		generateSecret,
		sendCurrency,
		getBalance,
	};
};
