import makeTransactionController from './transaction-controller';
import { database } from 'firebase-admin';

describe('transaction controller', () =>
{
	let transactionController;
	let databaseMock;
	let resMock;
	let req;

	beforeEach(() =>
	{
		resMock =
		{
			json: jest.fn(),
		};

		databaseMock =
		{
			addTransaction: jest.fn(),
			getTransactions: jest.fn(),
		};

		transactionController = makeTransactionController(databaseMock);
	});

	describe('add transaction', () =>
	{
		beforeEach(() => 
		{
			req =
			{
				body:
				{
					from: 'from',
					to: 'to',
					amount: 10,
				},
			};
		})

		it('calls database addTransaction with correct parameters', async () =>
		{
			await transactionController.addTransaction(req, resMock);

			const mock = databaseMock.addTransaction.mock;
			expect(mock.calls.length).toEqual(1);
			expect(mock.calls[0][0]).toEqual(req.body.from);
			expect(mock.calls[0][1]).toEqual(req.body.to);
			expect(mock.calls[0][2]).toEqual(req.body.amount);
		});

		it('returns the correct json when it succeeds', async () =>
		{
			databaseMock.addTransaction.mockReturnValueOnce(Promise.resolve());

			await transactionController.addTransaction(req, resMock);

			expect(resMock.json.mock.calls.length).toEqual(1);
			expect(resMock.json.mock.calls[0][0])
				.toEqual(req.body);
		});
	})

	describe('get transactions', () =>
	{
		beforeEach(() =>
		{
			req =
			{
				query:
				{
					address: 'address',
				},
			};
		});
		
		it('calls get transactions with the correct parameters', async () =>
		{
			await transactionController.getTransactions(req, resMock);
			
			const mock = databaseMock.getTransactions.mock;
			expect(mock.calls.length).toEqual(1);
			expect(mock.calls[0][0]).toEqual(req.query.address);
		});

		it('returns the correct transactions', async () =>
		{
			const result = [{ from: req.query.address, to: 'to', amount: 10 }]

			databaseMock.getTransactions.mockReturnValueOnce(Promise.resolve(result))
		
			await transactionController.getTransactions(req, resMock);

			const mock = resMock.json.mock;
			expect(mock.calls.length).toEqual(1);
			expect(mock.calls[0][0]).toEqual(result);
		});
	});
});
