const { deleteFile } = require("../../utils/deleteFiles");
const { generateSing } = require("../../utils/jwt");
const User = require("../models/User");
const Bono = require("../models/bono");
const bcrypt = require("bcrypt");

//postUser - create
const registro = async (req, res, next) => {
  try {

    const newUser = new User({
      email: req.body.email,
      userName: req.body.userName,
      password: req.body.password,
      rol: req.body.rol,
      imagenPerfil: req.body.imagenPerfil
    });

    if (req.file) {
      newUser.imagenPerfil = req.file.path
    }

    //comprobamos si un nombre de usuario ya existe
    const userDuplicated = await User.findOne ({
      userName: req.body.userName
    });

    //si un usuario ya existe nos salta un mensaje de aviso y no crea el nuevo usuario
    if (userDuplicated) {
      return res.status(400).json("Ese nombre de usuario ya existe");
    }
    
    const userSaved = await newUser.save();

    return res.status(200).json(userSaved);

  } catch (error) {
    return res.status(400).json(error);
  }
}

// LOGIN
const login = async (req, res, next) => {

  try {
    
    const user = await User.findOne({ userName: req.body.userName });
    
    if (!user){
      return res.status(400).json("Este nombre de usuario no existe");   
    }    
    //comparamos el password introducido con el usuario, en el caso de que el usuario exista
    if(bcrypt.compareSync(req.body.password, user.password)){
      
      //lo que pasa cuando te logueas con jsonwebtoken
      const token = generateSing(user._id);
      return res.status(200).json(`Te has logueado como usuario ${user.userName} rol: ${user.rol} y token: ${token}`);
    
    } else {       
      return res.status(400).json("La contraseña es incorrecta");
    }

  } catch (error) {
    return res.status(400).json(error);
  }
}

// borrar user
const deleteUser = async (req, res, next) => {
  try {    
    const { id } = req.params;
    const userDeleted = await User.findByIdAndDelete(id);
    
    if (!userDeleted) {
      return res.status(404).json("Usuario no encontrado");
    }

    //eliminar imagen
    deleteFile(userDeleted.imagenPerfil);

    // Eliminar o actualizar bonos asociados
    await Bono.updateMany({ user: id }, { $unset: { user: "" } });

    return res.status(200).json(`El usuario ${userDeleted.userName} se ha eliminado correctamente`);

  } catch (error){
    return res.status(400).json("error al eliminar el usuario");
  }
}

//ver todos los usuarios
const getUsers = async (req, res, next) => {

  try {
    // const users = await User.find().populate('bonos');
    const users = await User.find();
    return res.status(200).json(users);

  } catch (error){
    console.error('Error fetching users:', error.message, error.stack);
    return res.status(400).json({ message: "Error al obtener los usuarios", error: error.message });
  }
}

//actualizar un usuario (por ID)
const updateUser = async (req, res, next) => {
  try {
      const { id } = req.params;
      const updatedData = req.body;
      // const newUsuario = new User(req.body);
      // newUsuario._id = id;

      //actualizar nueva imagen y eliminar vieja
      if(req.file){ 
        updatedData.imagenPerfil = req.file.path;            
        const oldUsuario = await User.findById(id);
        deleteFile(oldUsuario.imagenPerfil); 
      }

      const userActualizado = await User.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
      
      if (!userActualizado) {
        return res.status(404).json("Usuario no encontrado");
      }

      return res.status(201).json(userActualizado);

  } catch (error){
      return res.status(400).json("error al actualizar el usuario");
  }
}
module.exports = { 
  registro,
  login,
  deleteUser,
  getUsers,
  updateUser,
};