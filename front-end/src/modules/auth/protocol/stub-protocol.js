let createParams = {};

const makeStubProtocol = (shouldFail = false) =>
	({
		createUser: (user, password, secret, progressCallback = () => undefined, twoFactorSecret, twoFactorToken) =>
			new Promise((resolve, reject) =>
			{
				progressCallback(1, 'message');

				createParams =
				{
					user,
					password,
					secret,
					progressCallback,
					twoFactorSecret,
					twoFactorToken,
				};

				if (shouldFail)
				{
					reject(Error('error message'));
				}
				else
				{
					resolve({ user });
				}
			}),

		getCreateParams: () =>
			createParams,

		login: (username, password, progressCallback = () => undefined) =>
			new Promise((resolve, reject) =>
			{
				progressCallback(1, 'message');

				if (shouldFail)
				{
					reject(Error('error message'));
				}
				else
				{
					resolve({});
				}
			}),
	});

export default makeStubProtocol;
