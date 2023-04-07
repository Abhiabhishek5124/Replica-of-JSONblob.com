const fs=require('fs');
const url=require('url');

function PUT(req, res){
    //gets the url components i.e total url
    let url_components=url.parse(req.url,true);
    // gets the specified path in the url as a string
    let pathname = url_components.path;
    // we split the pathname an save it into an array variable
    let arrayofPaths = pathname.split("/");
    let fileName = arrayofPaths.pop();
    req.on('data', (data) => {if (pathname.includes("/api")) {
        console.log("path check works and the data is " + data)
        if (fs.existsSync(`./api/${fileName}`)){
            console.log(`File check`)
            console.log(typeof(data))
            fs.readFile(`./api/${fileName}`,'utf-8', function(err, dataFile){
                if (err){
                    console.log("There is an error reading the file.!")
                    console.log(error);
                }
                else {
                    console.log(`the datatype of the file content is ${typeof(dataFile)}`);
                    dataFile = (data)+ (dataFile)
                    console.log("The data is " + dataFile);
                    fs.writeFile(`./api/${fileName}`,dataFile, "utf8",(err) =>{
                        if(err){
                            console.log(error);

                        }
                        else {
                            res.writeHead(200, `successfully updated the file ${fileName}`);
                        }
                    });}
            });

            // req.on('data', function(chunk) {
            //     body.push(chunk);
            // }).on('end', function() {
            //     body = Buffer.concat(body).toString();
            //     fs.writeFileSync(`data/${myFile}`, body);
            //     res.statusCode = 200;
            // });
            // res.writeHead(200,`successfully updated the file ${fileName}`);
        }
        else {
            res.writeHead(404, `{${fileName}}`);
        }
    }
}
    ).on('error', function(error){
        console.log(error);
    });

}






// function PUT(req, res){
//     //check the request method:
//     let url_components = url.parse(req.url,true);
//     //we get the last element of the  url_components which would be our id of the file
//     //let myFile = (url_components.pathname.split('/')).pop();
//     const options = {
//         hostname : "localhost",
//         port:8080,
//         path:`/data/${myFile}`,
//         method: "PUT",
//         headers : {
//             'Content-Type': 'application/json'
//         }
//     }
//     let myFile = "1679947872310.json"
//     // let url = `https:/locolhost:8080/data/${myFile}`;
//     //checks if the file exists or not. If it exists we operate the request, if it does not exist, we return the error code in the response header
//     fs.readFile(`/data/${myFile}`, 'utf8', (err, myData) => {
//         if (err) {
//           res.writeHead(`${err}`);
//           return;
//         }
//         else if(req.method === "PUT") {
//             let dataInJson = JSON.parse(myData);
//             //console.log(dataInJson)
//             req.on('data',function(){
//                 let body = "";
//                 body += chunk;
//             });
//             req.on('end',()=> {
//                 fs.writeFileSync(`data/${myFile}`, body);
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.end(`File ${myFile} updated successfully`);
//             })

//         }
//       });

//     //check if the file exists or not and file name is in the request body
// }
module.exports = PUT


