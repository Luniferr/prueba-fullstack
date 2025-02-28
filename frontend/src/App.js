import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const [editingProductId, setEditingProductId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [page, setPage] = useState(1);
  const limit = 5;

  // Cargar productos solo si tenemos un token
  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [page, token]);

  // ==========================
  // LOGIN
  // ==========================
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/auth/login", {
        username,
        password,
      });
      const receivedToken = res.data.token;
      setToken(receivedToken);
      localStorage.setItem("token", receivedToken);

      setError("");
      setSuccess("Login exitoso");
    } catch (err) {
      setError("Error de login (credenciales inválidas)");
      setSuccess("");
    }
  };

  // ==========================
  // LOGOUT
  // ==========================
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    setUsername("");
    setPassword("");
    setProducts([]); // opcional: limpiar lista de productos
    setEditingProductId(null);
    setError("");
    setSuccess("Sesión cerrada");
  };

  // ==========================
  // CRUD Productos
  // ==========================
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/products?page=${page}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(res.data.data);
      setError("");
    } catch (err) {
      setError("Error al obtener productos");
      setProducts([]);
      if (err.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProductId) {
        await axios.put(
          `http://localhost:4000/products/${editingProductId}`,
          { name, price, category, stock },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess("Producto actualizado correctamente");
      } else {
        await axios.post(
          "http://localhost:4000/products",
          { name, price, category, stock },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess("Producto agregado correctamente");
      }
      setName("");
      setPrice("");
      setCategory("");
      setStock("");
      setEditingProductId(null);
      setError("");

      fetchProducts();
    } catch (err) {
      setError(
        editingProductId
          ? "Error al actualizar producto"
          : "Error al agregar producto"
      );
      setSuccess("");
      if (err.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product._id);
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setStock(product.stock || 0);
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Producto eliminado correctamente");
      setError("");
      fetchProducts();
    } catch (err) {
      setError("Error al eliminar producto");
      setSuccess("");
      if (err.response?.status === 401) {
        handleLogout();
      }
    }
  };

  // ==========================
  // Paginación
  // ==========================
  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

  // ==========================
  // RENDER
  // ==========================
  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1>Gestión de Productos</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {/* Si no hay token, mostrar formulario de Login */}
      {!token && (
        <form onSubmit={handleLogin} style={{ marginBottom: "20px" }}>
          <h2>Iniciar Sesión</h2>
          <div>
            <label>Usuario: </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Contraseña: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}

      {/* Si hay token, mostrar botón "Cerrar Sesión" y formulario CRUD */}
      {token && (
        <>
          <button onClick={handleLogout} style={{ marginBottom: "20px" }}>
            Cerrar Sesión
          </button>

          <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <div>
              <label>Nombre: </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Precio: </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Categoría: </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Stock: </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <button type="submit">
              {editingProductId ? "Actualizar Producto" : "Agregar Producto"}
            </button>
          </form>

          <table
            border="1"
            cellPadding="5"
            style={{ width: "100%", textAlign: "left" }}
          >
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.length ? (
                products.map((p) => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>{p.price}</td>
                    <td>{p.category}</td>
                    <td>{p.stock}</td>
                    <td>
                      <button onClick={() => handleEdit(p)}>Editar</button>{" "}
                      <button onClick={() => handleDelete(p._id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No hay productos</td>
                </tr>
              )}
            </tbody>
          </table>

          <div style={{ marginTop: "10px" }}>
            <button onClick={prevPage} disabled={page <= 1}>
              Anterior
            </button>
            <span style={{ margin: "0 10px" }}>Página: {page}</span>
            <button onClick={nextPage}>Siguiente</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
