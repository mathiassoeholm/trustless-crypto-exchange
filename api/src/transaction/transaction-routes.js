import makeTransactionController from './transaction-controller';
import firebaseDatabase from '../database/firebase-database';

export default (app) =>
{
	const transactionController = makeTransactionController(firebaseDatabase);

	app.route('/transaction').post(transactionController.addTransaction);

	app.route('/transactions').get(transactionController.getTransactions);
};
