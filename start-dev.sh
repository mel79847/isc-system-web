#!/bin/bash

echo "Verificando entorno de desarrollo"

# Verificación de instalación de Node.js
if ! command -v node &> /dev/null; then
    echo "Error: Node.js no está instalado. Instálalo y vuelve a intentarlo."
    exit 1
fi

#Verificación de la versión mínima de Node.js y la versión instalada del Node.js
NODE_VERSION=$(node -v | sed 's/v//')
REQUIRED_VERSION="18.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "Error: Se requiere Node.js versión 18.0.0 o superior. Versión detectada: $NODE_VERSION"
    exit 1
fi

echo "Node.js detectado: $NODE_VERSION"

#Detección del gestor de paquetes
if [ -f "yarn.lock" ]; then
    PACKAGE_MANAGER="yarn"
elif [ -f "pnpm-lock.yaml" ]; then
    PACKAGE_MANAGER="pnpm"
else
    PACKAGE_MANAGER="npm"
fi
echo "Gestor de paquetes: $PACKAGE_MANAGER"

#Instalación de dependencias
echo "Instalando dependencias"
$PACKAGE_MANAGER install || { echo "Error al instalar dependencias."; exit 1; }

#Validación del archivo .env
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        echo "Creando .env desde .env.example"
        cp .env.example .env
    else
        echo "Error: No se encontró .env ni .env.example. Crea un archivo .env manualmente."
        exit 1
    fi
fi

#Levantar el servidor de desarrollo
echo "Levantando el servidor"
$PACKAGE_MANAGER run dev