const usuariosModel = require('../models/usuariosModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const clave = process.env.PASS_TOKEN;
const saltRounds = 10; 

exports.auth = async (req, res) => {
    const { email, password } = req.body;

    const usuario = await usuariosModel.findOne({ email });

    if (!usuario) {
        return res.status(401).json({ msg: 'Usuario inválido' });
    }

    const passwordAuth = await bcrypt.compare(password, usuario.password);

    if (!passwordAuth) {
        return res.status(401).json({ msg: 'Contraseña inválida' });
    }

    const token = jwt.sign({ usuario: usuario._id }, clave, { expiresIn: '1h' });

    res.status(201).json({
        msg: 'Autenticación correcta',
        token
    });
};

exports.crear = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        if (!nombre || !email || !password) {
            return res.status(400).json({ msg: 'Faltan campos' });
        }

        const salt = bcrypt.genSaltSync(saltRounds);

        const passwordHash = bcrypt.hashSync(password, salt);

        const usuarioNuevo = new usuariosModel({
            nombre,
            email,
            password: passwordHash
        });

        await usuarioNuevo.save();

        res.status(201).json({
            msg: 'Usuario Guardado',
            id: usuarioNuevo._id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

exports.actualizar = async (req, res) => {
    try {
        const { id } = req.params; 
        const { nombre, email, password } = req.body;

        const usuario = await usuariosModel.findById(id);

        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        if (nombre) {
            usuario.nombre = nombre;
        }
        if (email) {
            usuario.email = email;
        }
        if (password) {
           
            const passHash = await bcrypt.hash(password, saltRounds);
            usuario.password = passHash;
        }

        
        await usuario.save();

        res.status(200).json({ msg: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

exports.eliminar = async (req, res) => {
    try {
        const { id } = req.params; 

        const usuario = await usuariosModel.findById(id);

        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        await usuariosModel.deleteOne({ _id: id });

        res.status(200).json({ msg: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}


exports.lista = async (req, res) => {
    try {
        const usuarios = await usuariosModel.find(); 

        if (!usuarios) {
            return res.status(404).json({ msg: 'No se encontraron usuarios' });
        }

        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}


exports.usuarioId = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await usuariosModel.findById(id);

        if (!usuario) {
            return res.status(404).json({ msg: 'El usuario no existe' });
        }

        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}

