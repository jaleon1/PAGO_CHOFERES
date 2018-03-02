<?php
//ob_start();
if (!isset($_SESSION)) {
    session_start();
}

if(isset($_POST["action"])){
    $liquidacion= new Liquidacion();   
    switch($_POST["action"]){       
        case "Consulta":                 
            echo json_encode($liquidacion->Consulta());
            break;
        case "CargarIngreso":                 
            echo json_encode($liquidacion->CargarIngreso());
        break; 
        case "CargarGasto":                 
            echo json_encode($liquidacion->CargarGasto());
        break;                   
    }
}

class Liquidacion
{       
    function __construct(){
        require_once("Conexion.php");
    }
    
    //CONSULTA FORMULARIO PARA LLENAR TABLA
    function Consulta(){
        try {
            $sql = "SELECT f.id, c.nombre as chofer,f.fechacarga, f.contenedor, fin.nombre as puntocarga, 
            nav.nombre as puntodescarga,f.totalpago FROM formulariopago f 
            inner join calculokm cal on cal.id=f.idcalculokm 
            inner join finca fin on fin.id=cal.idfinca 
            inner join naviera nav on nav.id=cal.idnaviera 
            inner join chofer c on c.id=f.idchofer 
            WHERE estado=:estado AND (DATE(f.fechacarga) <= :fechafinal AND 
            DATE(f.fechacarga) >= :fechainicial) AND f.idchofer=:idchofer ORDER BY fechacarga ASC";
            
            $param= array(':estado'=>$_POST["estado"],
                          ':idchofer'=>$_POST["idchofer"],
                          ':fechafinal'=>$_POST["fechafinal"],
                          ':fechainicial'=>$_POST["fechainicial"]);
            $data= DATA::Ejecutar($sql,$param);
            return $data;
        } catch (Exception $e) {
            //header('Location: ../Error.php?w=visitante-bitacora&id='.$e->getMessage());
            //exit;
        }
    }

    //CARGAR
    function CargarIngreso(){
        try {
            $sql="SELECT fi.id, fi.nombre,fi.monto FROM formingresos fi inner join formulariopago fp on fp.id=fi.idformulario 
            WHERE fp.estado=:estado AND (DATE(fp.fechacarga) <= :fechafinal AND DATE(fp.fechacarga) >= :fechainicial) 
            AND fp.idchofer=:idchofer";
            $param= array(':estado'=>$_POST["estado"],':fechafinal'=>$_POST["fechafinal"],':fechainicial'=>$_POST["fechainicial"],':idchofer'=>$_POST["idchofer"]);
            $data= DATA::Ejecutar($sql,$param);
            return $data;
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
                $sql="SELECT fg.id, fg.nombre,fg.monto FROM formgastos fg inner join formulariopago fp on fp.id=fg.idformulario 
                WHERE fp.estado=:estado AND (DATE(fp.fechacarga) <= :fechafinal AND DATE(fp.fechacarga) >= :fechainicial) 
                AND fp.idchofer=:idchofer";
                $param= array(':estado'=>$_POST["estado"],':fechafinal'=>$_POST["fechafinal"],':fechainicial'=>$_POST["fechainicial"],':idchofer'=>$_POST["idchofer"]);
                $data= DATA::Ejecutar($sql,$param);
                return $data;
            }     
            catch(Exception $e) {            
                header('HTTP/1.1 500 Internal Server XXX');
                header('Content-Type: application/json; charset=UTF-8');
                die(json_encode(array('message' => 'ERROR:' . $e, 'code' => 666)));
            }
        }


}
?>