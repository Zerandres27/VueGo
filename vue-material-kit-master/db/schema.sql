-- Crea la base de datos si no existe
CREATE DATABASE IF NOT EXISTS mi_basededatos;
USE mi_basededatos;

-- Crea tabla usuarios
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  cedula VARCHAR(50) NOT NULL UNIQUE,
  direccion VARCHAR(200),
  email VARCHAR(100) NOT NULL UNIQUE,
  sexo ENUM('M','F','O') DEFAULT 'O',
  foto VARCHAR(255), -- aquí guardas solo el path o URL
  password VARCHAR(255) NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Datos iniciales opcionales
INSERT INTO usuarios (nombre, cedula, direccion, email, sexo, foto, password)
VALUES ('Admin User', '123456789', 'Calle Falsa 123', 'admin@example.com', 'M', NULL, '12345');
