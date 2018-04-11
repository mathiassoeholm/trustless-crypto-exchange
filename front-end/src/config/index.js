import 'colors';

import defaults from './default';
import development from './development';

let config;

switch (process.env.NODE_ENV)
{
default:
	config = development;
	break;
}

if (process.env.NODE_ENV !== 'test')
{
	/* eslint-disable no-console */
	console.log(`Running with config: ${(process.env.NODE_ENV || 'development').green}`);
}

export default Object.assign({}, defaults, config);
