const fakeDelay = 500; // milliseconds

// The stub api supports a single user
let state = {};

const createUser = (username, cipher, salt) =>
{
	return new Promise((resolve, reject) =>
	{
		state.username = username;
		state.cipher = cipher;
		state.salt = salt;
		
		setTimeout(resolve, fakeDelay, 
		{ 
			user: 
			{
				username: state.username,
			},
			cipher: state.cipher,
			salt: state.cipher,
		});
	});
};

const getWallet = (username) =>
{
	return new Promise((resolve, reject) =>
	{
		setTimeout(resolve, fakeDelay, { cipher: state.cipher, salt: state.salt });
	});
};

const getState = () =>
{
	return { ...state };
};

export default
{
	createUser,
	getWallet,
	getState,
};
