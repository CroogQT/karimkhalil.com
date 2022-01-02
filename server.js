import http from 'http';
import https from 'https';
import express from 'express';
import certs from './src/certs.js';
import envTool from './src/envTool.js';
import config from './config.js';

const app = express();
const isEnvProd = envTool.isProd(process);

app.set('view engine', 'ejs');

if (isEnvProd) {

    certs.redirectToHTTPS();

}

app.get('/', (req, res) => {

    res.render('index');

})

if(isEnvProd){

    const httpsServer = https.createServer(certs.getHTTPSCredentials('karimkhalil.com'), app);
    httpsServer.listen(config.server.sslPort);

}

const httpServer = http.createServer(app);
httpServer.listen(config.server.httpPort);
