<?php
if (!isset($_SESSION))
    session_start();
require_once('Globals.php');
require_once("Conexion.php");
require_once("Log.php");

//Globals::ConfiguracionIni();

if(isset($_POST["action"])){
    $ingreso= new Ingreso();
    switch($_POST["action"]){       
        case "LoadAll":
            echo json_encode($ingreso->LoadAll());
            break;
        case "Load":
            $ingreso->id=$_POST["id"];
            echo json_encode($ingreso->Load());
            break;
        case "Insert":
            $ingreso->nombre= $_POST["nombre"];
            $ingreso->monto= $_POST["monto"];
            $ingreso->porcentaje= $_POST["porcentaje"];
            $ingreso->Insert();
            break;
        case "Update":
            $ingreso->id= $_POST["id"];
            $ingreso->nombre= $_POST["nombre"];
            $ingreso->monto= $_POST["monto"];            
            $ingreso->porcentaje= $_POST["porcentaje"];
            $ingreso->Update();
            break;
        case "Delete":
            $ingreso->id= $_POST["id"];            
            $ingreso->Delete();
            break;   
    }
}

class Ingreso{
    public $id='';
    public $nombre='';
    public $monto=0;
    public $porcentaje=0;

    function __construct(){
        require_once('Globals.php');
        require_once("Conexion.php");
        require_once("Log.php");
    }

    function LoadAll(){
        try {
            $sql='SELECT id, nombre, monto, porcentaje
                FROM     ingreso       
                ORDER BY nombre asc';
            $data= DATA::Ejecutar($sql);
            return $data;
        }     
        catch(Exception $e) {   
        }
    }

    function Load(){
        try {
            $sql='SELECT id, nombre, monto, porcentaje
                FROM ingreso  
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
            $sql="INSERT INTO ingreso   (id,nombre, monto, porcentaje)
                VALUES (uuid(),:nombre, :monto, :porcentaje )";              
            //
            $param= array(':nombre'=>$this->nombre,':monto'=>$this->monto,':porcentaje'=>$this->porcentaje );
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
            $sql="UPDATE ingreso 
                SET nombre=:nombre, monto=:monto, porcentaje=:porcentaje 
                WHERE id=:id";
            $param= array(':id'=>$this->id, ':nombre'=>$this->nombre,':monto'=>$this->monto,':porcentaje'=>$this->porcentaje);
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
                WHERE R.idingreso= :id";                
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
            $sql='DELETE FROM ingreso  
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