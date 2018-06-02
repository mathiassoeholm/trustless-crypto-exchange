import makeAuthController from './auth-controller';
import firebaseDatabase from '../database/firebase-database';

export default (app) =>
{
	const authController = makeAuthController(firebaseDatabase);

	app.route('/auth/createuser').post(authController.createUser);

	app.route('/auth/salt1').get(authController.getSalt1);

	app.route('/auth/privatedata').get(authController.getPrivateData);
};
