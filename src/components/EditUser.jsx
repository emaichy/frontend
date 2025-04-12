import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    id: "",
    name: "",
    email: "",
    last_name: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`https://3.17.81.51/users/usuario/${userId}`)
      .then((response) => {
        setUsuario({ ...response.data, password: "" }); // vaciamos contraseña para no mostrarla
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar usuario:", error);
        setIsLoading(false);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage("Actualizando usuario...");

    axios
      .put(`https://3.17.81.51/users/actualizarusuario/${userId}`, usuario)
      .then((response) => {
        console.log("Actualizado correctamente:", response.data);
        setMessage("Usuario actualizado. Redirigiendo...");
        setTimeout(() => navigate("/users"), 2000);
      })
      .catch((error) => {
        console.error("Error al actualizar:", error);
        setMessage("Error al actualizar usuario.");
        setIsUpdating(false);
      });
  };

  if (isLoading) {
    return <p>Cargando usuario...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Editar Usuario</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Nombre:
          <input
            type="text"
            name="name"
            value={usuario.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Apellido:
          <input
            type="text"
            name="last_name"
            value={usuario.last_name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Correo:
          <input
            type="email"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Contraseña:
          <input
            type="password"
            name="password"
            value={usuario.password}
            onChange={handleChange}
            required
            style={styles.input}
            pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$"
            title="Debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo."
          />
        </label>
        <button type="submit" style={styles.button} disabled={isUpdating}>
          {isUpdating ? "Actualizando..." : "Guardar cambios"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/users")}
          style={{ ...styles.button, backgroundColor: "#888", marginTop: 10 }}
        >
          Cancelar
        </button>
        <p>{message}</p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    margin: "50px auto",
  },
  header: {
    color: "#333",
    fontSize: "24px",
    marginBottom: "20px",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "10px",
    fontSize: "16px",
    color: "#555",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "15px",
    width: "100%",
    boxSizing: "border-box",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#D32F2F",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    width: "100%",
    boxSizing: "border-box",
  },
};

export default EditUser;

