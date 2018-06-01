import makeAuthController from './auth-controller';

describe('auth controller', () =>
{
	let authController;

	beforeEach(() =>
	{
		authController = makeAuthController();
	});

	const reqMock =
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
	it('creates the user', (done) =>
	{
		const resMock =
		{
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
	
		authController.createUser(reqMock, resMock);
	});
});
