import { useState, useEffect } from "react";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "../../api/productService";
import { useNavigate, useParams } from "react-router-dom";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) loadProduct();
  }, [id]);

  const loadProduct = async () => {
    const res = await getProductById(id);
    setProduct(res.data);
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await updateProduct(id, product);
    } else {
      await createProduct(product);
    }

    navigate("/products");
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Editar Producto" : "Crear Producto"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="name"
          placeholder="Nombre"
          value={product.name}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="price"
          placeholder="Precio"
          value={product.price}
          onChange={handleChange}
        />

        <button className="btn btn-success">Guardar</button>
      </form>
    </div>
  );
}

export default ProductForm;