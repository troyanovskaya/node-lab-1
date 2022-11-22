function GET(req, res){
    res.json({message: "Method GET is working", path: "/test1"});
}

function POST(req, res){
    res.json({message: "Method POST is working", path: "/test1"})
}

export {GET, POST}
