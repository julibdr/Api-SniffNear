const jwt = require('jsonwebtoken');
const clave = process.env.PASS_TOKEN;

function token(req, res, next) {
    let token = req.headers.auth;

  if (!token) {
    return res.status(401).json({ msg: 'Acceso denegado.' });
  }
    token = token.split( ' ')[1];
    jwt.verify(token, clave, (error, decoded) => {
      if( error) {
      return res.status(403).json({ msg: 'Token invalido'})
      }
      req.usuario = decoded.usuario;
      next();
      })
}

module.exports = token;
