// useUsers.js
import { useEffect, useState } from "react";
import { getAllUsers } from "../services/UserService";

export default function useUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      console.log("DATA", data);  // Verificar que data contiene los usuarios correctamente
      setUsers(data);
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  // Llamada a fetchUsers al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para eliminar un usuario
  const deleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
  };

  return { users, deleteUser };
}
