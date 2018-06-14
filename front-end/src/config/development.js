import utils from '../modules/auth/protocol/utils';

export default
{
	apiUrl: 'http://localhost:3001',
	ganacheUrl: 'http://localhost:8545',
	keyGenerator: utils.makeKeyGenerator(2 ** 1),
};
