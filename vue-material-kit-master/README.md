# 📂 Mi Proyecto Vue 3 + Vite + Node.js + MySQL

Este proyecto es una aplicación fullstack que incluye:

- 🎨 **Frontend**: Vue 3 + Vite
- 🧠 **Backend**: Node.js + Express + MySQL
- 🧭 **Layouts** para páginas públicas y privadas
- ⚙️ **Base de datos** inicializable automáticamente con un script

---

## 🧭 Estructura de carpetas

src/
├─ assets/ # Recursos estáticos (CSS, imágenes...)
├─ components/ # Componentes reusables
├─ layouts/ # Layouts generales para páginas públicas y privadas
├─ views/ # Vistas (páginas) como Home, Seguridad, etc.
├─ router/ # Configuración del enrutador
├─ stores/ # Vuex/Pinia para el estado global
├─ App.vue # Componente raíz
├─ main.js # Punto de entrada
db/
├─ schema.sql # Esquema inicial para la base de datos
scripts/
├─ setup-db.js # Script para inicializar la base automáticamente
index.js # Backend Node.js con Express y MySQL
.env.example # Archivo de ejemplo para configuración

yaml
Copiar
Editar

---

## 🎨 Layouts

- `PublicLayout.vue`: Para páginas públicas (sin navbar), por ejemplo `Seguridad.vue`.
- `MainLayout.vue`: Para páginas privadas (con navbar), por ejemplo `Home.vue`, `Usuarios.vue`.
- `NewNavbar.vue`: Barra de navegación incluida en `MainLayout.vue`.

---

## 🧰 Configuración del proyecto

1️⃣ Instala las dependencias:
```bash
npm install
2️⃣ Crea tu archivo .env copiando el ejemplo:

bash
Copiar
Editar
cp .env.example .env
3️⃣ Configura tus credenciales en .env:

ini
Copiar
Editar
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=TuPassword
DB_NAME=mi_app
🗄️ Base de datos
⚠️ Asegúrate de tener MySQL instalado y corriendo.

4️⃣ Inicializa la base automáticamente:

bash
Copiar
Editar
npm run setup:db
Esto:

Creará la base definida en DB_NAME.

Ejecutará el esquema SQL de db/schema.sql.

Insertará un usuario de prueba (admin@example.com / 12345).

🚀 Cómo ejecutar el proyecto
5️⃣ Ejecuta frontend + backend:

bash
Copiar
Editar
npm run dev:all
✅ Accede a la app en tu navegador en:
http://localhost:3000
(el backend sirve también el frontend ya compilado)

🔐 Login de prueba
Usa:

makefile
Copiar
Editar
email: admin@example.com
password: 12345
🤝 Contribuir
Crea una rama nueva:

bash
Copiar
Editar
git checkout -b feature/mi-cambio
Realiza tus cambios.

Sube la rama:

bash
Copiar
Editar
git push origin feature/mi-cambio
Abre un Pull Request para revisión.