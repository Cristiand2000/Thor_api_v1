
const Cliente = require('../models/clientes');
const { response } = require('express');

const clienteGet = async (req, res = response) => {
  try {
    const clientes = await Cliente.find();
    res.json({
      clientes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error en el servidor'
    });
  }
};

const clientePost = async (req, res = response) => {
  const body = req.body;
  let mensaje = '';

  try {
      const clienteExistente = await Cliente.findOne({ $or: [{cedula: body.cedula}, {correo: body.correo }] });
      if (clienteExistente) {
        if (clienteExistente.cedula === body.cedula) {
            mensaje = 'Ya existe un cliente con esta cedula';
            
        } else {
            mensaje = 'Ya existe un cliente con este correo electrónico';
        }return res.status(400).json({ msg: mensaje });
    }

      const cliente = new Cliente(body);
      await cliente.save();
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

const clientePut = async (req, res = response) => {
  const { _id, nombresApellidos, cedula, fechaNacimiento, lugarResidencia, profesion, consumeAlcohol, eps, correo, telefono, fuma, edad, estatura,
    peso, rh, motivacion, traumas, alergias, medicamentos, ayudasErgogenicas, problemasColon, ultimaDesparasitacion,diabetes, sobrepeso,enfermedadCardiovascular, cancer,cefalea,osteomusculares,hipertension, dolorToracico,mareos,otros, fechasEvaluacion} = req.body;

  try {
      const cliente = await Cliente.findByIdAndUpdate(_id, {
        nombresApellidos, cedula, fechaNacimiento, lugarResidencia, profesion, consumeAlcohol, eps, correo, telefono, fuma, edad,estatura,
        peso, rh, motivacion, traumas, alergias, medicamentos, ayudasErgogenicas, problemasColon, ultimaDesparasitacion,diabetes, sobrepeso,enfermedadCardiovascular, cancer,cefalea,osteomusculares,hipertension, dolorToracico,mareos,otros, fechasEvaluacion}, { new: true }); 

      if (cliente) {
          res.json({
              msg: 'La modificación del cliente se efectuó exitosamente',
              cliente 
          });
      } else {
          res.status(404).json({
              msg: 'No se encontró ningún cliente con el ID proporcionado'
          });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({
          msg: 'Error en el servidor'
      });
  }
};

const clienteDelete = async (req, res = response) => {
  const { _id } = req.query;
  try {
      const cliente = await Cliente.deleteOne({ _id: _id })
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
  clienteGet,
  clientePost,
  clientePut,
  clienteDelete
};
