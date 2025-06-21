import { createRouter, createWebHistory } from 'vue-router'
import PublicLayout from '../layouts/PublicLayout.vue'
import MainLayout from '../layouts/MainLayout.vue'
import Seguridad from '../views/Seguridad.vue'
import Home from '../views/Home.vue'
import Usuarios from '../views/Usuarios.vue'
import Contacto from '../views/Contacto.vue'

const routes = [
  {
    path: '/',
    component: PublicLayout, // layout sin navbar
    children: [
      {
        path: '',
        name: 'Seguridad',
        component: Seguridad
      }
    ]
  },
  {
    path: '/',
    component: MainLayout, // layout con navbar
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
        meta: { requiereAutenticacion: true }
      },
      {
        path: 'usuarios',
        name: 'Usuarios',
        component: Usuarios,
        meta: { requiereAutenticacion: true }
      },
      {
        path: 'contacto',
        name: 'Contacto',
        component: Contacto,
        meta: { requiereAutenticacion: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
//Esta lógica es correcta para que sólo los usuarios que tengan autenticado en true accedan a /home, /usuarios y /contacto.
router.beforeEach((to, from, next) => {
  const autenticado = localStorage.getItem('autenticado') === 'true'
  if (to.meta.requiereAutenticacion && !autenticado) {
    next({ path: '/' }) // Redirige a Seguridad.vue si no ha hecho login
  } else {
    next() // Permite navegar
  }
})
export default router