const { Schema, model } = require('mongoose');

const EmpleadoSchema = Schema({
  cedula: {
    type: Number,
    required: [true, 'El campo cedula es requerido'],
    match: [/^[0-9]+$/, 'El campo cedula solo debe contener números'],
    minlength: [7, 'Debe tener mínimo 7 caracteres'],
    maxlength: [12, 'Debe tener máximo 12 caracteres'],
    unique: true,

  },
  nombre_Empleado: {
    type: String,
    required: [true, 'El campo nombre empleado es requerido'],
    minlength: [3,'El campo nombre empleado minimo de caracteres son 3'],
  },
  correo: {
    type: String,
    required: [true, 'El campo correo es requerido'],
    match: [
        /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/,
        'Por favor, ingresa un correo electrónico válido'
    ],
    unique: true,
},
  direccion: {
    type: String,
    required: [true, 'El campo direccion es requerido']
  },
  telefono: {
    type: Number,
    required: [true, 'El campo telefono es requerido'],
  
  },
  estado_Empleado: {
    type: Boolean,
    required: [true, 'El campo estado empleado es requerido'],
    default: true
  }
});

module.exports = model('Empleado', EmpleadoSchema);
