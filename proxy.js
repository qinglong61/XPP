const net = require('net');

const port = 8989;

const proxy = net.createServer((fromClientSocket) => {
    const toServerSocket = net.Socket();
    toServerSocket.connect({
        host: fromClientSocket.remoteAddress,
        port: fromClientSocket.remotePort,
        localAddress: fromClientSocket.localAddress,
        localPort: fromClientSocket.localPort
    }, () => {

    }).on('data', (data) => {
        fromClientSocket.write(data);
    }).on('end', () => {
        fromClientSocket.end();
    });

    fromClientSocket.on('data', (data) => {
        toServerSocket.write(data);
    }).on('end', () => {
        toServerSocket.end();
    });
}).listen(port, () => {
    console.log(`Proxy server running at port:${port}`);
});
