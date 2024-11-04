import { useState } from 'react';

import Notification from '../../Notification/Notification.js';
import { AdminBoxButtons } from '../../AdminBoxButtons/AdminBoxButtons.js';

import './User.css'

import { deleteUser, updateUser } from '../../../services/apiServicesUsers.js';


// interface Booking {
//     _id: string;
//     fecha: Date;
//     bono: string; // ID del bono
//     // añadir más campos relevantes
// }

interface Bono {
    _id: string;
    name: string;
    type: string;
    active: boolean;
    code: string;
    totalUses: number,
    availableUses: number,
    expirationDate: Date,
    // reservas: Booking[];
}

export interface UserProps {
    _id: string;
    userName: string;
    email: string;
    rol: string;
    imagenPerfil?: string;
    bonos?: Bono[];
    setUsers: React.Dispatch<React.SetStateAction<UserProps[]>>; // funcion para actualizar la lista de usuarios cuando se elimina, actualiza, etc
  }

const User = ({
    _id,
    userName,
    email,
    rol,
    imagenPerfil,
    bonos = [],
    setUsers, 
 }: UserProps) => {
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<string | null>(null);

    const imagenXDefecto = "https://res.cloudinary.com/dq2daoeex/image/upload/c_thumb,w_200,g_face/v1723660717/Proyecto10/oy1tksyz1ycc1edxcfqb.jpg";

    const handleDeleteUser = async () => {
        try {
          const message = await deleteUser(_id);
          setNotification(message || `Usuario con id:${_id} eliminado correctamente`);
          setUsers((prevUsers: UserProps[]) => prevUsers.filter(user => user._id !== _id));
          
        } catch (error: any) {
          console.error('Error deleting user:', error);
          setError(error.message || 'Error deleting user');
        }
      };

    const handleUpdateUser = async () => {
        const userData = {
            userName: userName,
            email: email,
            bonos: bonos,
            imagenPerfil: imagenPerfil,
            rol: rol
        };
        
        try {
            const result = await updateUser(_id, userData); // Cambia _id si usas otro nombre para el ID
            console.log('Usuario actualizado:', result);
            // Actualiza el estado o realiza otras acciones necesarias
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    //cerrar la ventana de notificación
    const handleCloseNotification = () => { 
        setError(null);
        setNotification(null);
    };
    
    return (
        <div className='c-user' key={_id}>
            {error && <Notification message={error} type="error" onClose={handleCloseNotification}/>}
            {notification && <Notification message={notification} type="success" onClose={handleCloseNotification}/>}
            <div className="box-user" key={_id}>
                <div className='info-user'>
                    <div className='img-box'>
                        <img src={imagenPerfil || imagenXDefecto } alt="imagen perfil" />
                    </div>
                    <div className='txt'>
                        <h3>{userName}</h3>
                        <p>Email: <span>{email}</span></p>
                        <p>Rol: <span>{rol}</span></p>
                        <p className='id'>ID: <span>{_id}</span></p>
                    </div>
                </div>
                <div className="bonos-list">
                    <h3>Bonos:</h3>
                    {bonos && bonos.length === 0 ? (
                        <p>No hay bonos disponibles para este usuario.</p>
                    ) : (
                        bonos.map(bono => (
                            <div key={bono._id} className="bono-item">
                                <h4>{bono.name}</h4>
                                <p>Activo: {bono.active ? 'Sí' : 'No'}</p>
                                {/* <h5>Reservas Asociadas:</h5>
                                    {bono.reservas && bono.reservas.length > 0 ? (
                                        <ul>
                                            {bono.reservas.map(reserva => (
                                                <li key={reserva._id}>
                                                    <span>Fecha: {new Date(reserva.fecha).toLocaleDateString()}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No hay reservas asociadas a este bono.</p>
                                    )} */}
                            </div>
                        ))
                    )}
                </div>
                <AdminBoxButtons
                    handleUpdate={handleUpdateUser}
                    handleDelete={handleDeleteUser}
                />
            </div>
        </div>
    );
};

export default User;