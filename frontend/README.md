# Frontend - Prueba Técnica Full Stack

## Requerimientos
- Node.js y npm

## Ejecución
Iniciar la aplicación con:
npm start

La app se ejecuta en `http://localhost:3000`.

## Notas
- La aplicación consume la API en `http://localhost:4000`.
- Se utiliza axios y React Hooks para el manejo del estado.


## Flujo de Uso (Frontend)

1. Abre http://localhost:3000 en tu navegador.
2. Verás un formulario de login (usuario/contraseña).
3. Usa "admin" / "admin123" (por defecto).
4. Si el login es exitoso, la aplicación guardará el token JWT en localStorage y te mostrará el formulario CRUD de productos.
5. Podrás:
   - Crear producto (Agregar Producto).
   - Editar (con botón Editar) y Eliminar (con botón Eliminar).
   - Navegar con paginación (botones “Anterior” y “Siguiente”).


## Observaciones
- Si intentas llamar cualquier ruta de productos sin token, o con token inválido, el servidor responderá 401.
- El frontend utiliza axios y React Hooks (useState, useEffect) para manejar estados y peticiones.
- Apreta cerrar sesión para salir de la aplicación.