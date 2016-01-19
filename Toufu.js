const http = require('http');
const url = require('url');

const port = 8989;

http.createServer((request, response) => {//request is an instance of http.IncomingMessage and response is an instance of http.ServerResponse.
    var requestURL = request.url;
    // console.log(requestURL);
    var hostname = url.parse(requestURL, true).hostname;
    var path = url.parse(requestURL, true).path;
    var options = {
        hostname: hostname,
        method: request.method,
        path: path,
        headers: request.headers
    };
    var req = http.request(options, function(res) {
        response.writeHead(res.statusCode, res.headers);
        res.on('data', function (chunk) {
            response.write(chunk);
        }).on('end', function() {
            response.end();
        }).on('error', function(e) {
            console.error(e);
        });
    });

    request.on('data', function (postChunk) {
        req.write(postChunk)
    }).on('end', function() {
        req.end();
    }).on('error', function(e) {
        console.error(e);
    });
}).listen(port, () => {
    console.log(`HTTP proxy server running at port:${port}`);
}).on('error', function(e) {
    console.error(e);
});

process.on('uncaughtException', function(e){
    console.log(e);
});
