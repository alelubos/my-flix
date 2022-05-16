const http = require('http'),
  fs = require('fs'),
  url = require('url');
http
  .createServer((req, res) => {
    let addr = req.url,
      host = req.headers.host,
      q = url.parse(addr, true),
      filePath = '';
    fs.appendFile(
      'logged-urls.txt',
      'URL: ' + host + addr + '\nTimestamp: ' + new Date() + '\n\n',
      (err) => {
        if (err) console.log(err);
        else console.log('Added to log.');
      }
    );
    if (q.pathname.includes('documentation')) {
      filePath = __dirname + '/documentation/index.html';
    } else {
      filePath = 'index.html';
    }
    fs.readFile(filePath, (err, data) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  })
  .listen(8080);
console.log('My test server is running on Port 8080.');
