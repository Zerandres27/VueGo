require('dotenv').config()             // ← Cargar variables del .env
const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const path = require('path')           // Para servir archivos estáticos

const app = express()
app.use(cors())
app.use(express.json())

// Configuración de MySQL (usa variables del .env)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
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

// RUTA PARA LISTAR USUARIOS
app.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, nombre, cedula, direccion, email, sexo, foto, creado_en FROM usuarios'
    )
    res.status(200).json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener usuarios' })
  }
})

// 🆕 CREAR usuario
app.post('/usuarios', async (req, res) => {
  const { nombre, cedula, direccion, email, sexo, foto, contrasena } = req.body
  try {
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, cedula, direccion, email, sexo, foto, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, cedula, direccion, email, sexo, foto, contrasena]
    )
    res.status(201).json({ id: result.insertId })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear usuario' })
  }
})

// 🆕 ACTUALIZAR usuario
app.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params
  const { nombre, cedula, direccion, email, sexo, foto, contrasena } = req.body
  try {
    await pool.query(
      'UPDATE usuarios SET nombre=?, cedula=?, direccion=?, email=?, sexo=?, foto=?, contrasena=? WHERE id=?',
      [nombre, cedula, direccion, email, sexo, foto, contrasena, id]
    )
    res.status(200).json({ message: 'Usuario actualizado' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al actualizar usuario' })
  }
})

// 🆕 ELIMINAR usuario
app.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params
  try {
    await pool.query('DELETE FROM usuarios WHERE id=?', [id])
    res.status(200).json({ message: 'Usuario eliminado' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar usuario' })
  }
})

// Servir archivos estáticos del build de Vue
app.use(express.static(path.join(__dirname, 'dist')))

// Redirigir todas las demás rutas a index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// LEVANTAR SERVIDOR
app.listen(3000, () => {
  console.log('✅ API y app en http://localhost:3000')
})
