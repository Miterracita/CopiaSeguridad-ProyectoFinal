import { useState } from 'react';

import Notification from '../../../components/Notification/Notification.js';
import { AdminBoxButtons } from '../../AdminBoxButtons/AdminBoxButtons';
import FormBono from '../../Forms/FormBono/FormBono.js';
import Modal from '../../Modal/Modal.js';

import './Bono.css';

import { deleteBono } from '../../../services/apiServicesBonos.js';

interface UserData {
  _id: string;
  userName: string;
  email: string;
  rol: string;
  imagenPerfil?: string;
}

export interface BonoTypes {
  id: string;
  name: string;
  type: string,
  active: boolean,
  code: string,
  user?: UserData;
  totalUses: number,
  availableUses: number,
  expirationDate?: string,
  // reservations?: Array,
  refreshBonos:() => void; //funcion que se nos pasa desde bonolist
}


const Bono = ({
  id,
  name,
  type,
  active,
  user,
  totalUses,
  availableUses,
  expirationDate,
  refreshBonos,
  // reservations,
}: BonoTypes): JSX.Element => {
  
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); // controla si el modal está visible



  const handleDeleteBono = async () => {
    try {
      const response = await deleteBono(id);
      const message = response.message;
      setNotification(message || `Bono eliminado correctamente`);
      
      setTimeout(() =>{
        setNotification(null); //cierra la notificacion
        refreshBonos();  // Llama a refreshBonos después de eliminar
      }, 3000);
      
    } catch (error:any) {
      console.error('Error eliminando bono:', error);
      setError(error.message || 'Error eliminando el bono');
    }
  };

  const handleUpdateBono = () => {
    setShowModal(true); //abrir el modal con el formulario de bonos
  }
  const handleCloseModal = () => {
    setShowModal(false); // cerrar el modal
    refreshBonos();
  };

  
  //cerrar la ventana de notificación
  const handleCloseNotification = () => { 
    setError(null);
    setNotification(null);
  };

  return (
    <div className="c-bono">
        {error && <Notification message={error} type="error" onClose={handleCloseNotification}/>}
        {notification && <Notification message={notification} type="success" onClose={handleCloseNotification}/>}

        <div className='box-bono'>

            <div className='top-flex'>
              <div className='ico-state'>
                {active ? (
                  <div className='ico-activo'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#06D001">
                      <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z"/>
                    </svg>
                  </div>
                ) : (
                  <div className='ico-inactivo'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#A02334">
                      <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>
            
            <div className='bono-info'>
              <h3>{name}</h3>
              <div>
                <p>Usos del bono: <span>{totalUses}</span></p>
                <p className={active ? 'green' : 'red'}><span>Disponibles: {availableUses}</span></p>
              </div>
            </div>

            <div className='bono-info'>              
              {user && (
                <p>Asignado al usuario: <span>{user.userName}</span></p>
              )}

              {expirationDate && (<p>Fecha caducidad: <span>{expirationDate}</span></p>)}
              {/* {reservations && (<p>Reservas: <span>{reservations}</span></p>)} */}
            </div>

            <AdminBoxButtons
              handleUpdate={handleUpdateBono}
              handleDelete={handleDeleteBono}
            />
        </div>

        {/* Mostrar FormBono solo si `showModal` es true */}
        {showModal && (
          <Modal showModal={showModal} onCloseModal={handleCloseModal}>
            <FormBono
              bonoId={id}
              onClose={handleCloseModal}// Prop para cerrar el formulario
              initialData={{
                user,
                expirationDate,
                type,
              }}
            />
          </Modal>
        )}
    </div>
  )
};

export default Bono;