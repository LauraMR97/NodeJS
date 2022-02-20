//Los middleware que se van a usar
const authJwt = require("../middleware/authJwt");
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
    app.post(
        "/api/test/user", // ruta
        //midleware que va a pasar
        controller.userBoard //controlador  y funcion que se va a utilizar
    );

    app.get(
        "/api/admin/crud", [authJwt.verifyToken, authJwt.isAdmin],
        controller.verUsuarios
    );

    app.post(
        "/api/admin/editar", [authJwt.verifyToken, authJwt.isAdmin],
        controller.editarUsuario
    );


    app.delete(
        "/api/admin/borrar/:email", [authJwt.verifyToken, authJwt.isAdmin],
        controller.borrarUsuario
    );

    app.get(
        "/api/admin/verUsuario/:email", [authJwt.verifyToken, authJwt.isAdmin],
        controller.verUsuario
    );

    app.post(
        "/api/admin/add", [authJwt.verifyToken, authJwt.isAdmin],
        controller.crearUsuario
    );
}