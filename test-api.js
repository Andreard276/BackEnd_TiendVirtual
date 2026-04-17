const http = require('http');

function makeRequest(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 8000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({ status: res.statusCode, data: data });
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  try {
    console.log('🧪 Prueba 1: GET /');
    const test1 = await makeRequest('/');
    console.log('   Status:', test1.status);
    console.log('   Response:', test1.data);

    console.log('\n🧪 Prueba 2: POST /api/login');
    const test2 = await makeRequest('/api/login', 'POST', {
      email: 'tiendavirtual@gmail.com',
      password: 'TiendaVirtual2026'
    });
    console.log('   Status:', test2.status);
    console.log('   Response:', test2.data);

    console.log('\n🧪 Prueba 3: GET /api/usuarios');
    const test3 = await makeRequest('/api/usuarios');
    console.log('   Status:', test3.status);
    console.log('   Response:', test3.data.substring(0, 200) + '...');

    console.log('\n✅ Todas las pruebas completadas');
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

setTimeout(runTests, 2000);
