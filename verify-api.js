const http = require('http');

function makeRequest(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '127.0.0.1',
      port: 8000,
      path: path,
      method: method,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Node.js Test'
      }
    };

    try {
      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            resolve({ status: res.statusCode, data: parsed, raw: data });
          } catch (e) {
            resolve({ status: res.statusCode, data: null, raw: data });
          }
        });
      });

      req.on('timeout', () => {
        req.abort();
        reject(new Error('Timeout'));
      });

      req.on('error', (e) => {
        reject(e);
      });

      if (body) {
        req.write(JSON.stringify(body));
      }
      req.end();
    } catch (e) {
      reject(e);
    }
  });
}

async function runTests() {
  console.log('═══════════════════════════════════════');
  console.log('🧪 PRUEBAS DE API');
  console.log('═══════════════════════════════════════\n');

  try {
    console.log('📝 Prueba 1: GET /');
    const test1 = await makeRequest('/');
    console.log('   Status:', test1.status);
    console.log('   Data:', JSON.stringify(test1.data, null, 2));
    console.log('   ✅ OK\n');

    console.log('📝 Prueba 2: GET /api/usuarios');
    const test2 = await makeRequest('/api/usuarios');
    console.log('   Status:', test2.status);
    if (Array.isArray(test2.data)) {
      console.log('   Usuarios encontrados:', test2.data.length);
      console.log('   ✅ OK\n');
    } else {
      console.log('   Data:', test2.data);
      console.log('   ⚠ Respuesta inesperada\n');
    }

    console.log('📝 Prueba 3: POST /api/login');
    const test3 = await makeRequest('/api/login', 'POST', {
      email: 'tiendavirtual@gmail.com',
      password: 'TiendaVirtual2026'
    });
    console.log('   Status:', test3.status);
    if (test3.data && test3.data.token) {
      console.log('   Token:', test3.data.token.substring(0, 20) + '...');
      console.log('   ✅ OK\n');
    } else {
      console.log('   Data:', test3.data);
      console.log('   ⚠ No se obtuvo token\n');
    }

    console.log('═══════════════════════════════════════');
    console.log('✅ Todas las pruebas completadas');
    console.log('═══════════════════════════════════════');
  } catch (err) {
    console.error('\n❌ Error durante las pruebas:', err.message);
    console.log('═══════════════════════════════════════');
  }

  process.exit(0);
}

setTimeout(runTests, 2000);
