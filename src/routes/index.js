function GET(req, res, url, payload, rawRequest, params){
    res.json({message: "Method GET is working", url: url,
payload: payload, rawRequest: rawRequest, params: params});
}

function POST(req, res, url, payload, rawRequest, params) {
    res.json({message: "Method POST is working", url: url,
        payload: payload, rawRequest: rawRequest, params: params});
}

export {GET, POST}
