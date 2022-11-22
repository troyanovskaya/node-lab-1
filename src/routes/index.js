function GET(req, res){
    res.json({message: "Method GET is working", path: "/"});
}

function POST(req, res){
    res.json({message: "Method POST is working", path: "/"})
}

export {GET, POST}
