const axios = require('axios').default;

async function makeRequest (isSecure, hostname, path, headers = {}) {
    const retObject = {
        response: null,
        error: null
    };

    const protocol = isSecure ? 'https' : 'http';

    await axios(
        {
            method: 'GET',
            url: `${protocol}://${hostname}${path}`,
            responseType: 'document',
            maxRedirects: 0,
            headers
        }
    ).then(
        (response) => {retObject.response = response;}
    ).catch(
        (error) => {
            if (error.response) {
                retObject.response = error.response;
            }

            retObject.error = error;
        }
    );

    return retObject;
}

module.exports = {makeRequest};
