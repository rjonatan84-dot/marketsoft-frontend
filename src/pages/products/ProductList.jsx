import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../api/productService";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const loadProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Productos</h2>

      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/products/create")}
      >
        Crear Producto
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => navigate(`/products/edit/${p.id}`)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(p.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;