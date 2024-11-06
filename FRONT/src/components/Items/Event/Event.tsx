import { useState } from 'react';

import Notification from '../../../components/Notification/Notification.js';
import { AdminBoxButtons } from '../../AdminBoxButtons/AdminBoxButtons.js';
import FormEvent from '../../Forms/FormEvent/FormEvent.js';
import Modal from '../../Modal/Modal.js';

import './Event.css';

import { deleteEvent } from '../../../services/apiServicesEvents';


interface EventProps {
    id: string;
    nombre: string;
    descripcion?: string;
    fecha: string;
    hora: number;
    capacidad?: number;
    refreshEvents:() => void;
}

export const Event = ({ 
    id,
    nombre,
    descripcion,
    fecha,
    hora,
    capacidad,
    refreshEvents,
 }: EventProps): JSX.Element => {
    const [error, setError] = useState<string | null>(null); // Estado para el mensaje de error
    const [notification, setNotification] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false); // controla si el modal está visible


    const handleDeleteEvent = async () => {
        try {
            const response = await deleteEvent(id);
            const message = response.message;
            setNotification(message || `Evento con id:${id} eliminado correctamente`);
            setError(null); // Limpiar errores anteriores
            
            setTimeout(() =>{
                setNotification(null);
                refreshEvents(); // tardará 3 segundos antes de refrescar el listado de eventos y eliminar el mensaje
            }, 3000);
            
        } catch (error: any) {
            console.error('Error eliminando evento:', error);
            setError(error.message ? error.message : JSON.stringify(error) || 'Error eliminando evento'); // Si `error.message` no es string, convertir
        }
    };

    //abrir el modal con el formulario de eventos
    const handleUpdateEvent = () => {
        setShowModal(true);
    }

    //cerrar el modal
    const handleCloseModal = () => {
        setShowModal(false); // cerrar el modal
        refreshEvents();
    };

    //cerrar la ventana de notificación
    const handleCloseNotification = () => { 
        setError(null);
        setNotification(null);
    };

    return (
        <>
            {error && <Notification message={error} type="error" onClose={handleCloseNotification}/>}
            {notification && <Notification message={notification} type="success" onClose={handleCloseNotification}/>}

            <div className="c-event">      
                <div className="box-event">
                    <div className='info-event' id={id}>
                        <h3><span>{nombre}</span></h3>
                        <p><span>{descripcion}</span></p>
                        <p>Fecha: <span>{fecha}</span></p>
                        <p>Hora: <span>{hora}</span></p>                      
                        <p>Plazas: <span>{capacidad}</span></p>
                    </div>
                    <AdminBoxButtons
                        handleUpdate={handleUpdateEvent}
                        handleDelete={handleDeleteEvent}
                    />
                </div>
            </div>
            {showModal && (
                <Modal showModal={showModal} onCloseModal={handleCloseModal}>
                    <FormEvent
                        eventId={id}
                        onClose={handleCloseModal}
                        initialData={{
                            name: nombre,
                            description: descripcion,
                            date: fecha,
                            hour: hora,
                            capacity: capacidad,
                        }}
                    />
                </Modal>
            )}
        </>
    );
};
