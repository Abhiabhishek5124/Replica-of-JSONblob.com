const fs = require('fs');
const url = require('url');

function PUT(req, res) {
  // Get the URL components
  const urlComponents = url.parse(req.url, true);
  
  // Extract the file name from the URL
  const fileName = urlComponents.pathname.split('/')[1];

  // Read the request data and append it to the existing file data
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  });
  req.on('end', () => {
    fs.readFile(`./data/${fileName}.json`, 'utf-8', (err, fileData) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Error reading file');
      } else {
        const updatedData = fileData + data;
        fs.writeFile(`./data/${fileName}.json`, updatedData, 'utf-8', err => {
          if (err) {
            console.error(err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Error updating file');
          } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(`Successfully updated file ${fileName}`);
          }
        });
      }
    });
  });
}

module.exports = PUT;