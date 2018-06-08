# trustless-ether-wallet

[![Build Status](https://travis-ci.org/mathiassoeholm/trustless-crypto-exchange.svg?branch=master)](https://travis-ci.org/mathiassoeholm/trustless-crypto-exchange)

This is a bachelor project and not a production ready wallet. It stores the users' private-key safely by using a protocol based on scrypt and AES. The secret never leaves the client unencrypted, and the encryption key(their pw) is only held by the user. The front-end is developed in React, and the back-end is a Node.js service.

Other features include:
Material design.
2FA with support for Google Authenticator.

## Requirements
### If you only want to run the front-end
[Node.js](https://nodejs.org/en/)
[yarn](https://yarnpkg.com/lang/en/docs/install/#windows-stable)

After installing these packages, run ```yarn``` in both the front-end/ folder and the api/ folder.

**serve**, install using the following command:
```
yarn global add serve
```

### If you want to run the back-end
**ganache-cli**, install using the following command
```
yarn global add ganache-cli
```

## Running

### Front-end
To run the front-end, open the folder and run the following commands:

```
yarn build
serve -s build
```

It will now be hosted on [http://localhost:3000](http://localhost:3000). Note that it will be using the API we have hosted.

If you instead want to run using your own local API, you need to do the following:

Run the back-end as explained in the section below.

Copy one of the private keys from one of the accounts that ganache-cli made by default. Paste this key into the "front-end/src/modules/wallet/provider/ethereum-provider.js" file as such:

```
const bankAccountSecret =
	{
		// Insert a private key from Ganache here, remember to prepend "0x"
		privateKey: '0xYOUR_PRIVATE_KEY',
	};
```

Remember to prepend "0x" to the key. After doing this, run the following commands:

```
yarn start
```

It will now use the ganache network hosted at http://localhost:8545, and the api hosted at http://localhost:3001.

### Back-end
Running the back-end is more complicated.

#### Requirements
A Firebase project with Firestore set up.

You have to generate a service account private key from the firebase settings and store this in the api/ folder as "firebase_secret.json". You also have to edit the api/src/firebase-setup.js file, such that the databaseURL matches your databaseURL.

```
admin.initializeApp({
		credential: admin.credential.cert(secret),
		databaseURL: 'YOUR_FIREBASE_URL',
	});
```

After setting this up, run the app using:
```
yarn start
```

## Running the tests
If you want to run the tests, run the following command in the front-end/ and api/ folders.
```
yarn test
```
