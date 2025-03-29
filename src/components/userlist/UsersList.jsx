// UsersList.jsx
import React from 'react';
import './style.css';

export const UsersList = ({ users = [], onEdit, onDelete }) => {
  return (
    <div className="container">
      <h2 className="title">Lista de usuarios</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th> {/* Columna para los botones */}
          </tr>
        </thead>
        <tbody>
          {users.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.name}</td>
              <td>{usuario.last_name}</td>
              <td>{usuario.email}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(usuario)}>
                  Editar
                </button>
                <button className="delete-btn" onClick={() => onDelete(usuario.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
