import * as http from 'node:http';
import router from './router.js';
import defaultHandler from './defaultHandler.js';
import helpers from './helpers.js';
import {safeJson} from './utilits.js';
import { URLSearchParams } from 'node:url';
const PORT = process.env.PORT || 8000;

const processedContentTypes = {
    'text/html': (text) => text,
    'text/plain': (text) => text,
    'application/json': (json) => safeJson(json, {}),
    'application/x-www-form-urlencoded': (data) => {
        return Object.fromEntries(new URLSearchParams(data));
    },
    'application/javascript': (code) => code

}

const server = http.createServer(async (req, res) =>{
    if (req.method !== "GET" && req.method !== "POST" && req.method !== "OPTIONS") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write("Please, use either GET, POST or OPTIONS methods");
        res.end();
    } else {
        const url = new URL(req.url || '/', `https://${req.headers.host}`);
        const routerModule = router.get(url.pathname) ?? {};
        const handler = routerModule[req?.method] ?? defaultHandler;
        let payload = {};
        let rawRequest = '';
        const params = {};
        for (const [key, value] of url.searchParams) {
            params[key] = value;
        }
        for await (const chunk of req) {
            rawRequest += chunk + ' ';
        }

        if (req.headers['content-type']){
            const contentType = req.headers['content-type'].split(';').shift();
            if(processedContentTypes[contentType]){
                payload = processedContentTypes[contentType](rawRequest);
            }
        }

        try{
            handler(req, Object.assign(res, helpers), url, payload, rawRequest, params);
        } catch(e){
            res.statusCode = 500;
            res.end(process.env.NODE_ENV === 'production' ? 'internal error' : e);
        }

    }
    

    
})
server.on('clientError', (req, res) =>{
    socket.end('HTTP/1.1 bad request\r\n\r\n');
})

server.listen(parseInt(PORT));

process.on('SIGINT', () =>{
    server.close(error => {
        if(error){
            console.error(error);
            process.exit(1);
        }
    })
})
