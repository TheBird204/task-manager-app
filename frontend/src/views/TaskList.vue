<template>
    <div class="task-container">
      <h2>Mis Tareas</h2>
  
      <!-- Formulario de tarea -->
      <form class="task-form" @submit.prevent="editMode ? updateTask() : createTask()">
        <input v-model="title" placeholder="Título" required />
        <textarea v-model="description" placeholder="Descripción"></textarea>
  
        <select v-model="priority" required>
          <option value="" disabled>Prioridad</option>
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
  
        <select v-model="status" required>
          <option value="" disabled>Estado</option>
          <option value="pending">Pendiente</option>
          <option value="in_progress">En progreso</option>
          <option value="completed">Completada</option>
        </select>
  
        <input type="date" v-model="deadline" required />
  
        <button type="submit">
          {{ editMode ? 'Actualizar Tarea' : 'Crear Tarea' }}
        </button>
      </form>
  
      <!-- Tabla de tareas -->
      <table class="task-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Prioridad</th>
            <th>Estado</th>
            <th>Fecha Límite</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.title }}</td>
            <td>{{ task.priority }}</td>
            <td>{{ task.status }}</td>
            <td>{{ task.due_date }}</td>
            <td>
              <router-link :to="`/tasks/${task.id}`">
                <button class="btn-view">Ver</button>
              </router-link>
              <button class="edit-btn" @click="startEdit(task)">Editar</button>
              <button class="delete-btn" @click="deleteTask(task.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const tasks = ref([])
const editMode = ref(false)
const currentTask = ref(null)

const title = ref('')
const description = ref('')
const priority = ref('medium')
const deadline = ref('')
const status = ref('pending')

const fetchTasks = async () => {
  try {
    const res = await api.get('tasks/')
    tasks.value = res.data
  } catch (err) {
    console.error('Error al cargar tareas', err)
  }
}

const createTask = async () => {
  try {
    await api.post('tasks/', {
      title: title.value,
      description: description.value,
      priority: priority.value,
      due_date: deadline.value,
      status: status.value,
    })
    clearForm()
    fetchTasks()
  } catch (err) {
    console.error('Error al crear tarea', err)
  }
}

function startEdit(task) {
  editMode.value = true
  currentTask.value = { ...task }
  title.value = task.title
  description.value = task.description
  priority.value = task.priority
  status.value = task.status
  deadline.value = task.due_date
}

async function updateTask() {
  try {
    await api.put(`tasks/${currentTask.value.id}/`, {
      title: title.value,
      description: description.value,
      priority: priority.value,
      status: status.value,
      due_date: deadline.value,
    })
    editMode.value = false
    currentTask.value = null
    clearForm()
    fetchTasks()
  } catch (error) {
    console.error('Error al actualizar tarea:', error)
  }
}

async function deleteTask(id) {
  if (!confirm('¿Estás seguro de eliminar esta tarea?')) return
  try {
    await api.delete(`tasks/${id}/`)
    fetchTasks()
  } catch (error) {
    console.error('Error al eliminar tarea:', error)
  }
}

function clearForm() {
  title.value = ''
  description.value = ''
  priority.value = 'medium'
  deadline.value = ''
  status.value = 'pending'
}

function formatPriority(p) {
  return {
    low: 'Baja',
    medium: 'Media',
    high: 'Alta'
  }[p] || p
}

function formatStatus(s) {
  return {
    pending: 'Pendiente',
    in_progress: 'En progreso',
    completed: 'Completada'
  }[s] || s
}

onMounted(fetchTasks)
</script>

<style scoped>
.task-container {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #111827;
  color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
}

.task-container h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #93c5fd;
}

.task-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.task-form input,
.task-form textarea,
.task-form select {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #374151;
  background-color: #1f2937;
  color: #f9fafb;
}

.task-form textarea {
  grid-column: span 2;
  resize: vertical;
  min-height: 80px;
}

.task-form button {
  grid-column: span 2;
  padding: 0.7rem;
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.task-form button:hover {
  background-color: #2563eb;
}

.task-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: #1f2937;
  border: 1px solid #374151;
  border-radius: 6px;
  overflow: hidden;
}

.task-table th,
.task-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #374151;
}

.task-table th {
  background-color: #111827;
  color: #93c5fd;
}

.task-table tbody tr:nth-child(even) {
  background-color: #27303f;
}

.edit-btn,
.delete-btn {
  padding: 0.3rem 0.6rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
}

.edit-btn {
  background-color: #facc15;
  color: black;
  margin-right: 0.5rem;
}

.delete-btn {
  background-color: #ef4444;
  color: white;
}

.edit-btn:hover {
  background-color: #eab308;
}

.delete-btn:hover {
  background-color: #dc2626;
}

td button,
td .btn-view {
  margin: 0 0.3rem;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-view {
  background-color: #0ea5e9;
}
.btn-view:hover {
  background-color: #0284c7;
}

.btn-edit {
  background-color: #facc15;
  color: #1e293b;
}
.btn-edit:hover {
  background-color: #eab308;
}

.btn-delete {
  background-color: #ef4444;
}
.btn-delete:hover {
  background-color: #dc2626;
}
</style>
