const options =
{
	shouldFail: false
};

const createUser = (user, password, progressCallback = () => {}) =>
{
	return new Promise((resolve, reject) =>
	{
		progressCallback(1, 'message');
		
		if (options.shouldFail)
		{
			reject(Error('error message'));
		}
		else
		{
			resolve({ user });
		}
	});
};

const login = (username, password, progressCallback = () => {}) =>
{
	return new Promise((resolve, reject) =>
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
};

export default
{
	createUser,
	login,
	options
};
