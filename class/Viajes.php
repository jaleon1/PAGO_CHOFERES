<?php
if (!isset($_SESSION))
    session_start();
require_once('Globals.php');
require_once("Conexion.php");
require_once("Log.php");

//Globals::ConfiguracionIni();

if(isset($_POST["action"])){
    $viajes= new Viajes();
    switch($_POST["action"]){       
        case "LoadAll":
            echo json_encode($viajes->LoadAll());
            break;
        case "Load":
            $viajes->id=$_POST["id"];
            echo json_encode($viajes->Load());
            break;
        case "Insert":
            //$viajes->idfinca= $_POST["idfinca"];
            $viajes->finca= $_POST["finca"];
            //$viajes->idnaviera= $_POST["idnaviera"];
            $viajes->naviera= $_POST["naviera"];
            $viajes->kmstotal= $_POST["kmstotal"];
            $viajes->Insert();
            break;
        case "Update":
            $viajes->id= $_POST["id"];
            $viajes->idfinca= $_POST["idfinca"];
            $viajes->finca= $_POST["finca"];            
            $viajes->idnaviera= $_POST["idnaviera"];
            $viajes->naviera= $_POST["naviera"];
            $viajes->kmstotal= $_POST["kmstotal"];
            $viajes->Update();
            break;
        case "Delete":
            $viajes->id= $_POST["id"];            
            echo json_encode($viajes->Delete());
            break;   
    }
}

class Viajes{
    public $id=null;
    public $idfinca=null;
    public $finca='';
    public $idnaviera=null;
    public $naviera='';
    public $kmstotal=0;

    function __construct(){
        require_once('Globals.php');
        require_once("Conexion.php");
        require_once("Log.php");
    }

    function LoadAll(){
        try {
            $sql='SELECT p.id, f.id as idfinca, n.id as idnaviera, f.nombre as finca, n.nombre as naviera, kmstotal
                FROM pagochofer.calculokm p inner join finca f on f.id=p.idfinca
                    inner join naviera n on n.id= p.idnaviera
                ORDER BY finca, naviera asc';
            $data= DATA::Ejecutar($sql);
            return $data;
        }     
        catch(Exception $e) {   
        }
    }

    function Load(){
        try {
            $sql='SELECT p.id, f.nombre as finca, n.nombre as naviera, kmstotal
            FROM pagochofer.calculokm p inner join finca f on f.id=p.idfinca
                inner join naviera n on n.id= p.idnaviera
                where p.id=:id';
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
            $sql="INSERT into calculokm (id,idfinca, idnaviera, kmstotal)
                VALUES(
                    uuid(),
                    (select id from finca where nombre=:finca),
                    (select id from naviera where nombre=:naviera),
                    :kmstotal
                )";    
            //
            $param= array(
                ':finca'=>$this->finca,
                ':naviera'=>$this->naviera, 
                ':kmstotal'=>$this->kmstotal
            );
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
            $sql="UPDATE calculokm 
                SET idfinca= (select id from finca where nombre= :finca),
                    idnaviera= (select id from naviera where nombre= :naviera),
                    kmstotal=:kmstotal
                WHERE id=:id";
            $param= array(
                ':id'=>$this->id, 
                ':finca'=>$this->finca,
                ':naviera'=>$this->naviera,
                'kmstotal'=>$this->kmstotal 
            );
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
                FROM formulariopago R
                WHERE R.idcalculokm= :id";                
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
            $sql='DELETE FROM calculokm  
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