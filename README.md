# Proyecto con Docker (Recomendado)

## Requisitos

1. **Instalar Docker Desktop**

   Para ejecutar este proyecto, necesitas tener [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado en tu máquina.

   Puedes descargarlo desde aquí: [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

   > Sigue las instrucciones de instalación específicas para tu sistema operativo.

---

2. **Clonar este repositorio**

   Clona el repositorio usando el siguiente comando:

   ```bash
   git clone git@github.com:TheBird204/task-manager-app.git
   cd task-manager-app

---

3. **Ejecutar el proyecto con Docker**

   Para construir y correr el contenedor Docker, ejecuta el siguiente comando en la raíz del proyecto:

   ```bash
   docker-compose up --build

4. **Inicia el servidor de desarrollo:**

   http://localhost:5173

---
## ⚙️ OPCIONAL: Ejecutar frontend y backend por separado

Si prefieres trabajar los proyectos por separado, puedes levantar manualmente el backend (Django) y el frontend (Vue.js) de la siguiente manera:

### Backend (Django)

1. Entra a la carpeta del backend:

   ```bash
   cd backend

2. Entra a la carpeta del backend:

   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate

3. Entra a la carpeta del backend:

   ```bash
   pip install -r requirements.txt

4. Aplica las migraciones

   ```bash
   python manage.py makemigrations
   python manage.py migrate

5. Inicia el servidor de desarrollo:

   ```bash
   python manage.py runserver

### Frontend (Vue.js)

1. Entra a la carpeta del frontend:

   ```bash
   cd frontend

2. Instala las dependencias:

   ```bash
   npm install
   # o
   yarn install

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   # o
   yarn dev 

4. Inicia el servidor de desarrollo:

   http://localhost:5173
