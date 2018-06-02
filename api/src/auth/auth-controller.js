import utils from "./utils";

const makeAuthController = (database) =>
({
	createUser: async (req, res) =>
	{
		try
		{
			const hashedAuthKey = utils.hash(req.body.authenticationKey);

			await database.createUser({ ...req.body, hashedAuthKey });

			const response =
			({
				user:
				{
					username: req.body.username
				}
			});

			res.json(response);
		}
		catch (error)
		{
			res.status(500).send(error.message);
		}
	},

	getSalt1: async (req, res) =>
	{
		try
		{
			const { salt1 } = await database.getUser(req.query.username);
			res.json({ salt1 });
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
				res.json({ cipher: user.cipher, salt2: user.salt2 });
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
