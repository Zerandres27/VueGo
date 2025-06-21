<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Login</h1>

    <form @submit.prevent="acceder">
      <div class="mb-3">
        <label for="email" class="form-label">Correo electrónico</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          required
        />
        <div id="emailHelp" class="form-text">
          Nunca compartiremos tu correo con nadie más.
        </div>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Contraseña</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          required
        />
      </div>

      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="check" />
        <label class="form-check-label" for="check">Recuérdame</label>
      </div>

      <button type="submit" class="btn btn-primary w-100">Ingresar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const acceder = async () => {
  try {
    const resp = await fetch('/api/login', { // ⬅️ usa el prefijo /api
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })

    if (resp.ok) {
      // Login correcto
      localStorage.setItem('autenticado', 'true')
      router.push('/home')
    } else {
      const data = await resp.json()
      alert(data.error || 'Error al autenticar')
    }
  } catch (error) {
    console.error('Error de conexión:', error)
    alert('Error al conectarse con el servidor')
  }
} 
</script>

<style scoped>
.container {
  max-width: 500px;
}
</style>