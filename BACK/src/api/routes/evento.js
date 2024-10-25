const express = require('express');
const eventoRoutes = express.Router();
const {
  crearEvento,
  obtenerEventos,
  actualizarEvento,
  eliminarEvento
} = require('../controllers/evento');

// Rutas para eventos
eventoRoutes.post('/new-evento', crearEvento);
eventoRoutes.get('/eventos-list', obtenerEventos);
eventoRoutes.put('/:id', actualizarEvento);
eventoRoutes.delete('/:id', eliminarEvento);

module.exports = eventoRoutes;
