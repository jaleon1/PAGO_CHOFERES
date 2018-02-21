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
var seleccionlinea=0;
var kmsviaje;
var idchofer;
var idcalculokm;

$(document).ready( function () {  
    ingresosgastosformulario();
    seleccionfila();
    chofer();
    mantenimientochofer();
    mantenimientoformpago();
    ingresosgastosformulario();
    Fecha();
    $("#filtrofecha").hide();
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
};

$(document).on('click', '#inp-finca', function (event) {    
    $("#div-mants").css("height", "260px");
    $("#div-mant-inputs").css("height", "260px");
    calculokm();
    mantenimientoviajes();
    muestrafincanaviera();
});



$(document).on('click', '#inp-naviera', function (event) {    
    $("#div-mants").css("height", "260px");
    $("#div-mant-inputs").css("height", "260px");
    calculokm();
    mantenimientoviajes();
    muestrafincanaviera();
});


function muestrafincanaviera(){
    
    $('#tablefinca').append("<table id='tblfincamant'class='tbl'>");
    var col="<thead><tr><th>NOMBRE</th></tr></thead><tbody id='tableBody-finca'></tbody>";
    $('#tblfincamant').append(col);
  
    //$('#tableBody-finca').append(row1+row2+row3+row4+row5);  

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
    document.getElementById("radio-ingreso").checked = true;
});

$(document).on('click','#tblcalculokm tr', function(){        
    //SELECCIONA LA FILA Y LA INSERTA EN EL INPUT DC
    document.getElementById('inp-finca').value = $(this).find('td:nth-child(4)').html();
    document.getElementById('inp-naviera').value = $(this).find('td:nth-child(5)').html();
    //Multiplica los km por el precio de pago establecido
    document.getElementById('inp-valor-viaje').value = $(this).find('td:nth-child(6)').html() * 1.9;
    document.getElementById('inp-total-pago').value = document.getElementById('inp-valor-viaje').value;
    valorviaje = document.getElementById('inp-valor-viaje').value;
    kmsviaje = $(this).find('td:nth-child(6)').html();
    idcalculokm = $(this).find('td:nth-child(1)').html();
});

function ingresosgastos(){
    LimpiaTitulo();
    $('#div-mant-titulo').append("<h3 id='titulo-ingresos-gastos'>INGRESOS Y GASTOS</h3>");
    
    $('#div-mants').append("<div id='div-mant-ingresos'></div><div id='div-mant-gastos'></div>");
    
    $('#div-mant-ingresos').append("<table id='tblingresos'class='tbl'>");
    var col="<thead><tr><th>INGRESOS</th><th>Monto</th><th>%</th><th></th><th></th></tr></thead><tbody id='tblbodyingresos'></tbody>";
    $('#tblingresos').append(col);
 
    $('#div-mant-gastos').append("<table id='tblgastos'class='tbl'>");
    var col="<thead><tr><th>GASTOS</th><th>Monto</th><th></th><th></th></tr></thead><tbody id='tblbodygastos'></tbody>";
    $('#tblgastos').append(col); 

    $('#tblingresos').DataTable({
        "order": [[ 0, "asc" ]],
        "bLengthChange": false,
        searching: false,
        "bInfo": false,
        "paging":   false,
        "scrollY": "175px",
        "scrollCollapse": true
    });
    $('#tblgastos').DataTable({
        "order": [[ 0, "asc" ]],
        "bLengthChange": false,
        searching: false,
        "bInfo": false,
        "paging":   false,
        "scrollY": "175px",
        "scrollCollapse": true
    });

    LoadAllIngreso();
    LoadAllGasto();
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
        monto = parseInt($(this).find('td:nth-child(3)').html());
        var td1="<tr class=cambia-gasto><td>"+ $(this).find('td:nth-child(2)').html() +"</td><td class=montogasto>"+ monto +"</td><td><img id=btnborragasto class=borrar src=img/file_delete.png></td></tr>";
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
        if(parseFloat($(this).find('td:nth-child(4)').html())!=0)
            //Porcentaje Indicado calculo por valor viaje
            monto = (parseInt($("#inp-valor-viaje").val())*parseInt($(this).find('td:nth-child(4)').html()))/100;
        else
            monto = parseInt($(this).find('td:nth-child(3)').html());
        
        var td1="<tr class=cambia-ingreso><td>"+ $(this).find('td:nth-child(2)').html() +"</td><td class=montoingreso>"+ monto +"</td><td><img id=btnborraingreso class=borrar src=img/file_delete.png></td></tr>";
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
    if(seleccionlinea==0){
    //SELECCIONA LA FILA Y LA INSERTA EN EL INPUT DC
    document.getElementById('inp-chofer').value = $(this).find('td:nth-child(2)').html();
    idchofer = $(this).find('td:nth-child(1)').html();
    }
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
    var col="<thead><tr><th>NOMBRE</th><th>CEDULA</th><th>TELEFONO</th><th>CORREO</th><th></th><th></th><th></th></tr></thead><tbody id='tableBody-chofer'></tbody>";
    $('#tblchofer').append(col);

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
    $("#filtrofecha").hide();
    seleccionlinea=0;
}); 

function mantenimientochofer(){
    var inputs = '<form id="frmchofer">'+
        '<div id=input-chofer>'+ 
            '<div class=caja-media>'+  
                '<div class=contenido-input>'+  
                    '<label for="lbl-nombre-chofer" class="lbl-style">Nombre</label>'+ 
                    '<input type="text" id="inp-nombre-chofer" name="inp-nombre-chofer" class="input-format" value=""/>'+ 
                '</div>'+ '</div>'+
                '<div class=contenido-input>'+ 
                    '<label for="lbl-correo-chofer" class="lbl-style">Cuenta</label>'+    
                    '<input type="text" id="inp-cuenta-chofer" name="inp-cuenta-chofer" class="input-format" value="" required/>'+  
                '</div>'+ '</div>'+
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
                    '<input type="submit" id="btnguardarchofer" class="btn" value="Guardar">'+ 
                '</div>'+
            '</div>'+
        '</div>'+
    '</form>';
    //
    $('#div-mant-inputs').append(inputs);
    // evento
    $('#btnguardarchofer').click(FormValidateChofer);
}

function mantenimientofinca(){
    $('#div-mant-inputs').html(""); 
    var inputs = '<form id="frmfinca">'+'<div id=input-finca>'+
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
                '<input type="submit" id="btnguardarfinca" class="btn" value="Guardar">'+        
            '</div>'+
            '<div id=boton class=contenido-input>'+
            '</div>'+
        '</div>'+
    '</div></div>';
    $('#div-mant-inputs').append(inputs);
    // evento
    $('#btnguardarfinca').click(FormValidateFinca);
}

function mantenimientonaviera(){
    $('#div-mant-inputs').html(""); 
    var inputs = '<form id="frmnaviera" >'+'<div id=input-naviera>'+
        '<div class=caja-media>'+
            '<div class=contenido-input>'+
                '<label for="lbl-nombre-naviera" class="lbl-style">Nombre</label>'+
                '<input type="text" id="inp-nombre-naviera" name="inp-nombre-naviera" class="input-format" value="" />'+
            '</div>'+
            '<div class=contenido-input>'+
            '</div>'+
            '<div class=contenido-input>'+
            '</div>'+
        '</div>'+
        '<div class=caja-cuarto>'+
            '<div class=contenido-input>'+
                '<label for="lbl-ubicacion-naviera" class="lbl-style">Ubicación</label>'+
                '<input type="text" id="inp-ubicacion-naviera" name="inp-ubicacion-naviera" class="input-format" value="" />'+
            '</div>'+
            '<div id=xxx class=contenido-input>'+
            '</div>'+
            '<div class=contenido-input>'+
            '</div>'+
        '</div>'+
        '<div class=caja-cuarto>'+
            '<div class=contenido-input>'+
                '<label for="lbl-tel-naviera" class="lbl-style">Telefono</label>'+
                '<input type="text" id="inp-tel-naviera" name="inp-tel-naviera" class="input-format" value="" />'+                        
            '</div>'+
            '<div class=contenido-input>'+
                '<input type="submit" id="btnguardarnaviera" class="btn" value="Guardar">'+        
            '</div>'+
            '<div id=boton class=contenido-input>'+
            '</div>'+
        '</div>'+
    '</div></div>';

    $('#div-mant-inputs').append(inputs);
    // evento
    $('#btnguardarnaviera').click(FormValidateNaviera);
}

function mantenimientoviajes(){
    $('#div-mant-inputs').html(""); 
    var inputs = '<form id="frmviajes">'+'<div id=input-viajes>'+
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
                    '<input type="text" id="inp-kms-viaje" name="inp-kms-viaje" class="input-format" value="" />'+         
                    '<label for="inp-finca-viaje" class="lbl-style">Finca</label>'+
                    '<input type="text" id="inp-finca-viaje" name="inp-finca-viaje" class="input-format" value="" readonly />'+         
                    '<label for="inp-naviera-viaje" class="lbl-style">Naviera</label>'+
                    '<input type="text" id="inp-naviera-viaje" name="inp-naviera-viaje" class="input-format" value="" readonly />'+                          
                '</div>'+
                '<div class=caja-media>'+
                    '<input type="submit" id="btnguardarviaje" class="btn" value="Guardar">'+  
                '</div>'+    
            '</div>'+
        '</div>'+
    '</div></div>';

    $('#div-mant-inputs').append(inputs);
    // evento
    $('#btnguardarviaje').click(FormValidateViajes);
}

function mantenimientoingresogasto(){
    $('#div-mant-inputs').html(""); 
    var inputs= '<form id=frmingresogasto>'+
        '<div id=input-ingresosgastos>'+                                           
        '<div class=caja-cuarto>'+
            '<div class=contenido-input>'+
                '<label for="lbl-nombre-inggas" class="lbl-style">Nombre</label>'+
                '<input type="text" id="inp-nombre-inggas" name="inp-nombre-inggas" class="input-format" value="" required/>'+
            '</div>'+
            '<div class=contenido-input>'+
                '<input type="radio" id=radio-ingreso name="radio-ingreso-gasto" value="ingreso" checked="checked"> Ingreso'+
            '</div>'+
        '</div>'+
        '<div class=caja-cuarto>'+
            '<div class=contenido-input>'+
                '<label for="lbl-monto-inggas" class="lbl-style">Monto</label>'+
                '<input type="text" id="inp-monto-inggas" name="inp-monto-inggas" class="input-format" value=""/>'+
            '</div>'+
            '<div class=contenido-input>'+
                '<input type="radio" id=radio-gasto name="radio-ingreso-gasto" value="gasto"> Gasto'+
            '</div>'+
        '</div>'+
        '<div class=caja-cuarto>'+
            '<div class=contenido-input>'+
                '<label for="lbl-porc-inggas" class="lbl-style">Porcentaje</label>'+
                '<input type="text" id="inp-porc-inggas" name="inp-porc-inggas" class="input-format" value=""/>'+
            '</div>'+
        '</div>'+
        '<div class=caja-cuarto>'+
            '<div class=contenido-input>'+
                '<input type="submit" id="btnguardaringgas" class="btn" value="Guardar">'+
            '</div>'+
        '</div>'+    
    '</div>'+
    '</form>';
    $('#div-mant-inputs').append(inputs);
    document.getElementById("radio-ingreso").checked = true;
        // evento
    /*if(document.getElementById("radio-ingreso").checked == true)
        $('#btnguardaringgas').click(FormValidateIngreso);
    if(document.getElementById("radio-gasto").checked == true)
        $('#btnguardaringgas').click(FormValidateGasto);*/
}

$(document).on('click', '#btnguardaringgas', function (event) {
    if(document.getElementById("radio-ingreso").checked == true)
        FormValidateIngreso();
    
    if(document.getElementById("radio-gasto").checked == true)
        FormValidateGasto();
}); 

function mantenimientoformpago(){
    $('#contenido-form').html(""); 
    var inputs = 
    //'<form action="" method="">'+
    '<div id="div-form" class="">'+
        '<div id="div-form-titulo">'+
            '<h3>FORMULARIO DE PAGO</h3>'+
            '<label >COMPROBANTE #</label>'+
            '<label id="lbl-comprobante" class="lbl-style"></label>'+
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
    '</div>';
    //'</form>';
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
                fecha: document.getElementById('form-date-crtl').value,
                idchofer: idchofer,
                idcalculokm: idcalculokm,
                contenedor: document.getElementById('inp-contenedor').value,
                placa: document.getElementById('inp-placa').value,
                finca: document.getElementById('inp-finca').value,
                naviera: document.getElementById('inp-naviera').value,
                valorviaje: parseFloat(document.getElementById('inp-valor-viaje').value),
                totalpago: parseFloat(document.getElementById('inp-total-pago').value),
                kms:parseInt(kmsviaje),
                ingresos: IngresoArray,
                gastos: GastoArray
              }
    })
    .done(function( e ) {
        alert('FORMULARIO GUARDADO!');
    })    
    .fail(function(msg){
        
    });
}); 

/* MODIFICAR*/ 
