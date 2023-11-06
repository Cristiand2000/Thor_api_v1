//importar paquetes requeridos de Node
const {response} = require ('express')
//const bcrypt = require('bcrypt')

//importación de los modelos
const Usuario = require('../models/usuarios')

//metodos asincronicos async(req, res)
const usuarioGet = async(req, res = response) =>{
    const{nombre} = req.body //Desestructuracion

    const usuarios = await Usuario.find()

    res.json({
        usuarios
    })

    /* res.json({
        msg: 'GET API',
        nombre: nombre
    }) */
}
//registrar
const usuarioPost = async(req, res = response) =>{
    const body = req.body //catptura de atributos 
    let mensaje = '' 
    //console.log(body)
    /* const salt =10
    usuario.password=bcrypt.hashSync(body.password, salt) */
    try {
        const usuarioExistente = await Usuario.findOne({ $or: [
            { correo: body.correo }
        ]
    });  
    if(usuarioExistente){
        if (usuarioExistente.correo === body.correo) {
            mensaje = 'Ya existe un usuario con este correo electrónico';   
        } 
        return res.status(400).json({ msg: mensaje });
    }
        
        const usuario = new Usuario(body);
        await usuario.save();
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

const usuarioPut = async (req, res = response) => {
    const { _id, nombre, correo, password, rol, estado} = req.body;

    try {
        const usuario = await Usuario.findByIdAndUpdate(_id, {
            _id, nombre, correo, password, rol, estado
        }, { new: true });

        if (usuario) {
            res.json({
                msg: 'La modificación del usuario se efectuó exitosamente',
                usuario
            });
        } else {
            res.status(404).json({
                msg: 'No se encontró ningún usuario con el ID proporcionado'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};


const usuarioDelete = async (req, res = response) => {
    const { _id } = req.query;
    try {
        const usuario = await Usuario.deleteOne({ _id: _id })
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
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}