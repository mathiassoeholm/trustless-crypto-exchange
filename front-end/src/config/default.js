import realApi from '../modules/auth/api/real-api';
import makeProtocol from '../modules/auth/protocol/protocol';
import utils from '../modules/auth/protocol/utils';

export default
{
	authApi: realApi,
	MakeAuthProtocol: makeProtocol,
	slowKeyGenerator: utils.makeKeyGenerator(2 ** 1),
	fastKeyGenerator: utils.makeKeyGenerator(2 ** 1),
	apiUrl: 'http://localhost:3000',
};
