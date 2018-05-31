import stubApi from '../modules/auth/api/stubApi';
import SimpleProtocol from '../modules/auth/protocol/simpleProtocol';
import StubWalletProvider from '../modules/wallet/provider/stubProvider';
import EthereumWalletProvider from '../modules/wallet/provider/ethereumProvider';
import utils from '../modules/auth/protocol/utils';

export default
{
	authApi: stubApi,
	AuthProtocol: SimpleProtocol,
	WalletProvider: EthereumWalletProvider,
	keyGenerator: utils.keyGenerator(2),
};
