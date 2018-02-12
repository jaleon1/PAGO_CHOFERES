<?php
if (!isset($_SESSION))
    session_start();
require_once('Globals.php');
require_once("Conexion.php");
require_once("Log.php");

//Globals::ConfiguracionIni();

if(isset($_POST["action"])){
    $finca= new Finca();
    switch($_POST["action"]){       
        case "LoadAll":
            echo json_encode($finca->LoadAll());
            break;
        case "Load":
            $finca->id=$_POST["id"];
            echo json_encode($finca->Load());
            break;
        case "Insert":
            $finca->nombre= $_POST["nombre"];
            $finca->ubicacion= $_POST["ubicacion"];
            $finca->telefono= $_POST["telefono"];
            $finca->Insert();
            break;
        case "Update":
            $finca->id= $_POST["id"];
            $finca->nombre= $_POST["nombre"];
            $finca->ubicacion= $_POST["ubicacion"];            
            $finca->telefono= $_POST["telefono"];
            $finca->Update();
            break;
        case "Delete":
            $finca->id= $_POST["id"];            
            $finca->Delete();
            break;   
    }
}

class Finca{
    public $id='';
    public $nombre='';
    public $ubicacion='';
    public $telefono='';

    function __construct(){
        require_once('Globals.php');
        require_once("Conexion.php");
        require_once("Log.php");
    }

    function LoadAll(){
        try {
            $sql='SELECT id, nombre, ubicacion, telefono
                FROM     finca       
                ORDER BY nombre asc';
            $data= DATA::Ejecutar($sql);
            return $data;
        }     
        catch(Exception $e) {   
        }
    }

    function Load(){
        try {
            $sql='SELECT id, nombre, ubicacion, telefono
                FROM finca  
                where id=:id';
            $param= array(':id'=>$this->id);
            $data= DATA::Ejecutar($sql, $param);
            return $data;
        }     
        catch(Exception $e) {            
            header('HTTP/1.1 500 Internal Server XXX');
            header('Content-Type: application/json; charset=UTF-8');
            die(json_encode(array('message' => 'ERROR:' . $e, 'code' => 666)));
        }
    }

    function Insert(){
        try {
            $sql="INSERT INTO finca   (id,nombre, ubicacion, telefono)
                VALUES (uuid(),:nombre, :ubicacion, :telefono )";              
            //
            $param= array(':nombre'=>$this->nombre,':ubicacion'=>$this->ubicacion,':telefono'=>$this->telefono );
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

    function Update(){
        try {
            $sql="UPDATE finca 
                SET nombre=:nombre, ubicacion=:ubicacion, telefono=:telefono 
                WHERE id=:id";
            $param= array(':id'=>$this->id, ':nombre'=>$this->nombre,':ubicacion'=>$this->ubicacion,':telefono'=>$this->telefono);
            $data = DATA::Ejecutar($sql,$param,true);
            if($data)
                return true;
            else var_dump(http_response_code(500)); // error
        }     
        catch(Exception $e) {
            // log::AddD('FATAL', 'Ha ocurrido un error al realizar la Entrada del Visitante', e->getMessage());
            // header('Location: ../Error.php?w=conectar&id='.e->getMessage());
            // exit;
        }
    }   

    function CheckRelatedItems(){
        try{
            $sql="SELECT id
                FROM formulariopago R
                WHERE R.idfinca= :id";                
            $param= array(':id'=>$this->id);
            $data= DATA::Ejecutar($sql, $param);
            if(count($data))
                return true;
            else return false;
        }
        catch(Exception $e){
            // log::AddD('FATAL', 'Ha ocurrido un error al realizar la Entrada del Visitante', e->getMessage());
            // var_dump(http_response_code(500)); // error ajax
        }
    }

    function Delete(){
        try {
            // if($this->CheckRelatedItems()){
            //     echo "Registro en uso";
            //     return false;
            // }                
            $sql='DELETE FROM finca  
            WHERE id= :id';
            $param= array(':id'=>$this->id);
            $data= DATA::Ejecutar($sql, $param, true);
            if($data)
                return true;
            else var_dump(http_response_code(500)); // error 
        }
        catch(Exception $e) {            
            // log::AddD('FATAL', 'Ha ocurrido un error al realizar la Entrada del Visitante', e->getMessage());
            // var_dump(http_response_code(500)); // error ajax
        }
    }

}



?>  