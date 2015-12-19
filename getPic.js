const http = require('http');
const https = require('https');
const url = require('url');

const hostname = '0.0.0.0';
const port = 8080;// port 3000 for koding.com

http.createServer((req, res) => {
  var arg = url.parse(req.url, true).query;
  if (arg.url) {
    var protocol = url.parse(arg.url).protocol;
    if (protocol == 'http:') {
      http.get(arg.url, function(res1) {
        res.writeHead(res1.statusCode, res1.headers);
        // res1.setEncoding('utf8');
        res1.on('data', function (chunk) {
          res.write(chunk);
        });
        res1.on('end', function() {
          res.end();
        });
      }).on('error', function(e) {
        console.error(e);
      });
    } else if (protocol == 'https:') {
      https.get(arg.url, function(res2) {
        res.writeHead(res2.statusCode, res2.headers);
        res2.on('data', function(chunk) {
          res.write(chunk);
        });
        res2.on('end', function() {
          res.end();
        });
      }).on('error', function(e) {
        console.error(e);
      });
    } else {
      res.writeHead(200);
      res.end("Server is running\n");
    }
  } else {
    res.writeHead(200);
    res.end("Server is running\n");
  }
}).listen(port, hostname, () => {
  console.log(`Server running at http:\/\/${hostname}:${port}\/`);
});
