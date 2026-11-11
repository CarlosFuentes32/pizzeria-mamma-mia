# Pizzería Mamma Mía

Proyecto frontend desarrollado con React y Vite para los Hitos 1 al 7 del curso Full Stack JavaScript de Desafío Latam. La aplicación consume una API de pizzas, utiliza React Router, comparte el carrito mediante Context API y simula el estado de sesión del usuario.

## Sitio publicado

- GitHub Pages: <https://carlosfuentes32.github.io/pizzeria-mamma-mia/>
- API pública utilizada por el despliegue: <https://pizzeria-mamma-mia-api-6i2d.onrender.com>

GitHub Pages presenta siempre la última versión desplegada desde la rama `main`. Los enlaces de la tabla siguiente permiten revisar el código exacto con el que se cerró cada entrega anterior.

## Evolución del proyecto por hitos

El historial contiene un commit de cierre identificable para cada hito. Los Hitos 1 y 7 se asignan por sus cambios y su posición en el historial; aunque sus mensajes originales no incluyen el número, no hay commits intermedios ni evidencia de que agrupen otras entregas.

| Hito | Objetivo | Funcionalidades implementadas en la entrega | Archivos principales | Commit de cierre |
| --- | --- | --- | --- | --- |
| 1 | Construir la interfaz inicial de la pizzería. | Estructura React con Navbar, Header, Home, tres tarjetas de pizza, total estático y Footer; configuración inicial de Vite, ESLint y despliegue en Pages. | `src/App.jsx`, `src/components/Home.jsx`, `src/components/CardPizza.jsx`, `src/components/Navbar.jsx`, `src/components/Header.jsx`, `src/components/Footer.jsx`, `src/index.css`, `vite.config.js`, `.github/workflows/deploy-pages.yml` | [`d6a41b7`](https://github.com/CarlosFuentes32/pizzeria-mamma-mia/commit/d6a41b70c67ed496697e68e85665e409c0507ec7) |
| 2 | Incorporar formularios controlados de acceso y registro. | Login y Register con `useState`, `onChange`, validación en `onSubmit`, mensajes de error/éxito y navegación por estado entre vistas. | `src/components/Login.jsx`, `src/components/Register.jsx`, `src/App.jsx`, `src/components/Navbar.jsx` | [`d1467ca`](https://github.com/CarlosFuentes32/pizzeria-mamma-mia/commit/d1467ca43b8564324190010fed9e185855d1504c) |
| 3 | Renderizar los datos de pizzas y crear el carrito. | Catálogo generado desde `pizzas.js`, ingredientes dinámicos y carrito con aumento, disminución, eliminación al llegar a cero y cálculo del total. | `src/data/pizzas.js`, `src/components/Home.jsx`, `src/components/CardPizza.jsx`, `src/components/Cart.jsx` | [`9e68f28`](https://github.com/CarlosFuentes32/pizzeria-mamma-mia/commit/9e68f28b0ac6b66be03327d6f522b4fecfcbd828) |
| 4 | Consumir el backend de pizzas. | Home consulta `GET /api/pizzas`; Pizza consulta `GET /api/pizzas/p001`; URL configurable mediante `VITE_API_URL` y soporte para una API pública en Pages. | `src/components/Home.jsx`, `src/components/Pizza.jsx`, `src/config/api.js`, `.env.example`, `.github/workflows/deploy-pages.yml` | [`69fe35a`](https://github.com/CarlosFuentes32/pizzeria-mamma-mia/commit/69fe35a2c34dfe86596421139cda4d5a6be553ed) |
| 5 | Añadir navegación con React Router. | Rutas para Home, Register, Login, Cart, Pizza, Profile y 404; páginas trasladadas a `src/pages`; Navbar y Footer compartidos; fallback de Pages para rutas internas. | `src/main.jsx`, `src/App.jsx`, `src/pages/`, `src/components/Navbar.jsx`, `.github/workflows/deploy-pages.yml` | [`c81e813`](https://github.com/CarlosFuentes32/pizzeria-mamma-mia/commit/c81e8136e79a79130b06063dec343bb0e8e0e0b6) |
| 6 | Compartir globalmente el estado del carrito. | CartContext y CartProvider; botones Añadir desde Home; cantidades y total sincronizados entre Navbar y Cart; eliminación de productos al reducir su cantidad a cero. | `src/context/CartContext.js`, `src/context/CartProvider.jsx`, `src/components/CardPizza.jsx`, `src/components/Navbar.jsx`, `src/pages/Home.jsx`, `src/pages/Cart.jsx` | [`a6dccb6`](https://github.com/CarlosFuentes32/pizzeria-mamma-mia/commit/a6dccb64937c5dd7afd39c5642b84247c5c4a8a6) |
| 7 | Incorporar rutas dinámicas y un estado global de sesión. | Pizza obtiene el `id` con `useParams` y consulta `/api/pizzas/:id`; “Ver más” abre la pizza seleccionada; UserContext inicia con token simulado `true`; Navbar, rutas y botón Pagar reaccionan al estado de sesión. | `src/context/UserContext.js`, `src/context/UserProvider.jsx`, `src/pages/Pizza.jsx`, `src/pages/Profile.jsx`, `src/pages/Cart.jsx`, `src/components/CardPizza.jsx`, `src/components/Navbar.jsx`, `src/App.jsx` | [`3659780`](https://github.com/CarlosFuentes32/pizzeria-mamma-mia/commit/3659780d385314befb2bc7dc2ec5b6d62f30aa79) |

## Instalación y ejecución del frontend

Requisitos: Node.js 22 o una versión compatible con las dependencias actuales, y npm.

```bash
git clone https://github.com/CarlosFuentes32/pizzeria-mamma-mia.git
cd pizzeria-mamma-mia
npm install
npm run dev
```

Vite mostrará en la terminal la dirección local del frontend. Para comprobar la versión de producción:

```bash
npm run build
npm run preview
```

También está disponible la comprobación estática:

```bash
npm run lint
```

## Configuración de la API

El frontend lee `VITE_API_URL` en `src/config/api.js`. Si la variable no existe, utiliza `http://localhost:5000`.

Para seleccionar otro backend durante el desarrollo, crea `.env.local` en la raíz del frontend a partir de `.env.example`:

```env
VITE_API_URL=http://localhost:5000
```

Reinicia `npm run dev` después de cambiar variables de entorno. No agregues `.env.local` al repositorio.

El workflow de GitHub Pages obtiene la misma variable desde **Settings → Secrets and variables → Actions → Variables**, con el nombre `VITE_API_URL`. En este repositorio está configurada con la API pública indicada al inicio.

### Backend oficial para desarrollo local

Desde la carpeta del backend oficial:

```bash
npm install
npm run dev
```

El backend debe quedar disponible en `http://localhost:5000`. Los endpoints utilizados por esta versión son:

```text
GET /api/pizzas
GET /api/pizzas/:id
```

También puede iniciarse sin recarga automática mediante `npm start`.

## Guía de revisión

1. Abre el [sitio publicado](https://carlosfuentes32.github.io/pizzeria-mamma-mia/). Home debe cargar seis pizzas desde la API pública.
2. Pulsa **Ver más** en dos tarjetas diferentes. La URL y el detalle deben corresponder al identificador seleccionado.
3. Regresa a Home, añade dos pizzas distintas y repite una de ellas. El total del Navbar debe actualizarse.
4. Abre **Cart**, usa `+` y `−` y comprueba que las cantidades y el total coincidan con el Navbar. Al reducir una cantidad a cero, la fila desaparece.
5. El Hito 7 inicia deliberadamente con `token = true`. Por eso al cargar la aplicación aparecen **Profile** y **Logout**, mientras `/login` y `/register` redirigen a Home.
6. Añade al menos una pizza al carrito y verifica que **Pagar** esté habilitado. Luego pulsa **Logout** o **Cerrar sesión** desde Profile: el token simulado pasa a `false`, aparecen **Login** y **Register**, `/profile` redirige a `/login` y **Pagar** queda deshabilitado.
7. El Login y el Register de esta etapa siguen siendo formularios simulados: validan los datos, pero no vuelven a cambiar el token a `true`. Para restablecer el estado inicial simulado, recarga la aplicación.
8. Abre una ruta inexistente para comprobar la página NotFound y usa **Volver al inicio**.

## Publicación

Cada push a `main` ejecuta `.github/workflows/deploy-pages.yml`: instala dependencias con `npm ci`, ejecuta lint y build, crea el fallback `404.html` para React Router y publica `dist` mediante GitHub Pages.

La URL pública corresponde a la versión más reciente. Para estudiar una entrega anterior sin confundirla con el estado actual, utiliza el enlace de su commit en la tabla o la etiqueta anotada `hito-1` a `hito-7` correspondiente.
