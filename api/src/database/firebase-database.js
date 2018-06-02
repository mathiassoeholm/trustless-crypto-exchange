import admin from 'firebase-admin';

export default
{
	createUser: async ({ username, cipher, salt1, salt2, hashedAuthKey }) =>
	{
		const userDoc = admin.firestore().collection('users').doc(username);
		const userData = await userDoc.get();

		if (userData.exists)
		{
			throw new Error('user-exists');
		}

		await userDoc.set(
		{
			cipher,
			salt1,
			salt2,
			hashedAuthKey,
		});
	},

	getUser: username =>
		admin.firestore().collection('users').doc(username).get()
			.then(doc =>
			{
				if (doc.exists)
				{
					return doc.data();
				}
				else
				{
					throw new Error('unknown-user');
				}
			}),
};
