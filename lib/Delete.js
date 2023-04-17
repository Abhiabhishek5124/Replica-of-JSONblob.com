const fs = require('fs');
const url = require('url');

function DELETE(req,res){
    

        let url_components=url.parse(req.url,true);
        
        console.log(url_components.pathname.split('/'));
        let filename= url_components.pathname.split('/')[1];
        console.log(filename)
        
        
        if (!filename) { // check if the file exists
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain');
          res.end('File not found');
          return;
        }

    
    let filePath=`data/${filename}.json`; 
    
        fs.unlink(filePath, error => {
            if (error) {
                console.error(error);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Error deleting file');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end('File deleted');
            }
        });
    }
    

module.exports=DELETE
