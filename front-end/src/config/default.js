import stubApi from '../modules/auth/api/stubApi';
import makeProtocol from '../modules/auth/protocol/protocol';
import utils from '../modules/auth/protocol/utils';

export default
{
	authApi: stubApi,
	MakeAuthProtocol: makeProtocol,
	keyGenerator: utils.keyGenerator(2 ** 18),
};
