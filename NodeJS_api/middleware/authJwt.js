const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;


verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    //NO tienes token
    if (!token) {
        return res.status(403).send({
            message: "No tienes token!"
        });
    }

    //No estas autorizado
    jwt.verify(token, config.secret, (err, decoded) => {
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

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;