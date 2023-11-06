const { response } = require('express')

//Importar modelos
const Paquete = require('../models/paquete')


const paqueteGet = async (req, res = response) => {

    const paquetes = await Paquete.find()

    res.json({
        paquetes
    })
}


const paquetePost = async (req, res = response) => {

    const body = req.body //Captura de atributos
    let mensaje = ''
    console.log(body)
    try {
        const paquete = new Paquete(body)
        await paquete.save()
        mensaje = "Exito en la insersion de los paquetes"
    } catch (error) {
        if (error.name === 'ValidationError') {
            console.log(Object.values(error.errors).map(val => val.message))
            mensaje = Object.values(error.errors).map(val => val.message)
        }
    }
    console.log(mensaje)
    res.json({
        msg: mensaje
    })
}

const paquetePut = async (req, res = response) => {
    const { paquetes,servicios,cantidad,total,estado } = req.body//modificar
    let mensaje = ""
    try {
        const paquete = await Paquete.findOneAndUpdate({ paquetes: paquetes }, {servicios:servicios, cantidad: cantidad,total:total, estado: estado })//Primera llave es el nombre del atributo, el segundo es el nuevo atributo
        mensaje = " Paquete Modificado"
    } catch (error) {
        mensaje = "No modificado"
    }
    res.json({
        msg: mensaje
    })
}

const paqueteDelete = async (req, res = response) => {
    const { _id } = req.query;
    try {
        const paquete = await Paquete.deleteOne({ _id: _id })
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
    paqueteGet,
    paquetePost,
    paquetePut,
    paqueteDelete}