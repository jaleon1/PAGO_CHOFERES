<?php
if (!isset($_SESSION))
    session_start();
require_once('Globals.php');
require_once("Conexion.php");
require_once("Log.php");

//Globals::ConfiguracionIni();

if(isset($_POST["action"])){
    $chofer= new Chofer();
    switch($_POST["action"]){       
        case "LoadAll":
            echo json_encode($chofer->LoadAll());
            break;
        // case "Load":
        //     $chofer->id=$_POST["id"];
        //     echo json_encode($task->LoadDatabyID());
        //     break;
        // case "Insert":
        //     $chofer->xxx= $_POST["xxx"];
        //     $chofer->xxx= $_POST["xxx"];
        //     $chofer->xxx= $_POST["xxx"];
        //     $chofer->Insert();
        //     break;
        // case "Update":
        //     $visitante->ID= $_POST["idvisitante"];
        //     $visitante->cedula= $_POST["cedula"];
        //     $visitante->nombre= $_POST["nombre"];
        //     $visitante->empresa= $_POST["empresa"];
        //     $visitante->permisoanual= $_POST["permiso"];
        //     $visitante->Modificar();
        //     break;
        // case "Delete":
        //     $visitante->ID= $_POST["idvisitante"];            
        //     $visitante->Eliminar();
        //     break;   
    }
}

class Task{
    public $id='';
    public $nombre='';
    public $cedula='';
    public $telefono='';
    public $cuenta='';

    function __construct(){
        require_once('Globals.php');
        require_once("Conexion.php");
        require_once("Log.php");
    }

    function LoadAll(){
        try {
            $sql='SELECT id, nombre, cedula, telefono, cuenta 
                FROM pagochofer.chofer                
                ORDER BY nombre asc';
            $data= DATA::Ejecutar($sql);
            return $data;
        }     
        catch(Exception $e) {            
            //log::AddD('FATAL', 'Ha ocurrido un error al realizar la carga de datos', $e->getMessage());
            //$_SESSION['errmsg']= $e->getMessage();
            //header('Location: ../Error.php');            
            //exit;
        }
    }

    // function LoadDatabyID(){
    //     try {
    //         $sql='SELECT 
    //             FROM chofer  
    //             where id=:id';
    //         $param= array(':id'=>$this->id);
    //         $data= DATA::Ejecutar($sql,$param);
    //         return $data;
    //     }     
    //     catch(Exception $e) {            
    //         //log::AddD('FATAL', 'Ha ocurrido un error al realizar la carga de datos', $e->getMessage());
    //         $_SESSION['errmsg']= $e->getMessage();
    //         header('Location: ../Error.php');            
    //         exit;
    //     }
    // }

}



?>