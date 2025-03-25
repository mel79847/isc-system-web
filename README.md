# 🚀 ISC System Web – Interfaz Frontend

Bienvenido al repositorio del frontend del **Sistema ISC**, una plataforma web desarrollada para gestionar solicitudes, usuarios y procesos académicos. Este proyecto está construido con **React**, **TypeScript**, **Vite**, **TailwindCSS** y puede ser ejecutado tanto en desarrollo como en producción usando **Docker**.

Este documento te guiará paso a paso para poner en marcha el sistema, incluso si es tu primera vez viendo este proyecto.

---

## 🧠 ¿Qué es esto?

Este proyecto es la parte visual (frontend) del sistema ISC. Aquí es donde los usuarios interactúan: inician sesión, crean solicitudes, revisan reportes, etc.

Se comunica con un backend (API) que debes tener corriendo por separado. El backend se encuentra en:  
👉 [`https://github.com/PaulLandaeta/isc-system-core`](https://github.com/PaulLandaeta/isc-system-core)

Una vez clonado, asegúrate de que el backend esté corriendo antes de iniciar este proyecto.

---

## ✅ Requisitos para empezar

Antes de hacer cualquier cosa, asegúrate de tener instalado lo siguiente en tu computadora:

| Requisito     | ¿Para qué sirve?                          | Enlace de descarga                         |
|---------------|--------------------------------------------|--------------------------------------------|
| **Node.js v20**  | Para ejecutar el proyecto localmente      | [Descargar Node.js](https://nodejs.org/es/blog/release/v20.18.0) |
| **Git**          | Para clonar el repositorio                | [Descargar Git](https://git-scm.com/downloads/win) |
| **Docker**       | Para ejecutar el sistema en contenedores  | [Descargar Docker](https://www.docker.com/products/docker-desktop/) |
| **Terminal Bash** | Para ejecutar scripts `.sh`              | (Ya viene con Git Bash o sistemas Unix/macOS) |

---

## 📦 Cómo instalar y ejecutar el proyecto

### 1. Clonar el repositorio

Abre tu terminal y ejecuta:

```bash
git clone https://github.com/PaulLandaeta/isc-system-web.git
cd isc-system-web
```

### 2. Crear el archivo `.env`

Este archivo le dice al proyecto dónde encontrar la API. Crea un archivo llamado `.env` en la raíz del proyecto con el siguiente contenido:

```env
VITE_API_URL=http://localhost:3000/api/
```

> Asegúrate de que el backend esté corriendo en ese puerto.

### 3. Instalar las dependencias

Ejecuta este comando en la terminal:

```bash
npm install --legacy-peer-deps
```

> Este comando descarga todas las librerías necesarias para que el proyecto funcione.

### 4. Ejecutar el proyecto en desarrollo

En la terminal, escribe:

```bash
./start-dev.sh
```

Este script arrancará el proyecto en modo desarrollo, normalmente accesible en `http://localhost:5173`.

> Si te sale un error de permisos, ejecuta esto primero:
> ```bash
> chmod +x start-dev.sh
> ```

---

## 🐳 ¿Quieres usar Docker?

Si no quieres instalar nada más y prefieres usar contenedores, también puedes correr este proyecto con **Docker**.

### Paso 1: Construir la imagen

```bash
docker build -t react-app .
```

### Paso 2: Ejecutar el contenedor

```bash
docker run -p 80:80 react-app
```

Esto servirá la aplicación lista para producción en `http://localhost`.

---

## 📁 Estructura de Archivos Importantes

| Archivo                  | ¿Para qué sirve? |
|--------------------------|------------------|
| `Dockerfile`             | Configura la imagen para producción. |
| `nginx.conf`             | Configura el servidor web que sirve la app. |
| `start-dev.sh`           | Script para levantar el proyecto en desarrollo. |
| `.env`                   | Contiene la URL del backend. |
| `package.json`           | Lista de dependencias y scripts. |
| `vite.config.ts`         | Configuración del bundler Vite. |

---

## 🧠 Tecnologías utilizadas

- **React** – Librería de interfaces
- **TypeScript** – Tipado estático
- **Vite** – Empaquetador ultrarrápido
- **TailwindCSS** – Estilos con utilidades
- **Material UI (MUI)** – Componentes de interfaz
- **Docker + Nginx** – Despliegue en producción

---

## 🧪 Recomendaciones


- Prueba primero localmente antes de usar Docker.
- Asegúrate de tener el backend (`isc-system-core`) corriendo correctamente.
- Siempre que modifiques el `.env`, reinicia el servidor con `Ctrl + C` y vuelve a ejecutar `./start-dev.sh`

---

Desarrollado por el equipo ISC – Universidad Privada Boliviana.
