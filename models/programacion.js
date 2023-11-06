const { Schema, model } = require('mongoose');

const ProgramacionSchema = Schema({
  clase: {
    type: String,
    required: [true, 'El campo clase es requerido'],
    enum: ['Yoga', 'Muay Thai', 'Spinning', 'Boxeo', 'Circuito']
  },
  instructor: {
    type: String,
    required: [true, 'El campo instructor es requerido'],
    enum: ['Camilo Sanchez', 'Federico', 'Jose Tachido', 'Eliana Lopez']
  },
  fecha: {
    type: String,
    required: [true, 'El campo fecha es requerido']
  },
  hora_inicio: {
    type: String,
    required: [true, 'La hora de inicio es requerida'],
  },
  hora_fin: {
    type: String,
    required: [true, 'La hora fin es requerida'],
  },
  descripcion: {
    type: String,
    required: [false, 'El campo observacion es requerido'],
  }
});

module.exports = model('Programacion', ProgramacionSchema);
