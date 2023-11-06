

const { Schema, model } = require('mongoose');

const SuscripcionesSchema = Schema({
    tipoPaquete: {
        type: String,
        required: [true, 'El tipo de paquete es requerido'],
        match: [/^[A-Za-z\s]+$/, 'El nombre solo debe contener letras y espacios']
    },
    fechaPago: {
        type: String,
        required: [true, 'La fecha de pago es requerida'],
        validate: {
            validator: function (value) {
                // Validación de fecha en formato "dd-mm-yyyy"
                const datePattern = /^\d{2}-\d{2}-\d{4}$/;
                if (!datePattern.test(value)) {
                    return false;
                }
                const currentDate = new Date();
                const selectedDate = new Date(value);
                return selectedDate >= currentDate;
            },
            message: 'La fecha de pago debe ser mayor o igual a la fecha actual en formato dd-mm-yyyy',
        },
    },
    precio:{
    type: [{
        type: Number,
    }],
    required: [true, 'el precio  es requerido'],
    min: [10000, 'El total mínimo permitido es 10000'],
    max: [1000000, 'El total máximo permitido es 1000000'],
    match: [/^[0-9\s]+$/, 'El total solo debe contener números y debe ser minimo 10000 y maximo 1000000']
},
estadoSuscripcion: {
    type: String,
    required: [true, 'El estado es requerido'],
    enum: ['Activo', 'Inactivo'],
    match: [/^[A-Za-z\s]+$/, 'El estado de suscripcion solo debe contener letras'],
    default: 'Activo',
},
});

module.exports = model('Suscripciones', SuscripcionesSchema);


