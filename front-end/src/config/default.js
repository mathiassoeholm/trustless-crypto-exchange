import stubApi from '../modules/auth/api/stubApi';
import simpleProtocol from '../modules/auth/protocol/simpleProtocol';
import utils from '../modules/auth/protocol/utils';

export default
{
	authApi: stubApi,
	AuthProtocol: simpleProtocol,
	keyGenerator: utils.keyGenerator(2 ** 18),
};
