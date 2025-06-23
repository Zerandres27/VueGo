<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Usuarios</h2>

    <!-- Formulario para crear/editar -->
    <form @submit.prevent="guardarUsuario" class="mb-4 grid gap-2 grid-cols-2">
      <input v-model="usuario.nombre" placeholder="Nombre" required class="p-2 border rounded" />
      <input v-model="usuario.cedula" placeholder="Cédula" required class="p-2 border rounded" />
      <input v-model="usuario.direccion" placeholder="Dirección" class="p-2 border rounded" />
      <input v-model="usuario.email" placeholder="Email" required class="p-2 border rounded" type="email" />
      <select v-model="usuario.sexo" class="p-2 border rounded">
        <option value="M">M</option>
        <option value="F">F</option>
        <option value="O">O</option>
      </select>
      <input v-model="usuario.foto" placeholder="Foto (URL)" class="p-2 border rounded" />
      <input v-model="usuario.contrasena" placeholder="Contraseña" type="password" class="p-2 border rounded" />

      <button type="submit" class="bg-blue-500 text-white p-2 rounded col-span-2">
        {{ editando ? 'Actualizar' : 'Agregar' }} Usuario
      </button>
    </form>

    <!-- Tabla de usuarios -->
    <table class="min-w-full border border-gray-200 text-center">
      <thead>
        <tr class="bg-gray-100">
          <th>ID</th><th>Nombre</th><th>Email</th><th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in usuarios" :key="u.id" class="border-t">
          <td>{{ u.id }}</td>
          <td>{{ u.nombre }}</td>
          <td>{{ u.email }}</td>
          <td>
            <button @click="editarUsuario(u)" class="bg-yellow-400 px-2 py-1 rounded">Editar</button>
            <button @click="eliminarUsuario(u.id)" class="bg-red-500 text-white px-2 py-1 rounded">Borrar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const usuarios = ref([])
const usuario = ref({ nombre:'', cedula:'', direccion:'', email:'', sexo:'M', foto:'', contrasena:'' })
const editando = ref(false)

const listarUsuarios = async () => {
  const { data } = await axios.get('/usuarios')
  usuarios.value = data
}

const guardarUsuario = async () => {
  if (editando.value) {
    await axios.put(`/usuarios/${usuario.value.id}`, usuario.value)
    editando.value = false
  } else {
    await axios.post('/usuarios', usuario.value)
  }
  usuario.value = { nombre:'', cedula:'', direccion:'', email:'', sexo:'M', foto:'', contrasena:'' }
  listarUsuarios()
}

const editarUsuario = (u) => {
  usuario.value = { ...u }
  editando.value = true
}

const eliminarUsuario = async (id) => {
  await axios.delete(`/usuarios/${id}`)
  listarUsuarios()
}

onMounted(() => listarUsuarios())
</script>

<style scoped>
table { width: 100%; }
</style>