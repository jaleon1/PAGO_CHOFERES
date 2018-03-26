<?php 

$conn = oci_connect('jleon_oper', 'emi2014', '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=rac-vfactprd)(PORT=1523))(LOAD_BALANCE=yes)
(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=TAF_BRM)(FAILOVER_MODE=(TYPE=SELECT)(METHOD=BASIC)(RETRIES=180)(DELAY=5))))');
if (!$conn) {
    $e = oci_error();
    trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
}
else{
    //echo('CONECTADO!');
    $name='PIN Bill';
    $timestamp='1521180000';
    $stid = oci_parse($conn, 'select count(CURRENT_TOTAL) from bill_t  where Name = :pinbill and end_t = :timestamp');
    oci_bind_by_name($stid, ':pinbill', $name);
    oci_bind_by_name($stid, ':timestamp', $timestamp); 
    oci_execute($stid);
    
    while (($row = oci_fetch_array($stid, OCI_BOTH)) != false) {
        echo 'TOTAL ASIGNACION DE RECURSOS: ' . $row[0];
    }
}
?>