const jwt = require("jsonwebtoken");
const configuracion = require("../config/auth.config");

function verifyToken(req, res, next) {
    let token = req.headers["x-access-token"];

    //NO tienes token
    if (!token) {
        return res.status(403).send({
            message: "No tienes token!"
        });
    }

    //No estas autorizado
    jwt.verify(token, configuracion.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        //Estas autorizado, asi que pasas a la siguiente fase.
        req.userId = decoded.id;
        next();
    });

}


function isAdmin(req, res, next) {
    var rol = req.headers['roles'];

    if (rol == 1) {
        next();
        return;
    }

    res.status(403).send({
        message: "No eres Administrador!"
    });
    return;
}


const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
};
module.exports = authJwt;