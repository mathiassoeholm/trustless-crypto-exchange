import fs from 'fs';
import path from 'path';
import admin from 'firebase-admin';

export default () =>
{
	const secret = require(path.join( __dirname, '../firebase-secret.json'));

	admin.initializeApp({
		credential: admin.credential.cert(secret),
		databaseURL: 'https://trustless-ether-wallet.firebaseio.com',
	});

	var db = admin.firestore();

	var docRef = db.collection('users').doc('testuser');

	var setUser = docRef.set({
		username: 'Ada',
		cipher: 'asdfasfdasf',
	});

};


