import { useState, useEffect } from "react";
import {
  createUser,
  getUserById,
  updateUser,
} from "../../api/userService";
import { useNavigate, useParams } from "react-router-dom";

function UserForm() {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) loadUser();
  }, [id]);

  const loadUser = async () => {
    const res = await getUserById(id);
    setUser(res.data);
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await updateUser(id, user);
    } else {
      await createUser(user);
    }

    navigate("/users");
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Editar Usuario" : "Crear Usuario"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="name"
          placeholder="Nombre"
          value={user.name}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />

        <button className="btn btn-success">Guardar</button>
      </form>
    </div>
  );
}

export default UserForm;