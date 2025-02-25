const { Pool } = require('pg');

// Configura las credenciales directamente en el código
const pool = new Pool({
    user: 'postgres',       // Nombre de usuario de PostgreSQL
    host: 'localhost',      // Host donde está PostgreSQL
    database: 'thalamus',    // Nombre de la base de datos
    password: '123456',     // Contraseña del usuario
    port: 5432,             // Puerto de PostgreSQL (predeterminado: 5432)
});

// Prueba la conexión
pool.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

module.exports = pool;