const Bono = require("../models/bono");

//Crear Bono
const newBono = async (req, res, next) => {
  try {

    const newBono = new Bono({
      name: req.body.name,
      type: req.body.type,
      active: req.body.active,
      code: req.body.code || undefined
    });

    const bonoSaved = await newBono.save();

    return res.status(200).json(bonoSaved);

  } catch (error) {
    return res.status(400).json({ message: "Error al crear el bono", error: error.message });
  }
}

//Borrar bono
const deleteBono = async (req, res, next) => {
  try {    
    const { id } = req.params;
    const bonoDeleted = await Bono.findByIdAndDelete(id);

    if (!bonoDeleted) {
      return res.status(404).json("Bono no encontrado");
    }

    return res.status(200).json(`El bono ${bonoDeleted.name} se ha eliminado correctamente`);

  } catch (error){
    return res.status(400).json({ message: "Error al eliminar el bono", error: error.message });
  }
}

//ver todos los bonos
const getBonos = async (req, res, next) => {

  try {
    const bonos = await Bono.find();
    return res.status(200).json(bonos);

  } catch (error){
    return res.status(400).json({ message: "Error al obtener los bonos", error: error.message });
  }
}

//actualizar un bono (por ID)
const updateBono = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bonoActualizado = await Bono.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!bonoActualizado) {
      return res.status(404).json("Bono no encontrado");
    }

    return res.status(200).json(bonoActualizado);
  } catch (error) {
    return res.status(400).json({ message: "Error al actualizar el bono", error: error.message });
  }
}

module.exports = { 
  newBono,
  deleteBono,
  getBonos,
  updateBono,
};