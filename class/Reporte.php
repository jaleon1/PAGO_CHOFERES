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
        case "ConsultaFiltro":
            echo json_encode($reporte->ConsultaFiltro($_POST["idfiltro"], $_POST["tipo"]));
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

    function ConsultaFiltro($idfiltro, $tipo){
        try {
            switch($tipo){
                case 'chofer':
                    $tablafiltro = 'c';
                    break;
                case 'naviera':
                    $tablafiltro = 'nav';
                    break;
                case 'finca':
                    $tablafiltro = 'fin';
                    break;
            }
            $sql = "SELECT f.id, f.comprobante, c.nombre as chofer,f.fecha, f.contenedor, f.placa, fin.nombre as finca, nav.nombre as naviera, kms, valorkm, totalpago
                FROM formulariopago f inner join calculokm cal on cal.id=f.idcalculokm
                    inner join finca fin on fin.id=cal.idfinca
                    inner join naviera nav on nav.id=cal.idnaviera
                    inner join chofer c on c.id=f.idchofer
                WHERE $tablafiltro.id= :idfiltro
                ORDER BY comprobante DESC";
             $param= array(':idfiltro'=>$idfiltro);
             $data= DATA::Ejecutar($sql, $param);
             return $data;
        } catch (Exception $e) {
            //header('Location: ../Error.php?w=visitante-bitacora&id='.$e->getMessage());
            //exit;
        }
    }
}
