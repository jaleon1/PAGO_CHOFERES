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
    if($_POST["action"]=="ModificarEstado"){
        $formulario= new formulario();
        $formulario->ModificarEstado();
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
            $duplicado='dup';
            $ingresado='ing';
            $suma = "SELECT comprobante FROM formulariopago ORDER BY comprobante DESC LIMIT 1";
            $ultimo_comprobante = DATA::Ejecutar($suma);
            $comprobante = $ultimo_comprobante[0][0]+1;

            //CONTENEDOR DUPLICADO
            $contenedorduplicado = "SELECT count(*) FROM formulariopago WHERE contenedor=:contenedor";
            $param= array(':contenedor'=>$_POST["contenedor"]);
            $result = DATA::Ejecutar($contenedorduplicado,$param);
            if ($result[0][0]>0) {
                echo json_encode($duplicado);
                exit();
            }

            $valorkm = 1.9;
            $sql="INSERT INTO `formulariopago` (`id`, `comprobante`, `idchofer`, `idcalculokm`, `fecha`, `fechacarga`, `contenedor`, `placa`,`kms`, 
            `valorviaje`, `valorkm`, `porcentajeingreso`, `totalpago`, `estado`,booking) VALUES (uuid(),:comprobante,:idchofer,:idcalculokm,now(),:fechacarga,
            :contenedor,:placa,:kms,:valorviaje,:valorkm,:porcentajeingreso,:totalpago,:estado,:booking);";
            $param= array(  ':comprobante'=>$comprobante,
                            ':idchofer'=>$_POST["idchofer"],
                            ':idcalculokm'=>$_POST["idcalculokm"],
                            ':fechacarga'=>$_POST["fechacarga"],
                            ':contenedor'=>$_POST["contenedor"],
                            ':placa'=>$_POST["placa"],               
                            ':kms'=>$_POST["kms"],
                            ':valorviaje'=>$_POST["valorviaje"],
                            ':valorkm'=>$valorkm,
                            ':porcentajeingreso'=>15,
                            ':totalpago'=>$_POST["totalpago"],
                            ':estado'=>0,
                            ':booking'=>$_POST["booking"]);
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
            echo json_encode($ingresado);
        } catch (Exception $e) {
            exit;
        }
    }

    function Modificar(){
        try {
            // $valorkm = '1,9';
            $sql="UPDATE `formulariopago` SET `idchofer`=:idchofer,`idcalculokm`=:idcalculokm,`fechacarga`=:fechacarga,`contenedor`=:contenedor,`placa`=:placa,
            `kms`=:kms,`valorviaje`=:valorviaje,`valorkm`=:valorkm,`porcentajeingreso`=:porcentajeingreso,`totalpago`=:totalpago,`estado`=:estado WHERE id = :id;";
            $param= array(  ':id'=>$_POST["id"],
                            ':idchofer'=>$_POST["idchofer"],
                            ':idcalculokm'=>$_POST["idcalculokm"],
                            ':fechacarga'=>$_POST["fechacarga"],
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
            $sql="SELECT f.id, f.comprobante, c.nombre as chofer,DATE_FORMAT(f.fechacarga, '%Y-%m-%dT%H:%i'), f.contenedor, f.placa, fin.nombre as finca, nav.nombre as naviera, kms, valorkm,valorviaje, totalpago,f.idchofer,f.idcalculokm
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

        //MODIFICA ESTADO DEL EL FORMULARIO
        function ModificarEstado(){
            try {
                $sql="UPDATE formulariopago SET estado=:estado WHERE id=:id;";
    
                $param= array(':estado'=>$_POST["estado"],':id'=>$_POST["id"]);
                $result = DATA::Ejecutar($sql, $param);
                return true;           
                exit;
            } catch (Exception $e) {
                header('Location: ../Error.php?w=visitante-agregar&id='.$e->getMessage());
                exit;
            }
        }
}
