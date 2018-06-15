const http = require('http');

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(product));
});

server.listen(8080);

const product = {
  id: 1,
  name: 'Supreme T-Shirt',
  brand: 'Supreme',
  price: 99.99,
  options: [
    { color: 'blue' },
    { size: 'XL' }
  ]
};