const interesModel = require('../models/interesModel');

exports.crearInteres = async( req, res ) => {
    try {
        const { titulo, horarios , dias, descripcion } = req.body
        if( !titulo || !dias || !descripcion){
            res.status(400).json( { msg: 'Faltan campos'});
        }if (typeof horarios !== 'number') {
            return res.status(400).json({ msg: 'El horario tiene que ser un número' });
        }
      
        const interesNuevo = new interesModel({
            titulo: titulo,
            horarios,
            dias,
            descripcion
        });
        await interesNuevo.save();

        res.status(201).json({
            msg: 'interes Guardado' , 
            id: interesNuevo._id 
        });

    } catch (error) {
        console.log(error)
        res.status(500).json( { msg: 'Error en el servidor' } )
    }
}

exports.actualizarInteres = async (req, res) => {
    try {
        const  InteresId  = req.params.id; 
        const { titulo, dias, horarios, descripcion } = req.body;

    
        const interes = await interesModel.findById(InteresId);

        if (!interes) {
            return res.status(404).json({ msg: 'interes no encontrado' });
        }

        if (titulo) {
            interes.titulo = titulo;
        }
        if (dias) {
            interes.dias = dias;
        }
        if (horarios) {
            interes.horarios = horarios;
        }
        if (descripcion) {
            interes.descripcion = descripcion;
        }

        await interes.save();

        res.status(200).json({ msg: 'interes actualizado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}


exports.eliminarInteres = async (req, res) => {
    try {
        const interesId = req.params.id;

        const interes = await interesModel.findById(interesId);

        if (!interes) {
            return res.status(404).json({ msg: 'Interés no encontrado' });
        }

        await interesModel.findByIdAndRemove(interesId);

        res.status(200).json({ msg: 'Interés eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

exports.listaInteres = async (req, res) => {
    try {
        const intereses = await interesModel.find();

        if (!intereses || intereses.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron intereses' });
        }

        res.json(intereses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};


exports.interesId = async (req, res) => {
    try {
        const id = req.params.id;
        const interes = await interesModel.findById(id);

        if (!interes) {
            return res.status(404).json({ msg: 'El interes no existe' });
        }

        res.json(interes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}
