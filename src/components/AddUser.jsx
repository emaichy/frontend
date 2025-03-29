import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [user, setUser] = useState({
    name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const navigate = useNavigate();

  // Maneja el cambio de datos en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que la contraseña tenga al menos 6 caracteres
    if (user.password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user), // Enviar los datos del nuevo usuario, incluyendo la contraseña
      });

      if (!response.ok) {
        throw new Error('Error al agregar el usuario');
      }

      alert('Usuario agregado');
      navigate('/users');
    } catch (error) {
      console.error('Error al agregar el usuario:', error);
      setError('Error al agregar el usuario');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Agregar Usuario</h2>
      {error && <p style={styles.errorMessage}>{error}</p>}
      {passwordError && <p style={styles.errorMessage}>{passwordError}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Nombre:
          <input
            type="text"
            name="name"
            value={user.name}
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
            value={user.last_name}
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
            value={user.email}
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
            value={user.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <button type="submit" style={styles.button}>Agregar usuario</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '50px auto',
  },
  header: {
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '10px',
    fontSize: '16px',
    color: '#555',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '15px',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    width: '100%',
    boxSizing: 'border-box',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  errorMessage: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
};

export default AddUser;
