const http = require('http');
const url = require('url');

const hostname = '0.0.0.0';
const port = 80;// port 3000 for koding.com

http.createServer((req, res) => {
  var arg = url.parse(req.url, true).query;

  // ServerResponse
  // console.log(res);

  // res.writeHead(200, { 'Content-Type': 'text/plain' });
  // res.write('url = ' + arg.url);
  // res.end();

  http.get(arg.url, function(res1) {
    // console.log('STATUS: ' + res1.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(res1.headers));
    res.writeHead(res1.statusCode, res1.headers);
    // res1.setEncoding('utf8');
    res1.on('data', function (chunk) {
      // console.log('BODY: ' + chunk);
      res.write(chunk);
    });
    res1.on('end', function() {
      // console.log('No more data in response.')
      res.end();
    })

    // IncomingMessage
    // console.log(res1);

  }).on('error', function(e) {
    // console.log("Got error: " + e.message);
  });

}).listen(port, hostname, () => {
  console.log(`Server running at http:\/\/${hostname}:${port}\/`);
});
