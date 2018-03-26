<?php
if (!isset($_SESSION))
    session_start();
require_once('Globals.php');
require_once("Conexion.php");
require_once("Log.php");

//Globals::ConfiguracionIni();

if(isset($_POST["action"])){
    $puntodescarga= new PuntoDescarga();
    switch($_POST["action"]){       
        case "LoadAll":
            echo json_encode($puntodescarga->LoadAll());
            break;
        case "Load":
            $puntodescarga->id=$_POST["id"];
            echo json_encode($puntodescarga->Load());
            break;
        case "Insert":
            $puntodescarga->nombre= $_POST["nombre"];
            $puntodescarga->ubicacion= $_POST["ubicacion"];
            $puntodescarga->telefono= $_POST["telefono"];
            $puntodescarga->Insert();
            break;
        case "Update":
            $puntodescarga->id= $_POST["id"];
            $puntodescarga->nombre= $_POST["nombre"];
            $puntodescarga->ubicacion= $_POST["ubicacion"];            
            $puntodescarga->telefono= $_POST["telefono"];
            $puntodescarga->Update();
            break;
        case "Delete":
            $puntodescarga->id= $_POST["id"];            
            echo json_encode($puntodescarga->Delete());
            break;   
    }
}

class PuntoDescarga{
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
                FROM     puntodescarga       
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
                FROM puntodescarga  
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
            $sql="INSERT INTO puntodescarga   (id,nombre, ubicacion, telefono)
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
            $sql="UPDATE puntodescarga 
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
                FROM colocaciondiaria c
                WHERE c.idpuntodescarga= :id";                
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
            if($this->CheckRelatedItems()){
                //$sessiondata array que devuelve si hay relaciones del objeto con otras tablas.
                $sessiondata['status']=1; 
                $sessiondata['msg']='Registro en uso'; 
                return $sessiondata;                
            }                
            $sql='DELETE FROM puntodescarga  
            WHERE id= :id';
            $param= array(':id'=>$this->id);
            $data= DATA::Ejecutar($sql, $param, true);
            if($data)
                return $sessiondata['status']=0; 
            else var_dump(http_response_code(500)); // error 
        }
        catch(Exception $e) {            
            // log::AddD('FATAL', 'Ha ocurrido un error al realizar la Entrada del Visitante', e->getMessage());
            // var_dump(http_response_code(500)); // error ajax
        }
    }

}



?>  