# Dependencies del sistema
    - NodeJS v16 LTS (Entorno de ejecución para Javascript)
    - NPM (Gestor de paquetes)
    - Docker (Para el contenedor con la base de datos para desarollo)

# Variables de entorno

Para desarrollo la forma sencilla de configurar estas variablas es mediante un archivo .env en la raiz del proyecto.

- VITE_SERVER_HOST: El host del servidor

Si estas usando el servidor con la configuración por defecto para desarrollo, puedes usar las siguientes variables.
```bash
VITE_SERVER_HOST="http://localhost:3010"
```

# Como ejecutar el proyecto
Para la correcta ejecución de la app es necesario tener ejecutandose previamente el servidor e indicar la dirección del mismo, para ello consulta la sección de variables de entorno

## Instalar dependencias de NPM
```bash
npm install
```

## Ejecutar la app
```bash
npm run dev
```
