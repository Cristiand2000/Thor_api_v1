const { Schema, model } = require('mongoose');

const AgendaSchema = Schema({
  hora_inicio: {
    type: String,
    required: [true, 'La hora de inicio es requerida'],
  },
  hora_fin: {
    type: String,
    required: [true, 'La hora fin  es requerida'],
    
},
  instructor: {
    type: String,
    required: [true, 'El campo instructor es requerido'],
    enum: ['Camilo Sanchez','Federico','Jose Tachido','Eliana Lopez']
  },
  clase: {
    type: String,
    required: [true, 'El campo clase es requerido'],
    enum: ['Yoga','Muay Thai','Spinnin','Boxeo','Circuito']
  },
  dia: {
    type: String,
    required: [true, 'El campo dia es requerido']
  },
  estado: {
    type: Boolean,
    required: [true, 'El campo estado es requerido'],
    enum: ['true','false']
  }
});

module.exports = model('Agenda', AgendaSchema);
