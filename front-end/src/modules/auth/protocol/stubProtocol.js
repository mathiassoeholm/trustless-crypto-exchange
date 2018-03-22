const options =
{
	shouldFail: false,
};

const createUser = (user, password, secret, progressCallback = () => undefined) =>
	new Promise((resolve, reject) =>
	{
		progressCallback(1, 'message');

		if (options.shouldFail)
		{
			reject(Error('error message'));
		}
		else
		{
			resolve(secret);
		}
	});

const login = (username, password, progressCallback = () => undefined) =>
	new Promise((resolve, reject) =>
	{
		progressCallback(1, 'message');

		if (options.shouldFail)
		{
			reject(Error('error message'));
		}
		else
		{
			resolve();
		}
	});

export default
{
	createUser,
	login,
	options,
};
