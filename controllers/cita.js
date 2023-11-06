const { response } = require('express')

//Importar modelos
const Cita = require('../models/cita')


const citaGet = async (req, res = response) => {

    const citas = await Cita.find()

    res.json({
        citas
    })
}
const citaPost = async (req, res = response) => {

    const body = req.body //CAptura dde atributos
    let mensaje = ''
    console.log(body)
    try {
        const cita = new Cita(body)
        await cita.save()
        mensaje = "Exito en la insersion de citas"
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
const citaPut = async (req, res = response) => {
    const { nombreYapellido,fecha,hora,restrincciones,tiposervicio,estado } = req.body//modificar
    let mensaje = ""
    try {
        const cita = await Cita.findOneAndUpdate({ nombreYapellido: nombreYapellido }, {fecha: fecha,hora:hora,restrincciones:restrincciones,tiposervicio:tiposervicio,estado:estado })//Primera llave es el nombre del atributo, el segundo es el nuevo atributo
        mensaje = "Modificado exitosamente citas"
    } catch (error) {
        mensaje = "No modificado error"
    }
    res.json({
        msg: mensaje
    })
}

const citaDelete = async (req, res = response) => {
    const { _id } = req.query;
    try {
        const cita = await Cita.deleteOne({ _id: _id })
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
    citaGet,
    citaPost,
    citaPut,
    citaDelete
}