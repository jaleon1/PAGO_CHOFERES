<?php
if (!isset($_SESSION))
    session_start();
require_once('Globals.php');
require_once("Conexion.php");
require_once("Log.php");

//Globals::ConfiguracionIni();

if(isset($_POST["action"])){
    $gasto= new Gasto();
    switch($_POST["action"]){       
        case "LoadAll":
            echo json_encode($gasto->LoadAll());
            break;
        case "Load":
            $gasto->id=$_POST["id"];
            echo json_encode($gasto->Load());
            break;
        case "Insert":
            $gasto->nombre= $_POST["nombre"];
            $gasto->monto= $_POST["monto"];
            $gasto->Insert();
            break;
        case "Update":
            $gasto->id= $_POST["id"];
            $gasto->nombre= $_POST["nombre"];
            $gasto->monto= $_POST["monto"];            
            $gasto->Update();
            break;
        case "Delete":
            $gasto->id= $_POST["id"];            
            $gasto->Delete();
            break;   
    }
}

class Gasto{
    public $id='';
    public $nombre='';
    public $monto=0;

    function __construct(){
        require_once('Globals.php');
        require_once("Conexion.php");
        require_once("Log.php");
    }

    function LoadAll(){
        try {
            $sql='SELECT id, nombre, monto
                FROM     gasto       
                ORDER BY nombre asc';
            $data= DATA::Ejecutar($sql);
            return $data;
        }     
        catch(Exception $e) {   
        }
    }

    function Load(){
        try {
            $sql='SELECT id, nombre, monto
                FROM gasto  
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
            $sql="INSERT INTO gasto   (id,nombre, monto)
                VALUES (uuid(),:nombre, :monto)";              
            //
            $param= array(':nombre'=>$this->nombre,':monto'=>$this->monto );
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
            $sql="UPDATE gasto 
                SET nombre=:nombre, monto=:monto
                WHERE id=:id";
            $param= array(':id'=>$this->id, ':nombre'=>$this->nombre,':monto'=>$this->monto);
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
                WHERE R.idgasto= :id";                
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
            $sql='DELETE FROM gasto  
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