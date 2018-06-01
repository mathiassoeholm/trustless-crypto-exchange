import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import path from 'path';
import appConfig from './config';
import firebaseSetup from './firebase-setup';

firebaseSetup();

const app = express();

app.use(cors());

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// use morgan to log requests to the console
app.use(morgan('dev'));

// Important that we check routes before handling 404 
app.use((req, res) =>
{
	res.status(404).send({url: req.originalUrl + ' not found'});
});

app.listen(appConfig.port, () =>
{
	console.log('We are live on ' + appConfig.port + ' without SSL');
});
