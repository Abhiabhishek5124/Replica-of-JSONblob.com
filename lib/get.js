const fs= require('fs');

function get(req,res){
    let url_components=url.parse(req.url,true);
    let filename=`./data/${url_components}.json`;


if (fs.existsSync(filename)){
    const data= fs.readFileSync(filename, 'utf-8');
    res.setHeader('Content-Type', 'application/json');
    res.end();
}

else{
    res.statusCode= 404;
    res.end("FILE DO NOT EXIST");
}

};
