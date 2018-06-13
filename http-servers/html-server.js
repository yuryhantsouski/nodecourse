const http = require('http');
const fs = require('fs');
const path = require('path');

const { Transform } = require('stream');

const insertMessage = () => {
  return new Transform({
    transform(chunk, encoding, callback) {
      this.push(chunk.toString().replace('{message}', 'Hello World!'));
      callback();
    }
  });
};

const server = http.createServer((request, response) => {
  response.setHeader('Content-Type', 'text/html');

  const template = fs.createReadStream(path.join(__dirname, './index.html'), 'utf8');
  template.pipe(insertMessage()).pipe(response);
});

server.listen(8080);