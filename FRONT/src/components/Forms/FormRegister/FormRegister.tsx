
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'; // Para hacer una redirección
import { registerUser } from '../../../services/apiServices';
import Button from '../../Button/Button';
import './FormRegister.css';

const FormRegister = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            userName: '',
            password: '',
            email: '',
            img: ''
        }
    });

    const navigate = useNavigate(); // Hook para redirigir

    const onSubmit = async (formData:any) => {
        try {
          // Llamada al servicio de registro
          const result = await registerUser(formData);
          console.log("Registro exitoso:", result);
    
        //guardamos el token
        localStorage.setItem('token', result.token);
        //redirigimos, en este caso la ruta es de la home
        navigate('/listado-reservas'); 
        // Puedes manejar la respuesta aquí, como mostrar un mensaje de éxito
        alert('Usuario registrado correctamente');
    
        } catch (error) {
          console.error('Error durante el registro:', error);
          // Manejar el error mostrando un mensaje de error en la interfaz
          alert('Hubo un error al registrar el usuario');
        }
      };

  return (
    <div className="box-register-form">
        <form className="box-form-register" id="registerForm" onSubmit={handleSubmit(onSubmit)}>
            <div className='box-title'>
                <div className='icon'>
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="20" height="20">
                    <path d="M23,11H21V9a1,1,0,0,0-2,0v2H17a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V13h2a1,1,0,0,0,0-2Z"></path>
                    <path d="M9,12A6,6,0,1,0,3,6,6.006,6.006,0,0,0,9,12ZM9,2A4,4,0,1,1,5,6,4,4,0,0,1,9,2Z"></path>
                    <path d="M9,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,9,14Z"></path>
                </svg>
                </div>
                <h2><span>New user</span> register</h2>
            </div>

            <div className='flex'>                
                <div className='box-item'>
                    <label>UserName: </label>
                    <input type="text" id="username" {...register("userName", {
                        required: {
                            value: true,
                            message: "Necesitas introducir un username para poder continuar"
                        },
                    })}
                    style={{ borderColor: errors.userName ? "red" : "" }}/>
                    <p style={{color: 'red', visibility: errors.userName ? 'visible' : 'hidden'}}>
                        {errors.userName ? errors.userName.message : ''}
                    </p>
                </div>
                <div className='box-item'>
                    <label>Password: </label>
                    <input type="password" id="password" {...register("password", {
                        required: {
                            value: true,
                            message: "La contraseña es obligatoria"
                        },
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/,
                            message:
                            "La contraseña debe incluir números, letras Mayúsculas y minúsculas y como máximos 8 caracteres",
                        },
                    })}
                    style={{ borderColor: errors.password ? "red" : "" }}/>
                    <p style={{color: 'red', visibility: errors.password ? 'visible' : 'hidden'}}>
                        {errors.password ? errors.password.message : ''}
                    </p>
                </div>
            </div>
            <div className='box-item'>
                <label>Email: </label>
                <input type="email" id="email" {...register("email", {
                    required: {
                        value: true,
                        message: "Necesitas introducir un email para poder continuar"
                    },
                })}
                style={{ borderColor: errors.email ? "red" : "" }}/>
                <p style={{color: 'red', visibility: errors.email ? 'visible' : 'hidden'}}>
                    {errors.email ? errors.email.message : ''}
                </p>
            </div>      
            <div className='box-item'>
                <label>Avatar: </label>
                <input type="file" id="img" {...register("img")} />
            </div> 
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
                <Button text="Guardar" color="dark" type="submit"/>
            </div>
        </form>
    </div>
  )
};

export default FormRegister;