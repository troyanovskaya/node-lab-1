function GET(req, res){
    res.json({message: "Method GET is working", path: "/test1/test2"});
}

function POST(req, res){
    res.json({message: "Method POST is working", path: "/test1/test2"})
}

export {GET, POST}
