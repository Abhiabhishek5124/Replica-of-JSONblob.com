
function post(req,res){
let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const id = generateUniqueId(); // Generate a unique ID
      const fileName = `${id}.json`; // Create a new file name using the ID
      const fileData = JSON.parse(body); // Parse the JSON data from the request body

      fs.writeFile(fileName, JSON.stringify(fileData), err => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Error creating file');
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Location', id);
          res.end(fileName); // Send the file name (ID) as the response
        }
      });
    })

}; 

function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }


  module.exports=post;
