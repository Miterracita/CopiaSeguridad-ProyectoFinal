import { useState } from 'react';

import Notification from '../../Notification/Notification.js';
import { AdminBoxButtons } from '../../AdminBoxButtons/AdminBoxButtons.js';
import FormRegister from '../../Forms/FormRegister/FormRegister.js';
import Modal from '../../Modal/Modal.js';

import './User.css'

import { deleteUser } from '../../../services/apiServicesUsers.js';

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
    refreshUsers: () => void; //funcion que se nos pasa desde userList
}

const User = ({
    _id,
    userName,
    email,
    rol,
    imagenPerfil,
    bonos = [],
    refreshUsers, 
 }: UserProps) => {
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false); // controla si el modal está visible

    const imagenXDefecto = "https://res.cloudinary.com/dq2daoeex/image/upload/c_thumb,w_200,g_face/v1723660717/Proyecto10/oy1tksyz1ycc1edxcfqb.jpg";

    const handleDeleteUser = async () => {
        try {
          const response = await deleteUser(_id);
          const message = response.message;
          setNotification(message || `Usuario eliminado correctamente`);
        //   refreshUsers((prevUsers: UserProps[]) => prevUsers.filter(user => user._id !== _id));
        
        setTimeout(() =>{
            setNotification(null);
            refreshUsers();  // Llama a refreshBonos después de eliminar
          }, 3000);
          
        } catch (error: any) {
          console.error('Error deleting user:', error);
          setError(error.message || 'Error deleting user');
        }
      };

    const handleUpdateUser= () => {
        setShowModal(true); //abrir el modal con el formulario de users
      }
      const handleCloseModal = () => {
        setShowModal(false); // cerrar el modal
        refreshUsers();
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
                        <img src={imagenPerfil || imagenXDefecto} alt="imagen perfil" />
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
            {showModal && (
                <Modal showModal={showModal} onCloseModal={handleCloseModal}>
                    <FormRegister
                        userId={_id}
                        onClose={handleCloseModal}// Prop para cerrar el formulario
                        initialData={{
                            userName: userName,
                            email: email,
                        }}
                    />
                </Modal>
            )}
        </div>
    );
};

export default User;