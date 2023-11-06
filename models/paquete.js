const { Schema, model } = require('mongoose');

const PaqueteSchema = Schema({
    paquetes: {
        type: String,
        required: [true, 'El paquete es requerido'],
        match: [/^[A-Za-z\s]+$/, 'Los paquetes solo debe contener letras y espacios']
    },

    servicios: {
        type: [String], // Array de strings
        required: true,
        validate: {
            validator: function (value) {
                // Validación personalizada para cada elemento del array
                return value.every((item) => /^[A-Za-z\s]+$/.test(item)); // Coincidencia para letras y espacios en cada elemento
            },
            message: 'Los servicios solo deben contener letras y espacios',
        },
    },
    frecuencia: {
        type: String, 
        required: [true, 'La frecuencia es requerida'],
        match: [/^[A-Za-z\s]+$/, 'La frecuencia solo debe contener letras y espacios']
    },

    total: {
        type: Number,
        required: [true, 'El total es requerido'],
        min: [4000, 'El total mínimo permitido es 4000'],
        max: [1000000, 'El total máximo permitido es 1000000'],
        match: [/^[0-9\s]+$/, 'El total solo debe contener números y debe ser minimo 4000 y maximo 1000000']
    },

    precioventa: {
        type: Number,
        required: [true, 'El precio de venta es requerido'],
        min: [4000, 'El precio de venta mínimo permitido es 5000'],
        max: [1000000, 'El precio de venta máximo permitido es 1000000'],
        match: [/^[0-9\s]+$/, 'El precio de venta solo debe contener números y debe ser minimo 5000 y maximo 1000000']
    },
    estado: {
        type: String,
        required: [true, 'El estado es requerido'],
        enum: ['Activo', 'Inactivo'],
        match: [/^[A-Za-z\s]+$/, 'El estado de servicios solo debe contener letras'],
        default: 'Activo',
    },
});

module.exports = model('Paquete', PaqueteSchema);