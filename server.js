import http from 'http';
import https from 'https';
import express from 'express';
import certs from './src/certs.js';
import envTool from './src/envTool.js';
import config from './config.js';

const app = express();
const isEnvProd = envTool.isProd(process)

if (isEnvProd) {

    certs.redirectToHTTPS();

}

app.get('/', (req, res) => {

    console.log('tes');
    res.send('yo')

})

if(isEnvProd){

    const httpsServer = https.createServer(certs.getHTTPSCredentials('karimkhalil.com'), app);
    httpsServer.listen(config.server.sslPort);

}

const httpServer = http.createServer(app);
httpServer.listen(config.server.httpPort);
