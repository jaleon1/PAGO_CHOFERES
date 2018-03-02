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
        case "Load":
            $chofer->id=$_POST["id"];
            echo json_encode($chofer->Load());
            break;
        case "Insert":
            $chofer->nombre= $_POST["nombre"];
            $chofer->cedula= $_POST["cedula"];
            $chofer->telefono= $_POST["telefono"];
            $chofer->cuenta= $_POST["cuenta"];
            $chofer->correo= $_POST["correo"];
            $chofer->Insert();
            break;
        case "Update":
            $chofer->id= $_POST["id"];
            $chofer->cedula= $_POST["cedula"];
            $chofer->nombre= $_POST["nombre"];
            $chofer->telefono= $_POST["telefono"];
            $chofer->cuenta= $_POST["cuenta"];
            $chofer->correo= $_POST["correo"];
            $chofer->Update();
            break;
        case "Delete":
            $chofer->id= $_POST["id"];            
            echo json_encode($chofer->Delete());
            break;   
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

    function Load(){
        try {
            $sql='SELECT id, nombre, cedula, telefono, cuenta , correo
                FROM chofer  
                where id=:id';
            $param= array(':id'=>$this->id);
            $data= DATA::Ejecutar($sql,$param);
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
            $sql="INSERT INTO chofer (id,nombre, cedula, telefono, cuenta , correo)
                VALUES (uuid(),:nombre, :cedula, :telefono, :cuenta , :correo)";              
            //
            $param= array(':nombre'=>$this->nombre,':cedula'=>$this->cedula,':telefono'=>$this->telefono, ':cuenta'=>$this->cuenta, ':correo'=>$this->correo);
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
            $sql="UPDATE chofer
                SET nombre=:nombre, cedula=:cedula, telefono=:telefono, cuenta=:cuenta, correo=:correo
                WHERE id=:id";
            $param= array(':id'=>$this->id, ':nombre'=>$this->nombre,':cedula'=>$this->cedula,':telefono'=>$this->telefono, 'cuenta'=>$this->cuenta , 'correo'=>$this->correo );
            $data = DATA::Ejecutar($sql,$param,true);
            if($data)
                return true;
            else var_dump(http_response_code(500)); // error
        }     
        catch(Exception $e) {
            // log::AddD('FATAL', 'Ha ocurrido un error al realizar la Entrada del Visitante', $e->getMessage());
            // header('Location: ../Error.php?w=conectar&id='.$e->getMessage());
            // exit;
        }
    }   

    function CheckRelatedItems(){
        try{
            $sql="SELECT id
                FROM formulariopago F  
                WHERE F.idchofer= :id";                
            $param= array(':id'=>$this->id);
            $data= DATA::Ejecutar($sql, $param);
            if(count($data))
                return true;
            else return false;
        }
        catch(Exception $e){
            // log::AddD('FATAL', 'Ha ocurrido un error al realizar la Entrada del Visitante', $e->getMessage());
            // var_dump(http_response_code(500)); // error ajax
        }
    }

    function Delete(){
        try {
            if($this->CheckRelatedItems()){
                 //$sessiondata array que devuelve si hay relaciones del objeto con otras tablas.
                 $sessiondata['status']=1; 
                 $sessiondata['msg']='Registro en uso'; 
                 return $sessiondata;           
            }                
            $sql='DELETE FROM chofer 
            WHERE id= :id';
            $param= array(':id'=>$this->id);
            $data= DATA::Ejecutar($sql, $param, true);
            if($data)
                return $sessiondata['status']=0; 
            else var_dump(http_response_code(500)); // error 
        }
        catch(Exception $e) {            
            // log::AddD('FATAL', 'Ha ocurrido un error al realizar la Entrada del Visitante', $e->getMessage());
            // var_dump(http_response_code(500)); // error ajax
        }
    }

}



?>