<template>
  <NewNavbar />
  <main class="p-4">
    <router-view />
  </main>
</template>

<script setup>
import NewNavbar from '@/components/NewNavbar.vue'
</script>

<style scoped>
main {
  padding: 1rem;
}
</style>