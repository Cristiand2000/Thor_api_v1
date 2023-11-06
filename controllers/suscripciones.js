const { response } = require('express')

//Importar modelos
const Suscripciones = require('../models/suscripciones')


const suscripcionesGet = async (req, res = response) => {

    const suscripciones = await Suscripciones.find()

    res.json({
        suscripciones
    })
}

const suscripcionesPost = async (req, res = response) => {

    const body = req.body //CAptura dde atributos
    let mensaje = ''
    console.log(body)
    try {
        const suscripciones = new Suscripciones(body)
        await suscripciones.save()
        mensaje = "Exito en la insersion de suscripciones"
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

const suscripcionesPut = async (req, res = response) => {
    const { tipoPaquete,fechaPago,precio,estadoSuscripcion } = req.body//modificar
    let mensaje = ""
    try {
        const suscripciones = await Suscripciones.findOneAndUpdate({ id: id}, {tipoPaquete:tipoPaquete,fechaPago:fechaPago,precio:precio,estadoSuscripcion: estadoSuscripcion})//Primera llave es el nombre del atributo, el segundo es el nuevo atributo
        mensaje = "Modificado exitosamente Suscripciones"
    } catch (error) {
        mensaje = "No modificado error"
    }
    res.json({
        msg: mensaje
    })
}

const suscripcionesDelete = async (req, res = response) => {
    const { _id } = req.query;
    try {
        const suscripciones = await Suscripciones.deleteOne({ _id: _id })
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
    suscripcionesGet,
    suscripcionesPost,
    suscripcionesPut,
    suscripcionesDelete
}


