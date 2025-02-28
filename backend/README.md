# Backend - Prueba Técnica Full Stack

## Requerimientos
- Node.js y npm
- MongoDB (local o Atlas)

## Instalación
1. Clonar el repositorio.
2. Navegar a la carpeta `backend` y ejecutar:
npm install
3. Crear un archivo .env en la raíz del proyecto (en la carpeta backend) con el siguiente contenido:
MONGODB_URI="mongodb+srv://prueba_tecnica:prueba_tecnica123@cluster81269.k8wqi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster81269"

Si lo deseas usar MongoDB local, pon:
MONGODB_URI="mongodb://127.0.0.1:27017/prueba_tecnica_fullstack"


## Ejecución

1. Arranca MongoDB
2. Iniciar el servidor con:
npm start

El servidor se ejecuta en `http://localhost:4000`.


## Endpoints Principales

1. Login (JWT)
POST /auth/login
Body: { "username": "admin", "password": "admin123" }
Respuesta: { "token": "<jwt>" }

2. Productos (todas protegidas con JWT):
GET /products:
Lista productos con paginación (?page=1&limit=10).
Requiere header: Authorization: Bearer <token>
POST /products:
Crea un producto.
Body JSON con { "name", "price", "category", "stock" }.
PUT /products/:id:
Actualiza un producto existente.
DELETE /products/:id:
Elimina un producto por su ID.

## Usuario y Contraseña de Prueba
En src/routes/authRoutes.js verás un MOCK_USER con un hash bcrypt.
Por defecto, el usuario es:
username: "admin",
password: "admin123"
Este hash se generó usando bcrypt, así que "admin123" funcionará.

## Observaciones
El middleware authMiddleware.js protege las rutas de /products: si no incluyes un token válido en el header Authorization, obtendrás 401 Unauthorized.



