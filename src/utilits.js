function safeJson(data, fallback){
    try{
        return JSON.parse(data);
    } catch{
        return fallback;
    }
}

export {safeJson};

