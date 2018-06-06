import 'babel-polyfill';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import path from 'path';

import appConfig from './config';
import firebaseSetup from './firebase-setup';
import authRoutes from './auth/auth-routes';


firebaseSetup();

const app = express();

app.use(cors());

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// use morgan to log requests to the console
app.use(morgan('dev'));

authRoutes(app);

// Important that we check routes before handling 404 
app.use((req, res) =>
{
	res.status(404).send({url: req.originalUrl + ' not found'});
});

if(appConfig.ssl)
{
	const options =
	{
		key: fs.readFileSync(path.join( __dirname, '../ssl/key.pem')),
		cert: fs.readFileSync(path.join( __dirname, '../ssl/cert.pem')),
	};
	
	https.createServer(options, app).listen(appConfig.port, (err) =>
	{
		if (err)
		{
			console.error(err);
		}
		else
		{
			console.log('We are live on ' + appConfig.port + ' with SSL');
		}
	});
}
else
{
	app.listen(appConfig.port, () =>
	{
		console.log('We are live on ' + appConfig.port + ' without SSL');
	});
}
