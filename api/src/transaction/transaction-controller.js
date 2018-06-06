const makeTransactionController = database =>
({
	addTransaction: async (req, res) =>
	{
		const body = req.body;

		const transaction = await database.addTransaction(body.from, body.to, body.amount);

		res.json(req.body);
	},

	getTransactions: async (req, res) =>
	{
		const transactions = await database.getTransactions(req.query.address);
	
		res.json(transactions);
	},
});

export default makeTransactionController;
