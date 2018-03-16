<?php
if (!isset($_SESSION))
    session_start();
require_once('Globals.php');
require_once("Conexion.php");
require_once("Log.php");


if(isset($_POST["action"])){
    $contenedor= new Contenedor();
    switch($_POST["action"]){       
        case "LoadAll":
            echo json_encode($contenedor->LoadAll());
            break;
        case "Load":
            $contenedor->id=$_POST["id"];
            echo json_encode($contenedor->Load());
            break;
        case "Insert":
            $contenedor->fechaingreso= $_POST["fechaingreso"];
            $contenedor->idnaviera= $_POST["idnaviera"];
            $contenedor->idchofer= $_POST["idchofer"];
            $contenedor->contenedor= $_POST["contenedor"];
            $contenedor->marchamo= $_POST["marchamo"];
            $contenedor->booking= $_POST["booking"];
            $contenedor->capacidad= $_POST["capacidad"];
            $contenedor->predio= $_POST["predio"];
            $contenedor->curena= $_POST["curena"];
            $contenedor->Insert();
            break;
        case "Update":
            $contenedor->id= $_POST["id"];
            $contenedor->fechaingreso= $_POST["fechaingreso"];
            $contenedor->idnaviera= $_POST["idnaviera"];
            $contenedor->idchofer= $_POST["idchofer"];
            $contenedor->contenedor= $_POST["contenedor"];
            $contenedor->marchamo= $_POST["marchamo"];
            $contenedor->booking= $_POST["booking"];
            $contenedor->capacidad= $_POST["capacidad"];
            $contenedor->predio= $_POST["predio"];
            $contenedor->curena= $_POST["curena"];
            $contenedor->Update();
            break;
        case "Delete":
            $contenedor->id= $_POST["id"];            
            echo json_encode($contenedor->Delete());
            break;   
    }
}

class Contenedor{
    public $id='';
    public $fechaingreso='';
    public $idnaviera='';
    public $idchofer='';
    public $contenedor='';
    public $marchamo='';
    public $booking='';
    public $capacidad='';
    public $predio='';
    public $curena='';
    public $estado='';

    function __construct(){
        require_once('Globals.php');
        require_once("Conexion.php");
        require_once("Log.php");
    }

    function LoadAll(){
        try {
            $sql='SELECT `id`, `fechaingreso`, (SELECT nombre FROM naviera WHERE id=`idnaviera`) as naviera, idnaviera, `idchofer`, `contenedor`, `marchamo`, `booking`, `capacidad`, `predio`, `curena`, `estado` FROM `contenedor`                
                ORDER BY fechaingreso asc';
            $data= DATA::Ejecutar($sql);
            return $data;
        }     
        catch(Exception $e) {   
        }
    }

    function Load(){
        try {
            $sql='SELECT `id`, `fechaingreso`, (SELECT nombre FROM naviera WHERE id=`idnaviera`) as naviera, idnaviera, (SELECT nombre FROM chofer WHERE id=`idchofer`) as chofer, `idchofer`, `contenedor`, `marchamo`, `booking`, `capacidad`, `predio`, `curena`, `estado` FROM `contenedor`  
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
            $sql="INSERT INTO `contenedor`(`id`, `fechaingreso`, `idnaviera`, `idchofer`, `contenedor`, `marchamo`, `booking`, `capacidad`, `predio`, `curena`, `estado`)
                VALUES (uuid(), :fechaingreso, :idnaviera, :idchofer, :contenedor, :marchamo, :booking, :capacidad, :predio, :curena, true)";              
            //
            $param= array(':fechaingreso'=>$this->fechaingreso,':idnaviera'=>$this->idnaviera,':idchofer'=>$this->idchofer, ':contenedor'=>$this->contenedor, 
            ':marchamo'=>$this->marchamo, ':booking'=>$this->booking, ':capacidad'=>$this->capacidad,':predio'=>$this->predio,':curena'=>$this->curena);
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
            $sql="UPDATE contenedor
                SET fechaingreso=:fechaingreso, idnaviera=:idnaviera, idchofer=:idchofer, contenedor=:contenedor, marchamo=:marchamo, booking=:booking, 
                capacidad=:capacidad, predio=:predio, curena=:curena
                WHERE id=:id";
            $param= array(':id'=>$this->id,':fechaingreso'=>$this->fechaingreso,':idnaviera'=>$this->idnaviera,':idchofer'=>$this->idchofer, ':contenedor'=>$this->contenedor, 
            ':marchamo'=>$this->marchamo, ':booking'=>$this->booking, ':capacidad'=>$this->capacidad,':predio'=>$this->predio,':curena'=>$this->curena);
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
                FROM contenedor c  
                WHERE c.contenedor= :id";                
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
            $sql='DELETE FROM contenedor 
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