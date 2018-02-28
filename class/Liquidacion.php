<?php
//ob_start();
if (!isset($_SESSION)) {
    session_start();
}

if(isset($_POST["action"])){
    $liquidacion= new Liquidacion();   
    switch($_POST["action"]){       
        case "Consulta":                 
            echo json_encode($colocacion->Consulta());
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
            $sql = "SELECT f.id, c.nombre as chofer,f.fechacarga, f.contenedor, fin.nombre as puntocarga, nav.nombre as puntodescarga,f.totalpago FROM formulariopago f 
            inner join calculokm cal on cal.id=f.idcalculokm 
            inner join finca fin on fin.id=cal.idfinca 
            inner join naviera nav on nav.id=cal.idnaviera 
            inner join chofer c on c.id=f.idchofer 
            WHERE estado=:estado AND c.id=:idchofer ORDER BY fechacarga ASC";
            
            $param= array(':estado'=>$_POST["estado"],':idchofer'=>$_POST["idchofer"]);
            $data= DATA::Ejecutar($sql,$param);
            return $data;
        } catch (Exception $e) {
            //header('Location: ../Error.php?w=visitante-bitacora&id='.$e->getMessage());
            //exit;
        }
    }

}
?>