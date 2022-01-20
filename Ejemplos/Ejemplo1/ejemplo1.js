var http = require('http');
 
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hola Mundo!');
    console.log('Esto va a la consola');
}).listen(8090);
