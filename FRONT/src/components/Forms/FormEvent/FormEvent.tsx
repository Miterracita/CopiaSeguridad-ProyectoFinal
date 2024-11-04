
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'; // Para hacer una redirección
import { newEvent } from '../../../services/apiServicesEvents';
import Button from '../../Button/Button';
import './FormEvent.css';

const FormEvent = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            description: '',
            date: '',
            hour: '',
            capacity: ''
        }
    });

    const navigate = useNavigate(); // Hook para redirigir

    const onSubmit = async (formData:any) => {
        try {
          // Llamada al servicio de eventos
          const result = await newEvent(formData);
          console.log("Evento creado correctamente:", result);
    

        //redirigimos
        navigate('/gestion-eventos'); 
        // Puedes manejar la respuesta aquí, como mostrar un mensaje de éxito
        alert('Evento creado correctamente');
    
        } catch (error) {
          console.error('Error durante la creación del evento:', error);
          // Manejar el error mostrando un mensaje de error en la interfaz
          alert('Hubo un error al guardar el evento');
        }
      };

  return (
    <div className="box-event-form">
        <form className="box-form-event" id="eventForm" onSubmit={handleSubmit(onSubmit)}>
            <div className='box-title'>
                <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="25" height="25">
                    <path d="M0,19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V10H0Zm17-4.5A1.5,1.5,0,1,1,15.5,16,1.5,1.5,0,0,1,17,14.5Zm-5,0A1.5,1.5,0,1,1,10.5,16,1.5,1.5,0,0,1,12,14.5Zm-5,0A1.5,1.5,0,1,1,5.5,16,1.5,1.5,0,0,1,7,14.5Z"></path>
                    <path d="M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V8H24V7A5.006,5.006,0,0,0,19,2Z"></path>
                </svg>
                <h2><span>New</span> Event</h2>
            </div>
            <div>                
                <div className='box-item-event'>
                    <label>Nombre: </label>
                    <input type="text" id="name" {...register("name", {
                        required: {
                            value: true,
                            message: "Necesitas introducir un nombre para poder continuar"
                        },
                    })}
                    style={{ borderColor: errors.name ? "red" : "" }}/>
                    <p style={{color: 'red', visibility: errors.name ? 'visible' : 'hidden'}}>
                        {errors.name ? errors.name.message : ''}
                    </p>
                </div>
            </div>
            <div>                
                <div className='box-item-event'>
                    <label>Descripción: </label>
                    <input type="textarea" id="description" {...register("description", {
                        required: {
                            value: true,
                            message: "Necesitas introducir una descripción para poder continuar"
                        },
                    })}
                    style={{ borderColor: errors.description ? "red" : "" }}/>
                    <p style={{color: 'red', visibility: errors.description ? 'visible' : 'hidden'}}>
                        {errors.description ? errors.description.message : ''}
                    </p>
                </div>
            </div>
            <div className='flex-event'>                
                <div className='box-item-event'>
                    <label>Fecha: </label>
                    <input type="date" id="date" {...register("date", {
                        required: {
                            value: true,
                            message: "Necesitas introducir una fecha para poder continuar"
                        },
                    })}
                    style={{ borderColor: errors.date ? "red" : "" }}/>
                    <p style={{color: 'red', visibility: errors.date ? 'visible' : 'hidden'}}>
                        {errors.date ? errors.date.message : ''}
                    </p>
                </div>
                <div className='box-item-event'>
                    <label>Hora: </label>
                    <input type="time" id="hour" {...register("hour", {
                        required: {
                            value: true,
                            message: "Necesitas introducir una hora para poder continuar"
                        },
                    })}
                    style={{ borderColor: errors.hour ? "red" : "" }}/>
                    <p style={{color: 'red', visibility: errors.hour ? 'visible' : 'hidden'}}>
                        {errors.hour ? errors.hour.message : ''}
                    </p>
                </div>
                <div className='box-item-event'>
                    <label>Capacidad total del evento: </label>
                    <input type="number" id="capacity" {...register("capacity")} />
                </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                <Button text="Guardar" color="dark" />
            </div>
        </form>
    </div>
  )
};

export default FormEvent;