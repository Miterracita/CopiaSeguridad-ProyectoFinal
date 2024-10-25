// Tengo una aplicación desarrollada con react, con un servidor express y bbdd mongoose.

// Uno de los componentes tiene que recibir los usuarios dados de alta desde el back 
// y pintarlos en forma de listado en el front

// En el font he creado el componete User y la página UserList.
// Entiendo que por un lado el componente User debería hacer la llamada al back y pintar un <User /> por cada usuario, según la información recibida dentro del UserList, es así?



// Componente UserList: 
// Este componente se encargará de hacer la llamada al backend para obtener la lista de usuarios
// y luego renderizar un componente User para cada usuario.
// Componente User: 
// Este componente recibirá las propiedades de cada usuario y se encargará de mostrar la información correspondiente.


Componente UserList
import React, { useEffect, useState } from 'react';
import User from './User';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Hacer la llamada al backend para obtener los usuarios
    fetch('/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      {users.map(user => (
        <User key={user.id} {...user} />
      ))}
    </div>
  );
};

export default UserList;

Componente User
import React from 'react';

const User = ({ id, name, email }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
};

