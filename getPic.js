const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 8080;

http.createServer((req, res) => {
  var arg = url.parse(req.url).query;
  var arg = url.parse(req.url, true).query;

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('url = ' + arg.url);
  res.end();
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
