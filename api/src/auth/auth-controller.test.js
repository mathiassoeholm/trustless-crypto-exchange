import each from 'jest-each';

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
			},
			query:
			{
				username: 'query user',
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

	each([
		['create user', (authController) => authController.createUser],
		['get salt 1', (authController) => authController.getSalt1],
		['get private data', (authController) => authController.getPrivateData],
	]).it('%s responds with 500 if database errors', (_, getFunc, done) =>
	{
		databaseMock =
		{
			...databaseMock,
			createUser: params =>
			{
				throw Error('Test error');
			},
			getUser: username =>
			{
				throw Error('Test error');
			},
		};

		resMock =
		{
			...resMock,
			status: code =>
			({
				send: error =>
				{
					expect(code).toBe(500);
					expect(error).toBe('Test error');
					done();
				},
			})
		};

		getFunc(getAuthController())(reqMock, resMock);
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

	it('uses the username to get salt 1', done =>
	{
		databaseMock =
		{
			...databaseMock,
			getUser: username =>
			{
				expect(username).toEqual(reqMock.query.username);
				done();
			}
		};

		getAuthController().getSalt1(reqMock, resMock);
	});

	it('returns the salt', done =>
	{
		databaseMock =
		{
			...databaseMock,
			getUser: username => Promise.resolve({ salt1: 'salt123'}),
		};

		resMock =
		{
			...resMock,
			json: body =>
			{
				expect(body).toEqual({salt1: 'salt123'});
				done();
			}
		};

		getAuthController().getSalt1(reqMock, resMock);
	});

	it('gets salt2 and cipher with correct hash', done =>
	{
		const userInfo =
		{
			cipher: 'cipher',
			salt2: 'salt 2',
			hashedAuthKey: '9b74c9897bac770ffc029102a200c5de',
		};

		databaseMock =
		{
			...databaseMock,
			getUser: username => Promise.resolve(userInfo),
		};

		reqMock =
		{
			...reqMock,
			query:
			{
				username: 'user',
				authenticationKey: 'braitsch',
			}
		}

		resMock =
		{
			...resMock,
			json: body =>
			{
				expect(body).toEqual({ cipher: 'cipher', salt2: 'salt 2' });
				done();
			}
		};

		getAuthController().getPrivateData(reqMock, resMock);
	});

	it('fails with wrong auth key', done =>
	{
		reqMock =
		{
			...reqMock,
			query:
			{
				username: 'user',
				authenticationKey: 'not-correct',
			},
		};

		databaseMock =
		{
			...databaseMock,
			getUser: username => Promise.resolve({hashedAuthKey: '9b74c9897bac770ffc029102a200c5de'}),
		};

		resMock =
		{
			...resMock,
			status: code =>
			({
				send: error =>
				{
					expect(code).toBe(400);
					done();
				},
			})
		};

		getAuthController().getPrivateData(reqMock, resMock);
	})
});
