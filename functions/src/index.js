import * as functions from 'firebase-functions';
import { URLSearchParams } from 'node:url';
import router from './router.js';
import defaultHandler from './defaultHandler.js';
import helpers from './helpers.js';


// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
const processedContentTypes = {
    'text/plain': (text) => text,
    'application/json': (json) => json,
    'application/x-www-form-urlencoded': (data) => Object.fromEntries(new URLSearchParams(data))
};

export const server = functions.https.onRequest(async(request, response) => {

        const contentT = request.headers['content-type'];
        const reqBody = request.body;

    if (
        request.method !== 'GET' &&
        request.method !== 'POST' &&
        request.method !== 'OPTIONS'
    ) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write('Please, use either GET, POST or OPTIONS methods');
        response.end();
    } else {
        const url = new URL(request.url || '/', `https://node-lab-1.web.app`);
        const routerModule = router.get(url.pathname) ?? {};
        const handler = routerModule[request?.method] ?? defaultHandler;
        let payload = '';
        const params = {};
        for (const [key, value] of url.searchParams) {
            params[key] = value;
        }
        if (contentT && processedContentTypes[contentT]) {
             payload = processedContentTypes[contentT](reqBody);
        }
        try {
            handler(
                request,
                Object.assign(response, helpers),
                url,
                payload,
                params
            );
        } catch (e) {
            response.statusCode = 500;
            response.end(
                process.env.NODE_ENV === 'production' ? 'internal error' : e
            );
        }
    }
});


