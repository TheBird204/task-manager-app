import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import TaskList from '../views/TaskList.vue';
import TaskDetail from '../views/TaskDetail.vue';

const routes = [
  { path: '/', name: 'Login', component: Login },
  //{ path: '/register', name: 'Register', component: Register },
  { path: '/tasks', name: 'Tasks', component: TaskList },
  { path: '/tasks/:id', name: 'TaskDetail', component: TaskDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔒 Validación global
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('access_token');
  const publicPages = ['/',];// '/register'

  // Si está autenticado e intenta ir a login o register → redirigir a /tasks
  if (isAuthenticated && publicPages.includes(to.path)) {
    return next('/tasks');
  }

  // Si NO está autenticado y quiere ir a una ruta protegida → redirigir a login
  if (!isAuthenticated && !publicPages.includes(to.path)) {
    return next('/');
  }

  return next();
});

export default router;
