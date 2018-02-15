/* VARIABLES GLOBALES*/
var kmporviaje=0;
var valorviaje=0;
var totalpago=0;
var contingreso=0;
var contgasto=0;
var totalingreso=0;
var totalgasto=0;
var RestaIngresosBorrados=0;
var valortotalresta=0;
var IngresoArray=[];
var GastoArray=[];

$(document).ready( function () {  
    ingresosgastosformulario();
    seleccionfila();
    chofer();
    mantenimientochofer();
    mantenimientoformpago();
    ingresosgastosformulario();
    Fecha();
});

//Selección DataTable
function seleccionfila(){
    var table = $('#tblfincamant').DataTable();

    $('#tblfincamant tableBody-finca').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );
}

$(document).on('click', '#menu-finca', function (event) {    
    finca();
    $('#div-finca').show();
    mantenimientofinca();
});

$(document).on('click', '#inp-finca', function (event) {    
    $("#div-mants").css("height", "260px");
    $("#div-mant-inputs").css("height", "260px");
    calculokm();
    mantenimientoviajes();
    muestrafincanaviera();
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
    var row1="<tr><td>Arcoiris</td><td>Pocozol</td><td>8891-8749</td></tr>";
    var row2="<tr><td>Arcoiris</td><td>Guanacaste</td> <td>8857-1147</td></tr>";
    var row3="<tr><td>Maquenco</td><td>Guanacaste Samara</td> <td>9584-8744</td></tr>";
    var row4="<tr><td>Ostional</td><td>San Carlos</td> <td>8814-1178</td></tr>";
    var row5="<tr><td>La Irma</td><td>Guanacaste Abangares</td> <td>8814-1178</td></tr>";
    $('#tableBody').append(row1+row2+row3+row4+row5);  

    $('#tblfinca').DataTable({
        "order": [[ 1, "asc" ]],
        "paging":   false,
        "scrollY": "180px",
        "scrollCollapse": true,
        "bInfo" : false
    });
}

$(document).on('click', '#menu-naviera', function (event) {    
    naviera();
    mantenimientonaviera();
});

$(document).on('click', '#inp-naviera', function (event) {    
    $("#div-mants").css("height", "260px");
    $("#div-mant-inputs").css("height", "260px");
    calculokm();
    mantenimientoviajes();
    muestrafincanaviera();
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
    var row3="<tr><td>Alammo</td><td>Los Patios</td> <td>9584-8744</td></tr>";
    var row4="<tr><td>Naviera 4</td><td>Limón</td> <td>8814-1178</td></tr>";
    $('#tableBody').append(row1+row2+row3+row4);  

    $('#tblnaviera').DataTable({
        "order": [[ 1, "asc" ]],
        "paging":   false,
        "scrollY": "180px",
        "scrollCollapse": true,
        "bInfo" : false
    });
}

$(document).on('click', '#menu-calculokm', function (event) {    
    $("#div-mants").css("height", "260px");
    $("#div-mant-inputs").css("height", "260px");
    calculokm();
    mantenimientoviajes();
    muestrafincanaviera();
});

function calculokm(){
    LimpiaTitulo();
    $('#div-mant-titulo').append("<h3 id='titulo-calculokm'>VIAJES</h3>");
    $('#div-mants').append("<table id='tblcalculokm'class='tbl'>");
    var col="<thead><tr><th>Finca</th><th>Naviera</th><th>Kilometros</th></thead><tbody id='tableBody'></tbody>";
    $('#tblcalculokm').append(col);
    var row1="<tr><td>Arcoiris</td><td>Japa Loid</td><td>600</td></tr>";
    var row2="<tr><td>Liberia</td> <td>Moin</td><td>750</td></tr>";
    var row3="<tr><td>La Cruz</td> <td>Moin</td><td>510</td></tr>";
    var row4="<tr><td>Zona Sur</td> <td>Moin</td><td>555</td></tr>";
    $('#tableBody').append(row1+row2+row3+row4);  

    $('#tblcalculokm').DataTable({
        "order": [[ 1, "asc" ]],
        "paging":   false,
        "scrollY": "180px",
        "scrollCollapse": true,
        "bInfo" : false
    });
}

function muestrafincanaviera(){
    
    $('#tablefinca').append("<table id='tblfincamant'class='tbl'>");
    var col="<thead><tr><th>NOMBRE</th></tr></thead><tbody id='tableBody-finca'></tbody>";
    $('#tblfincamant').append(col);
    var row1="<tr><td>Banderas</td></tr>";
    var row2="<tr><td>Arcoiris</td></tr>";
    var row3="<tr><td>Maquenco</td></tr>";
    var row4="<tr><td>Ostional</td></tr>";
    var row5="<tr><td>La Irma</td></tr>";
    $('#tableBody-finca').append(row1+row2+row3+row4+row5);  

    $('#tblfincamant').DataTable({
        "order": [[ 0, "asc" ]],
        "paging":   false,
        "scrollY": "125px",
        "scrollCollapse": true,
        "bInfo" : false,
        "searching": false
    });

    $('#tablenaviera').append("<table id='tblnavieramant'class='tbl'>");
    var col="<thead><tr><th>NOMBRE</th></tr></thead><tbody id='tableBody-naviera'></tbody>";
    $('#tblnavieramant').append(col);
    var row1="<tr><td>Banderas</td></tr>";
    var row2="<tr><td>Arcoiris</td></tr>";
    var row3="<tr><td>Maquenco</td></tr>";
    var row4="<tr><td>Ostional</td></tr>";
    var row5="<tr><td>La Irma</td></tr>";
    $('#tableBody-naviera').append(row1+row2+row3+row4+row5);  

    $('#tblnavieramant').DataTable({
        "order": [[ 0, "asc" ]],
        "paging":   false,
        "scrollY": "125px",
        "scrollCollapse": true,
        "bInfo" : false,
        "searching": false
    });
}

$(document).on('click', '#menu-ingresos-gastos', function (event) {    
    ingresosgastos();
    mantenimientoingresogasto();
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
    var col="<thead><tr><th>INGRESOS</th><th>Monto</th><th>%</th></tr></thead><tbody id='tblbodyingresos'></tbody>";
    $('#tblingresos').append(col);
    var row1="<tr><td>Alquiler de Cureña</td><td></td><td>15</td></tr>";
    var row2="<tr><td>Combustible</td><td>150000</td><td>10</td></tr>";
    var row3="<tr><td>Herramientas</td><td>15000</td><td></td></tr>";
    $('#tblbodyingresos').append(row1+row2+row3);  

    $('#div-mant-gastos').append("<table id='tblgastos'class='tbl'>");
    var col="<thead><tr><th>GASTOS</th><th>Monto</th></tr></thead><tbody id='tableBody'></tbody>";
    $('#tblgastos').append(col);
    var row1="<tr><td>Viaticos</td><td>70000</td></tr>";
    var row2="<tr><td>Seguro</td><td>50000</td></tr>";
    var row3="<tr><td>Otros</td><td>5000</td></tr>";
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
    mantenimientoingresogasto();
});

$(document).on('click','#tblformgastos tr', function(){        
    ingresosgastos();
    mantenimientoingresogasto();
});

function ingresosgastosformulario(){
    $('#div-form-ingresos').append("<table id='tblformingresos'class='tbl'>");
    var col="<thead><tr class=tituloingreso><th>INGRESOS</th><th>MONTO</th><th>X</th></thead><tbody id='tblbodyingresos-form'></tbody>";
    $('#tblformingresos').append(col);
    var td= "<tr id='firsttr' class=firsttr><td></td><td></td><td></td></tr>";
    $('#tblbodyingresos-form').append(td);

    $('#div-form-gastos').append("<table id='tblformgastos'class='tbl'>");
    var col="<thead><tr class=titulogasto><th>GASTOS</th><th>MONTO</th><th>X</th></thead><tbody id='tblbodygastos-form'></tbody>";
    $('#tblformgastos').append(col);
    var td2= "<tr id='firsttr2' class=firsttr><td></td><td></td><td></td></tr>";
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

/*$(document).on('click', '#textarea-ingresos', function (event) {    
    ingresosgastos();
});

$(document).on('click', '#textarea-gastos', function (event) {    
    ingresosgastos();
});*/

$(document).on('click','#tblgastos tr', function(){        
    if(document.getElementById('inp-valor-viaje').value==""){
        alert("DEBE DE SELECCIONAR UN VIAJE!");
    }
    else{
        var monto = 0;
        $('#firsttr2').closest('tr').remove();
        monto = parseInt($(this).find('td:nth-child(2)').html());
        var td1="<tr class=cambia-gasto><td>"+ $(this).find('td:first').html() +"</td><td class=montogasto>"+ monto +"</td><td><img id=btnborragasto class=borrar src=img/file_delete.png></td></tr>";
        $("#tblbodygastos-form").append(td1);
        totalgasto += monto;
    }
    aplicarIngresoGasto();
    ArrayIngresos();
    ArrayGastos();
});
                      
$(document).on('click','#tblingresos tr', function(){        
    if(document.getElementById('inp-valor-viaje').value==""){
        alert("DEBE DE SELECCIONAR UN VIAJE!");
    }
    else{
        var monto = 0;
        $('#firsttr').closest('tr').remove();
        if($(this).find('td:nth-child(3)').html()!="" ){
            //Porcentaje Indicado calculo por valor viaje
            monto = (parseInt($("#inp-valor-viaje").val())*parseInt($(this).find('td:nth-child(3)').html()))/100;
        }
        else{
            monto = parseInt($(this).find('td:nth-child(2)').html());
        }
        
        var td1="<tr class=cambia-ingreso><td>"+ $(this).find('td:first').html() +"</td><td class=montoingreso>"+ monto +"</td><td><img id=btnborraingreso class=borrar src=img/file_delete.png></td></tr>";
        $("#tblbodyingresos-form").append(td1);
        totalingreso += monto;
    }
    aplicarIngresoGasto();
    ArrayIngresos();
    ArrayGastos();
});
                    
$(document).on('click','#btnborraingreso', function(){        
    $(this).closest('tr').remove();
    aplicarIngresoGasto();
    ArrayIngresos();
    ArrayGastos();
    //SE DEBE DE RESTAR AL PAGO TOTAL
});

$(document).on('click','#btnborragasto', function(){        
    $(this).closest('tr').remove(); 
    aplicarIngresoGasto();
    ArrayIngresos();
    ArrayGastos();
    //SE DEBE DE RESTAR AL PAGO TOTAL
});

jQuery(document).on( "keyup", ".inp-ingresogasto", function(){ 
    aplicarIngresoGasto();
    ArrayIngresos();
    ArrayGastos();
});

jQuery(document).on( "keyup", ".inp-ingreso", function(){ 
    aplicarIngresoGasto();
    ArrayIngresos();
    ArrayGastos();
});

$(document).on('click','#btnaplicar', function(event){        
    
});

function aplicarIngresoGasto(){
    document.getElementById('inp-total-pago').value = document.getElementById('inp-valor-viaje').value;
    
    document.getElementById('inp-total-pago').value = 
    ( parseFloat( document.getElementById('inp-total-pago').value - ( SumarIngresosTD() + SumarIngresosINP() ) ) )
    + ( SumarGastosTD()+SumarGastosINP() );    
}

function SumarIngresosTD(){
    var total=0;
    
    var $filas= $("#tblformingresos tr:not('.tituloingreso, .firsttr')");
   
     $filas.each(function() {
        $(this).find('td.montoingreso').each(function() { 
           total += parseInt($(this).html());
        });
     });
     return total;
}

function SumarIngresosINP(){
    var total=0;

    for (i = 1; i < contingreso+1; i++){
        if($("#inp-ingreso-monto" + i.toString()).val()==""){
            var x=0;
        }
        else{
            if($("#inp-ingreso-monto" + i.toString()).val()==undefined){
                x=0;
            }
            else{
                if($("#inp-ingreso-monto" + i.toString()).val()!=undefined || $("#inp-ingreso-monto" + i.toString()).val()!=''){
                    total += parseFloat($("#inp-ingreso-monto" + i.toString()).val());
                }
            }
        }
    }
    return total;
}

function SumarGastosTD(){
    var total=0;
    
    var $filas= $("#tblformgastos tr:not('.titulogasto, .firsttr')");
   
    $filas.each(function() {
        $(this).find('td.montogasto').each(function() { 
            total += parseInt($(this).html());
        });
    });
    return total;
}

function SumarGastosINP(){
    var total=0;
    
    for (i = 1; i < contgasto+1; i++){
        if($("#inp-gasto-monto" + i.toString()).val()==""){
            var x=0;
        }
        else{
            if($("#inp-gasto-monto" + i.toString()).val()==undefined){
                x=0;
            }
            else{
                if($("#inp-gasto-monto" + i.toString()).val()!=undefined || $("#inp-gasto-monto" + i.toString()).val()!=''){
                    total += parseFloat($("#inp-gasto-monto" + i.toString()).val());
                }
            }
        }
    }
    return total;
}

function ArrayIngresos(){
    var patt1 = /\binput/gi;
    var table = document.getElementById( "tblformingresos" );
    IngresoArray = [];
    for ( var i = 1; i < table.rows.length; i++ ) {
        var esinput1 = table.rows[i].cells[0].innerHTML;
        var esinput2 = table.rows[i].cells[1].innerHTML;
        if(!(esinput1.match(patt1))&&!(esinput2.match(patt1))){
            IngresoArray.push({
                nombreingreso: table.rows[i].cells[0].innerHTML,
                montoingreso: table.rows[i].cells[1].innerHTML
            });
        }
    }
    for(var i=1; i<contingreso+1;i++){
        if(($("#inp-ingreso" + i.toString()).val()!=undefined)&&($("#inp-ingreso-monto" + i.toString()).val()!=undefined)){
            IngresoArray.push({
                nombreingreso:$("#inp-ingreso" + i.toString()).val(),
                montoingreso: $("#inp-ingreso-monto" + i.toString()).val()
            });
        }
    }
}

function ArrayGastos(){
    var patt1 = /\binput/gi;
    var table = document.getElementById( "tblformgastos" );
    GastoArray = [];
    for ( var i = 1; i < table.rows.length; i++ ) {
        var esinput1 = table.rows[i].cells[0].innerHTML;
        var esinput2 = table.rows[i].cells[1].innerHTML;
        if(!(esinput1.match(patt1))&&!(esinput2.match(patt1))){
            GastoArray.push({
                nombregasto: table.rows[i].cells[0].innerHTML,
                montogasto: table.rows[i].cells[1].innerHTML
            });
        }
    }
    for(var i=1; i<contgasto+1;i++){
        if(($("#inp-gasto" + i.toString()).val()!=undefined)&&($("#inp-gasto-monto" + i.toString()).val()!=undefined)){
            GastoArray.push({
                nombregasto:$("#inp-gasto" + i.toString()).val(),
                montogasto: $("#inp-gasto-monto" + i.toString()).val()
            });
        }
    }
}

/* CHOFER */

$(document).on('click','#tblchofer tr', function(){        
    //SELECCIONA LA FILA Y LA INSERTA EN EL INPUT DC
    document.getElementById('inp-chofer').value = $(this).find('td:first').html();
});

$(document).on('click', '#inp-chofer', function (event) {    
    $("#div-mants").css("height", "340px");
    $("#div-mant-inputs").css("height", "180px");
    chofer();
    mantenimientochofer();
});

$(document).on('click', '#menu-chofer', function (event) {    
    $("#div-mants").css("height", "340px");
    $("#div-mant-inputs").css("height", "180px");
    chofer();
    mantenimientochofer();
});

function chofer(){
    LimpiaTitulo();
    $('#div-mant-titulo').append("<h3 id='titulo-Chofer'>CHOFER</h3>");
    $('#div-mants').append("<table id='tblchofer'class='tbl'>");
    var col="<thead><tr><th>NOMBRE</th><th>CEDULA</th><th>TELEFONO</th><th>CORREO</th><th></th><th></th></tr></thead><tbody id='tableBody-chofer'></tbody>";
    $('#tblchofer').append(col);
    var row="<tr><td>Jairo León González</td><td>304190452</td><td>8991-5749</td><td>jairolg27@gmail.com</td><td></td><td></td></tr>";
    $('#tableBody-chofer').append(row);  

    $('#tblchofer').DataTable( {
        "order": [[ 1, "asc" ]],
        "paging":   false,
        "scrollY": "180px",
        "scrollCollapse": true,
        "bInfo" : false
    } );
}

/*FORMULARIO PAGO*/
$(document).on('click', '#menu-formulario-pago', function (event) {    
    mantenimientoformpago();
    ingresosgastosformulario();
    Fecha();
}); 

function mantenimientochofer(){
    var inputs = '<div id=input-chofer>'+ 
        '<div class=caja-media>'+  
            '<div class=contenido-input>'+ 
                '<label for="lbl-nombre-chofer" class="lbl-style">Nombre</label>'+ 
                '<input type="text" id="inp-nombre-chofer" name="inp-nombre-chofer" class="input-format" value="" required/>'+ 
            '</div>'+
            '<div class=contenido-input>'+ 
                '<label for="lbl-correo-chofer" class="lbl-style">Cuenta</label>'+    
                '<input type="text" id="inp-cuenta-chofer" name="inp-cuenta-chofer" class="input-format" value="" required/>'+  
            '</div>'+
            '<div class=contenido-input>'+
            '</div>'+
        '</div>'+
        '<div class=caja-cuarto>'+ 
            '<div class=contenido-input>'+
                '<label for="lbl-cedula-chofer" class="lbl-style">Cedula</label>'+
                '<input type="text" id="inp-cedula-chofer" name="inp-cedula-chofer" class="input-format" value="" required/>'+
            '</div>'+
            '<div id=xxx class=contenido-input>'+
                '<label for="lbl-correo-chofer" class="lbl-style">Correo</label>'+
                '<input type="text" id="inp-correo-chofer" name="inp-correo-chofer" class="input-format" value="" required/>'+
            '</div>'+
            '<div class=contenido-input>'+
            '</div>'+
        '</div>'+
        '<div class=caja-cuarto>'+ 
            '<div class=contenido-input>'+
                '<label for="lbl-tel-chofer" class="lbl-style">Telefono</label>'+
                '<input type="text" id="inp-tel-chofer" name="inp-tel-chofer" class="input-format" value="" required/>'+
            '</div>'+
            '<div class=contenido-input>'+

            '</div>'+
            '<div id=boton class=contenido-input>'+
                '<input type="button" id="btnguardarchofer" class="btn" value="Guardar">'+ 
            '</div>'+
        '</div>'+
    '</div>';

    $('#div-mant-inputs').append(inputs);
}

function mantenimientofinca(){
    $('#div-mant-inputs').html(""); 
    var inputs = '<div id=input-finca>'+
        '<div class=caja-media>'+
            '<div class=contenido-input>'+
                '<label for="lbl-nombre-finca" class="lbl-style">Nombre</label>'+
                '<input type="text" id="inp-nombre-finca" name="inp-nombre-finca" class="input-format" value="" required/>'+
            '</div>'+
            '<div class=contenido-input>'+
            '</div>'+
            '<div class=contenido-input>'+
            '</div>'+
        '</div>'+
        '<div class=caja-cuarto>'+
            '<div class=contenido-input>'+
                '<label for="lbl-ubicacion-finca" class="lbl-style">Ubicación</label>'+
                '<input type="text" id="inp-ubicacion-finca" name="inp-ubicacion-finca" class="input-format" value="" required/>'+
            '</div>'+
            '<div class=contenido-input>'+
            '</div>'+
            '<div class=contenido-input>'+
            '</div>'+
        '</div>'+
        '<div class=caja-cuarto>'+
            '<div class=contenido-input>'+
                '<label for="lbl-tel-finca" class="lbl-style">Telefono</label>'+
                '<input type="text" id="inp-tel-finca" name="inp-tel-finca" class="input-format" value="" required/>'+                        
            '</div>'+
            '<div class=contenido-input>'+
                '<input type="button" id="btnguardarfinca" class="btn" value="Guardar">'+        
            '</div>'+
            '<div id=boton class=contenido-input>'+
            '</div>'+
        '</div>'+
    '</div>';
    $('#div-mant-inputs').append(inputs);
}

function mantenimientonaviera(){
    $('#div-mant-inputs').html(""); 
    var inputs = '<div id=input-naviera>'+
        '<div class=caja-media>'+
            '<div class=contenido-input>'+
                '<label for="lbl-nombre-naviera" class="lbl-style">Nombre</label>'+
                '<input type="text" id="inp-nombre-naviera" name="inp-nombre-naviera" class="input-format" value="" required/>'+
            '</div>'+
            '<div class=contenido-input>'+
            '</div>'+
            '<div class=contenido-input>'+
            '</div>'+
        '</div>'+
        '<div class=caja-cuarto>'+
            '<div class=contenido-input>'+
                '<label for="lbl-ubicacion-naviera" class="lbl-style">Ubicación</label>'+
                '<input type="text" id="inp-ubicacion-naviera" name="inp-ubicacion-naviera" class="input-format" value="" required/>'+
            '</div>'+
            '<div id=xxx class=contenido-input>'+
            '</div>'+
            '<div class=contenido-input>'+
            '</div>'+
        '</div>'+
        '<div class=caja-cuarto>'+
            '<div class=contenido-input>'+
                '<label for="lbl-tel-naviera" class="lbl-style">Telefono</label>'+
                '<input type="text" id="inp-tel-naviera" name="inp-tel-naviera" class="input-format" value="" required/>'+                        
            '</div>'+
            '<div class=contenido-input>'+
                '<input type="button" id="btnguardarnaviera" class="btn" value="Guardar">'+        
            '</div>'+
            '<div id=boton class=contenido-input>'+
            '</div>'+
        '</div>'+
    '</div>';

    $('#div-mant-inputs').append(inputs);
}

function mantenimientoviajes(){
    $('#div-mant-inputs').html(""); 
    var inputs ='<div id=input-viajes>'+
        '<div class=caja-media>'+
            '<div id=tablefinca class=contenido-table>'+
                '<label for="lbl-nombre-finca" class="lbl-style">FINCA</label>'+
            '</div>'+
            '<div class=contenido-extra>'+
            '</div>'+
        '</div>'+
        '<div class=caja-media>'+
            '<div id=tablenaviera class=contenido-table>'+
                '<label for="lbl-nombre-finca" class="lbl-style">NAVIERA</label>'+
            '</div>'+
            '<div class=contenido-extra>'+
                '<div class=caja-media>'+ 
                    '<label for="lbl-kms-viaje" class="lbl-style">Kms</label>'+
                    '<input type="text" id="inp-kms-viaje" name="inp-kms-viaje" class="input-format" value="" required/>'+                          
                '</div>'+
                '<div class=caja-media>'+
                    '<input type="button" id="btnguardarviaje" class="btn" value="Guardar">'+  
                '</div>'+    
            '</div>'+
        '</div>'+
    '</div>';

    $('#div-mant-inputs').append(inputs);
}

function mantenimientoingresogasto(){
    $('#div-mant-inputs').html(""); 
    var inputs= '<div id=input-ingresosgastos>'+                                           
        '<div class=caja-cuarto>'+
            '<div class=contenido-input>'+
                '<label for="lbl-nombre-inggas" class="lbl-style">Nombre</label>'+
                '<input type="text" id="inp-nombre-inggas" name="inp-nombre-inggas" class="input-format" value="" required/>'+
            '</div>'+
            '<div class=contenido-input>'+
                '<input type="radio" name="radio-ingreso" value="ingreso"> Ingreso'+
            '</div>'+
        '</div>'+
        '<div class=caja-cuarto>'+
            '<div class=contenido-input>'+
                '<label for="lbl-monto-inggas" class="lbl-style">Monto</label>'+
                '<input type="text" id="inp-monto-inggas" name="inp-monto-inggas" class="input-format" value="" required/>'+
            '</div>'+
            '<div class=contenido-input>'+
                '<input type="radio" name="radio-gasto" value="gasto"> Gasto'+
            '</div>'+
        '</div>'+
        '<div class=caja-cuarto>'+
            '<div class=contenido-input>'+
                '<label for="lbl-porc-inggas" class="lbl-style">Porcentaje</label>'+
                '<input type="text" id="inp-porc-inggas" name="inp-porc-inggas" class="input-format" value="" required/>'+
            '</div>'+
        '</div>'+
        '<div class=caja-cuarto>'+
            '<div class=contenido-input>'+
                '<input type="button" id="btnguardaringgas" class="btn" value="Guardar">'+
            '</div>'+
        '</div>'+    
    '</div>';
    $('#div-mant-inputs').append(inputs);
}

function mantenimientoformpago(){
    $('#contenido-form').html(""); 
    var inputs = 
    '<form action="" method="">'+
    '<div id="div-form" class="">'+
        '<div id="div-form-titulo">'+
            '<h3>FORMULARIO DE PAGO</h3>'+
            '<label >COMPROBANTE #</label>'+
            '<label id="lbl-comprovante" class="lbl-style"></label>'+
        '</div>'+
        '<div id="div-form-chofer">'+
            '<label for="lbl-chofer" class="lbl-style">Chofer</label>'+
            '<input type="text" id="inp-chofer" name="inp-chofer" class="input-format" readonly="readonly" value="" required/>'+ 
        '</div>'+
        '<div id="div-form-fecha">'+
            '<label id="lbl-fecha" for="form-date-crtl" class="lbl-style">Fecha de Carga</label>'+
            '<input type="datetime-local" id="form-date-crtl" name="form-date-crtl" class="input-format" required/>'+
        '</div>'+
        '<div id="div-form-contenedor">'+
            '<label for="lbl-contenedor" class="lbl-style">Contenedor</label>'+
            '<input type="text" id="inp-contenedor" name="inp-contenedor" class="input-format" value="" required/>'+ 
        '</div>'+
        '<div id="div-form-placa">'+
            '<label for="lbl-placa" class="lbl-style">Placa</label>'+
            '<input type="text" id="inp-placa" name="inp-placa" class="input-format" value="" required/>'+ 
        '</div>'+
        '<div id="div-form-finca">'+
            '<label for="lbl-finca" class="lbl-style">Finca</label>'+
            '<input type="text" id="inp-finca" name="inp-finca" class="input-format" readonly="readonly" value="" required/>'+ 
        '</div>'+
        '<div id="div-form-naviera">'+
            '<label for="lbl-naviera" class="lbl-style">Naviera</label>'+
            '<input type="text" id="inp-naviera" name="inp-naviera" class="input-format" readonly="readonly" value="" required/>'+ 
        '</div>'+
        '<div id="div-form-valor-viaje">'+
            '<label for="lbl-valor-viaje" class="lbl-style">VALOR DEL VIAJE</label>'+
            '<input type="text" id="inp-valor-viaje" name="inp-valor-viaje" class="input-format" readonly="readonly" value="" required/>'+ 
        '</div>'+
        '<div id="div-form-conversion">'+
            '<button id="btncambio">$/</button>'+
        '</div>'+
        '<div class="div-form-medio">'+         
            '<div id="div-form-ingresos">'+         
            '</div>'+
            '<div id="div-form-ingresos-add">'+       
                '<input type="button" id="btnaddingresos" class="btnadd" value="+">'+  
            '</div>'+
        '</div>'+
        '<div class="div-form-medio">'+  
            '<div id="div-form-gastos">'+
            '</div>'+
            '<div id="div-form-gastos-add">'+
                '<input type="button" id="btnaddgastos" class="btnadd" value="+">'+  
            '</div>'+
        '</div>'+

        
        '<div id="div-form-total-pago">'+
            '<label for="lbl-total-pago" class="lbl-style">TOTAL A PAGAR</label>'+
            '<input type="text" id="inp-total-pago" name="inp-total-pago" class="input-format" readonly="readonly" value="" required/>'+ 
            '<input type="submit" id="btnguardarform" class="" value="Guardar">'+
        '</div>'+
    '</div>'+
    '</form>';
    $('#contenido-form').append(inputs);
}

function mantenimientoreportes(){
    $('#contenido-form').html(""); 
    var inputs = '<div id="div-repo">'+
        '<div id=div-report-titulo>'+
            '<h3>REPORTES</h3>'+
        '</div>'+
        '<div id=div-lista-reporte>'+
        
        '</div>'+
        '<div id=div-opcion-report>'+
            '<div class=div-tercio>'+
                '<div class=div-opciones></div>'+
                '<div class=div-total-botones></div>'+
            '</div>'+
            '<div class=div-tercio>'+
                '<div class=div-opciones>'+
                
                '</div>'+
                '<div class=div-total-botones></div>'+
            '</div>'+
            '<div class=div-tercio>'+
                '<div class=div-opciones></div>'+
                '<div class=div-total-botones></div>'+
            '</div>'+
        '</div>'+    
    '</div>';
    $('#contenido-form').append(inputs);
}

function LimpiaTitulo(){
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

/* REPORTES*/
function listareportes(){        
    $('#div-lista-reporte').append("<table id='tblreportes'class='tbl'>");
    var col="<thead><tr><th>#</th><th>CHOFER</th><th>FECHA CARGA</th><th>PLACA</th><th>CONTENEDOR</th><th>NAVIERA</th></tr></thead><tbody id='tableBody-reportes'></tbody>";
    $('#tblreportes').append(col);
    var row1="<tr><td>00001</td><td>Jill Smith</td><td>07:00 AM</td><td>EU 11485371</td><td>MEDU 606765-8</td><td>MSC</td></tr>";
    var row2="<tr><td>00002</td><td>Eve Jackson</td><td>08:00 AM</td><td>EU 11445871</td><td>MEDU 606766-8</td><td>MSC</td></tr>";
    var row3="<tr><td>00003</td><td>John Man</td><td>09:00 AM</td><td>EU 11485111</td><td>MEDU 606767-8</td><td>MSC</td></tr>";
    var row4="<tr><td>00004</td><td>Jill Smith</td><td>07:00 AM</td><td>EU 11485380</td><td>MEDU 606780-1</td><td>MSC</td></tr>";
    var row5="<tr><td>00005</td><td>Juan Gonzalez</td><td>07:00 AM</td><td>EU 11485371</td><td>MEDU 606765-8</td><td>MSC</td></tr>";
    var row6="<tr><td>00006</td><td>Jill Smith</td><td>07:00 AM</td><td>EU 11485425</td><td>MEDU 606766-4</td><td>MSC</td></tr>";
    $('#tableBody-reportes').append(row1+row2+row3+row4+row5+row6);  

    $('#tblreportes').DataTable( {
        "order": [[ 0, "asc" ]],
        "paging":   false,
        "scrollY": "225px",
        "scrollCollapse": true,
        "bInfo" : false
    });
} 

$(document).on('click','#menu-reporte', function(event){        
    mantenimientoreportes();
    listareportes();
});

$(document).on('click', '#btnaddingresos', function (event) {
    if(document.getElementById('inp-valor-viaje').value==""){
        alert("DEBE DE SELECCIONAR UN VIAJE!");
    }
    else{
        contingreso++;
        $('#firsttr').closest('tr').remove();
        var td1="<tr><td><input type=text id=inp-ingreso"+contingreso+" class=inp-ingreso required/></td><td><input type=text id=inp-ingreso-monto"+contingreso+" class=inp-ingresogasto required/></td><td><img id=btnborraingreso class=borrar src=img/file_delete.png></td></tr>";
        $("#tblbodyingresos-form").append(td1);
    }
}); 

$(document).on('click', '#btnaddgastos', function (event) {
    if(document.getElementById('inp-valor-viaje').value==""){
        alert("DEBE DE SELECCIONAR UN VIAJE!");
    }
    else{
        contgasto++;
        $('#firsttr2').closest('tr').remove();
        var td1="<tr><td><input type=text id=inp-gasto"+contgasto+" class=inp-gasto required/></td><td><input type=text id=inp-gasto-monto"+contgasto+" class=inp-ingresogasto required/></td><td><img id=btnborraingreso class=borrar src=img/file_delete.png></td></tr>";
        $("#tblbodygastos-form").append(td1);
    }
}); 

/* INSERTAR */
//INSERTA UN FORMULARIO, SI ESTA CCORRECTO REDIRECCIONA A LISAT FORMULARIO
$(document).on('click', '#btnguardarform', function (event) {
    $.ajax({
        type: "POST",
        url: "class/Formulario.php",
        data: {
                action: "Insertar",
                fechacarga: document.getElementById('form-date-crtl').value,
                chofer: document.getElementById('inp-chofer').value,
                contenedor: document.getElementById('inp-contenedor').value,
                placa: document.getElementById('inp-placa').value,
                finca: document.getElementById('inp-finca').value,
                naviera: document.getElementById('inp-naviera').value,
                valorviaje: document.getElementById('inp-valor-viaje').value,
                totalpago: document.getElementById('inp-total-pago').value,
                ingresos: IngresoArray,
                gastos: GastoArray
              }
    })
    .done(function( e ) {
        
    })    
    .fail(function(msg){
        
    });
}); 

/* MODIFICAR*/ 
