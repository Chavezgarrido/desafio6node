const express = require('express');
const { reportarConsultas } = require('./api/src/middlewares/reportarConsultas.js');
const verificarCredenciales = require('./api/src/middlewares/verificarCredenciales.js');
const verifyToken = require('./api/src/middlewares/verifyToken.js');
const { agregarUsuario, autenticacion, verificarSiUsuarioExiste, getUsuario } = require('./consultas.js');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;
app.use(reportarConsultas)

app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));

//AGREGAR USUARIOS A BASE DE DATOS

app.post('/usuarios', async (req,res) => {
    try{
        const respuesta = await verificarSiUsuarioExiste(req.body);
        if(!respuesta){
            await agregarUsuario(req.body);
            res.send("Usuario agregado con éxito!");
        }else{
            throw{message: "El correo con el que se intenta registrar ya está en uso"}
        }
    }catch(error){
        res.status(500).send(error);
    }
});

//INICIAR SESION

app.post('/login', verificarCredenciales, async (req,res) => {
    try{
        const token = await autenticacion(req.body);
        res.send({token: token});
    }catch(error){
        res.send(error)
    }
});

app.get('/usuarios'), verifyToken, async (req, res) => {
    try{
        const authorization = req.headers.authorization;
        const token = authorization.split(" ")[1];
        const usuario = await getUsuario(token);
        res.json(usuario);
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}

