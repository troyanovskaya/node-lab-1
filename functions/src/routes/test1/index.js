function GET(req, res, url, payload, params) {
    res.json({
        message: 'Method GET is working',
        url,
        payload,
        params,
    });
}

function POST(req, res, url, payload, params) {
    res.json({
        message: 'Method POST is working',
        url,
        payload,
        params
    });
}

function OPTIONS(req, res) {
    res.json({ 'Available options': 'GET, POST, OPTIONS' });
}

export { GET, POST, OPTIONS };
