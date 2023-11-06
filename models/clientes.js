const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({
    nombresApellidos: {
        type: String,
        required: [true, 'El campo nombres y apellidos es obligatorio'],
        match: [/^[a-zA-Z\s]+$/, 'Solo se permiten letras y espacios en el campo nombresApellidos']
    },
    cedula: {
        type: Number,
        required: [true, 'El campo cedula es obligatorio'],
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value); // La cédula debe contener solo números positivos
            },
            message: 'La cédula debe contener solo números'
        }
    },

    fechaNacimiento: {
        type: Date,
        required: [true, 'El campo fechaNacimiento es obligatorio'],
    },

    lugarResidencia: {
        type: String,
        required: [true, 'El campo lugarResidencia es obligatorio'],
        match: [/^[a-zA-Z\s]+$/, 'Solo se permiten letras y espacios en el campo lugarResidencia']
    },
    profesion: {
        type: String,
        required: [true, 'El campo profesion es obligatorio'],
        match: [/^[a-zA-Z\s]+$/, 'Solo se permiten letras y espacios en el campo profesion']
    },
    consumeAlcohol: {
        type: Boolean,
        required: [true, 'El campo consumeAlcohol es obligatorio']
    },
    eps: {
        type: String,
        required: [true, 'El campo eps es obligatorio'],
        match: [/^[a-zA-Z\s]+$/, 'Solo se permiten letras y espacios en el campo eps']
    },
    correo: {
        type: String,
        required: [true, 'El campo correo es obligatorio'],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Por favor, ingresa un correo electrónico válido']
    },
    telefono: {
        type: String,
        required: [true, 'El campo telefono es obligatorio'],
        match: [/^\d{10,15}$/, 'El campo telefono debe contener entre 10 y 15 dígitos numéricos']
    },
    fuma: {
        type: Boolean,
        required: [true, 'El campo fuma es obligatorio']
    },
    edad: {
        type: Number,
        required: [true, 'El campo edad es obligatorio'],
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value); 
            },
            message: 'La edad debe contener solo números'
        }
    },

    estatura: {
        type: String,
        required: [true, 'El campo estatura es obligatorio'],
        match: [
            /^(?!-)(\d+(\.\d+)?)(m)?(\d{1,2})?(cm)?$/,
            'Por favor, ingresa una estatura válida en metros y/o centímetros (por ejemplo, 1.75m o 175cm)'
        ]
    },
    peso: {
        type: String,
        required: [true, 'El campo peso es obligatorio'],
        match: [
            /^(?!-)(\d+(\.\d+)?)?(kg)?$/,
            'Por favor, ingresa un peso válido en kilogramos (por ejemplo, 70kg)'
        ]
    },

    rh: {
        type: String,
        required: [true, 'El campo rh es obligatorio'],
        match: [
            /^(A|B|AB|O)[+-]$/,
            'Por favor, ingresa un tipo de sangre válido (A+, A-, B+, B-, AB+, AB-, O+, O-)'
        ]
    },

    motivacion: {
        type: String,
        required: [true, 'El campo motivacion es obligatorio'],
        match: [/^[a-zA-Z\s]+$/, 'Solo se permiten letras y espacios en el campo motivacion']

    },
    traumas: {
        type: String,
        required: [true, 'El campo traumas es obligatorio'],
        match: [/^[a-zA-Z\s]+$/, 'Solo se permiten letras y espacios en el campo traumas']

    },
    alergias: {
        type: String,
        required: [true, 'El campo alergias es obligatorio'],
        match: [/^[a-zA-Z\s]+$/, 'Solo se permiten letras y espacios en el campo alergias']

    },
    medicamentos: {
        type: String,
        required: [true, 'El campo medicamentos es obligatorio'],
        match: [/^[a-zA-Z\s]+$/, 'Solo se permiten letras y espacios en el campo medicamentos']

    },
    ayudasErgogenicas: {
        type: String,
        required: [true, 'El campo ayudasErgogenicas es obligatorio'],
        match: [/^[a-zA-Z\s]+$/, 'Solo se permiten letras y espacios en el campo ayudasErgogenicas']

    },
    problemasColon: {
        type: Boolean,
        required: [true, 'El campo problemasColon es requerido'],
    },
    ultimaDesparasitacion: {
        type: Date,
        required: [true, 'El campo fecha de ultimaDesparasitacion es obligatorio'],

    },
    diabetes: {
        type: Boolean,
        required: [true, 'El campo diabetes es obligatorio']
    },
    sobrepeso: {
        type: Boolean,
        required: [true, 'El campo sobrepeso es obligatorio']
    },
    enfermedadCardiovascular: {
        type: Boolean,
        required: [true, 'El campo enfermedadCardiovascular es obligatorio']
    },
    cancer: {
        type: Boolean,
        required: [true, 'El campo cancer es obligatorio']
    },
    cefalea: {
        type: Boolean,
        required: [true, 'El campo cefalea es obligatorio']
    },
    osteomusculares: {
        type: Boolean,
        required: [true, 'El campo osteomusculares es obligatorio']
    },
    hipertension: {
        type: Boolean,
        required: [true, 'El campo hipertension es obligatorio']
    },
    dolorToracico: {
        type: Boolean,
        required: [true, 'El campo dolorToracico es obligatorio']
    },
    mareos: {
        type: Boolean,
        required: [true, 'El campo mareos es obligatorio']
    },
    otros: {
        type: String,
        required: [true, 'El campo otros es obligatorio'],
        match: [/^[a-zA-Z\s]+$/, 'Solo se permiten letras y espacios en el campo otros']

    },
    fechasEvaluacion: {
        type: Date,
        required: [true, 'El campo fecha de valoracion es obligatorio'],
    },
    estado: {
        type: Boolean,
        required: [true, 'El campo estado del usuario es requerido'],
        default: true
    }
});

module.exports = model('Cliente', ClienteSchema);
