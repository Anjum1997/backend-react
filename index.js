 
const http = require('http');

const server = http.createServer((req, res) => { 
    res.writeHead(200, { 'Content-Type': 'text/html'});
  res.end('<h1> Anjum Mishra is a villain so be aware  of what you in front of him</h1>');
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});