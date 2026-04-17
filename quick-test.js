const http = require('http');

function request(path, method = 'GET', bodyData = null) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: 'localhost',
      port: 8000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(opts, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          resolve({ code: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ code: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    
    if (bodyData) req.write(JSON.stringify(bodyData));
    req.end();
  });
}

(async () => {
  try {
    console.log('✅ CONECTANDO A API EN http://localhost:8000...\n');
    
    const r1 = await request('/', 'GET');
    console.log('GET / →', r1.code, r1.body);
    
    const r2 = await request('/api/usuarios', 'GET');
    console.log('\nGET /api/usuarios →', r2.code);
    console.log('  Usuarios:', r2.body.length || r2.body);
    
    const r3 = await request('/api/login', 'POST', {
      email: 'tiendavirtual@gmail.com',
      password: 'TiendaVirtual2026'
    });
    console.log('\nPOST /api/login →', r3.code);
    if (r3.body.token) {
      console.log('  ✅ Token recibido:', r3.body.token.substring(0, 30) + '...');
    } else {
      console.log('  Respuesta:', r3.body);
    }
    
    console.log('\n✅ API FUNCIONANDO CORRECTAMENTE');
  } catch (err) {
    console.error('❌ ERROR:', err.message);
  }
  process.exit(0);
})();
