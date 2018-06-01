import stubApi from '../modules/auth/api/stubApi';
import makeProtocol from '../modules/auth/protocol/protocol';
import utils from '../modules/auth/protocol/utils';

export default
{
	authApi: stubApi,
	MakeAuthProtocol: makeProtocol,
	slowKeyGenerator: utils.keyGenerator(2 ** 17),
	fastKeyGenerator: utils.keyGenerator(2 ** 13),
};
