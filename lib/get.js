// Importing required modules
const fs = require('fs');
const url = require('url');

// Defining a function to handle HTTP GET requests
function GET(req, res) {
  // Parsing the requested URL and extracting the pathname
  let url_components = url.parse(req.url, true);
  
  // Constructing the filename of the JSON file to be retrieved
  let filename = `./data/${url_components.pathname}.json`;

  // Checking if the file exists
  if (fs.existsSync(filename)) {
    // If the file exists, reading its content
    const data = fs.readFileSync(filename, 'utf-8');
    
    // Setting the response header to indicate that the data being sent is in JSON format
    res.setHeader('Content-Type', 'application/json');
    
    // Sending the JSON data as the response to the client
    res.end(data);
  }
  else {
    // If the file does not exist, setting the response status code to 404 (Not Found)
    res.statusCode = 404;
    
    // Sending the message "FILE DO NOT EXIST" as the response body
    res.end("FILE DO NOT EXIST");
  }
};


module.exports=GET
