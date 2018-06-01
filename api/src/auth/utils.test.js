import utils from './utils';

describe('Auth Utils', () =>
{
	it('hashes', () =>
	{
		// Known md5 hash value
		const hash = utils.hash('braitsch');
		expect(hash).toEqual('9b74c9897bac770ffc029102a200c5de');
	});
});
