const {makeRequest} = require('./helper');

test(
    'A sanity check.',

    () => {
        const x = 1 + 2;
        expect(x).toEqual(3);
    }
);

test(
    'http://www.devcrev.net/hello returns: status 301 (redirect)',

    async () => {
        const retObj = await makeRequest(false, 'www.devcrev.net', '/hello');
        expect(retObj.response.status).toEqual(301);
    }
);

test(
    'http://www.devcrev.net/hello returns: header with location value of https://www.devcrev.net/hello',

    async () => {
        const retObj = await makeRequest(false, 'www.devcrev.net', '/hello');
        expect(retObj.response.headers.location).toEqual('https://www.devcrev.net/hello');
    }
);

test(
    'http://devcrev.net/hello returns: status 301 (redirect)',

    async () => {
        const retObj = await makeRequest(false, 'devcrev.net', '/hello');
        expect(retObj.response.status).toEqual(301);
    }
);

test(
    'http://devcrev.net/hello returns: header with location value of https://www.devcrev.net/hello',

    async () => {
        const retObj = await makeRequest(false, 'devcrev.net', '/hello');
        expect(retObj.response.headers.location).toEqual('https://www.devcrev.net/hello');
    }
);

test(
    'https://www.devcrev.net/index.htm returns: status 200 (OK)',

    async () => {
        const retObj = await makeRequest(true, 'www.devcrev.net', '/index.htm');
        expect(retObj.response.status).toEqual(200);
    }
);

test(
    'https://devcrev.net/hello returns: status 301 (redirect)',

    async () => {
        const retObj = await makeRequest(true, 'devcrev.net', '/hello');
        expect(retObj.response.status).toEqual(301);
    }
);

test(
    'https://devcrev.net/hello returns: header with location value of https://www.devcrev.net/hello',

    async () => {
        const retObj = await makeRequest(true, 'devcrev.net', '/hello');
        expect(retObj.response.headers.location).toEqual('https://www.devcrev.net/hello');
    }
);

test(
    'http://devcrev.net/hello with a bad hostname header value gets disconnected.',

    async () => {
        const retObj = await makeRequest(false, 'devcrev.net', '/hello', {Host: 'badhostname.net'});
        expect(retObj.error.code).toEqual('ECONNRESET');
    }
);

test(
    'https://devcrev.net/hello with a bad hostname header value gets disconnected.',

    async () => {
        const retObj = await makeRequest(true, 'devcrev.net', '/hello', {Host: 'badhostname.net'});
        expect(retObj.error.code).toEqual('ECONNRESET');
    }
);
