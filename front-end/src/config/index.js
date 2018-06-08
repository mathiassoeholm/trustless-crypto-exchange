import 'colors';

import defaults from './default';
import development from './development';
import production from './production';

let config;

switch (process.env.NODE_ENV)
{
case 'production':
	config = production;
	break;

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
