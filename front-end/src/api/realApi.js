const fakeDelay = 500; // milliseconds

const createUser = (user, cipher, salt) =>
{
	return new Promise((resolve, reject) =>
	{
		console.log('real');
		setTimeout(resolve, fakeDelay);
	});
};

export default
{
	createUser
};
