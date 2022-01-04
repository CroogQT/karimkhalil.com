import http from 'http';
import https from 'https';
import express from 'express';
import certs from './src/certs.js';
import envTool from './src/envTool.js';
import config from './config.js';
import axios from 'axios';
import { parse } from 'node-html-parser';

const app = express();
const isEnvProd = envTool.isProd(process);

app.set('view engine', 'ejs');
app.use(express.static('public'))

if(isEnvProd){

    app.use((req, res, next) => {

        certs.redirectToHTTPS(req, res, next)

    })

}

app.get('/', (req, res) => {

    res.render('index');

})

app.get('/api/wechal', async (req, res) => {

    const response = await axios({

        method: 'get',
        url: 'https://www.wechall.net/profile/Croog/'

    });

    const parsedHTML = parse(response.data);
    const table = parsedHTML.querySelectorAll('table');
    const dataRows = table[2].querySelectorAll('tr')
    let formattedResponse = ''

    //TODO: this is where you stopped.

    dataRows.forEach(row => {
       
        console.log(row.outerHTML);
        formattedResponse = formattedResponse + row;        

    });

    res.send(formattedResponse)

})

if(isEnvProd){

    const httpsServer = https.createServer(certs.getHTTPSCredentials('karimkhalil.com'), app);
    httpsServer.listen(config.server.sslPort);

}

const httpServer = http.createServer(app);
httpServer.listen(config.server.httpPort);
