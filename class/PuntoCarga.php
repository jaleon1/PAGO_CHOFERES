<?php
if (!isset($_SESSION))
    session_start();
require_once('Globals.php');
require_once("Conexion.php");
require_once("Log.php");

//Globals::ConfiguracionIni();

if(isset($_POST["action"])){
    $puntocarga= new PuntoCarga();
    switch($_POST["action"]){       
        case "LoadAll":
            echo json_encode($puntocarga->LoadAll());
            break;
        case "Load":
            $puntocarga->id=$_POST["id"];
            echo json_encode($puntocarga->Load());
            break;
        case "Insert":
            $puntocarga->nombre= $_POST["nombre"];
            $puntocarga->valorviaje= $_POST["valorviaje"];
            $puntocarga->ubicacion= $_POST["ubicacion"];
            $puntocarga->telefono= $_POST["telefono"];
            $puntocarga->Insert();
            break;
        case "Update":
            $puntocarga->id= $_POST["id"];
            $puntocarga->nombre= $_POST["nombre"];
            $puntocarga->valorviaje= $_POST["valorviaje"];
            $puntocarga->ubicacion= $_POST["ubicacion"];            
            $puntocarga->telefono= $_POST["telefono"];
            $puntocarga->Update();
            break;
        case "Delete":
            $puntocarga->id= $_POST["id"];            
            echo json_encode($puntocarga->Delete());
            break;   
    }
}

class PuntoCarga{
    public $id='';
    public $nombre='';
    public $varloviaje='';
    public $ubicacion='';
    public $telefono='';

    function __construct(){
        require_once('Globals.php');
        require_once("Conexion.php");
        require_once("Log.php");
    }

    function LoadAll(){
        try {
            $sql='SELECT id, nombre, valorviaje, ubicacion, telefono
                FROM     puntocarga       
                ORDER BY nombre asc';
            $data= DATA::Ejecutar($sql);
            return $data;
        }     
        catch(Exception $e) {   
        }
    }

    function Load(){
        try {
            $sql='SELECT id, nombre, valorviaje, ubicacion, telefono
                FROM puntocarga  
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
            $sql="INSERT INTO puntocarga   (id,nombre, valorviaje, ubicacion, telefono)
                VALUES (uuid(),:nombre, :valorviaje, :ubicacion, :telefono )";              
            //
            $param= array(':nombre'=>$this->nombre,':valorviaje'=>$this->varloviaje,':ubicacion'=>$this->ubicacion,':telefono'=>$this->telefono );
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
            $sql="UPDATE puntocarga 
                SET nombre=:nombre, valorviaje=:valorviaje, ubicacion=:ubicacion, telefono=:telefono 
                WHERE id=:id";
            $param= array(':id'=>$this->id, ':nombre'=>$this->nombre, ':valorviaje'=>$this->varloviaje, ':ubicacion'=>$this->ubicacion,':telefono'=>$this->telefono);
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
                WHERE c.idpuntocarga= :id";                
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
            $sql='DELETE FROM puntocarga  
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