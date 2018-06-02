const makeStubProtocol = (shouldFail = false) =>
	({
		createUser: (user, password, secret, progressCallback = () => undefined) =>
			new Promise((resolve, reject) =>
			{
				progressCallback(1, 'message');

				if (shouldFail)
				{
					reject(Error('error message'));
				}
				else
				{
					resolve({ user });
				}
			}),

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
