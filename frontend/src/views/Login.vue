<template>
    <div class="auth">
      <h2 v-if="isLogin">Iniciar Sesión</h2>
      <h2 v-else>Registrar Usuario</h2>
  
      <form @submit.prevent="isLogin ? login() : register()">
        <label>Usuario:</label>
        <input v-model="username" type="text" required />
  
        <div v-if="!isLogin">
          <label>Correo:</label>
          <input v-model="email" type="email" required />
        </div>
  
        <label>Contraseña:</label>
        <input v-model="password" type="password" required />
  
        <div v-if="!isLogin">
          <label>Confirmar Contraseña:</label>
          <input v-model="confirmPassword" type="password" required />
        </div>
  
        <button type="submit">{{ isLogin ? 'Entrar' : 'Registrar' }}</button>
  
        <p v-if="error" class="error">{{ error }}</p>
      </form>
  
      <p @click="toggleMode" class="toggle-link">
        {{ isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión' }}
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const isLogin = ref(true);
  const username = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const error = ref(null);
  const router = useRouter();
  
  const toggleMode = () => {
    isLogin.value = !isLogin.value;
    error.value = null;
    // Reset campos cuando cambias de modo
    username.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
  };
  
  const login = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username: username.value,
        password: password.value,
      });
  
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
  
      error.value = null;
      router.push('/tasks');
    } catch (err) {
      error.value = 'Credenciales inválidas.';
    }
  };
  
  const register = async () => {
    if (password.value !== confirmPassword.value) {
      error.value = 'Las contraseñas no coinciden.';
      return;
    }
  
    try {
      await axios.post('http://localhost:8000/api/register/', {
        username: username.value,
        email: email.value,
        password: password.value,
      });
  
      error.value = null;
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      toggleMode();
    } catch (err) {
      error.value = 'Error en el registro. Verifica los datos.';
    }
  };
  </script>
  
  <style scoped>
  .auth {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ccc;
  }
  .error {
    color: red;
  }
  .toggle-link {
    margin-top: 1rem;
    color: blue;
    cursor: pointer;
    text-decoration: underline;
  }
  </style>
  