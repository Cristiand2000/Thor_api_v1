//importar paquetes requeridos de Node
const { response } = require('express');

//importación de los modelos
const Programacion = require('../models/programacion');

//metodos asincronicos async(req, res)
const programacionGet = async (req, res = response) => {
    const { _id } = req.query; //Desestructuración

    try {
        const programaciones = await Programacion.find();
        res.json({
            programaciones
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrió un error en el servidor'
        });
    }
};

//registrar
const programacionPost = async (req, res = response) => {
    const body = req.body; //captura de atributos 
    let mensaje = '';
    console.log(body);

    try {
        const programacion = new Programacion(body); // instanciar el objeto
        await programacion.save();
        mensaje = 'La inserción se efectuó exitosamente';
    } catch (error) {
        if (error.name === 'ValidationError') {
            console.error(Object.values(error.errors).map(val => val.message));
            mensaje = Object.values(error.errors).map(val => val.message);
        } else {
            console.error(error);
            mensaje = 'Ocurrió un error en el servidor';
        }
    }
    
    res.json({
        msg: mensaje
    });
};

//Modificar
const programacionPut = async (req, res = response) => {
    const { _id, clase, instructor, fecha, hora_inicio, hora_fin, descripcion } = req.body;
    let mensaje = '';

    try {
        const programacion = await Programacion.findByIdAndUpdate(
            _id,
            { clase:clase, instructor:instructor, fecha:fecha, hora_inicio:hora_inicio, hora_fin:hora_fin, descripcion:descripcion },
            { new: true } // Esta opción devuelve el documento actualizado en lugar del original
        );

        if (programacion) {
            mensaje = 'La modificación se efectuó exitosamente';
        } else {
            mensaje = 'No se encontró la programación especificada';
        }
    } catch (e) {
        console.error(e);
        mensaje = 'Se presentaron problemas en la modificación';
    }

    res.json({
        msg: mensaje
    });
};
const programacionDelete = async (req, res = response) => {
    const { _id } = req.query;
    try {
        const programacion = await Programacion.deleteOne({ _id: _id })
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
    programacionGet,
    programacionPost,
    programacionPut,
    programacionDelete
};
