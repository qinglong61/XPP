const http = require('http');
const https = require('https');
const url = require('url');

const hostname = '127.0.0.1';
const port = 8989;// port 3000 for koding.com

https.Server({
    //  key: fs.readFileSync('/path/to/server.key'),
    //  cert: fs.readFileSync('/path/to/server.crt')
}, function(req, res){
    res.writeHead(200);
    res.end("hello world\n");
}).listen(443, function(err){
     console.log("https listening on port: 443");
});

http.createServer((req, res) => {
    var requestURL = req.url;
    console.log(req);
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
        console.log(protocol);
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
            console.log(requestURL);
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
