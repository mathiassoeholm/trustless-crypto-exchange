const fakeDelay = 0; // milliseconds

// The stub api supports a single user
const state = {};

const createUser = (username, cipher, salt1, salt2, authenticationKey, twoFactorSecret, twoFactorToken, iv) => new Promise((resolve) =>
{
	state.username = username;
	state.cipher = cipher;
	state.salt1 = salt1;
	state.salt2 = salt2;
	state.twoFactorSecret = twoFactorSecret;
	state.twoFactorToken = twoFactorToken;
	state.iv = iv;

	// Will be a hashed version in real API
	state.authenticationKey = authenticationKey;

	setTimeout(resolve, fakeDelay,
		{
			user:
			{
				username: state.username,
			},
		});
});

const getSalt1 = () => new Promise((resolve) =>
{
	setTimeout(resolve, fakeDelay, { salt1: state.salt1 });
});

const getWallet = () => new Promise((resolve) =>
{
	setTimeout(resolve, fakeDelay, { cipher: state.cipher, salt2: state.salt2, iv: state.iv });
});

const getState = () => Object.assign({}, state);

export default
{
	createUser,
	getSalt1,
	getWallet,
	getState,
};
