import crypto from 'crypto';

const hash = message =>
	crypto.createHash('md5').update(message).digest('hex');

export default
{
	hash,
};
