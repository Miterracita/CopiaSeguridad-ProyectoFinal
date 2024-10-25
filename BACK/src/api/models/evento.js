const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true }, // Hora del evento (formato 'HH:mm' o similar)
  duracion: { type: Number, required: true }, // Duración en minutos
  capacidad: { type: Number, required: true }, // Número máximo de participantes
  reservas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }] // Reservas asociadas a este evento
}, {
  timestamps: true,
  collection: 'eventos'
});

const Evento = mongoose.model('Evento', eventoSchema);
module.exports = Evento;
