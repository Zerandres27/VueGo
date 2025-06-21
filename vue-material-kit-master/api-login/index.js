const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const path = require('path') // 🆕 Para servir archivos estáticos

const app = express()
app.use(cors())
app.use(express.json())

// Configuración de MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'MyRootPass123',
  database: 'mi_app'
})

// RUTA API LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    )
    if (rows.length === 0) return res.status(401).json({ error: 'Usuario no existe' })
    const user = rows[0]

    if (password !== user.password) return res.status(401).json({ error: 'Contraseña incorrecta' })
    res.status(200).json({ message: 'ok' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error en el servidor' })
  }
})


// 🆕 Servir archivos estáticos de Vue (dist)
app.use(express.static(path.join(__dirname, 'dist')))

// 🆕 Redirigir todas las demás rutas al index.html de Vue
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})


// LEVANTAR SERVIDOR
app.listen(3000, () => {
  console.log('API y app en http://localhost:3000')
})