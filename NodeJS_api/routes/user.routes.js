//Los middleware que se van a usar
const { authJwt } = require("../middleware/authJwt");
//El controlador que se va a usar
const controller = require("../controller/user.controller");

//Esto va a requerir acceso por token de seguridad
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    //metodo get
    /*app.get(
        "/api/test/user", // ruta
        [authJwt.verifyToken], //midleware que va a pasar
        controller.userBoard //controlador  y funcion que se va a utilizar
    );

    app.get(
        "/api/test/mod", [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );
*/

    app.post(
        "/api/admin/crud", [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
}