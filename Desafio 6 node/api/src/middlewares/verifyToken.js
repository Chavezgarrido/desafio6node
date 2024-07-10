const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        const token = authorization.split(" ")[1];
        jwt.verify(token, "az_AZ");
        next();
    }catch(error){
        res.status(error.code || 500).send(error);
    }
}

module.exports = verifyToken;