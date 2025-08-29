<template>
  <div>
    <!-- Navbar solo si el usuario está logueado y no está en login o register -->
    <nav v-if="showNavbar">
      <router-link to="/tasks">Tareas</router-link>
      <button @click="logout">Cerrar sesión</button>
    </nav>

    <router-view />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();

const isLoggedIn = computed(() => {
  return !!localStorage.getItem('access_token');
});

const hideOnRoutes = ['/', '/register'];

const showNavbar = computed(() => {
  return isLoggedIn.value && !hideOnRoutes.includes(route.path);
});

const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  router.push('/');
};
</script>

<style scoped>
nav {
  padding: 1rem 2rem;
  background-color: #1f2937; /* Fondo oscuro */
  color: #f9fafb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #374151;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

nav a {
  color: #93c5fd;
  text-decoration: none;
  font-weight: bold;
  margin-right: 1rem;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #60a5fa;
}

nav button {
  background-color: #ef4444;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

nav button:hover {
  background-color: #dc2626;
}
</style>
