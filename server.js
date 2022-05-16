const http = require('http'),
  url = require('url'),
  fs = require('fs');
let htmlFile = __dirname + '/index.html',
  cssFile = __dirname + '/css/styles.css';

http
  .createServer((req, res) => {
    // Get requested pathname
    let q = url.parse(req.url, true);
    let pathname = q.pathname;
    console.log(pathname);

    // log request into log.txt
    fs.appendFile(
      'log.txt',
      `URL: ${req.headers.host + pathname} \nTimestamp: ${new Date()} \n\n`,
      (err) => {
        if (err) throw err;
        console.log('Request added to log...');
      }
    );
    // Set appropriate HTML file to return
    if (pathname.includes('documentation'))
      htmlFile = __dirname + '/documentation.html';

    // check requested content and respond accordingly
    // for styles.css request
    if (pathname.includes('styles.css')) {
      fs.readFile(cssFile, (err, data) => {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
      });
    } else {
      // for HTML request
      fs.readFile(htmlFile, (err, data) => {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    }
    // Read & return contents of appropriate HTML file
  })
  .listen(8080);

console.log('myFlix server is running on port 8080');
