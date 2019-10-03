const http = require('http');
const express = require('express');
const app = express();
// http.createServer(function(request, response) { // Send HTTP headers and body with status 200 (meaning success)  
//     response.writeHead(200, { 'Content-Type': 'text/html' });
//     response.end(`    <html><body>      <h1>Hello, world!</h1>      You asked for: ${request.url}    </body&gt;</html>`);
// }).listen(5555);

app.use('/node_modules', express.static('node_modules'));
app.use('/', express.static('app'));
app.listen(1234, () => console.log('Express server running at http://127.0.0.1:5555'));