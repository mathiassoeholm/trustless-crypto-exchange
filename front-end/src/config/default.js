import stubApi from '../modules/auth/api/stubApi';
import SimpleProtocol from '../modules/auth/protocol/simpleProtocol';
import StubWalletProvider from '../modules/wallet/provider/stubProvider';
import utils from '../modules/auth/protocol/utils';

export default
{
	authApi: stubApi,
	AuthProtocol: SimpleProtocol,
	WalletProvider: StubWalletProvider,
	keyGenerator: utils.keyGenerator(2 ** 18),
};
