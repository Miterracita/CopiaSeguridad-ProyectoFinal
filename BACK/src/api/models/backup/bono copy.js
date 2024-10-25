const mongoose = require('mongoose');

//generar string aleatorio de 5 caracteres
function generateCode() {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
}

const bonoSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true, unique: true },
    type: { type: Number, trim: true, required: true },
    active: { type: Boolean, trim: true, required: true },
    code: { type: String, trim: true, required: true, default: generateCode },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    // reservas: {},
  },
  {
    timestamps: true,
    collection: "bonos"
  }
);

// asignar el código antes de guardar
bonoSchema.pre('save', function(next) {
    if (!this.code) {
        this.code = generateCode();
    }
    next();
});

const Bono = mongoose.model('bono', bonoSchema);
module.exports = Bono;