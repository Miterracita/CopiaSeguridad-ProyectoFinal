const Evento = require("../models/evento");

// Crear un nuevo evento
const crearEvento = async (req, res, next) => {
  try {
    const nuevoEvento = new Evento(req.body);
    const eventoGuardado = await nuevoEvento.save();
    return res.status(201).json(eventoGuardado);
  } catch (error) {
    return res.status(400).json({ message: "Error al crear el evento", error: error.message });
  }
};

// Obtener todos los eventos
const obtenerEventos = async (req, res, next) => {
  try {
    const eventos = await Evento.find();
    return res.status(200).json(eventos);
  } catch (error) {
    return res.status(400).json({ message: "Error al obtener los eventos", error: error.message });
  }
};


// Actualizar un evento (por ID)
const actualizarEvento = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const eventoActualizado = await Evento.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

    if (!eventoActualizado) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    return res.status(200).json(eventoActualizado);
  } catch (error) {
    return res.status(400).json({ message: "Error al actualizar el evento", error: error.message });
  }
};

// Eliminar un evento (por ID)
const eliminarEvento = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventoEliminado = await Evento.findByIdAndDelete(id);

    if (!eventoEliminado) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    return res.status(200).json({ message: `El evento "${eventoEliminado.nombre}" se ha eliminado correctamente` });
  } catch (error) {
    return res.status(400).json({ message: "Error al eliminar el evento", error: error.message });
  }
};

module.exports = {
  crearEvento,
  obtenerEventos,
  actualizarEvento,
  eliminarEvento,
};
