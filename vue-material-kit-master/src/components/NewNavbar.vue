<template>
  <nav class="bg-dark py-3">
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <router-link to="/home" class="nav-link text-white">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/usuarios" class="nav-link text-white">Usuarios</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/contacto" class="nav-link text-white">Contáctanos</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
// sin lógica por ahora
</script>

<style scoped>
.nav-link.active,
.nav-link:hover {
  color: #00d1b2 !important; /* Puedes cambiar el color del hover si quieres */
}
</style>
