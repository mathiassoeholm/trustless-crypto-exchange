import utils from "./utils";

const makeAuthController = database => twoFactor =>
({
	createUser: async (req, res) =>
	{
		try
		{
			if (req.body.twoFactorSecret)
			{
				const verified = twoFactor.totp.verify({
					secret: req.body.twoFactorSecret,
					encoding: 'base32',
					token: req.body.twoFactorToken,
				});

				if (!verified)
				{
					throw new Error('wrong-2fa-token');
				}
			}

			const hashedAuthKey = utils.hash(req.body.authenticationKey);

			await database.createUser({ ...req.body, hashedAuthKey });

			let response =
			{
				user:
				{
					username: req.body.username
				}
			};

			res.json(response);
		}
		catch (error)
		{
			if (error.message === 'user-exists')
			{
				res.status(400).send('The user already exists');
			}
			else if (error.message === 'wrong-2fa-token')
			{
				res.status(400).send('Wrong 2FA token');
			}
			else
			{
				res.status(500).send(error.message);
			}
		}
	},

	getSalt1: async (req, res) =>
	{
		try
		{
			const { twoFactorToken } = req.query;
			const { salt1, twoFactorSecret } = await database.getUser(req.query.username);

			if (twoFactorSecret)
			{
				const verified = twoFactor.totp.verify({
					secret: twoFactorSecret,
					encoding: 'base32',
					token: twoFactorToken,
				});

				if (!verified)
				{
					throw new Error('wrong-2fa-token');
				}
			}

			res.json({ salt1 });
		}
		catch (error)
		{
			if(error.message === 'unknown-user')
			{
				res.status(400).send('Unknown user');
			}
			else if (error.message === 'wrong-2fa-token')
			{
				res.status(400).send('Wrong 2FA token');
			}
			else
			{
				res.status(500).send(error.message);
			}
		}
	},

	getPrivateData: async (req, res) =>
	{
		let user;

		try
		{
			user = await database.getUser(req.query.username);

			if (user.hashedAuthKey !== utils.hash(req.query.authenticationKey))
			{
				res.status(403).send('wrong authentication key');
			}
			else
			{
				res.json({ cipher: user.cipher, salt2: user.salt2, iv: user.iv });
			}
		}
		catch (error)
		{
			if(error.message === 'unknown-user')
			{
				res.status(400).send(error.message);
			}
			else
			{
				res.status(500).send(error.message);
			}
		}
	},
});

export default makeAuthController;
