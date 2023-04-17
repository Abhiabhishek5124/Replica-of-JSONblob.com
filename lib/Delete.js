const fs = require('fs');
const url = require('url');

function DELETE(req,res){
    
        const filePath = path.join(__dirname, req.url); // get the file path from the URL
        if (!fs.existsSync(filePath)) { // check if the file exists
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain');
          res.end('File not found');
          return;
        }
    
    const fieldToDelete = req.query; // get the field to delete from the query parameters
    if (fieldToDelete) { // if a field to delete is specified
        try {
            const fileData = JSON.parse(fs.readFileSync(filePath)); // read the JSON data from the file
            delete fileData[fieldToDelete]; // delete the specified field
            fs.writeFileSync(filePath, JSON.stringify(fileData)); // write the updated JSON data back to the file
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(fileData)); // send the updated JSON data as the response
        } catch (error) {
            console.error(error);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Error deleting field');
        }
    } else { // if no field to delete is specified, delete the entire file
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
    
}

module.exports=DELETE
