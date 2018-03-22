import Web3 from 'web3';

const provider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3 = new Web3(provider);

const fromAccount = web3.eth.accounts.privateKeyToAccount('0x55273c811e2cf2fbe88089a750a129436a6f537992b07597c340d87c8ec1e504');
const toAccount = web3.eth.accounts.create();

web3.eth.getBalance(fromAccount.address)
	.then((b) =>
	{
		console.log(`Prev balance: ${b}`);
	})
	.then(() =>
	{
		return fromAccount.signTransaction({
			to: toAccount.address,
			from: fromAccount.address,
			value: '1000000001',
			gas: '2000000',
		});
	})
	.then((transaction) =>
	{
		console.log(transaction);
		return web3.eth.sendSignedTransaction(transaction.rawTransaction);
	})
	.then(() =>
	{
		web3.eth.getBalance(fromAccount.address).then((b) =>
		{
			console.log(`New balance: ${b}`);
		});
	});
