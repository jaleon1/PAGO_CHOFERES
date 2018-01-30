<?php
//ob_start();
if (!isset($_SESSION)) {
    session_start();
}

if(isset($_POST["action"])){

    if($_POST["action"]=="Consultarporvisitante"){
        $formulario= new formulario();
        $formulario->ConsultarporVisitante();
    }
    if($_POST["action"]=="RecargaTabla"){
        $formulario= new formulario();
        $formulario->RecargaTabla();
    }
    if($_POST["action"]=="CargaIDFormulario"){
        $formulario= new formulario();
        $formulario->CargaIDFormulario();
    }
    if($_POST["action"]=="CargarTabla"){
        $formulario= new formulario();
        $formulario->CargarTabla();
    }
    if($_POST["action"]=="Insertar"){
        $formulario= new formulario();
        $formulario->AgregarFormularioAJAX();
    }
    if($_POST["action"]=="Modificar"){
        $formulario= new formulario();
        $formulario->ModificarAJAX();
    }
    if($_POST["action"]=="CargaMOD"){
        $formulario= new formulario();
        $formulario->CargarFormulario();
    }
    if($_POST["action"]=="CargaVisitantesFORM"){
        $formulario= new formulario();
        $formulario->CargaVisitanteporFormulario();
    }
    if($_POST["action"]=="RecargaTablaTramitante"){
        $formulario= new formulario();
        $formulario->RecargaTablaTramitante();
    }
}

class Formulario
{
    public $id;
    public $consecutivo;
    public $fechaingreso;
    public $fechasalida;
    public $fechasolicitud;
    public $idsala;
    public $nombresala;
    public $placavehiculo;
    public $detalleequipo;
    public $motivovisita;
    public $visitante;
    public $idtramitante;
    public $nombretramitante;
    public $idautorizador;
    public $nombreautorizador;
    public $idresponsable;
    public $nombreresponsable;
    public $nombreestado;
    public $estado;
    public $rfc;
    public $iddatacenter;
        
    function __construct(){
        require_once("Conexion.php");
        require_once("Log.php");
        //error_reporting(E_ALL);
        // Always in development, disabled in production
        //ini_set('display_errors', 1);
    }

    //AGREGA EL FORMULARIO
    function AgregarFormulario(){
        try {
            
            $sql="INSERT INTO formulario(fechaingreso,idsala,fechasalida,placavehiculo,detalleequipo,motivovisita,idresponsable,idautorizador,idtramitante,idestado,rfc)
                VALUES (:fechaingreso,(SELECT id FROM sala WHERE nombre= :nombresala),:fechasalida,:placavehiculo,
                :detalleequipo,:motivovisita,(SELECT id FROM responsable WHERE nombre= :nombreresponsable),
                (SELECT id FROM usuario WHERE nombre= :nombreautorizador),(SELECT id FROM usuario WHERE nombre= :nombretramitante),:estado,:rfc)";
            $param= array(':fechaingreso'=>$this->fechaingreso,
                          ':nombresala'=>$this->nombresala,
                          ':fechasalida'=>$this->fechasalida,
                          ':placavehiculo'=>$this->placavehiculo,
                          ':detalleequipo'=>$this->detalleequipo,
                          ':motivovisita'=>$this->motivovisita,
                          ':nombreresponsable'=>$this->nombreresponsable,
                          ':nombreautorizador'=>$this->nombreautorizador,
                          ':nombretramitante'=>$this->nombretramitante,
                          ':estado'=>$this->estado,
                          ':rfc'=>$this->rfc);
            $result = DATA::Ejecutar($sql, $param);
            //Consultar el Maximo ID insertado
            $maxid="SELECT id FROM formulario ORDER BY consecutivo DESC LIMIT 0,1";
            
            //Captura el id del formulario
            $idformulario =DATA::Ejecutar($maxid);
            //Convierte el string en un arreglo
            $visitantearray = explode(",", $this->visitante);
            //Calcula la longitud del arreglo de visistantes 
            $longitud = count($visitantearray);
            //Recorre el arreglo e inserta cada item en la tabla intermedia
            for ($i=0; $i<$longitud; $i++) {
                $sql='INSERT INTO visitanteporformulario(idvisitante,idformulario) VALUES ((SELECT id from visitante WHERE cedula=:cedula),:idformulario)';
                $param= array(':cedula'=>$visitantearray[$i],':idformulario'=>$idformulario[0][0]);
                $result = DATA::Ejecutar($sql, $param);
            }
            header('Location:../ListaFormulario.php');
            exit;
        } catch (Exception $e) {
            header('Location: ../Error.php?w=visitante-agregar&id='.$e->getMessage());
            exit;
        }
    }

    //AGREGA EL FORMULARIO
    function AgregarFormularioAJAX(){
        try {
            
            $sql="INSERT INTO formulario(fechaingreso,idsala,fechasalida,placavehiculo,detalleequipo,motivovisita,idresponsable,idautorizador,idtramitante,idestado,rfc)
                VALUES (:fechaingreso,:idsala,:fechasalida,:placavehiculo,
                :detalleequipo,:motivovisita,:idresponsable,
                (SELECT id FROM usuario WHERE nombre= :nombreautorizador),(SELECT id FROM usuario WHERE nombre= :nombretramitante),:estado,:rfc)";
            $param= array(':fechaingreso'=>$_POST["fechaingreso"],
                            ':idsala'=>$_POST["idsala"],
                            ':fechasalida'=>$_POST["fechasalida"],
                            ':placavehiculo'=>$_POST["placavehiculo"],
                            ':detalleequipo'=>$_POST["detalleequipo"],
                            ':motivovisita'=>$_POST["motivovisita"],
                            ':idresponsable'=>$_POST["idresponsable"],
                            ':nombreautorizador'=>$_POST["nombreautorizador"],
                            ':nombretramitante'=>$_POST["nombretramitante"],
                            ':estado'=>$_POST["estado"],
                            ':rfc'=>$_POST["rfc"]);

                            $result = DATA::Ejecutar($sql, $param);
            //Consultar el Maximo ID insertado
            $maxid="SELECT id FROM formulario ORDER BY consecutivo DESC LIMIT 0,1";
            
            //Captura el id del formulario
            $idformulario =DATA::Ejecutar($maxid);
            //Convierte el string en un arreglo
            $visitantearray = explode(",", $_POST["visitante"]);
            //Calcula la longitud del arreglo de visistantes 
            $longitud = count($visitantearray);
            //Recorre el arreglo e inserta cada item en la tabla intermedia
            for ($i=0; $i<$longitud; $i++) {
                $sql='INSERT INTO visitanteporformulario(idvisitante,idformulario) VALUES (:idvisitante,:idformulario)';
                $param= array(':idvisitante'=>$visitantearray[$i],':idformulario'=>$idformulario[0][0]);
                $result = DATA::Ejecutar($sql, $param);
            }
            // si no es una copia del formulario, muestra lista.
            if(!isset($_POST["iscopy"]))
            {
                header('Location:../ListaFormulario.php');
                exit;
            }
            else // es una copia de formulario, retorna el idformulario 
            {
                echo $idformulario[0][0]; 
            }
        } catch (Exception $e) {
            header('Location: ../Error.php?w=visitante-agregar&id='.$e->getMessage());
            exit;
        }
    }
    
    //MODIFICA EL FORMULARIO
    function Modificar(){
        try {
            $sql="UPDATE formulario SET fechaingreso=:fechaingreso,fechasalida=:fechasalida,idtramitante=(SELECT id FROM usuario WHERE nombre= :nombretramitante),
            idautorizador=(SELECT id FROM usuario WHERE nombre= :nombreautorizador),idresponsable=(SELECT id FROM responsable WHERE nombre= :nombreresponsable),placavehiculo=:placavehiculo,
            detalleequipo=:detalleequipo,motivovisita=:motivovisita,idestado=:estado,idsala=(SELECT id FROM sala WHERE nombre= :nombresala),rfc=:rfc WHERE id=:id;";
            $param= array(':fechaingreso'=>$this->fechaingreso,
                          ':fechasalida'=>$this->fechasalida,
                          ':nombretramitante'=>$this->nombretramitante,
                          ':nombreautorizador'=>$this->nombreautorizador,
                          ':nombreresponsable'=>$this->nombreresponsable,
                          ':placavehiculo'=>$this->placavehiculo,
                          ':detalleequipo'=>$this->detalleequipo,
                          ':motivovisita'=>$this->motivovisita,
                          ':estado'=>$this->estado,
                          ':nombresala'=>$this->nombresala,
                          ':rfc'=>$this->rfc,
                          ':id'=>$this->id);
            $result = DATA::Ejecutar($sql, $param);

            //Convierte el string en un arreglo
            $visitantearray = explode(",", $this->visitante);

            //Elimina los registros segun el arreglo de visitantes
            $sql="DELETE FROM visitanteporformulario WHERE NOT FIND_IN_SET((SELECT cedula from visitante WHERE id=idvisitante),:EXCLUSION) 
            AND idformulario=:id";
            $param= array(':EXCLUSION'=>$this->visitante,
            ':id'=>$this->id);

            $result = DATA::Ejecutar($sql, $param);
            
            $longitud = count($visitantearray);

            // formulario temporal, vacia la variable para llenarla con los id de los visitantes.
            if(isset( $_SESSION['TEMP']))
                $_SESSION['TEMP']="";

            //Recorre el arreglo e inserta cada item en la tabla intermedia
            for ($i=0; $i<$longitud; $i++) {
                // formulario temporal, agrega los idvisitante.
                if(isset( $_SESSION['TEMP'])){
                    $_SESSION['TEMP'] = $_SESSION['TEMP'] . $visitantearray[$i] . '-' . $this->estado . ',';
                }
                
                //Si no existe Inserta
                $existe="SELECT id FROM visitanteporformulario  WHERE idvisitante = (SELECT id FROM visitante WHERE cedula=:cedula) AND idformulario = (SELECT id FROM formulario WHERE id=:id)";
                $parametro= array(':cedula'=>$visitantearray[$i],':id'=>$this->id);
                $resultadoexiste= DATA::Ejecutar($existe, $parametro);

                if(count($resultadoexiste)==0){
                    $sql="INSERT INTO visitanteporformulario(idvisitante,idformulario) VALUES((SELECT id FROM visitante WHERE cedula=:cedula),(SELECT id FROM formulario WHERE id=:id))";
                    $param= array(':cedula'=>$visitantearray[$i],':id'=>$this->id);
                    $result = DATA::Ejecutar($sql, $param);
                }
            }       
            header('Location:../ListaFormulario.php');           
            exit;
        } catch (Exception $e) {
            header('Location: ../Error.php?w=visitante-agregar&id='.$e->getMessage());
            exit;
        }
    }

    //MODIFICA EL FORMULARIO
    function ModificarAJAX(){
        try {
            $sql="UPDATE formulario SET fechaingreso=:fechaingreso,fechasalida=:fechasalida,idtramitante=(SELECT id FROM usuario WHERE nombre= :nombretramitante),
            idautorizador=(SELECT id FROM usuario WHERE nombre= :nombreautorizador),idresponsable=(SELECT id FROM responsable WHERE nombre=:nombreresponsable),placavehiculo=:placavehiculo,
            detalleequipo=:detalleequipo,motivovisita=:motivovisita,idestado=:estado,idsala=(SELECT id FROM sala WHERE nombre=:nombresala),rfc=:rfc WHERE id=:id;";
            $param= array(':fechaingreso'=>$_POST["fechaingreso"],
                            ':nombresala'=>$_POST["nombresala"],
                            ':fechasalida'=>$_POST["fechasalida"],
                            ':placavehiculo'=>$_POST["placavehiculo"],
                            ':detalleequipo'=>$_POST["detalleequipo"],
                            ':motivovisita'=>$_POST["motivovisita"],
                            ':nombreresponsable'=>$_POST["nombreresponsable"],
                            ':nombreautorizador'=>$_POST["nombreautorizador"],
                            ':nombretramitante'=>$_POST["nombretramitante"],
                            ':estado'=>$_POST["estado"],
                            ':rfc'=>$_POST["rfc"],
                            ':id'=>$_POST["id"]);
            $result = DATA::Ejecutar($sql, $param);

            //Convierte el string en un arreglo
            $visitantearray = explode(",", $_POST["visitante"]);

            //Elimina los registros segun el arreglo de visitantes
            $sql="DELETE FROM visitanteporformulario WHERE NOT FIND_IN_SET(:id,:EXCLUSION) AND idformulario=:id";
            $param= array(':EXCLUSION'=>$_POST["visitante"],':id'=>$_POST["id"]);

            $result = DATA::Ejecutar($sql, $param);
            
            $longitud = count($visitantearray);

            // formulario temporal, vacia la variable para llenarla con los id de los visitantes.
            if(isset( $_SESSION['TEMP']))
                $_SESSION['TEMP']="";

            //Recorre el arreglo e inserta cada item en la tabla intermedia
            for ($i=0; $i<$longitud; $i++) {
                // formulario temporal, agrega los idvisitante.
                if(isset( $_SESSION['TEMP'])){
                    $_SESSION['TEMP'] = $_SESSION['TEMP'] . $visitantearray[$i] . '-' . $this->estado . ',';
                }
                
                //Si no existe Inserta
                $existe="SELECT id FROM visitanteporformulario  WHERE idvisitante = :idvisitante AND idformulario = :id";
                $parametro= array(':idvisitante'=>$visitantearray[$i],':id'=>$_POST["id"]);
                $resultadoexiste= DATA::Ejecutar($existe, $parametro);

                if(count($resultadoexiste)==0){
                    $sql="INSERT INTO visitanteporformulario(idvisitante,idformulario) VALUES(:idvisitante,:id)";
                    $param= array(':idvisitante'=>$visitantearray[$i],':id'=>$_POST["id"]);
                    $result = DATA::Ejecutar($sql, $param);
                }
            }       
            header('Location:../ListaFormulario.php');           
            exit;
        } catch (Exception $e) {
            header('Location: ../Error.php?w=visitante-agregar&id='.$e->getMessage());
            exit;
        }
    }
    
    //CONSULTA FORMULARIO PARA LLENAR TABLA
    function ConsultaFormulario(){
        try {
            $sql = "SELECT id,fechasolicitud,motivovisita,(SELECT nombre FROM estado WHERE id=idestado),fechaingreso,fechasalida,(SELECT nombre FROM usuario WHERE id=idtramitante),
            (SELECT nombre FROM usuario WHERE id=idautorizador),idresponsable,(SELECT nombre from sala WHERE id=idsala),placavehiculo,detalleequipo,rfc
            FROM formulario ORDER BY id DESC;";
            $result = DATA::Ejecutar($sql);
            return $result;
        } catch (Exception $e) {
            header('Location: ../Error.php?w=visitante-bitacora&id='.$e->getMessage());
            exit;
        }
    }

    //CONSULTA VISITANTE POR ID VISITANTE
    function ConsultaVisitantePorFormulario($idvisitante){
        try{
            $sql="SELECT f.id as ID , consecutivo ,f.fechaingreso , f.fechasalida , f.idestado  as estado
                FROM formulario f inner join visitanteporformulario vf on f.id=vf.idformulario 
                where vf.idvisitante= :idvisitante and now() between DATE_SUB(fechaingreso, INTERVAL 1 HOUR) and fechasalida and idestado=1 "; 
                // order by f.FECHASOLICITUD desc limit 1 ";
            $param= array(':idvisitante'=>$idvisitante);
            $data = DATA::Ejecutar($sql,$param);
            if (count($data)) {  
                $this->id= $data[0]['ID'];
                $this->consecutivo= $data[0]['consecutivo'];
                $this->fechaingreso= $data[0]['fechaingreso'];
                $this->fechasalida= $data[0]['fechasalida'];                
                $this->estado= $data[0]['estado'];
                return true;
            }
            else{
                return false;
            }
        }catch (Exception $e) {
            header('Location: ../Error.php?w=formulario');
            exit;
        }

    }

    //CARGA EL FORMULARIO USANDO EL CONSECUTIVO 
    function CargarFormulario(){
        try {
            $sql = "SELECT id,fechasolicitud,idestado,motivovisita, 
                DATE_FORMAT(fechaingreso, '%Y-%m-%dT%H:%i') as fechaingreso,
                DATE_FORMAT(fechasalida, '%Y-%m-%dT%H:%i') as fechasalida,
                (SELECT nombre from usuario u inner join formulario f on f.idtramitante=u.id and f.id =:id)as nombretramitante,
                (SELECT nombre from usuario u inner join formulario f on f.idautorizador=u.id and f.id =:id) as nombreautorizador,
                (SELECT nombre from responsable r inner join formulario f on f.idresponsable=r.id and f.id =:id) as nombreresponsable,
                (SELECT sa.nombre FROM sala sa inner join formulario f on sa.id=f.idsala and f.id =:id) as nombresala,
                placavehiculo,detalleequipo, rfc, consecutivo, idsala, idresponsable, (SELECT d.nombre FROM sala s INNER JOIN 
                datacenter d ON s.iddatacenter =  d.id INNER JOIN formulario f ON s.id =  f.idsala and f.id=:id) as datacenter 
            FROM formulario WHERE id = :id;";

            $param= array(':id'=>$_POST["id"]);
            $data = DATA::Ejecutar($sql, $param);
            //
            if (count($data)) {
                $this->consecutivo= $data[0]['consecutivo'];
                $this->fechasolicitud= $data[0]['fechasolicitud'];
                $this->estado= $data[0]['idestado'];
                $this->motivovisita= $data[0]['motivovisita'];
                $this->fechaingreso= $data[0]['fechaingreso'];
                $this->fechasalida= $data[0]['fechasalida'];
                $this->nombretramitante= $data[0]['nombretramitante'];
                $this->nombreautorizador= $data[0]['nombreautorizador'];
                $this->nombreresponsable= $data[0]['nombreresponsable'];
                $this->nombresala= $data[0]['nombresala'];
                $this->placavehiculo= $data[0]['placavehiculo'];
                $this->detalleequipo= $data[0]['detalleequipo'];
                $this->rfc= $data[0]['rfc'];
                $this->id= $data[0]['id'];
                $this->idsala= $data[0]['idsala'];
                $this->idresponsable= $data[0]['idresponsable'];
                $this->datacenter=$data[0]['datacenter'];
            }
            //
            echo json_encode($data);
        } catch (Exception $e) {
            header('Location: ../Error.php?w=visitante-bitacora&id='.$e->getMessage());
            exit;
        }
    }

    //CARGA EL FORMULARIO USANDO EL ID
    function CargarID(){
        try {
            $sql = "SELECT id, consecutivo,fechasolicitud,idestado,motivovisita, 
                DATE_FORMAT(fechaingreso, '%Y-%m-%dT%H:%i') as fechaingreso,
                DATE_FORMAT(fechasalida, '%Y-%m-%dT%H:%i') as fechasalida,
                (SELECT nombre from usuario u inner join formulario f on f.idtramitante=u.id where f.id=:id)as nombretramitante,
                (SELECT nombre from usuario u inner join formulario f on f.idautorizador=u.id where f.id=:id) as nombreautorizador,
                (SELECT nombre from responsable r inner join formulario f on f.idresponsable=r.id where f.id=:id) as nombreresponsable,
                (SELECT sa.nombre FROM sala sa inner join formulario f on sa.id=f.idsala where f.id=:id) as nombresala,
                idsala, placavehiculo,detalleequipo, rfc
            FROM formulario WHERE id = :id";
            $param= array(':id'=>$this->id);
            $data = DATA::Ejecutar($sql, $param);
            //
            if (count($data)) {
                $this->consecutivo= $data[0]['consecutivo'];
                $this->fechasolicitud= $data[0]['fechasolicitud'];
                $this->estado= $data[0]['idestado'];
                $this->motivovisita= $data[0]['motivovisita'];
                $this->fechaingreso= $data[0]['fechaingreso'];
                $this->fechasalida= $data[0]['fechasalida'];
                $this->nombretramitante= $data[0]['nombretramitante'];
                $this->nombreautorizador= $data[0]['nombreautorizador'];
                $this->nombreresponsable= $data[0]['nombreresponsable'];
                $this->idsala= $data[0]['idsala'];
                $this->nombresala= $data[0]['nombresala'];
                $this->placavehiculo= $data[0]['placavehiculo'];
                $this->detalleequipo= $data[0]['detalleequipo'];
                $this->rfc= $data[0]['rfc'];
                $this->id= $data[0]['id'];
            }
            //
            return $data;
        } catch (Exception $e) {
            header('Location: ../Error.php?w=visitante-bitacora&id='.$e->getMessage());
            exit;
        }
    }

    //CARGA LOS VISITANTES EN LA TABLA PRINCIPAL DEL FORMULARIO
    function CargaVisitanteporFormulario(){
        try {
            $sql="SELECT DISTINCT v.id,v.cedula,v.nombre,v.empresa from visitante v inner join visitanteporformulario vpf 
            on v.id=vpf.idvisitante and vpf.idformulario=:id";
            $param= array(':id'=>$_POST["id"]);
            $result= DATA::Ejecutar($sql,$param);   
            if (count($result)) {
                $this->id= $result[0]['id'];
                $this->cedula= $result[0]['cedula'];
                $this->nombre= $result[0]['nombre'];
                $this->empresa= $result[0]['empresa'];
            }        
            echo json_encode($result);
        } catch (Exception $e) {
            header('Location: ../Error.php?w=visitante-bitacora&id='.$e->getMessage());
            exit;
        }
    }
    
    //OBTIENE EL ID DEL FORMULARIO
    function getID(){
        try{
            $sql="SELECT ID FROM formulario ORDER BY FECHASOLICITUD DESC LIMIT 1";
            $data= DATA::Ejecutar($sql);
            $this->id= $data[0]['ID'];
        }
        catch(Exception $e){

        }
    }

    //INSERTA EL FORMULARIO TEMPORAL
    function AgregarTemporal($idvisitante){
        try {
            //agrega infomación del formulario temporal
            $sql="insert into formulario (FECHAINGRESO,FECHASALIDA,FECHASOLICITUD,IDSALA, MOTIVOVISITA, IDTRAMITANTE) 
                VALUES (NOW(),DATE_ADD(NOW(), INTERVAL 1 DAY), NOW(), (SELECT sa.ID FROM sala sa WHERE NOMBRE= :nombresala), :motivovisita, 
                (SELECT u.id FROM usuario u where u.usuario=:usuario)) ";
            $param= array(
                ':nombresala'=>$this->nombresala,
                ':motivovisita'=>$this->motivovisita,
                ':usuario'=>$_SESSION['username']
                );
            $data= DATA::Ejecutar($sql, $param, true);
            if ($data) {
                    //busca id de formulario agregado
                    $this->getID();
                    //agrega visitantes
                    $sql='insert into visitanteporformulario(idvisitante , idformulario) VALUES(:idvisitante,:idformulario)';
                    $param= array(':idvisitante'=>$idvisitante,':idformulario'=>$this->id);
                    $data=  DATA::Ejecutar($sql, $param);
                    include_once("Email.php");
                    email::Enviar($idvisitante, $this->id, "Formulario de Ingreso Pendiente", "formulario DE INGRESO PENDIENTE");
                    // elimina sesion link para evitar redirect a paginas anteriores.
                    unset($_SESSION['link']);
                    $_SESSION['estado']='pendiente';
                    header('Location: ../index.php');
                    exit;
            } else {
                    $_SESSION['errmsg']= 'Formulario no registrado, comunicarse con operaciones TI';
                header('Location: ../Error.php');
            }
        } catch (Exception $e) {
            $_SESSION['errmsg']= $e->getMessage();
            header('Location: ../Error.php');
            exit;
        }
    }

    //CONSULTA FORMULARIO POR VISITANTES
    function ConsultarporVisitante(){
        try {
            $sql = "SELECT DISTINCT f.consecutivo,f.fechasolicitud,(SELECT nombre FROM estado WHERE id=f.idestado) as estado,f.motivovisita,f.rfc
            FROM formulario f INNER JOIN  visitanteporformulario vxf ON f.id = vxf.idformulario INNER JOIN visitante v ON v.id=vxf.idvisitante 
            and (v.cedula like '%". $_POST["busqueda"] ."%' or v.nombre like '%". $_POST["busqueda"] ."%') ORDER BY consecutivo DESC;";

            $data = DATA::Ejecutar($sql);
            if (count($data)) {
                $this->fechasolicitud= $data[0]['fechasolicitud'];
                $this->estado= $data[0]['estado'];
                $this->motivovisita= $data[0]['motivovisita'];
                $this->rfc= $data[0]['rfc'];
            }
            echo json_encode($data);	 
        } catch (Exception $e) {
            header('Location: ../Error.php?w=visitante-bitacora&id='.$e->getMessage());
            exit;
        }    
    }

    //RECARGA LOS DATOS DEL FORMULARIO
    function RecargaTabla(){
        try {
            $sql = "SELECT id,consecutivo,fechasolicitud,(SELECT nombre FROM estado WHERE id=idestado) as estado,motivovisita,rfc,fechaingreso FROM formulario";
            $data = DATA::Ejecutar($sql);
            if (count($data)) {
                $this->fechasolicitud= $data[0]['fechasolicitud'];
                $this->estado= $data[0]['estado'];
                $this->motivovisita= $data[0]['motivovisita'];
                $this->rfc= $data[0]['rfc'];
                $this->fechaingreso= $data[0]['fechaingreso'];
            }
            echo json_encode($data);	 
        } catch (Exception $e) {
            header('Location: ../Error.php?w=visitante-bitacora&id='.$e->getMessage());
            exit;
        }
    }

        //RECARGA LOS DATOS DEL FORMULARIO
        function RecargaTablaTramitante(){
            try {
                $sql = "SELECT id,consecutivo,fechasolicitud,(SELECT nombre FROM estado WHERE id=idestado) as estado,motivovisita,rfc,fechaingreso FROM formulario WHERE idtramitante= (SELECT id FROM usuario WHERE usuario=:usuario)";
                $param= array(':usuario'=>$_POST["usuario"]);
                $data = DATA::Ejecutar($sql,$param);
                if (count($data)) {
                    $this->fechasolicitud= $data[0]['fechasolicitud'];
                    $this->estado= $data[0]['estado'];
                    $this->motivovisita= $data[0]['motivovisita'];
                    $this->rfc= $data[0]['rfc'];
                    $this->fechaingreso= $data[0]['fechaingreso'];
                }
                echo json_encode($data);	 
            } catch (Exception $e) {
                header('Location: ../Error.php?w=visitante-bitacora&id='.$e->getMessage());
                exit;
            }
        }

    //OBTIENE EL ID DEL FORMULARIO SEGUN EL CONSECUTIVO
    function CargaIDFormulario(){
        try {
            $sql = "SELECT id,idestado FROM formulario WHERE consecutivo=:consecutivo";
            $param= array(':consecutivo'=>$_POST["consecutivo"]);
            $data = DATA::Ejecutar($sql,$param);
            if (count($data)) {
                $this->id= $data[0]['id'];
                $this->idestado= $data[0]['idestado'];
            }
            echo json_encode($data);	 
        } catch (Exception $e) {
            header('Location: ../Error.php?w=visitante-bitacora&id='.$e->getMessage());
            exit;
        }    
    }

    //CARGA LA CEDULA NOMBRE Y EMPRESA CON BASE AL ID DEL FORMULARIO
    function CargarTabla(){
        try {
            $sql = "SELECT cedula,nombre,empresa FROM formulario WHERE id=:id";
            $param = array(':id'=>$_POST["id"]);
            $data = DATA::Ejecutar($sql,$param);
            if (count($data)) {
                $this->fechasolicitud= $data[0]['fechasolicitud'];
                $this->estado= $data[0]['estado'];
                $this->motivovisita= $data[0]['motivovisita'];
                $this->rfc= $data[0]['rfc'];
            }
            echo json_encode($data);	 
        } catch (Exception $e) {
            header('Location: ../Error.php?w=visitante-bitacora&id='.$e->getMessage());
            exit;
        }
    }

     //***************************************
    // Carga formulario USANDO EL consecutivo
    function Cargar()
    {
        try {
            $sql = "SELECT id,fechasolicitud,idestado,motivovisita, 
                DATE_FORMAT(fechaingreso, '%Y-%m-%dT%H:%i') as fechaingreso,
                DATE_FORMAT(fechasalida, '%Y-%m-%dT%H:%i') as fechasalida,
                (SELECT nombre from usuario u inner join formulario f on f.idtramitante=u.id and f.id =:id)as nombretramitante,
                (SELECT nombre from usuario u inner join formulario f on f.idautorizador=u.id and f.id =:id) as nombreautorizador,
                (SELECT nombre from responsable r inner join formulario f on f.idresponsable=r.id and f.id =:id) as nombreresponsable,
                (SELECT sa.nombre FROM sala sa inner join formulario f on sa.id=f.idsala and f.id =:id) as nombresala,
                placavehiculo,detalleequipo, rfc, consecutivo
            FROM formulario WHERE id = :id;";
            //
            $param= array(':id'=>$this->id);
            $data = DATA::Ejecutar($sql, $param);
            //
            if (count($data)) {
                $this->consecutivo= $data[0]['consecutivo'];
                $this->fechasolicitud= $data[0]['fechasolicitud'];
                $this->estado= $data[0]['idestado'];
                $this->motivovisita= $data[0]['motivovisita'];
                $this->fechaingreso= $data[0]['fechaingreso'];
                $this->fechasalida= $data[0]['fechasalida'];
                $this->nombretramitante= $data[0]['nombretramitante'];
                $this->nombreautorizador= $data[0]['nombreautorizador'];
                $this->nombreresponsable= $data[0]['nombreresponsable'];
                $this->nombresala= $data[0]['nombresala'];
                $this->placavehiculo= $data[0]['placavehiculo'];
                $this->detalleequipo= $data[0]['detalleequipo'];
                $this->rfc= $data[0]['rfc'];
                $this->id= $data[0]['id'];
            }
            //
            return $data;
        } catch (Exception $e) {
            header('Location: ../Error.php?w=visitante-bitacora&id='.$e->getMessage());
            exit;
        }
    }
}
