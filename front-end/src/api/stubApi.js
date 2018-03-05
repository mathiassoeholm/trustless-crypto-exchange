const fakeDelay = 500; // milliseconds

// The stub api supports a single user
let state = {};

const createUser = (user, cipher, salt) =>
{
	return new Promise((resolve, reject) =>
	{
		state.user = user;
		state.cipher = cipher;
		state.salt = salt;
		
		console.log("Created user: " + user + " | " + cipher + " | " + salt);
		setTimeout(resolve, fakeDelay);
	});
};

const getWallet = (user) =>
{
	return new Promise((resolve, reject) =>
	{
		setTimeout(resolve, fakeDelay, { cipher: state.cipher, salt: state.salt });
	});
}

export default
{
	createUser,
	getWallet
};
