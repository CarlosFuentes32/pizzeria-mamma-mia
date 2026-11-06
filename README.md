# Pizzería Mamma Mía - Hito 1

Proyecto introductorio de React creado con Vite para el Hito 1 de Desafío Latam.

## Sitio publicado

https://carlosfuentes32.github.io/pizzeria-mamma-mia/

## Ejecutar el proyecto

```bash
npm install
npm run dev
```

El frontend usa `http://localhost:5000` como API por defecto. Para utilizar otro backend,
crea un archivo `.env.local` basado en `.env.example` y define `VITE_API_URL`.

Para GitHub Pages, configura una variable de repositorio llamada `VITE_API_URL` con la
dirección HTTPS del backend público antes de ejecutar el workflow de despliegue.

## Comprobaciones

```bash
npm run lint
npm run build
```
