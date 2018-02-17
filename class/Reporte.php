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
        case "ConsultaFiltroFecha":
            echo json_encode($reporte->ConsultaFiltro($_POST["idfiltro"], $_POST["tipo"], $_POST["filtrofecha"] ));
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

    function ConsultaFiltro($idfiltro=NULL, $tipo=NULL, $filtrofecha=NULL){
        try {
            // Construye el where
            date_default_timezone_set("America/Costa_Rica");
            $where= '';
            switch($tipo){
                case 'chofer':
                    $where = ' c.id= :idfiltro ';
                    break;
                case 'naviera':
                    $where = ' nav.id= :idfiltro ';
                    break;
                case 'finca':
                    $where = ' fin.id= :idfiltro ';
                    break;
            }
            switch($filtrofecha){
                case 'Diario':
                    $inidate = new DateTime();
                    $inidate->sub(new DateInterval('P1D'));

                    $where += ' f.fecha between  $inidate and $final ';
                    break;
                case 'Mensual':
                    $where += ' ';
                    break;
                case 'Semanal':
                    $where += '  ';
                    break;
                case 'Anual':
                    $where= '';
                    break;
            }
            //
            $sql = "SELECT f.id, f.comprobante, c.nombre as chofer,f.fecha, f.contenedor, f.placa, fin.nombre as finca, nav.nombre as naviera, kms, valorkm, totalpago
                FROM formulariopago f inner join calculokm cal on cal.id=f.idcalculokm
                    inner join finca fin on fin.id=cal.idfinca
                    inner join naviera nav on nav.id=cal.idnaviera
                    inner join chofer c on c.id=f.idchofer
                WHERE $where
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
