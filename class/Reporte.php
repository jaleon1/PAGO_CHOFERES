<?php
//ob_start();
if (!isset($_SESSION)) {
    session_start();
}

if(isset($_POST["action"])){
    $reporte= new Reporte();   
    switch($_POST["action"]){       
        case "ConsultaGeneral":                 
            echo json_encode($reporte->ConsultaGeneral());
            break;
        case "ConsultaChofer":
            echo json_encode($reporte->ConsultaChofer($_POST["idchofer"]));
            break;
    }
}

class Reporte
{       
    function __construct(){
        require_once("Conexion.php");
    }
    
    //CONSULTA FORMULARIO PARA LLENAR TABLA
    function ConsultaGeneral(){
        try {
            $sql = "SELECT f.id, f.comprobante, c.nombre as chofer,f.fecha, f.contenedor, f.placa, fin.nombre as finca, nav.nombre as naviera, kms, valorkm, totalpago
                FROM formulariopago f inner join calculokm cal on cal.id=f.idcalculokm
                    inner join finca fin on fin.id=cal.idfinca
                    inner join naviera nav on nav.id=cal.idnaviera
                    inner join chofer c on c.id=f.idchofer
                ORDER BY comprobante DESC";
             //$param= array(':id'=>$this->id);
             $data= DATA::Ejecutar($sql);
             return $data;
        } catch (Exception $e) {
            //header('Location: ../Error.php?w=visitante-bitacora&id='.$e->getMessage());
            //exit;
        }
    }

    function ConsultaChofer($idchofer){
        try {
            $sql = "SELECT f.id, f.comprobante, c.nombre as chofer,f.fecha, f.contenedor, f.placa, fin.nombre as finca, nav.nombre as naviera, kms, valorkm, totalpago
                FROM formulariopago f inner join calculokm cal on cal.id=f.idcalculokm
                    inner join finca fin on fin.id=cal.idfinca
                    inner join naviera nav on nav.id=cal.idnaviera
                    inner join chofer c on c.id=f.idchofer
                WHERE c.id= :idchofer
                ORDER BY comprobante DESC";
             $param= array(':idchofer'=>$idchofer);
             $data= DATA::Ejecutar($sql, $param);
             return $data;
        } catch (Exception $e) {
            //header('Location: ../Error.php?w=visitante-bitacora&id='.$e->getMessage());
            //exit;
        }
    }
}
