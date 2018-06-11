import utils from '../modules/auth/protocol/utils';

export default
{
	apiUrl: 'http://localhost:3001',
	ganacheUrl: 'http://localhost:8545',
	slowKeyGenerator: utils.makeKeyGenerator(2 ** 1),
	fastKeyGenerator: utils.makeKeyGenerator(2 ** 1),
};
