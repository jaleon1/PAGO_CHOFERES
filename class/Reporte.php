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
            //
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
                    $where .= ' c.id= :idfiltro ';
                    break;
                case 'naviera':
                    $where .= ' nav.id= :idfiltro ';
                    break;
                case 'finca':
                    $where .= ' fin.id= :idfiltro ';
                    break;
            }
            //
            switch($filtrofecha){
                case 'Total':
                    $inidate = date("Y-m-d", strtotime("1900-01-01"));
                    $findate =  date('Y-m-d', strtotime("+1 days"));
                    $where .=  ($where!='' ? ' and ': '') . " f.fecha between '". $inidate ."' and '". $findate ."' ";
                    break;
                case 'Diario':
                    $inidate = date("Y-m-d");;
                    $findate = date('Y-m-d', strtotime("+1 days"));
                    $where .=  ($where!='' ? ' and ': '') . " f.fecha between '". $inidate ."' and '". $findate ."' ";
                    break;
                case 'Mensual':
                    $where .=  ($where!='' ? ' and ': '') .' MONTH(f.fecha) = MONTH(curdate()) ';
                    break;
                case 'Semanal':
                    $where .= ($where!='' ? ' and ': '') .' YEARWEEK(f.fecha) = YEARWEEK(curdate()) ';
                    break;
                case 'Anual':
                    $where .= ($where!='' ? ' and ': '') .' YEAR(f.fecha) = YEAR(curdate()) ';
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
