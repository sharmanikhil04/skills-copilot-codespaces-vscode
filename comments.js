// create web server
// create a server that listens for requests on port 3000
// when a request is made to the server, the server should read the comments.json file and send the contents back to the client
// when a POST request is made to the server, the server should read the comments.json file, add the new comment to the file, and send the file back to the client

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if(req.method === 'GET') {
    fs.readFile('./comments.json', (err, data) => {
      if(err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
      res.end(data);
    });
  } else if(req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      fs.readFile('./comments.json', (err, data) => {
        if(err) {
          console.error(err);
          res.statusCode = 500;
          res.end('Internal Server Error');
        }
        const comments = JSON.parse(data);
        comments.push(JSON.parse(body));
        fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
          if(err) {
            console.error(err);
            res.statusCode = 500;
            res.end('Internal Server Error');
          }
          res.end(JSON.stringify(comments));
        });
      });
    });
  } else {
    res.statusCode = 405;
    res.end('Method Not Allowed');
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});