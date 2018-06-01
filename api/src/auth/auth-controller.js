const makeAuthController = () =>
({
	createUser: async (res, req) =>
	{
		const response =
			({
				user:
				{
					username: res.body.username
				}
			});

		req.json(response);
	},
});

export default makeAuthController;
