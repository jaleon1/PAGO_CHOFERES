<?php
//ob_start();
if (!isset($_SESSION)) {
    session_start();
}

if(isset($_POST["action"])){
    $colocacion= new Colocacion();   
    switch($_POST["action"]){    
        case "LoadAll":
        echo json_encode($colocacion->LoadAll());
        break;   
        case "ConsultaFecha":                 
            echo json_encode($colocacion->ConsultaFecha());
            break;
        case "Insert":
        $colocacion->idchofer= $_POST["idchofer"];
        $colocacion->fechacarga= $_POST["fechacarga"];
        $colocacion->idcontenedor= $_POST["idcontenedor"];
        $colocacion->idpuntocarga= $_POST["idpuntocarga"];
        $colocacion->idpuntodescarga= $_POST["idpuntodescarga"];
        $colocacion->Insert();
        break;
    }
}

class Colocacion
{       
    function __construct(){
        require_once("Conexion.php");
    }

    function LoadAll(){
        try {
            $sql='SELECT CD.id, CD.idchofer,(SELECT nombre FROM chofer WHERE id=CD.idchofer) as chofer, CD.fechacarga, 
            CD.idcontenedor, (SELECT contenedor FROM contenedor WHERE id=CD.idcontenedor) as contenedor, 
            CD.idpuntocarga, (SELECT nombre FROM puntocarga WHERE id=CD.idpuntocarga) as puntocarga, 
            CD.idpuntodescarga,C.marchamo , C.capacidad FROM colocaciondiaria CD INNER JOIN contenedor C ON C.id=CD.idcontenedor         
                ORDER BY CD.fechacarga asc';
            $data= DATA::Ejecutar($sql);
            return $data;
        }     
        catch(Exception $e) {   
        }
    }
    
    //CONSULTA FORMULARIO PARA LLENAR TABLA
    function ConsultaFecha(){
        try {
            $sql = "SELECT f.id, c.nombre as chofer,f.fechacarga, f.contenedor, fin.nombre as puntocarga, nav.nombre as puntodescarga FROM formulariopago f 
            inner join calculokm cal on cal.id=f.idcalculokm 
            inner join finca fin on fin.id=cal.idfinca 
            inner join naviera nav on nav.id=cal.idnaviera 
            inner join chofer c on c.id=f.idchofer 
            WHERE estado=:estado AND DATE(fechacarga) = :fechacarga ORDER BY fechacarga ASC";
            
            $param= array(':estado'=>$_POST["estado"],':fechacarga'=>$_POST["fechacarga"]);
            $data= DATA::Ejecutar($sql,$param);
            return $data;
        } catch (Exception $e) {
            //header('Location: ../Error.php?w=visitante-bitacora&id='.$e->getMessage());
            //exit;
        }
    }

    function Insert(){
        try {
            $sql="INSERT INTO `colocaciondiaria`(`id`, `idchofer`, `fechacarga`, `idcontenedor`, `idpuntocarga`, `idpuntodescarga`) 
            VALUES (uuid(), :idchofer, :fechacarga, :idcontenedor, :idpuntocarga, :idpuntodescarga)";              
            $param= array(':idchofer'=>$this->idchofer,':fechacarga'=>$this->fechacarga,':idcontenedor'=>$this->idcontenedor, ':idpuntocarga'=>$this->idpuntocarga, 
            ':idpuntodescarga'=>$this->idpuntodescarga);
            $data = DATA::Ejecutar($sql,$param,true);
            $sql="UPDATE contenedor SET estado=true WHERE id=:idcontenedor";
            $param= array(':idcontenedor'=>$this->idcontenedor);
            DATA::Ejecutar($sql,$param,true);

            if($data)
            {
                return true;
            }
            else var_dump(http_response_code(500)); // error
        }     
        catch(Exception $e) {
        }
    }

}
?>