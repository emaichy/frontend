import React from 'react';
import Userlist from './Userlist'; // Importa la tabla de usuarios

const Home = () => {
  return (
    <div>
      <h1>Bienvenido al Home</h1>
      <Userlist /> {/* Aquí agregas tu tabla de usuarios */}
    </div>
  );
};

export default Home;
