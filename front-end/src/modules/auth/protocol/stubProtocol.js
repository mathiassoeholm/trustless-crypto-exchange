export default (shouldFail = false) =>
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
					resolve(secret);
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
					resolve();
				}
			}),
	});
