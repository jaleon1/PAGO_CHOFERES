<?php
if (!isset($_SESSION))
    session_start();
require_once('Globals.php');
require_once("Conexion.php");
require_once("Log.php");

//Globals::ConfiguracionIni();

if(isset($_POST["action"])){
    $naviera= new Naviera();
    switch($_POST["action"]){       
        case "LoadAll":
            echo json_encode($naviera->LoadAll());
            break;
        case "Load":
            $naviera->id=$_POST["id"];
            echo json_encode($naviera->Load());
            break;
        case "Insert":
            $naviera->nombre= $_POST["nombre"];
            $naviera->ubicacion= $_POST["ubicacion"];
            $naviera->telefono= $_POST["telefono"];
            $naviera->Insert();
            break;
        case "Update":
            $naviera->id= $_POST["id"];
            $naviera->nombre= $_POST["nombre"];
            $naviera->ubicacion= $_POST["ubicacion"];            
            $naviera->telefono= $_POST["telefono"];
            $naviera->Update();
            break;
        case "Delete":
            $naviera->id= $_POST["id"];            
            echo json_encode($naviera->Delete());
            break;   
    }
}

class Naviera{
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
                FROM     naviera       
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
                FROM naviera  
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
            $sql="INSERT INTO naviera   (id,nombre, ubicacion, telefono)
                VALUES (uuid(),:nombre, :ubicacion, :telefono)";              
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
            $sql="UPDATE naviera 
                SET nombre=:nombre, ubicacion=:ubicacion, telefono=:telefono
                WHERE id=:id";
            $param= array(':id'=>$this->id, ':nombre'=>$this->nombre,':ubicacion'=>$this->ubicacion,':telefono'=>$this->telefono );
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
                FROM CALCULOKM R  
                WHERE R.idnaviera= :id";                
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
            $sql='DELETE FROM naviera  
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