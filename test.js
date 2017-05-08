var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World this is a test\n');
}).listen(13370, '0.0.0.0');
console.log('Server running at http://0.0.0.0:13370/test');
