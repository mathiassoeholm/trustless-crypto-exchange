import makeAuthController from './auth-controller';
import utils from './utils';

describe('auth controller', () =>
{
	let authController;
	let resMock;
	let reqMock;
	let databaseMock;

	const getAuthController = () =>
	{
		if (!authController)
		{
			authController = makeAuthController(databaseMock);
		}

		return authController;
	};

	beforeEach(() =>
	{
		authController = undefined;

		databaseMock =
		{
			createUser: () => undefined,
		};

		resMock =
		{
			json: (body) => undefined,
			status: () => ({ send: () => undefined })
		};

		reqMock =
		{
			body:
			{
				username: 'username',
				cipher: 'cipher',
				salt1: 'salt1',
				salt2: 'salt2',
				authenticationKey: 'authenticationKey',
			}
		};
	});

	it('responds with the user', (done) =>
	{
		resMock =
		{
			...resMock,
			json: (body) =>
			{
				expect(body).toEqual(
				{
					user:
					{
						username: 'username',
					}
				});
	
				done();
			}
		};
	
		getAuthController().createUser(reqMock, resMock);
	});

	it('saves the user', (done) =>
	{
		databaseMock =
		{
			...databaseMock,
			createUser: params =>
			{
				expect(params.username).toEqual(reqMock.body.username);
				expect(params.cipher).toEqual(reqMock.body.cipher);
				expect(params.salt1).toEqual(reqMock.body.salt1);
				expect(params.salt2).toEqual(reqMock.body.salt2);
				done();
			}
		};

		getAuthController().createUser(reqMock, resMock);
	});

	it('responds with 500 if database errors', (done) =>
	{
		databaseMock =
		{
			...databaseMock,
			createUser: user =>
			{
				throw Error('Test error');
			}
		};

		resMock =
		{
			...resMock,
			status: code =>
			({
				send: error =>
				{
					expect(code).toBe(500);
					expect(error.message).toBe('Test error');
					done();
				},
			})
		};

		getAuthController().createUser(reqMock, resMock);
	});

	it('hashes the auth key', (done) =>
	{
		databaseMock =
		{
			...databaseMock,
			createUser: params =>
			{
				const hashedAuthKey = utils.hash(reqMock.body.authenticationKey);
				expect(params.hashedAuthKey).toEqual(hashedAuthKey);
				done();
			}
		};

		getAuthController().createUser(reqMock, resMock);
	});
});
