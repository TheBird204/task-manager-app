<template>
    <div class="detail-container">
      <h2>Detalle de la Tarea</h2>
  
      <div class="card">
        <p><strong>Título:</strong> {{ task.title }}</p>
        <p><strong>Descripción:</strong> {{ task.description }}</p>
        <p><strong>Prioridad:</strong> {{ priorityLabel(task.priority) }}</p>
        <p><strong>Estado:</strong> {{ statusLabel(task.status) }}</p>
        <p><strong>Fecha límite:</strong> {{ task.due_date }}</p>
        <p><strong>Creada en:</strong> {{ formatDate(task.created_at) }}</p>
      </div>
  
      <button @click="goBack">Volver</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import api from '../services/api';
  
  const task = ref({});
  const route = useRoute();
  const router = useRouter();
  
  const fetchTask = async () => {
    try {
      const res = await api.get(`tasks/${route.params.id}/`);
      task.value = res.data;
    } catch (err) {
      console.error('Error al cargar tarea:', err);
    }
  };
  
  const goBack = () => {
    router.push('/tasks');
  };
  
  const priorityLabel = (value) => {
    return {
      low: 'Baja',
      medium: 'Media',
      high: 'Alta',
    }[value] || value;
  };
  
  const statusLabel = (value) => {
    return {
      pending: 'Pendiente',
      in_progress: 'En progreso',
      completed: 'Completada',
    }[value] || value;
  };
  
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString();
  };
  
  onMounted(fetchTask);
  </script>
  
  <style scoped>
  .detail-container {
    background-color: #1e293b;
    color: #f1f5f9;
    padding: 2rem;
    border-radius: 8px;
    max-width: 600px;
    margin: 2rem auto;
  }
  
  .card {
    background-color: #334155;
    padding: 1.5rem;
    border-radius: 6px;
    border: 1px solid #475569;
  }
  
  button {
    margin-top: 1.5rem;
    background-color: #3b82f6;
    color: white;
    border: none;
    padding: 0.5rem 1.2rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #2563eb;
  }
  </style>
  