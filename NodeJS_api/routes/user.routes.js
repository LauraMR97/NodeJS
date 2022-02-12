//Los middleware que se van a usar
//const { authJwt } = require("../middleware/authJwt");
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

    app.post(
        "/api/admin/crud",
        controller.verUsuarios
    );

    app.post(
        "/api/admin/editar",
        controller.editarUsuario
    );


    app.post(
        "/api/admin/borrar",
        controller.borrarUsuario
    );

    app.post(
        "/api/admin/verUsuario",
        controller.verUsuario
    );



    app.post(
        "/api/admin/add",
        controller.crearUsuario
    );
}