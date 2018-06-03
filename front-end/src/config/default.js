import realApi from '../modules/auth/api/real-api';
import makeEthereumProvider from '../modules/wallet/provider/ethereum-provider';
import makeStubProvider from '../modules/wallet/provider/stub-provider';
import stubApi from '../modules/auth/api/stub-api';
import makeProtocol from '../modules/auth/protocol/protocol';
import utils from '../modules/auth/protocol/utils';

export default
{
	authApi: realApi,
	makeAuthProtocol: makeProtocol,
	slowKeyGenerator: utils.makeKeyGenerator(2 ** 1),
	fastKeyGenerator: utils.makeKeyGenerator(2 ** 1),
	apiUrl: 'http://35.204.85.70:3001',
	ganacheUrl: 'http://35.204.85.70:8545',
	makeWalletProvider: makeEthereumProvider,
};
