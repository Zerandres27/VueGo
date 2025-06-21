# 📂 Mi Proyecto Vue 3 + Vite

Este proyecto es una aplicación Vue 3 que utiliza `Vite` como bundler, junto con un esquema de layouts para páginas públicas y privadas.

## 🧭 Estructura de carpetas

src/
├─ assets/ # Recursos estáticos (CSS, imágenes, fuentes...)
├─ components/ # Componentes reusables (NavBar, botones, etc.)
├─ layouts/ # Layouts generales para páginas públicas y privadas
├─ views/ # Vistas (páginas) como Home, Seguridad, etc.
├─ router/ # Configuración de rutas
├─ stores/ # Vuex/Pinia stores (gestión global del estado)
├─ App.vue # Componente raíz
├─ main.js # Punto de entrada

markdown
Copiar
Editar

## 🎨 Layouts

- `PublicLayout.vue`: Usado para páginas públicas que **no tienen navbar** (por ejemplo `Seguridad.vue`)
- `MainLayout.vue`: Usado para páginas privadas que **sí muestran la navbar** (por ejemplo `Home.vue`, `Usuarios.vue`)
- `NewNavbar.vue`: La barra de navegación que solo se incluye en `MainLayout.vue`

## 🚀 Cómo ejecutar el proyecto

1. Instala las dependencias:
   ```bash
   npm install
Ejecuta el proyecto en modo desarrollo:

bash
Copiar
Editar
npm run dev
Accede a la app en tu navegador en http://localhost:5173

⚙️ Configuración del router
En router/index.js, las rutas se agrupan por layout:

Rutas públicas que usan PublicLayout.vue.

Rutas privadas que usan MainLayout.vue.

🤝 Contribución
Si quieres contribuir:

Crea una rama nueva.

Haz tu cambio.

Abre un Pull Request para revisión.