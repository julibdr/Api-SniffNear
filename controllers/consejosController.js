const consejosModel = require('../models/consejosModel');

exports.crearConsejo = async( req, res ) => {
    try {
        const { titulo, descripcion } = req.body
        if( !titulo || !descripcion){
            res.status(400).json( { msg: 'Faltan campos'});
        }
        const consejoNuevo = new consejosModel({
            titulo: titulo,
            descripcion
        });
        await consejoNuevo.save();

        res.status(201).json({
            msg: 'consejo Guardado' , 
            id: consejoNuevo._id 
        });

    } catch (error) {
        console.log(error)
        res.status(500).json( { msg: 'Error en el servidor' } )
    }
}

exports.actualizarConsejo = async (req, res) => {
    try {
        const idConsejo = req.params.id;
        const { titulo, descripcion } = req.body;

        const consejo = await consejosModel.findById(idConsejo);

        if (!consejo) {
            return res.status(404).json({ msg: 'consejo no encontrado' });
        }

        if (titulo) {
            consejo.titulo = titulo;
        }
        if (descripcion) {
            consejo.descripcion = descripcion;
        }

        await consejo.save();

        res.status(200).json({ msg: 'consejo actualizado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

exports.eliminarConsejo = async (req, res) => {
    try {
        const consejoId = req.params.id;

        const consejo = await consejosModel.findById(consejoId);

        if (!consejo) {
            return res.status(404).json({ msg: 'Consejo no encontrado' });
        }
        await consejosModel.findByIdAndRemove(consejoId);

        res.status(200).json({ msg: 'Consejo eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

exports.listaConsejo = async (req, res) => {
    try {
        const consejos = await consejosModel.find();

        if (!consejos || consejos.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron consejos' });
        }

        res.json(consejos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};


exports.consejoId = async (req, res) => {
    try {
        const id = req.params.id;
        const consejo = await consejosModel.findById(id);

        if (!consejo) {
            return res.status(404).json({ msg: 'El consejo no existe' });
        }

        res.json(consejo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}
