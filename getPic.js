const http = require('http');
const https = require('https');
const url = require('url');

const hostname = '0.0.0.0';
const port = 8080;// port 3000 for koding.com

http.createServer((req, res) => {
    var arg = url.parse(req.url, true).query;
    var requestURL = unescape(arg.url);
    if (requestURL) {
        var hostname = url.parse(requestURL, true).hostname;
        var path = url.parse(requestURL, true).path;
        var headers = req.headers;
        headers.host = hostname;
        var options = {
            hostname: hostname,
            path: path,
            headers: headers
        };
        var protocol = url.parse(requestURL).protocol;
        if (protocol == 'http:') {
            http.get(options, function(res1) {
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
            https.get(options, function(res2) {
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
