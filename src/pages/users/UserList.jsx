import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../api/userService";
import { useNavigate } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Usuarios</h2>

      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/users/create")}
      >
        Crear Usuario
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(users) &&
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => navigate(`/users/edit/${u.id}`)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(u.id)}
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

export default UserList;