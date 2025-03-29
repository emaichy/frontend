import './App.css';
import UsersList from './components/userlist/UsersList';
import useUsers from './hooks/useUsers';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditUser from './components/EditUser';  // Componente para editar usuarios
import AddUser from './components/AddUser';   // Importa el componente para agregar usuarios
import Login from './components/Login'; // Importa el componente de login
import Register from './components/Registrer'; // Importa el componente de registro

function App() {
  const { users, deleteUser, fetchUsers } = useUsers(); // Obtén los usuarios y la función para eliminarlos

  // Función para manejar la edición (navegar a una página de edición)
  const handleEdit = (usuario) => {
    console.log('Editar usuario:', usuario);
    window.location.href = `/edit/${usuario.id}`; // Asegúrate de usar `.id` en lugar de `_id`
  };

  const handleDelete = async (userId) => {
    console.log('Eliminar usuario con ID:', userId);
    try {
      const response = await fetch(`http://127.0.0.1:5000/users/${userId}`, { method: 'DELETE' });
  
      if (!response.ok) {
        throw new Error("Error al eliminar el usuario en la base de datos");
      }
  
      deleteUser(userId);  // Elimina el usuario localmente después de eliminarlo en el servidor
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Ruta para iniciar sesión (página principal) */}
          <Route path="/" element={<Login />} />

          {/* Ruta para la lista de usuarios */}
          <Route
            path="/users"
            element={
              <div style={{ marginTop: "70px", width: "100%", textAlign: 'center' }}>
                <UsersList users={users} onEdit={handleEdit} onDelete={handleDelete} />
                <a
                  href="/add-user"
                  style={{
                    marginTop: '20px',
                    display: 'block',
                    padding: '10px 20px',
                    backgroundColor: '#D32F2F', // Color rojo oscuro
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '5px',
                    fontSize: '16px',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = '#FF5F5F')} // Sombra más clara al pasar el mouse
                  onMouseOut={(e) => (e.target.style.backgroundColor = '#D32F2F')} // Restaura color original
                >
                  Agregar nuevo usuario
                </a>
              </div>
            }
          />

          {/* Ruta para editar el usuario */}
          <Route path="/edit/:userId" element={<EditUser />} />

          {/* Ruta para agregar un nuevo usuario */}
          <Route path="/add-user" element={<AddUser />} />

          {/* Ruta para crear un nuevo usuario (registro) */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
