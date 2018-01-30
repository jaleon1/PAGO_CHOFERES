/* VARIABLES GLOBALES*/
var kmporviaje=0;
var valorviaje=0;
var totalpago=0;

$(document).ready( function () {  
    //$('#div-mants').html(""); 
    //var x = getDate();
    //document.getElementById("form-date-crtl").defaultValue = x;
    //document.getElementById('form-date-crtl').value = getDate(); 
    Fecha();
    ingresosgastosformulario();
    $('#div-finca').hide();
});

$(document).on('click', '#menu-finca', function (event) {    
    finca();
    $('#div-finca').show();
    //mantenimientofinca();
});

$(document).on('click', '#inp-finca', function (event) {    
    calculokm();
});

$(document).on('click','#tblfinca tr', function(){        
    //SELECCIONA LA FILA Y LA INSERTA EN EL INPUT DC
    document.getElementById('inp-finca').value = $(this).find('td:first').html();
});

function finca(){
    LimpiaTitulo(); 
    $('#div-mant-titulo').append("<h3 id='titulo-finca'>FINCA</h3>");
    $('#div-mants').append("<table id='tblfinca'class='tbl'>");
    var col="<thead><tr><th>NOMBRE</th><th>UBICACION</th><th>TELEFONO</th></thead><tbody id='tableBody'></tbody>";
    $('#tblfinca').append(col);
    var row1="<tr><td>Banderas</td><td>Pocozol</td><td>8891-8749</td></tr>";
    var row2="<tr><td>Arcoiris</td><td>Guanacaste</td> <td>8857-1147</td></tr>";
    var row3="<tr><td>Maquenco</td><td>Guanacaste Samara</td> <td>9584-8744</td></tr>";
    var row4="<tr><td>Ostional</td><td>San Carlos</td> <td>8814-1178</td></tr>";
    var row5="<tr><td>La Irma</td><td>Guanacaste Abangares</td> <td>8814-1178</td></tr>";
    $('#tableBody').append(row1+row2+row3+row4+row5);  

    $('#tblfinca').DataTable({
        "order": [[ 1, "asc" ]],
        "paging":   false
    });
}

$(document).on('click', '#menu-naviera', function (event) {    
    naviera();
});

$(document).on('click', '#inp-naviera', function (event) {    
    calculokm();
});

$(document).on('click','#tblnaviera tr', function(){        
    //SELECCIONA LA FILA Y LA INSERTA EN EL INPUT DC
    document.getElementById('inp-naviera').value = $(this).find('td:first').html();
    document.getElementById('inp-valor-viaje').value = '$710';
});

function naviera(){
    LimpiaTitulo();
    $('#div-mant-titulo').append("<h3 id='titulo-naviera'>NAVIERA</h3>");
    $('#div-mants').append("<table id='tblnaviera'class='tbl'>");
    var col="<thead><tr><th>NOMBRE</th><th>UBICACION</th><th>TELEFONO</th></thead><tbody id='tableBody'></tbody>";
    $('#tblnaviera').append(col);
    var row1="<tr><td>Japa Loid</td><td>Caldera</td><td>8891-8749</td></tr>";
    var row2="<tr><td>Traigo</td><td>Los Patios</td> <td>8857-1147</td></tr>";
    var row3="<tr><td>Alamo</td><td>Los Patios</td> <td>9584-8744</td></tr>";
    var row4="<tr><td>Naviera 4</td><td>Limón</td> <td>8814-1178</td></tr>";
    $('#tableBody').append(row1+row2+row3+row4);  

    $('#tblnaviera').DataTable({
        "order": [[ 1, "asc" ]],
        "paging":   false
    });
}

$(document).on('click', '#menu-calculokm', function (event) {    
    calculokm();
});

function calculokm(){
    LimpiaTitulo();
    $('#div-mant-titulo').append("<h3 id='titulo-calculokm'>VIAJES</h3>");
    $('#div-mants').append("<table id='tblcalculokm'class='tbl'>");
    var col="<thead><tr><th>Finca</th><th>Naviera</th><th>Kilometros</th></thead><tbody id='tableBody'></tbody>";
    $('#tblcalculokm').append(col);
    var row1="<tr><td>San Carlos</td><td>Caldera</td><td>600</td></tr>";
    var row2="<tr><td>Liberia</td> <td>Moin</td><td>750</td></tr>";
    var row3="<tr><td>La Cruz</td> <td>Moin</td><td>510</td></tr>";
    var row4="<tr><td>Zona Sur</td> <td>Moin</td><td>555</td></tr>";
    $('#tableBody').append(row1+row2+row3+row4);  

    $('#tblcalculokm').DataTable({
        "order": [[ 1, "asc" ]],
        "paging":   false
    });
}

$(document).on('click', '#menu-ingresos-gastos', function (event) {    
    ingresosgastos();
});

$(document).on('click','#tblcalculokm tr', function(){        
    //SELECCIONA LA FILA Y LA INSERTA EN EL INPUT DC
    document.getElementById('inp-finca').value = $(this).find('td:first').html();
    document.getElementById('inp-naviera').value = $(this).find('td:nth-child(2)').html();
    //Multiplica los km por el precio de pago establecido
    document.getElementById('inp-valor-viaje').value = $(this).find('td:nth-child(3)').html() * 1.9;
    document.getElementById('inp-total-pago').value = document.getElementById('inp-valor-viaje').value;
    valorviaje = document.getElementById('inp-valor-viaje').value;
});

function ingresosgastos(){
    LimpiaTitulo();
    $('#div-mant-titulo').append("<h3 id='titulo-ingresos-gastos'>INGRESOS Y GASTOS</h3>");
    
    $('#div-mants').append("<div id='div-mant-ingresos'></div><div id='div-mant-gastos'></div>");
    
    $('#div-mant-ingresos').append("<table id='tblingresos'class='tbl'>");
    var col="<thead><tr><th>INGRESOS</th></tr></thead><tbody id='tblbodyingresos'></tbody>";
    $('#tblingresos').append(col);
    var row1="<tr><td>Alquiler de Cureña</td></tr>";
    var row2="<tr><td>Combustible</td></tr>";
    var row3="<tr><td>Herramientas</td></tr>";
    $('#tblbodyingresos').append(row1+row2+row3);  

    $('#div-mant-gastos').append("<table id='tblgastos'class='tbl'>");
    var col="<thead><tr><th>GASTOS</th></tr></thead><tbody id='tableBody'></tbody>";
    $('#tblgastos').append(col);
    var row1="<tr><td>Viaticos</td></tr>";
    var row2="<tr><td>Seguro</td></tr>";
    var row3="<tr><td>Otros</td></tr>";
    $('#tableBody').append(row1+row2+row3);  

    $('#tblingresos').DataTable({
        "order": [[ 0, "asc" ]],
        "bLengthChange": false,
        searching: false,
        "bInfo": false,
        "paging":   false
    });
    $('#tblgastos').DataTable({
        "order": [[ 0, "asc" ]],
        "bLengthChange": false,
        searching: false,
        "bInfo": false,
        "paging":   false
    });
}

$(document).on('click','#tblformingresos tr', function(){        
    ingresosgastos();
});

$(document).on('click','#tblformgastos tr', function(){        
    ingresosgastos();
});

function ingresosgastosformulario(){
    $('#div-form-ingresos').append("<table id='tblformingresos'class='tbl'>");
    var col="<thead><tr><th>INGRESOS</th><th>MONTO</th><th>X</th></thead><tbody id='tblbodyingresos-form'></tbody>";
    $('#tblformingresos').append(col);
    var td= "<tr id='firsttr'><td></td><td></td><td></td></tr>";
    $('#tblbodyingresos-form').append(td);

    $('#div-form-gastos').append("<table id='tblformgastos'class='tbl'>");
    var col="<thead><tr><th>GASTOS</th><th>MONTO</th><th>X</th></thead><tbody id='tblbodygastos-form'></tbody>";
    $('#tblformgastos').append(col);
    var td2= "<tr id='firsttr2'><td></td><td></td><td></td></tr>";
    $('#tblbodygastos-form').append(td2);

    $('#tblformingresos').DataTable({
        "order": [[ 1, "asc" ]],
        "paging":   false,
        "bLengthChange": false,
        searching: false,
        "bInfo": false,
        "scrollY": "140px",
        "scrollCollapse": true,
        "bPaginate": false,
        "columns": [
            { "width": "55%" },
            null,
            null]
    });

    $('#tblformgastos').DataTable({
        "order": [[ 1, "asc" ]],
        "paging":   false,
        "bLengthChange": false,
        searching: false,
        "bInfo": false,
        "scrollY": "140px",
        "scrollCollapse": true,
        "bPaginate": false,
        "columns": [
            { "width": "55%" },
            null,
            null]
    });    
}

$(document).on('click', '#textarea-ingresos', function (event) {    
    ingresosgastos();
});

$(document).on('click', '#textarea-gastos', function (event) {    
    ingresosgastos();
});
                      
$(document).on('click','#tblingresos tr', function(){        
    var montoejemplo = 100;
    $('#firsttr').closest('tr').remove();
    var td1="<tr><td>"+ $(this).find('td:first').html() +"</td><td>"+ montoejemplo +"</td><td><img id=btnborraingreso class=borrar src=img/file_delete.png></td></tr>";
    $("#tblbodyingresos-form").append(td1);
    valorviaje = valorviaje - montoejemplo;
    document.getElementById('inp-total-pago').value = valorviaje;
});
                    
$(document).on('click','#tblgastos tr', function(){        
    var montoejemplo = 100;
    $('#firsttr2').closest('tr').remove();
    var td1="<tr><td>"+ $(this).find('td:first').html() +"</td><td>"+ montoejemplo +"</td><td><img id=btnborragasto class=borrar src=img/file_delete.png></td></tr>";
    $("#tblbodygastos-form").append(td1);
    valorviaje = valorviaje + montoejemplo;
    document.getElementById('inp-total-pago').value = valorviaje;
});

$(document).on('click','#btnborraingreso', function(){        
    $(this).closest('tr').remove();
    totalpago = totalpago - $(this).parents("tr").find("td").eq(1).text();
    document.getElementById('inp-total-pago').value = totalpago;
});
                    
$(document).on('click','#btnborragasto', function(){        
    $(this).closest('tr').remove();
    totalpago = totalpago + $(this).parents("tr").find("td").eq(1).text();
    document.getElementById('inp-total-pago').value = totalpago;
});

/* CHOFER */

$(document).on('click','#tblchofer tr', function(){        
    //SELECCIONA LA FILA Y LA INSERTA EN EL INPUT DC
    document.getElementById('inp-chofer').value = $(this).find('td:first').html();
});

$(document).on('click', '#inp-chofer', function (event) {    
    chofer();
    mantenimientochofer();
});

$(document).on('click', '#menu-chofer', function (event) {    
    chofer();
    mantenimientochofer();
});

function chofer(){
    LimpiaTitulo();
    $('#div-mant-titulo').append("<h3 id='titulo-Chofer'>CHOFER</h3>");
    $('#div-mants').append("<table id='tblchofer'class='tbl'>");
    var col="<thead><tr><th>NOMBRE</th><th>CEDULA</th><th>TELEFONO</th><th>CORREO</th><th></th><th></th></tr></thead><tbody id='tableBody'></tbody>";
    $('#tblchofer').append(col);
    var row1="<tr><td>Jill Smith</td><td>103250698</td><td>8891-8749</td><td>jillsmith@gmail.com</td><td><img id=btnmodingreso class=borrar src=img/file_mod.png></td><td><img id=btnborraingreso class=borrar src=img/file_delete.png></td></tr>";
    var row2="<tr><td>Eve Jackson</td><td>302580444</td> <td>8857-1147</td><td>evejackson@hotmail.com</td><td><img id=btnmodingreso class=borrar src=img/file_mod.png></td><td><img id=btnborraingreso class=borrar src=img/file_delete.png></td></tr>";
    var row3="<tr><td>John Man</td><td>305890555</td> <td>9584-8744</td><td>johnman@yahoo.com</td><td><img id=btnmodingreso class=borrar src=img/file_mod.png></td><td><img id=btnborraingreso class=borrar src=img/file_delete.png></td></tr>";
    var row4="<tr><td>Evelyn Solis</td><td>102250361</td> <td>8814-1178</td><td>evelynsolis@cmx.com</td><td><img id=btnmodingreso class=borrar src=img/file_mod.png></td><td><img id=btnborraingreso class=borrar src=img/file_delete.png></td></tr>";
    $('#tableBody').append(row1+row2+row3+row4);  

    $('#tblchofer').DataTable( {
        "order": [[ 1, "asc" ]],
        "paging":   false,
        "scrollY": "140px",
        "scrollCollapse": true
    } );
}

function mantenimientochofer(){
    var inputs = '<div class=div-80>'+
    '<div class=div-80>'+
        '<label for="lbl-nombre-chofer" class="lbl-style">Nombre</label>'+
        '<input type="text" id="inp-nombre-chofer" name="inp-nombre-chofer" class="input-format" value="" required/>'+
    '</div>'+

    '<div class=div-80-50>'+
    '</div>'+

    '<div class=div-80>'+
        '<div class=div-80-50>'+
            '<label for="lbl-cedula-chofer" class="lbl-style">Cedula</label>'+
            '<input type="text" id="inp-cedula-chofer" name="inp-cedula-chofer" class="input-format" value="" required/>'+
        '</div>'+

        '<div class=div-80-50>'+
            '<label for="lbl-tel-chofer" class="lbl-style">Telefono</label>'+
            '<input type="text" id="inp-tel-chofer" name="inp-tel-chofer" class="input-format" value="" required/>'+
        '</div>'+
    '</div>'+

    '<div class=div-80-50>'+
    '</div>'+

    '<div class=div-80>'+
        '<div class=div-80-50>'+   
            '<label for="lbl-correo-chofer" class="lbl-style">Correo</label>'+
            '<input type="text" id="inp-correo-chofer" name="inp-correo-chofer" class="input-format" value="" required/>'+
        '</div>'+
    '</div>'+

    '<div class=div-80>'+
        '<label for="lbl-correo-chofer" class="lbl-style">Cuenta</label>'+
        '<input type="text" id="inp-cuenta-chofer" name="inp-cuenta-chofer" class="input-format" value="" required/>'+
    '</div>'+
    '<div class=div-20>'+
        '<div class=div-20-80>'+
        '</div>'+
        '<div class=div-20-20>'+
            '<input type="button" id="btnguardarchofer" class="btn" value="Guardar">'+
            '<input type="button" id="btnmodificar" class="btn" value="Modificar">'+                                                                  
        '</div>'+
    '</div>'+
    
'</div>';




    $('#div-mant-inputs').append(inputs);
}

function mantenimientofinca(){
    $('#div-mant-inputs').html(""); 
    var inputs = '<div class=div-80>'+
    
    '<div class=div-80>'+
        '<label for="lbl-nombre-finca" class="lbl-style">Nombre</label>'+
        '<linput type="text" id="inp-nombre-finca" name="inp-nombre-finca" class="input-format" value="" required/>'+
    '</div>'+

    '<div class=div-80-50>'+
    '</div>'+

    '<div class=div-80>'+
        '<div class=div-80-50>'+
            '<label for="lbl-ubicacion-finca" class="lbl-style">Ubicación</label>'+
            '<linput type="text" id="inp-ubicacion-finca" name="inp-ubicacion-finca" class="input-format" value="" required/>'+
        '</div>'+

        '<div class=div-80-50>'+
            '<label for="lbl-tel-finca" class="lbl-style">Telefono</label>'+
            '<linput type="text" id="inp-tel-finca" name="inp-tel-finca" class="input-format" value="" required/>'+
        '</div>'+
    '</div>'+

    '<div class=div-80-50>'+
    '</div>'+
    
    '</div>'+
        '<div class=div-20>'+
                '<div class=div-20-80>'+
                '</div>'+
                '<div class=div-20-20>'+
                    '<linput type="button" id="btnguardarfinca" class="btn" value="Guardar">'+
                    '<linput type="button" id="btnmodificarfinca" class="btn" value="Modificar">'+                                                                  
                '</div>'+
        '</div>';
    $('#div-mant-inputs').append(inputs);
}

function LimpiaTitulo()
{
    $('#div-mants').html("");  
    $('#div-mant-inputs').html("");    
    $('h3:contains(CHOFER)').remove();
    $('h3:contains(FINCA)').remove();
    $('h3:contains(NAVIERA)').remove();
    $('h3:contains(VIAJE)').remove();
    $('h3:contains(INGRESOS Y GASTOS)').remove();
    $('h3:contains(COLOCACIONES DIARIAS)').remove();
}

function Fecha(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var min = today.getMinutes();

    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    if(hh<10){
        hh='0'+hh
    }
    if(min<10){
        min='0'+min
    }

    today = yyyy+'-'+mm+'-'+dd+'T'+hh+':'+min;    
    document.getElementById("form-date-crtl").value = today;
}


/* REPORTE DIARIO*/
$(document).on('click','#menu-diario', function(){        
    LimpiaTitulo();
    $('#div-mant-titulo').append("<h3 id='titulo-Colocaciones-Diarias'>COLOCACIONES DIARIAS</h3>");
    $('#div-mants').append("<table id='tblrepdiario'class='tbl'>");
    var col="<thead><tr><th>CHOFER</th><th>HORA CARGA</th><th>MARCHAMO</th><th>CONTENEDOR</th><th>NAVIERA</th></tr></thead><tbody id='tableBody'></tbody>";
    $('#tblrepdiario').append(col);
    var row1="<tr><td>Jill Smith</td><td>07:00 AM</td><td>EU 11485371</td><td>MEDU 606765-8</td><td>MSC</td></tr>";
    var row2="<tr><td>Eve Jackson</td><td>08:00 AM</td><td>EU 11445871</td><td>MEDU 606766-8</td><td>MSC</td></tr>";
    var row3="<tr><td>John Man</td><td>09:00 AM</td><td>EU 11485111</td><td>MEDU 606767-8</td><td>MSC</td></tr>";
    var row4="<tr><td>Jill Smith</td><td>07:00 AM</td><td>EU 11485380</td><td>MEDU 606780-1</td><td>MSC</td></tr>";
    var row5="<tr><td>Juan Gonzalez</td><td>07:00 AM</td><td>EU 11485371</td><td>MEDU 606765-8</td><td>MSC</td></tr>";
    var row6="<tr><td>Jill Smith</td><td>07:00 AM</td><td>EU 11485425</td><td>MEDU 606766-4</td><td>MSC</td></tr>";
    $('#tableBody').append(row1+row2+row3+row4+row5+row6);  

    $('#tblrepdiario').DataTable( {
        "order": [[ 1, "asc" ]]
    } );
});