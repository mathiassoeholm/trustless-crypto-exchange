import Web3 from 'web3';

// Current run ganache command:
// ganache-cli --defaultBalanceEther 9000000000000000000000 --db C:\Ganache-DB

const provider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3 = new Web3(provider);

const bankAccountSecret =
	{
		// Insert a private key from Ganache here, remember to prepend "0x"
		privateKey: '0x3db10de27107813c20c9203f0d11735d2a1d931dec5fd568f5f04a350226e047',
	};

const makeEthereumProvider = () =>
{
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

export default makeEthereumProvider;
