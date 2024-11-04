import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { newBono, getBono } from '../../../services/apiServicesBonos';
import { getUsers } from '../../../services/apiServicesUsers';
import { useEffect, useState } from 'react';
import Button from '../../Button/Button';
import './FormBono.css';

const FormBono = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            type: '',
            user: '',
            expirationDate: '',
        }
    });

    const navigate = useNavigate(); // Hook para redirigir

    const [users, setUsers] = useState([]);
    const [bonoTypes, setBonoTypes] = useState([]);

    useEffect(() => {
        // Fetch users from the API
        const fetchAllUsers = async () => {
            try {
                const usersData = await getUsers();
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        // Fetch bono types from the API
        const fetchBonoTypes = async () => {
            try {
                const bonosData = await getBono();
                const types = [...new Set(bonosData.map((bono:any) => bono.type))];
                setBonoTypes(types);
            } catch (error) {
                console.error('Error fetching bono types:', error);
            }
        };

        fetchAllUsers();
        fetchBonoTypes();
    }, []);

    const onSubmit = async (formData:any) => {
        
        formData.user = formData.user || null; 

        try {
            // Llamada al servicio de creación de bono
            const result = await newBono(formData);
            
            // Redirigir a la lista de bonos
            navigate('/gestion-bonos'); 
            
            // Mostrar un mensaje de éxito aquí debería usar el componente notification <<<<<<< --------------------
            alert('Bono creado correctamente');
            console.log(result)
        } catch (error) {
            console.error('Error durante la creación del bono:', error);
            // aquí debería usar el componente notification <<<<<<< --------------------
            alert('Hubo un error al crear el bono');
        }
    };

    return (
        <div className="box-bono-form">
            <form className="box-form-bono" id="bonoForm" onSubmit={handleSubmit(onSubmit)}>

                <div className='box-title'>
                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="25" height="25">
                        <path d="M7,0H4A4,4,0,0,0,0,4V7a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V4A4,4,0,0,0,7,0ZM9,7A2,2,0,0,1,7,9H4A2,2,0,0,1,2,7V4A2,2,0,0,1,4,2H7A2,2,0,0,1,9,4Z"></path>
                        <path d="M20,0H17a4,4,0,0,0-4,4V7a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V4A4,4,0,0,0,20,0Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V4a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z"></path>
                        <path d="M7,13H4a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4H7a4,4,0,0,0,4-4V17A4,4,0,0,0,7,13Zm2,7a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2H7a2,2,0,0,1,2,2Z"></path>
                        <path d="M20,13H17a4,4,0,0,0-4,4v3a4,4,0,0,0,4,4h3a4,4,0,0,0,4-4V17A4,4,0,0,0,20,13Zm2,7a2,2,0,0,1-2,2H17a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2h3a2,2,0,0,1,2,2Z"></path>
                    </svg>
                    <h2><span>New</span> Bono</h2>
                </div>

                <div className='box-item-bono'>
                    <label>Selecciona el tipo de bono que quieres dar de alta.</label>
                    <p>El tipo de bono corresponde al número de usos disponibles: </p>

                    <select id="type" {...register("type", {
                        required: {
                            value: true,
                            message: "Necesitas seleccionar un tipo de bono"
                        },
                    })}
                    style={{ borderColor: errors.type ? "red" : "" }}>
                        <option value="">Tipos de bonos disponibles.</option>
                        {bonoTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <p style={{color: 'red', visibility: errors.type ? 'visible' : 'hidden'}}>
                        {errors.type ? errors.type.message : ''}
                    </p>
                </div>
                <div className='box-item-bono'>
                    <label>¿Quieres asignar el bono a un usuario?: </label>
                    <select id="user" {...register("user")}>
                        <option value="">Usuarios disponibles (opcional)</option>
                        {users.map(user => (
                            <option key={user._id} value={user._id}>{user.userName}</option>
                        ))}
                    </select>
                </div>
                <div className='box-item-bono'>
                    <label>Puedes asignar una fecha de expiración: </label>
                    <input type="date" id="expirationDate" {...register("expirationDate")} />
                </div>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                    <Button text="Guardar" color="dark" type="submit"/>
                </div>
            </form>
        </div>
    );
};

export default FormBono;
