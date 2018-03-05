import defaults from './default';
import development from './development'; 
import staging from './staging'; 
import production from './production'; 
import custom from './custom'; 
import colors from 'colors';

let config;

switch(process.env.NODE_ENV)
{
	case 'staging':
		config = staging;
		break;
	case 'production':
		config = production;
		break;
	case 'custom':
		config = custom;
		break;
	default:
		config = development;
		break;
}

/* eslint-disable no-console */
console.log('Running with config: ' + (process.env.NODE_ENV || 'development').green);

export default Object.assign({}, defaults, config);
