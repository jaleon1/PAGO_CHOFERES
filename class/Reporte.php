<?php
//ob_start();
if (!isset($_SESSION)) {
    session_start();
}

if(isset($_POST["action"])){
    if($_POST["action"]=="ConsultaFormulario"){
        $reporte= new Reporte();
        $reporte->Consulta();
    }
}

class Reporte
{       
    function __construct(){
        require_once("Conexion.php");
    }
    
    //CONSULTA FORMULARIO PARA LLENAR TABLA
    function Consulta(){
        try {
            $sql = "SELECT id,comprovante,contenedor,placa,fecha,(SELECT nombre FROM naviera WHERE id=(SELECT id FROM naviera WHERE id=idcalculokm)),
            (SELECT nombre FROM chofer WHERE id=idchofer),kms,porcentajeingreso,totalpago,valorkm,valorviaje 
            FROM formulariopago ORDER BY comprovante DESC;";
            $data = DATA::Ejecutar($sql);
            //
            if (count($data)) {
                $this->id= $data[0]['id'];
                $this->comprovante= $data[0]['comprovante'];
                $this->placa= $data[0]['placa'];
                $this->fecha= $data[0]['fecha'];
                $this->naviera= $data[0]['naviera'];
                $this->chofer= $data[0]['chofer'];
                $this->kms= $data[0]['kms'];
                $this->porcentajeingreso= $data[0]['porcentajeingreso'];
                $this->totalpago= $data[0]['totalpago'];
                $this->valorkm= $data[0]['valorkm'];
                $this->valorviaje= $data[0]['valorviaje'];
            }
            //
            echo json_encode($data);
        } catch (Exception $e) {
            header('Location: ../Error.php?w=visitante-bitacora&id='.$e->getMessage());
            exit;
        }
    }
}
