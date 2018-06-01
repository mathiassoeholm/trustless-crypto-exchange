import makeEthereumProvider from '../modules/wallet/provider/ethereum-provider';
import makeStubProvider from '../modules/wallet/provider/stub-provider';
import stubApi from '../modules/auth/api/stub-api';
import makeProtocol from '../modules/auth/protocol/protocol';
import utils from '../modules/auth/protocol/utils';

export default
{
	authApi: stubApi,
	makeWalletProvider: makeStubProvider,
	makeAuthProtocol: makeProtocol,
	slowKeyGenerator: utils.makeKeyGenerator(2 ** 17),
	fastKeyGenerator: utils.makeKeyGenerator(2 ** 13),
};
