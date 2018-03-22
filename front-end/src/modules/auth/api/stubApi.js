const fakeDelay = 500; // milliseconds

// The stub api supports a single user
const state = {};

const createUser = (username, cipher, salt) => new Promise((resolve) =>
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

const getWallet = () => new Promise((resolve) =>
{
	setTimeout(resolve, fakeDelay, { cipher: state.cipher, salt: state.salt });
});

const getState = () => Object.assign({}, state);

export default
{
	createUser,
	getWallet,
	getState,
};
