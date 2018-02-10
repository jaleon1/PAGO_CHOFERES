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
        case "Insert":
            $chofer->nombre= $_POST["nombre"];
            $chofer->cedula= $_POST["cedula"];
            $chofer->telefono= $_POST["telefono"];
            $chofer->cuenta= $_POST["cuenta"];
            $chofer->correo= $_POST["correo"];
            $chofer->Insert();
            break;
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

class Chofer{
    public $id='';
    public $nombre='';
    public $cedula='';
    public $telefono='';
    public $cuenta='';
    public $correo='';

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

    function Insert(){
        try {
            $sql="INSERT INTO chofer (id,nombre, cedula, telefono, cuenta)
                VALUES (uuid(),:nombre, :cedula, :telefono, :cuenta)";              
            //
            $param= array(':nombre'=>$this->nombre,':cedula'=>$this->cedula,':telefono'=>$this->telefono, ':cuenta'=>$this->cuenta);
            $data = DATA::Ejecutar($sql,$param,true);
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