import makeEthereumProvider from '../modules/wallet/provider/ethereum-provider';
import stubApi from '../modules/auth/api/stub-api';
import makeProtocol from '../modules/auth/protocol/protocol';
import utils from '../modules/auth/protocol/utils';

export default
{
	authApi: stubApi,
	makeWalletProvider: makeEthereumProvider,
	makeAuthProtocol: makeProtocol,
	slowKeyGenerator: utils.makeKeyGenerator(2 ** 17),
	fastKeyGenerator: utils.makeKeyGenerator(2 ** 13),
};
