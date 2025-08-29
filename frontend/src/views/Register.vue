<template>
    <div class="register">
      <h2>Registrarse</h2>
      <form @submit.prevent="register">
        <label>Usuario:</label>
        <input v-model="username" type="text" required />
  
        <label>Contraseña:</label>
        <input v-model="password" type="password" required />
  
        <label>Confirmar contraseña:</label>
        <input v-model="confirmPassword" type="password" required />
  
        <button type="submit">Crear cuenta</button>
  
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">{{ success }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  const username = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const error = ref(null)
  const success = ref(null)
  const router = useRouter()
  
  const register = async () => {
    if (password.value !== confirmPassword.value) {
      error.value = 'Las contraseñas no coinciden.'
      return
    }
  
    try {
      await axios.post('http://localhost:8000/api/register/', {
        username: username.value,
        password: password.value,
      }, {
        headers: { 'Content-Type': 'application/json' }
      })
  
      success.value = 'Usuario registrado correctamente. Ahora puedes iniciar sesión.'
      error.value = null
  
      setTimeout(() => router.push('/login'), 2000)  // Redirige luego de 2 seg
    } catch (err) {
      error.value = 'No se pudo registrar el usuario.'
      success.value = null
    }
  }
  </script>
  
  <style scoped>
  .register {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ccc;
  }
  .error {
    color: red;
  }
  .success {
    color: green;
  }
  </style>
  