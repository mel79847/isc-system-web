
# 🚀 ISC System Web – Frontend Interface

Welcome to the ISC System Web frontend repository, a web platform developed to manage requests, users, and academic processes. This project is built with **React**, **TypeScript**, **Vite**, **TailwindCSS**, and can be run in both development and production using **Docker**.

This guide will walk you through running the system, even if it's your first time working with this project.

---

## 📦 How to Run the Project

### 1. Clone the repository

Open your terminal and run:

```bash
git clone https://github.com/PaulLandaeta/isc-system-web.git
cd isc-system-web
```

### 2. Run the project in development

Inside the project directory, run:

```bash
./start-dev.sh
```

This script will start the development server, usually accessible at `http://localhost:5173`.

> If you get a permission error, run:
> ```bash
> chmod +x start-dev.sh
> ```

---

## 🐳 Running with Docker

If you prefer not to install anything and want to use containers, you can also run this project using **Docker**.

### Step 1: Build the Docker image

```bash
docker build -t react-app .
```

### Step 2: Run the container

```bash
docker run -p 80:80 react-app
```

The app will be available for production at `http://localhost`.

---
