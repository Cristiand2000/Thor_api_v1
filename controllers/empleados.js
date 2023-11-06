const {response} = require ('express')

const Empleado = require('../models/empleados')

const empleadoGet = async(req, res = response) =>{
    const{cedula} = req.body 
    const empleados = await Empleado.find()

    res.json({
        empleados
    })

}
const empleadoPost = async (req, res = response) => {
    const body = req.body;
    let mensaje = '';

    try {
        const empleadoExistente = await Empleado.findOne({ $or: [
            { cedula: body.cedula },
            { correo: body.correo }
        ]
    });  
    if(empleadoExistente){
        if (empleadoExistente.cedula === body.cedula) {
            mensaje = 'Ya existe un empleado con esta cedula';
            
        } else {
            mensaje = 'Ya existe un empleado con este correo electrónico';
        }return res.status(400).json({ msg: mensaje });
    }
        
        const empleado = new Empleado(body);
        await empleado.save();
        mensaje = 'La inserción se efectuó exitosamente';
        res.json({
            msg: mensaje
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errores = Object.values(error.errors).map(val => val.message);
            console.error(errores);
            mensaje = errores;
            return res.status(400).json({ msg: mensaje }); // Devolver errores de validación al cliente
        } else {
            console.error(error);
            mensaje = 'Error en el servidor';
            return res.status(500).json({ msg: mensaje }); // Devolver mensaje genérico en caso de otros errores
        }
    }
};

//Modificar
const empleadoPut = async (req, res = response) => {
    const { _id, cedula, nombre_Empleado, correo, direccion, telefono, estado_Empleado } = req.body;

    // Expresiones regulares para validaciones
    const cedulaRegex = /^[0-9]{7,12}$/; // Valida cédula: solo números, 7-12 dígitos
    const nombreRegex = /^[A-Za-z\s]+$/; // Valida nombre: solo letras y espacios
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valida correo electrónico
    const telefonoRegex = /^[0-9]{9,10}$/;

    // Verificar las validaciones antes de realizar la actualización
    if (!cedulaRegex.test(cedula)) {
        return res.status(400).json({
            msg: 'Por favor, ingresa una cédula válida (solo números, 7-12 dígitos)'
        });
    }

    if (!nombreRegex.test(nombre_Empleado)) {
        return res.status(400).json({
            msg: 'Por favor, ingresa un nombre válido (solo letras y espacios)'
        });
    }

    if (!correoRegex.test(correo)) {
        return res.status(400).json({
            msg: 'Por favor, ingresa un correo electrónico válido'
        });
    }
    if (!telefonoRegex.test(telefono)) {
        return res.status(400).json({
            msg: 'Por favor, ingresa una telefono válida (solo números)'
        });
    }

    try {
        const empleado = await Empleado.findByIdAndUpdate(_id, {
            cedula, nombre_Empleado, correo, direccion, telefono, estado_Empleado
        }, { new: true }); 

        if (empleado) {
            res.json({
                msg: 'La modificación del empleado se efectuó exitosamente',
                empleado 
            });
        } else {
            res.status(404).json({
                msg: 'No se encontró ningún empleado con el ID proporcionado'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};


//Eliminar
const empleadoDelete = async (req, res = response) => {
    const { _id } = req.query;
    try {
        const empleado = await Empleado.deleteOne({ _id: _id })
        res.status(200).json({
            msg: 'La elimicacion se efectuó exitosamente'
        });
    }
    catch (e) {
        console.error(e); // Log del error para depuración
        res.status(500).json({
            msg: 'Se presentaron problemas en la eliminación'
        });
    }
}

module.exports = {
    empleadoGet,
    empleadoPost,
    empleadoPut,
    empleadoDelete
}