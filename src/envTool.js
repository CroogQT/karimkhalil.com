/*

As a reminder, the way you liek to set this is to update /etc/environment with the line:

NODE_ENV={$VALUE}

*/

const envTool = {

    isProd(process = 'production') {

        if (process.env?.NODE_ENV?.toLowerCase() === 'development') {

            return false;
            
        }

        return true;

    }

}

export default envTool;