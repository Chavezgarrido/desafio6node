const format = require('pg-format');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./api/src/controllers/controller.js');

const agregarUsuario = async ({ email, password, rol, lenguage }) => {
    const passwordHash = await bcrypt.hash(password, 10);
    const formattedQuery = format(
        "INSERT INTO usuarios (email, password, rol, lenguage) VALUES (%L, %L, %L, %L)",
        email, passwordHash, rol, lenguage
    );
    await pool.query(formattedQuery);
};

const autenticacion = async ({email}) => {
    const token = jwt.sign({email}, "az_AZ", {expiresIn: "2h"});
    return token;
}

const getUsuario = async (token) => {
    const {email} = jwt.decode(token);
    const formattedQuery = format("SELECT * FROM usuarios WHERE email = %L", email);
    const {rows} = await pool.query(formattedQuery);
    return rows;
}


//AL REGISTRAR USUARIO REVISA LA BBDD
const verificarSiUsuarioExiste = async (reqBody) => {
    try {
        const { email } = reqBody;
        const formattedQuery = format("SELECT * FROM usuarios WHERE email = %L", email);
        const { rowCount } = await pool.query(formattedQuery);
        if (rowCount) {
            return true;
        } else {
            return false;
        }
    }catch(error){
        res.status(500).json(error);
    }
}




module.exports = { agregarUsuario, pool, autenticacion, verificarSiUsuarioExiste, getUsuario };