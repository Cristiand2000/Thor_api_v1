const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El campo nombre es requerido'],
        match: [/^[A-Za-z\s]+$/, 'El nombre solo debe contener letras y espacios']
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
    
    password: {
        type: String,
        required: [true, 'El password es requerido'],
        minlength: [3, 'Debe tener mínimo 3 caracteres'],
        maxlength: [7, 'Debe tener máximo 7 caracteres']
    },
    rol: {
        type: String,
        required: true,
        enum: ['Administrador', 'Cliente', 'Empleado']
    },
    estado: {
        type: Boolean,
        required: [true, 'El campo estado del usuario es requerido'],
        default: true
    }
});

module.exports = model('Usuario', UsuarioSchema);
