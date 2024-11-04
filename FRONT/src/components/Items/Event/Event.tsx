import { useState } from 'react';

import Notification from '../../../components/Notification/Notification.js';
import { AdminBoxButtons } from '../../AdminBoxButtons/AdminBoxButtons.js';

import './Event.css';

import { deleteEvent, updateEvent } from '../../../services/apiServicesEvents';


interface EventProps {
    id: string;
    nombre: string;
    descripcion: string;
    fecha: string;
    hora: number;
    capacidad: number;
    refreshEvents:() => void; 
    // bookings: [];
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
    const [success, setSuccess] = useState<string | null>(null); // Estado para el mensaje de éxito
    const [notification, setNotification] = useState<string | null>(null);

    const handleDeleteEvent = async () => {
        try {
            const response = await deleteEvent(id);
            const message = response.message;
            setNotification(message || `Evento con id:${id} eliminado correctamente`);

            setSuccess(typeof message === 'string' ? message : JSON.stringify(message)); // Asegura que `message` sea string y no de error
            setError(null); // Limpiar errores anteriores
            
            setTimeout(() =>{
                refreshEvents(); // tardará 3 segundos antes de refrescar el listado de eventos y eliminar el mensaje
            }, 3000);
            
        } catch (error: any) {
            console.error('Error eliminando evento:', error);
            setError(error.message ? error.message : JSON.stringify(error) || 'Error eliminando evento'); // Si `error.message` no es string, convertir
        }
    };

    const handleUpdateEvent = async () => {
        const eventData = {
            name: 'nuevo nombre',
            description: 'nueva descripción',
            date: new Date(), // Reemplaza con la fecha actual
            hour: 10, // Reemplaza con la hora actual
            capacity: 10,
        };
        
        try {
            const updatedEvent = await updateEvent(id, eventData);
            setSuccess(typeof updatedEvent === 'string' ? updatedEvent : JSON.stringify(updatedEvent)); // Asegura que `message` sea string
            // Opcionalmente, actualiza el estado o vuelve a obtener los eventos aquí
        } catch (error: any) {
            console.error('Error actualizando evento:', error);
            setError(error.message ? error.message : JSON.stringify(error) || 'Error actualizando evento');
        }
    };

    //cerrar la ventana de notificación
    const handleCloseNotification = () => { 
        setError(null);
        setNotification(null);
    };

    return (
        <>
            {success && <Notification message={success} type="success" onClose={handleCloseNotification}/>}
            <div className="c-event">
                {error && <Notification message={error} type="error" onClose={handleCloseNotification}/>}          
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
        </>
    );
};
