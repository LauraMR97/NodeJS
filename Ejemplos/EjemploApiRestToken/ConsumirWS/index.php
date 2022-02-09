<!DOCTYPE html>
<!--
Consumimos un servicio creado en Java Rest http://localhost:8080/EjemploGF/app/ServicioDatos/2
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <?php
//      //------------------------------------------------------------------------------------------
        //Haciendo una petición GET.
//        $ch = curl_init("http://localhost:8090/personas");
//        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//        //establecemos el verbo http que queremos utilizar para la petición
//        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
//        $response = curl_exec($ch);
        
//      //------------------------------------------------------------------------------------------
        //Haciendo una petición GET con parámetro en la URL.
//        $ch = curl_init("http://localhost:8090/personas/9");
//        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//        //establecemos el verbo http que queremos utilizar para la petición
//        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
//        $response = curl_exec($ch);
        
        
        //----------- Código común para los GET de arriba ---------
        // Se cierra el recurso CURL y se liberan los recursos del sistema
//        curl_close($ch);
//        if (!$response) {
//            return false;
//        } else {
//            echo '<br>';
//            var_dump($response);
//            $data = json_decode($response, true);
//            if (empty($data)) {
//                echo 'No se han obtenido registros';
//            } else {
//                foreach ($data as $cod => $emp) {
//                    echo 'Nombre: ' . $emp['nombre'] . '<br>Ciudad: ' . $emp['ciudad'] . '<br>--------<br>';
//                }
//            }
//        }
        
        
//      //------------------------------------------------------------------------------------------
        //Haciendo una petición POST: para insertar un artículo.        
//        $data = ['nombre' => 'Nuevo nombre',
//            'ciudad' => 'Miguelturra de Cva'];
//        $datos = json_encode($data);
////        var_dump($datos);
//        $ch = curl_init("http://localhost:8090/personas");
//        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
//        curl_setopt($ch, CURLOPT_POSTFIELDS, $datos);
//        //set the content type to application/json
//        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
//
//        $response = curl_exec($ch);
////        var_dump($response);
//        curl_close($ch);
//        if (!$response) {
//            echo "Se ha producido un error";
//        } else {
//            echo $response;
//        }
        
        
//      //------------------------------------------------------------------------------------------
        //Haciendo una petición PUT: para modificar un artículo.        
//        $data = ['nombre' => 'Ya acabo',
//            'ciudad' => 'Menuda turra'];
//        $datos = json_encode($data);
//        $ch = curl_init("http://localhost:8090/personas/23");
//        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
//        curl_setopt($ch, CURLOPT_POSTFIELDS, $datos);
//        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
//        $response = curl_exec($ch);
//        curl_close($ch);
////        var_dump($response);
//        $respuesta = json_decode($response, true);
////        var_dump($respuesta);
//        if (!$response) {
//            echo "Se ha producido un error";
//        } else {
//            echo $response;
//        }

        
//       //------------------------------------------------------------------------------------------
//          //Haciendo una petición DELETE: para borrar un artículo.        
        $ch = curl_init("http://localhost:8090/personas/20");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
        $response = curl_exec($ch);
        curl_close($ch);
        //var_dump($response);
        $respuesta = json_decode($response, true);
        //var_dump($respuesta);
        if (!$response) {
            echo "Se ha producido un error";
        } else {
            echo $response;
        }
        ?>
    </body>
</html>
