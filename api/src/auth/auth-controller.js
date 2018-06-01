import utils from "./utils";

const makeAuthController = (database) =>
({
	createUser: async (req, res) =>
	{
		try
		{
			const hashedAuthKey = utils.hash(req.body.authenticationKey);

			await database.createUser({ ...req.body, hashedAuthKey });
		}
		catch (error)
		{
			res.status(500).send(error);
		}

		const response =
			({
				user:
				{
					username: req.body.username
				}
			});

		res.json(response);
	},
});

export default makeAuthController;
