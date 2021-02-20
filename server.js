const http = require('http');
const {
  getAllData,
  getData,
  createData,
  updateData,
  deleteData,
} = require('./controllers/realmController');

const hostname = '127.0.0.1';
const port = 5000;

// Routes
const server = http.createServer((req, res) => {
  if (
    req.url === '/api/realms' ||
    (req.url === '/api/realms/' && req.method === 'GET')
  ) {
    getAllData(req, res);
  } else if (
    req.url.match(
      /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/
    ) &&
    req.method === 'GET'
  ) {
    const id = req.url.split('/')[3];
    getData(req, res, id);
  } else if (req.url === '/api/realms' && req.method === 'POST') {
    createData(req, res);
  } else if (
    req.url.match(
      /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/
    ) &&
    req.method === 'PUT'
  ) {
    const id = req.url.split('/')[3];
    updateData(req, res, id);
  } else if (
    req.url.match(
      /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/
    ) &&
    req.method === 'DELETE'
  ) {
    const id = req.url.split('/')[3];
    deleteData(req, res, id);
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({ message: 'Route Not Found' }));
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
