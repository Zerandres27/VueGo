// scripts/setup-db.js
const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();

(async () => {
  try {
    // Conéctate a MySQL
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      multipleStatements: true,
    });

    // Lee el schema SQL
    const schema = fs.readFileSync('./db/schema.sql', 'utf-8');

    // Ejecuta el schema
    await connection.query(schema);

    console.log('✅ Base de datos inicializada correctamente');
    await connection.end();
  } catch (error) {
    console.error('❌ Error inicializando la base de datos:', error.message);
  }
})();