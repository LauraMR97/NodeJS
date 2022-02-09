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
//        $ch = curl_init("http://localhost:8090/personas/101A");
//        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//        //establecemos el verbo http que queremos utilizar para la petición
//        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
//        $response = curl_exec($ch);
        
        //----------- Código común para los GET de arriba ---------
        //Se cierra el recurso CURL y se liberan los recursos del sistema
//        curl_close($ch);
//        if (!$response) {
//            return false;
//        } else {
//            echo '<br>';
//            var_dump($response);
//            $data = json_decode($response, true);
//            if (empty($data)) {
//                echo 'No se han obtenido registros.';
//            } else {
//                foreach ($data as $cod => $emp) {
//                    echo 'DNI: '. $emp['DNI'].'<br>Nombre: ' . $emp['Nombre'] . '<br>Tfno: ' . $emp['Tfno'] . '<br>--------<br>';
//                }
//            }
//        }

        
        
//      //------------------------------------------------------------------------------------------
        //Haciendo una petición POST: para insertar un artículo.        
//        $data = ['dni' => '100AF',
//            'nombre' => 'Borrame',
//            'tfno' => '123456789'];
//        $datos = json_encode($data);
//        var_dump($datos);
//        $ch = curl_init("http://localhost:8090/personas");
//        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
//        curl_setopt($ch, CURLOPT_POSTFIELDS, $datos);
//        //set the content type to application/json
//        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
//
//        $response = curl_exec($ch);
//        var_dump($response);
//        curl_close($ch);
//        $data = json_decode($response, true);
//        if ($data['status'] == 201) {
//            echo "Insertado correctamente";
//        } else {
//            echo 'Se ha producido un error: '.$data['message'];
//        }


//      //------------------------------------------------------------------------------------------
        //Haciendo una petición PUT: para modificar un artículo.        
//        $data = [
//            'Nombre' => 'sdkljfklds kdsjfh',
//            'Tfno' => '9999'];
//        $datos = json_encode($data);
//        $ch = curl_init("http://localhost:8090/personas/100AF");
//        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
//        curl_setopt($ch, CURLOPT_POSTFIELDS, $datos);
//        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
//        $response = curl_exec($ch);
//        var_dump($response);
//        curl_close($ch);
//        $data = json_decode($response, true);
//        var_dump($data);
//        if ($data['status'] == 201) {
//            echo "Cambios realizados: ".$data['message'];
//        } else {
//            echo 'Se ha producido un error: '.$data['message'];
//        }

        
//       //------------------------------------------------------------------------------------------
//       //Haciendo una petición DELETE: para borrar un artículo.        
        $ch = curl_init("http://localhost:8090/personas/100AF");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
        $response = curl_exec($ch);
        curl_close($ch);
        var_dump($response);
        curl_close($ch);
        $data = json_decode($response, true);
        var_dump($data);
        if ($data['status'] == 201) {
            echo "Cambios realizados: ".$data['message'];
        } else {
            echo 'Se ha producido un error: '.$data['message'];
        }
        ?>
    </body>
</html>
