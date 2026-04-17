const http = require('http');

const options = {
  hostname: 'localhost',
  port: 8000,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`Estado: ${res.statusCode}`);
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Respuesta:', data);
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});

req.end();
