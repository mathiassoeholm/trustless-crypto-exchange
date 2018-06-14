import realAuthApi from '../modules/auth/api/real-api';
import makeEthereumProvider from '../modules/wallet/provider/ethereum-provider';
// import makeStubProvider from '../modules/wallet/provider/stub-provider';
// import stubAuthApi from '../modules/auth/api/stub-api';
import makeProtocol from '../modules/auth/protocol/protocol';
import utils from '../modules/auth/protocol/utils';
import realWalletApi from '../modules/wallet/api/real-api';

export default
{
	authApi: realAuthApi,
	walletApi: realWalletApi,
	makeAuthProtocol: makeProtocol,
	keyGenerator: utils.makeKeyGenerator(2 ** 18),
	makeWalletProvider: makeEthereumProvider,
};
