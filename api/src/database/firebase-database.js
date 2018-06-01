import admin from 'firebase-admin';

export default
{
	createUser: ({ username, cipher, salt1, salt2, hashedAuthKey }) =>
		admin.firestore().collection('users').doc(username).set(
		{
			cipher,
			salt1,
			salt2,
			hashedAuthKey,
		}),
};
