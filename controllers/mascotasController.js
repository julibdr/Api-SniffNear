const mascotasModel = require('../models/mascotasModel');

exports.crearMascota = async (req, res) => {
    try {
        const { nombre, edad, raza, descripcion } = req.body;
        if (!nombre || !raza || !descripcion) {
            res.status(400).json({ msg: 'Faltan campos' });
        }
        if (typeof edad !== 'number') {
            return res.status(400).json({ msg: 'La edad tiene que ser un número' });
        }

        const mascotaNueva = new mascotasModel({
            nombre,
            edad,
            raza,
            descripcion,
        });
        await mascotaNueva.save();

        res.status(201).json({
            msg: 'Mascota Guardada',
            id: mascotaNueva._id,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

exports.actualizarMascota = async (req, res) => {
    try {
        const idMascota = req.params.id;
        const { nombre, edad, raza, descripcion } = req.body;

        const mascota = await mascotasModel.findById(idMascota);

        if (!mascota) {
            return res.status(404).json({ msg: 'Mascota no encontrada' });
        }

        if (nombre) {
            mascota.nombre = nombre;
        }
        if (edad) {
            mascota.edad = edad;
        }
        if (raza) {
            mascota.raza = raza;
        }
        if (descripcion) {
            mascota.descripcion = descripcion;
        }

        await mascota.save();

        res.status(200).json({ msg: 'Mascota actualizada correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};


exports.eliminarMascota = async (req, res) => {
    try {
      const mascotaId = req.params.id;

      const mascota = await mascotasModel.findById(mascotaId);
      if (!mascota) {
        return res.status(404).json({ msg: 'La mascota no existe' });
      }

      await mascotasModel.findByIdAndRemove(mascotaId);
  
      res.json({ msg: 'Mascota eliminada correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error en el servidor' });
    }
  };

exports.listaMascotas = async (req, res) => {
    try {
        const mascotas = await mascotasModel.find(); 

        if (!mascotas || mascotas.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron mascotas' });
        }

        res.json(mascotas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};


exports.mascotaId = async (req, res) => {
    try {
        const id = req.params.id;
        const mascota = await mascotasModel.findById(id);

        if (!mascota) {
            return res.status(404).json({ msg: 'La mascota no existe' });
        }

        res.json(mascota);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};
