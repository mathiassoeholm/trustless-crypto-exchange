import admin from 'firebase-admin';

export default
{
	createUser: async ({ username, cipher, salt1, salt2, hashedAuthKey, twoFactorSecret }) =>
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
			twoFactorSecret,
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
	
	addTransaction: (from, to, amount) =>
		admin.firestore().collection('transactions').doc().set({ from, to, amount }),

	getTransactions: async address =>
	{
		const fromQuery = admin.firestore().collection('transactions').where('from', '==', address);
		const toQuery = admin.firestore().collection('transactions').where('to', '==', address);

		const fromResult = await fromQuery.get();
		const toResult = await toQuery.get();

		const documents = fromResult.docs.concat(toResult.docs);		

		return documents.map(doc => ({ ...doc.data(), createTime: doc._createTime }));
	},
};
