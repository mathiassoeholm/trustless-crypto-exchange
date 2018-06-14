import Web3 from 'web3';

import config from '../../../config';

// Current run ganache command:
// ganache-cli --defaultBalanceEther 9000000000000000000000 --db C:\Ganache-DB

const bankAccountSecret =
	{
		// Insert a private key from Ganache here, remember to prepend "0x"
		privateKey: '0x20a48c44bc57c74a7fb0ae5d0b186d5cd3137a3b9ee2b677c3787f4379252de1',
	};

const makeEthereumProvider = () =>
{
	const provider = new Web3.providers.HttpProvider(config.ganacheUrl);
	const web3 = new Web3(provider);

	const sendCurrency = (secret, to, amount) =>
	{
		const ether = amount * (10 ** 18);

		const account = web3.eth.accounts.privateKeyToAccount(secret.privateKey);
		console.log(secret.privateKey);

		return account.signTransaction({
			to,
			from: account.address,
			value: ether,
			gas: '21000',
		})
			.then(transaction =>
				web3.eth.sendSignedTransaction(transaction.rawTransaction));
	};

	const generateSecret = () =>
	{
		const newAccount = web3.eth.accounts.create();

		return sendCurrency(bankAccountSecret, newAccount.address, 1)
			.then(() =>
				({
					address: newAccount.address,
					privateKey: newAccount.privateKey,
				}));
	};

	const getBalance = secret =>
		web3.eth.getBalance(secret.address)
			.then(b => b * (10 ** -18));

	return {
		generateSecret,
		sendCurrency,
		getBalance,
	};
};

export default makeEthereumProvider;
