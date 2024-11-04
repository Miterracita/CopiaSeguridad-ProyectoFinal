// url producción
// const API_URL = "http://localhost:5000";

// url local
const LOCAL_URL = "http://localhost:3000";
const token = localStorage.getItem('token');

// LOGIN
export const login = async (userName:any, password:any) => {

  const objetoFinal = JSON.stringify({ userName, password });
  
  const opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: objetoFinal,
  };

  try {
    const respuestaFinal = await fetch(`${LOCAL_URL}/users/login`, opciones);

    if (respuestaFinal.token) {
      // guardamos el token una vez identificados, en el localStorage
      localStorage.setItem("token", respuestaFinal.token);
      //--> una vez identificados correctamente nos redirige a la página de eventos
      Home();

    } else {

      console.error('El token no está definido en la respuesta:', respuestaFinal);
      console.error("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
    }

    // if (!response.ok) {
    //   throw new Error("Error al hacer login");
    // }
    // const data = await response.json();
    // return data;
  } catch (error) {
    console.error("Error durante el login:", error);
    throw error;
  }
};

//REGISTRO
export const registerUser = async (data:any) => {
  const opciones = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(`${LOCAL_URL}/users/registro`, opciones);
    if (!response.ok) {
      throw new Error("Error en la solicitud de registro");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error durante el registro:", error);
    throw error;
  }
};
