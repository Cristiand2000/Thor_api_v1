//importar paquetes requeridos de Node
const {response} = require ('express')

//importación de los modelos
const Agenda = require('../models/agenda')
const agenda = require('../models/agenda')

//metodos asincronicos async(req, res)
const agendaGet = async(req, res = response) =>{
    const{_id} = req.query //Desestructuracion

    const agendas = await Agenda.find()

    res.json({
        agendas
    })

}
//registrar
const agendaPost = async(req, res = response) =>{
    const body = req.body //catptura de atributos 
    let mensaje = '' 
    console.log(body)
    try {const agenda = new Agenda(body) // instanciar el objeto
    await agenda.save()
    mensaje = 'La inserción se efectuó exitosamente'
        
    } catch (error) {
        if (error){
            if (error.name === 'ValidationError'){
                console.error(Object.values(error.errors).map(val => val.message))
                mensaje = Object.values(error.errors).map(val => val.message)
            }
        }
        console.log(mensaje)
    }
    res.json({
        msg: mensaje
    })
}
//Modificar

const agendaPut = async (req, res = response) => {
    const { _id, hora_inicio, hora_fin, instructor, clase, dia, estado } = req.body;
    let mensaje = '';

    try {
        const agenda = await Agenda.findOneAndUpdate(
            { _id: _id },
            { hora_inicio: hora_inicio, hora_fin: hora_fin, instructor: instructor, clase: clase, dia: dia, estado: estado },
            { new: true } // Esta opción devuelve el documento actualizado en lugar del original
        );

        if (agenda) {
            mensaje = 'La modificación se efectuó exitosamente';
        } else {
            mensaje = 'No se encontró la agenda especificada';
        }
    } catch (e) {
        mensaje = 'Se presentaron problemas en la modificación';
    }

    res.json({
        msg: mensaje
    });
};


const agendaDelete = async (req, res = response) => {
    const { _id } = req.query;
    try {
        const agenda = await Agenda.deleteOne({ _id: _id })
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
    agendaGet,
    agendaPost,
    agendaPut,
    agendaDelete
}
