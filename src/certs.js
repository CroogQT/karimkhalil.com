import fs from 'fs';

const certs = {

    getHTTPSCredentials(domain){

        const credentialDirectoryPath = `/etc/letsencrypt/live/${domain}`

        const credentials = {

            key: fs.readFileSync(`${credentialDirectoryPath}/privkey.pem`, 'utf-8'),
            cert: fs.readFileSync(`${credentialDirectoryPath}/fullchain.pem`, 'utf-8')

        }

        return credentials

    },


    redirectToHTTPS(req, res, next) {

        if (!req.secure) {

            return res.redirect(`https://${req.headers.host}${req.url}`)

        }

        next()

    }

}

export default certs;