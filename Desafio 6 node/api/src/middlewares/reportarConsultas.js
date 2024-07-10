const reportarConsultas = (req, res, next) => {
    console.log(`Method Request: ${req.method}\nURL Request: ${req.url}`)
    next();
}

module.exports = {reportarConsultas};