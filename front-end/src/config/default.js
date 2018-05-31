import stubApi from '../modules/auth/api/stubApi';
import StubWalletProvider from '../modules/wallet/provider/stubProvider';
import makeProtocol from '../modules/auth/protocol/protocol';
import utils from '../modules/auth/protocol/utils';

export default
{
	authApi: stubApi,
	WalletProvider: StubWalletProvider,
	MakeAuthProtocol: makeProtocol,
	keyGenerator: utils.keyGenerator(2 ** 18),
};
