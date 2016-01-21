const net = require('net');

const port = 8888;

const proxy = net.createServer({
    allowHalfOpen: true
}, (fromClientSocket) => {

    console.log(fromClientSocket.remoteAddress);
    console.log(fromClientSocket.remotePort);
    console.log(fromClientSocket.localAddress);
    console.log(fromClientSocket.localPort);

    var toServerSocket = new net.Socket({
        allowHalfOpen: true
    });
    toServerSocket.connect({
        host: fromClientSocket.remoteAddress,
        port: fromClientSocket.remotePort
        // localAddress: fromClientSocket.localAddress,
        // localPort: fromClientSocket.localPort
    }, () => {
        fromClientSocket.resume();
        toServerSocket.resume();
    }).on('data', (data) => {
        fromClientSocket.write(data);
    }).on('end', () => {
        fromClientSocket.end();
    }).on('error', (e) => {
        console.error(e);
        fromClientSocket.destroy();
    }).on('timeout', () => {
        fromClientSocket.destroy();
        toServerSocket.destroy();
    });

    fromClientSocket.pause();
    toServerSocket.pause();

    fromClientSocket.on('data', (data) => {
        toServerSocket.write(data);
    }).on('end', () => {
        toServerSocket.end();
    }).on('error', (e) => {
        console.error(e);
        toServerSocket.destroy();
    }).on('timeout', () => {
        console.error(e);
        fromClientSocket.destroy();
        toServerSocket.destroy();
    });
}).listen(port, () => {
    console.log(`Proxy server running at port:${port}`);
}).on('error', function(e) {
    console.error('SERVER ERROR: %j', e);
    if (e.code == 'EADDRINUSE') {
        console.log('Address in use, retrying in 10 seconds...');
        setTimeout(function () {
            console.log('Reconnecting to port:%s', port);
            server.close();
            server.listen(port);
        }, 10000);
    }
});

process.on('uncaughtException', function(e){
    console.error(e);
});
