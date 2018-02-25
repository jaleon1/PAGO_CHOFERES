<?php
//ob_start();
if (!isset($_SESSION)) {
    session_start();
}

if(isset($_POST["action"])){
    if($_POST["action"]=="Insertar"){
        $formulario= new formulario();
        $formulario->Agregar();
    }
    if($_POST["action"]=="Modificar"){
        $formulario= new formulario();
        $formulario->Modificar();
    }
    if($_POST["action"]=="Cargar"){
        $formulario= new formulario();
        $formulario->Cargar();
    }
    if($_POST["action"]=="CargarIngreso"){
        $formulario= new formulario();
        $formulario->CargarIngreso();
    }
    if($_POST["action"]=="CargarGasto"){
        $formulario= new formulario();
        $formulario->CargarGasto();
    }
}

class Formulario
{       
    function __construct(){
        require_once("Conexion.php");
    }

    //AGREGA EL FORMULARIO
    function Agregar(){
        try {
            $suma = "SELECT comprobante FROM formulariopago ORDER BY comprobante DESC LIMIT 1";
            $ultimo_comprobante = DATA::Ejecutar($suma);
            $comprobante = $ultimo_comprobante[0][0]+1;
            $valorkm = 1.9;
            $sql="INSERT INTO `formulariopago` (`id`, `comprobante`, `idchofer`, `idcalculokm`, `fecha`, `contenedor`, `placa`,`kms`, 
            `valorviaje`, `valorkm`, `porcentajeingreso`, `totalpago`, `estado`) VALUES (uuid(),:comprobante,:idchofer,:idcalculokm,:fecha,
            :contenedor,:placa,:kms,:valorviaje,:valorkm,:porcentajeingreso,:totalpago,:estado);";
            $param= array(  ':comprobante'=>$comprobante,
                            ':idchofer'=>$_POST["idchofer"],
                            ':idcalculokm'=>$_POST["idcalculokm"],
                            ':fecha'=>$_POST["fecha"],
                            ':contenedor'=>$_POST["contenedor"],
                            ':placa'=>$_POST["placa"],               
                            ':kms'=>$_POST["kms"],
                            ':valorviaje'=>$_POST["valorviaje"],
                            ':valorkm'=>$valorkm,
                            ':porcentajeingreso'=>15,
                            ':totalpago'=>$_POST["totalpago"],
                            ':estado'=>0);
            $result = DATA::Ejecutar($sql,$param);

            $contenedor = $_POST['contenedor'];
            $ultimo_registro = DATA::Ejecutar("SELECT id FROM formulariopago ORDER BY comprobante DESC LIMIT 1");
            $idformulario = $ultimo_registro[0][0];
            $sqlcontenedor = "INSERT INTO contenedor(id,contenedor,idformulario,estado) VALUES (uuid(),:contenedor,:idformulario,:estado)";
            $param= array(  ':contenedor'=>$contenedor,
                            ':idformulario'=>$ultimo_registro[0][0],
                            ':estado'=>0);
            $resultcontenedor = DATA::Ejecutar($sqlcontenedor,$param);

            //Consultar el Maximo ID insertado
            $maxid="SELECT id FROM formulariopago ORDER BY comprobante DESC LIMIT 0,1";
            //Captura el id del formulario
            $idformulario =DATA::Ejecutar($maxid);
            //Convierte el string en un arreglo
            $ingresosarray = $_POST["ingresos"];
            $gastoarray = $_POST["gastos"];
            //Calcula la longitud del arreglo de visistantes
            $longitudingreso = count($ingresosarray); 
            $longitudgasto = count($gastoarray);
            //Recorre el arreglo e inserta cada item en la tabla intermedia
            for ($i=0; $i<$longitudingreso; $i++) {
                $sql='INSERT INTO formingresos(id,idformulario,nombre,monto,porcentaje) VALUES (uuid(),:idformulario,:nombre,:monto,:porcentaje)';
                $param= array(':idformulario'=>$idformulario[0][0],':nombre'=>$ingresosarray[$i]['nombreingreso'],':monto'=>$ingresosarray[$i]['montoingreso'],':porcentaje'=>"0.15");
                $result = DATA::Ejecutar($sql, $param);
            }
            for ($i=0; $i<$longitudgasto; $i++) {
                $sql='INSERT INTO formgastos(id,idformulario,nombre,monto) VALUES (uuid(),:idformulario,:nombre,:monto)';
                $param= array(':idformulario'=>$idformulario[0][0],':nombre'=>$gastoarray[$i]['nombregasto'],':monto'=>$gastoarray[$i]['montogasto']);
                $result = DATA::Ejecutar($sql, $param);
            }
        } catch (Exception $e) {
            exit;
        }
    }

    function Modificar(){
        try {
            // $valorkm = '1,9';
            $sql="UPDATE `formulariopago` SET `idchofer`=:idchofer,`idcalculokm`=:idcalculokm,`fecha`=:fecha,`contenedor`=:contenedor,`placa`=:placa,
            `kms`=:kms,`valorviaje`=:valorviaje,`valorkm`=:valorkm,`porcentajeingreso`=:porcentajeingreso,`totalpago`=:totalpago,`estado`=:estado WHERE id = :id;";
            $param= array(  ':id'=>$_POST["id"],
                            ':idchofer'=>$_POST["idchofer"],
                            ':idcalculokm'=>$_POST["idcalculokm"],
                            ':fecha'=>$_POST["fecha"],
                            ':contenedor'=>$_POST["contenedor"],
                            ':placa'=>$_POST["placa"],               
                            ':kms'=>$_POST["kms"],
                            ':valorviaje'=>$_POST["valorviaje"],
                            ':valorkm'=>'1,9',
                            ':porcentajeingreso'=>'15',
                            ':totalpago'=>$_POST["totalpago"],
        ':estado'=>'0');
            DATA::Ejecutar($sql,$param);

            //Contenedores Almacenados
            //Elimina el Contenedor
            $borracontenedor = "DELETE FROM `contenedor` WHERE idformulario=:id";
            $param= array(  ':id'=>$_POST["id"]);
            DATA::Ejecutar($borracontenedor,$param);
            
            //Inserta Contenedor
            $contenedor = $_POST['contenedor'];
            $sqlcontenedor = "INSERT INTO contenedor(id,contenedor,idformulario,estado) VALUES (uuid(),:contenedor,:idformulario,:estado)";
            $param= array(  ':contenedor'=>$contenedor,
                            ':idformulario'=>$_POST['id'],
                            ':estado'=>0);
            DATA::Ejecutar($sqlcontenedor,$param);
            
            //Borrar Todos los Ingresos y Gastos antes de volver a insertarlos
            $sqlingresos= "DELETE FROM `formingresos` WHERE idformulario=:idformulario";
            $param= array(':idformulario'=>$_POST['id']);
            DATA::Ejecutar($sqlingresos,$param);

            $sqlgastos= "DELETE FROM `formgastos` WHERE idformulario=:idformulario";
            $param= array(':idformulario'=>$_POST['id']);
            DATA::Ejecutar($sqlgastos,$param);

            //Calcula la longitud del arreglo de visistantes
            $ingresosarray = $_POST["ingresos"];
            $gastoarray = $_POST["gastos"];
            $longitudingreso = count($ingresosarray); 
            $longitudgasto = count($gastoarray);

            //Recorre el arreglo e inserta cada item en la tabla intermedia
            for ($i=0; $i<$longitudingreso; $i++) {
                $sql='INSERT INTO formingresos(id,idformulario,nombre,monto,porcentaje) VALUES (uuid(),:idformulario,:nombre,:monto,:porcentaje)';
                $param= array(':idformulario'=>$_POST['id'],':nombre'=>$ingresosarray[$i]['nombreingreso'],':monto'=>$ingresosarray[$i]['montoingreso'],':porcentaje'=>"0.15");
                $result = DATA::Ejecutar($sql, $param);
            }
            for ($i=0; $i<$longitudgasto; $i++) {
                $sql='INSERT INTO formgastos(id,idformulario,nombre,monto) VALUES (uuid(),:idformulario,:nombre,:monto)';
                $param= array(':idformulario'=>$_POST['id'],':nombre'=>$gastoarray[$i]['nombregasto'],':monto'=>$gastoarray[$i]['montogasto']);
                $result = DATA::Ejecutar($sql, $param);
            }
        } catch (Exception $e) {
            exit;
        }
    }

    //CARGAR
    function Cargar(){
        try {
            $sql="SELECT f.id, f.comprobante, c.nombre as chofer,DATE_FORMAT(f.fecha, '%Y-%m-%dT%H:%i'), f.contenedor, f.placa, fin.nombre as finca, nav.nombre as naviera, kms, valorkm,valorviaje, totalpago,f.idchofer,f.idcalculokm
                    FROM formulariopago f 
                    inner join calculokm cal on cal.id=f.idcalculokm
                    inner join finca fin on fin.id=cal.idfinca
                    inner join naviera nav on nav.id=cal.idnaviera
                    inner join chofer c on c.id=f.idchofer WHERE f.id=:id";
            $param= array(':id'=>$_POST["id"]);
            $data= DATA::Ejecutar($sql,$param);
            echo json_encode($data);
        }     
        catch(Exception $e) {            
            header('HTTP/1.1 500 Internal Server XXX');
            header('Content-Type: application/json; charset=UTF-8');
            die(json_encode(array('message' => 'ERROR:' . $e, 'code' => 666)));
        }
    }

        //CARGAR
        function CargarIngreso(){
            try {
                $sql="SELECT id,monto,nombre,porcentaje FROM `formingresos` WHERE idformulario=:idformulario";
                $param= array(':idformulario'=>$_POST["idformulario"]);
                $data= DATA::Ejecutar($sql,$param);
                echo json_encode($data);
            }     
            catch(Exception $e) {            
                header('HTTP/1.1 500 Internal Server XXX');
                header('Content-Type: application/json; charset=UTF-8');
                die(json_encode(array('message' => 'ERROR:' . $e, 'code' => 666)));
            }
        }

        //CARGAR
        function CargarGasto(){
            try {
                $sql="SELECT id,monto,nombre FROM `formgastos` WHERE idformulario=:idformulario";
                $param= array(':idformulario'=>$_POST["idformulario"]);
                $data= DATA::Ejecutar($sql,$param);
                echo json_encode($data);
            }     
            catch(Exception $e) {            
                header('HTTP/1.1 500 Internal Server XXX');
                header('Content-Type: application/json; charset=UTF-8');
                die(json_encode(array('message' => 'ERROR:' . $e, 'code' => 666)));
            }
        }

    //MODIFICA EL FORMULARIO
    function ModificarAJAX(){
        try {
            $sql="UPDATE formulariopago SET idchofer=:idchofer,idcalculokm=:idcalculokm,fecha=:fechaingreso,contenedor=:contenedor,placa=:placa,kms=:kms,
            valorviaje=:valorviaje,valorkm=:valorkm,porcentajeingreso=:porcentajeingreso,totalpago=:totalpago WHERE id=:id;";

            $param= array(':idchofer'=>$_POST["idchofer"],
                            ':idcalculokm'=>$_POST["idcalculokm"],
                            ':fechaingreso'=>$_POST["fechaingreso"],
                            ':contenedor'=>$_POST["contenedor"],
                            ':placa'=>$_POST["placa"],
                            ':kms'=>$_POST["kms"],
                            ':valorviaje'=>$_POST["valorviaje"],
                            ':valorkm'=>$_POST["valorkm"],
                            ':porcentajeingreso'=>$_POST["porcentajeingreso"],
                            ':totalpago'=>$_POST["totalpago"]);
            $result = DATA::Ejecutar($sql, $param);

            //Convierte el string en un arreglo
            $visitantearray = explode(",", $_POST["visitante"]);

            //Elimina los registros segun el arreglo de visitantes
            $sql="DELETE FROM visitanteporformulario WHERE NOT FIND_IN_SET(:id,:EXCLUSION) AND idformulario=:id";
            $param= array(':EXCLUSION'=>$_POST["visitante"],':id'=>$_POST["id"]);

            $result = DATA::Ejecutar($sql, $param);
            
            $longitud = count($visitantearray);

            // formulario temporal, vacia la variable para llenarla con los id de los visitantes.
            if(isset( $_SESSION['TEMP']))
                $_SESSION['TEMP']="";

            //Recorre el arreglo e inserta cada item en la tabla intermedia
            for ($i=0; $i<$longitud; $i++) {
                // formulario temporal, agrega los idvisitante.
                if(isset( $_SESSION['TEMP'])){
                    $_SESSION['TEMP'] = $_SESSION['TEMP'] . $visitantearray[$i] . '-' . $this->estado . ',';
                }
                
                //Si no existe Inserta
                $existe="SELECT id FROM visitanteporformulario  WHERE idvisitante = :idvisitante AND idformulario = :id";
                $parametro= array(':idvisitante'=>$visitantearray[$i],':id'=>$_POST["id"]);
                $resultadoexiste= DATA::Ejecutar($existe, $parametro);

                if(count($resultadoexiste)==0){
                    $sql="INSERT INTO visitanteporformulario(idvisitante,idformulario) VALUES(:idvisitante,:id)";
                    $param= array(':idvisitante'=>$visitantearray[$i],':id'=>$_POST["id"]);
                    $result = DATA::Ejecutar($sql, $param);
                }
            }       
            header('Location:../ListaFormulario.php');           
            exit;
        } catch (Exception $e) {
            header('Location: ../Error.php?w=visitante-agregar&id='.$e->getMessage());
            exit;
        }
    }
}
