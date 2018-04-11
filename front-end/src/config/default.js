import stubApi from '../modules/auth/api/stubApi';
import simpleProtocol from '../modules/auth/protocol/simpleProtocol';
import stubWalletProvider from '../modules/wallet/provider/stubProvider';
import utils from '../modules/auth/protocol/utils';

export default
{
	authApi: stubApi,
	AuthProtocol: simpleProtocol,
	walletProvider: stubWalletProvider,
	keyGenerator: utils.keyGenerator(2 ** 18),
};
