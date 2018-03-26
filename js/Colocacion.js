
$(document).on('click','#menu-colocacion', function(){        
    $('#contenido-form').html("");
    listacolocaciones();
    mantenimientocolocaciones();
});

function mantenimientocolocaciones(){
    seleccionlinea = 4; 
    var inputs = '<form id="frmcolocacion">'+
    '<div id="div-colocacion">'+
            '<div id=input-colocacion>'+
            '<div class=caja-cuarto>'+  
                '<div class=contenido-input>'+  
                    '<label for="lbl-col-chofer" class="lbl-style">Chofer</label>'+ 
                    '<input type="text" id="inp-col-chofer" name="inp-col-chofer" class="input-format" value="" required/>'+ 
                '</div>'+ 
            '</div>'+

            '<div class=caja-cuarto>'+
                '<div class=contenido-input>'+ 
                    '<label for="lbl-col-fechacarga" class="lbl-style">Fecha Carga</label>'+ 
                    '<input type="datetime-local" id="inp-col-fechacarga" name="inp-col-fechacarga" class="input-format" value="" required/>'+ 
                '</div>'+ 
            '</div>'+
            
            '<div class=caja-cuarto>'+ 
                '<div class=contenido-input>'+
                    '<label for="lbl-col-contenedor" class="lbl-style">Contenedor</label>'+
                    '<input type="text" id="inp-col-contenedor" name="inp-col-contenedor" class="input-format" value="" required/>'+
                '</div>'+
            '</div>'+
            
            '<div class=caja-cuarto>'+ 
                '<div class=contenido-input>'+
                    '<label for="lbl-cont-marchamo" class="lbl-style">Marchamo</label>'+
                    '<input type="text" id="inp-col-marchamo" name="inp-col-marchamo" class="input-format" value="" required/>'+
                '</div>'+
            '</div>'+
            
            '<div class=caja-cuarto>'+ 
                '<div class=contenido-input>'+
                    '<label for="lbl-cont-booking" class="lbl-style">Punto de Carga</label>'+
                    '<input type="text" id="inp-col-puntocarga" name="inp-col-puntocarga" class="input-format" value="" required/>'+
                '</div>'+
            '</div>'+

            '<div class=caja-cuarto>'+ 
                '<div class=contenido-input>'+
                    '<label for="lbl-cont-capacidad" class="lbl-style">Punto de Descarga</label>'+
                    '<input type="text" id="inp-col-puntodescarga" name="inp-col-puntodescarga" class="input-format" value="" required/>'+
                '</div>'+
            '</div>'+
            
            '<div class=caja-cuarto>'+ 
                '<div class=contenido-input>'+
                    '<label id="lbl-fecha" for="form-date-crtl" class="lbl-style">Consulta Fecha de Carga</label>'+
                    '<input type="date" id="date-fechacarga" name="date-fechacarga" class="input-format" onchange="ConsultaFecha()" required/>'+
                '</div>'+
            '</div>'+
            '<div class=caja-cuarto>'+ 
                '<div class=contenido-input>'+
                    '<input type="button" id="btnguardarcolocacion" class="inputformat" value="Guardar" >'+
                '</div>'+
            '</div>'+

            '<div class=caja-cuarto>'+ 
                '<div class=contenido-input>'+
                    '<input type="button" id="btnpdfcolocacion" class="inputformat" value="Generar Reporte" >'+
                '</div>'+
            '</div>'+
        '</div>'+   
    '</div>'+
    '</div>';
    $('#contenido-form').append(inputs);
    $("#inp-col-fechacarga").val(Fecha());
    $('#btnguardarcolocacion').click(FormValidateColocacion);
};

/* REPORTES*/
function listacolocaciones(){        
    $('#contenido-form').append("<div id=div-form-titulo><h3 id='titulo-Contenedor'>COLOCACIONES DIARIAS</h3></div>");
    $('#contenido-form').append("<table id='tblcolocacion'class='tbl'>");
    var col="<thead> <tr> <th>CHOFER</th> <th>FECHA</th>  <th>CONTENEDOR</th> <th>MARCHAMO</th> <th>PUNTO CARGA</th> <th>CAPC</th> <th></th> <th></th></tr></thead> <tbody id='tableBody-colocacion'></tbody>";
    $('#tblcolocacion').append(col); 
    var td= "<tr id='firsttr-col' class=firsttr-col><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
    $('#tableBody-colocacion').append(td); 

    $('#tblcolocacion').DataTable( {
        "order": [[ 0, "asc" ]],
        "paging":   false,
        "scrollY": "350px",
        "scrollCollapse": true,
        "bInfo" : false,
        "columns": [
            { "width": "21%" },
            { "width": "21%" },
            { "width": "18%" },
            { "width": "18%" },
            { "width": "16%" },
            { "width": "2%" },
            { "width": "2%" },
            { "width": "2%" }]
    });
    LoadAllColocacion();
};

function ShowDataColocacion(e) {
    // Limpia el div que contiene la tabla.
    $('#tableBody-colocacion').html("");
    // carga lista con datos.
    var data = JSON.parse(e);
    // Recorre arreglo.
    $.each(data, function (i, item) {
        var row =
            '<tr>' +
            '<td style="display:none;">' + item.id + '</td>' +
            '<td>' + item.chofer + '</td>' +
            '<td>' + item.fechacarga + '</td>' +
            '<td>' + item.contenedor + '</td>' +
            '<td>' + item.marchamo + '</td>' +
            '<td>' + item.puntocarga + '</td>' +
            '<td>' + item.capacidad + '</td>' +
            '<td><img id=btnmodingreso'+ item.id + ' class=borrar src=img/file_mod.png></td>'+
            '<td><img id=btnborraingreso'+ item.id + ' class=borrar src=img/file_delete.png></td>'+
            '</tr>';
        $('#tableBody-colocacion').append(row);
        // evento click del boton modificar-eliminar
        $('#btncolocar' + item.id).click(ColocarEventHandlerContenedor);
        $('#btnmodingreso' + item.id).click(UpdateEventHandlerContenedor);
        $('#btnborraingreso' + item.id).click(DeleteEventHandlerContenedor);
    })
};

$(document).on('click', '#btnpdfcolocacion', function (event) {    
    // tableToExcel('tblcolocacion','Colocacion Diaria','ColocacionDiaria.xls');
    descargarExcel();
});

$(document).on('click', '#btnguardarcolocacion', function (event) {    
    SaveColocaccion();
});

function descargarExcel(){
    $(".borrar").remove();
    $(".id-form").remove();
    //Creamos un Elemento Temporal en forma de enlace
    var tmpElemento = document.createElement('a');
    // obtenemos la información desde el div que lo contiene en el html
    // Obtenemos la información de la tabla
    var data_type = 'data:application/vnd.ms-excel';
    var tabla_div = document.getElementById('tblcolocacion');
    var tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
    tmpElemento.href = data_type + ', ' + tabla_html;
    //Asignamos el nombre a nuestro EXCEL
    tmpElemento.download = 'ColocaciónDiaria.xls';
    // Simulamos el click al elemento creado para descargarlo
    tmpElemento.click();
    ConsultaFecha();
}

// Carga lista
function ConsultaFecha() {
    $.ajax({
        type: "POST",
        url: "class/Colocacion.php",
        data: { 
            action: "ConsultaFecha",
            estado:  '1',
            fechacarga: $("#date-fechacarga").val()
        }
    })
    .done(function( e ) {
        ShowDataColocacion(e);
    })    
    .fail(function(msg){
        alert("Error al Cargar Reportes");
    });    
};

$(document).on('onchange', '#date-fechacarga', function (event) {    
    // listacolocaciones();
    ConsultaFecha();
});

$(document).on('click', '#inp-col-chofer', function (event) {    
    $("#div-mants").css("height", "340px");
    $("#div-mant-inputs").css("height", "180px");
    chofer();
    mantenimientochofer();
});

$(document).on('click', '#inp-col-puntocarga', function (event) {    
    puntocarga();
    $('#div-puntocarga').show();
    mantenimientopuntocarga();
});

$(document).on('click', '#inp-col-puntodescarga', function (event) {    
    puntodescarga();
    $('#div-puntodescarga').show();
    mantenimientopuntodescarga();
});

function FormValidateColocacion(){
    $("#frmcolocacion").validate({
        lang: 'es', 
        rules: {
            'inp-col-chofer': "required",
            'inp-col-fechacarga': "required",
            'inp-col-contenedor': "required",
            'inp-col-marchamo': "required",
            'inp-col-puntocarga': "required",
            'inp-col-puntodescarga': "required",
            /*'inp-cedula-chofer': {
                required: true,
                number:true
                //minlenght:5
            },
            'inp-correo-chofer': {
                required: true,
                email: true
            },
            'inp-tel-chofer': {
                number: true
            }*/
        },
        submitHandler: function() {
            SaveColocacion();   
        }
    });  
};

function SaveColocaccion(){   
    // Ajax: insert / Update.
    var miAccion= idcolocacion==null ? 'Insert' : 'Update';
    $.ajax({
        type: "POST",
        url: "class/Colocacion.php",
        data: { 
            action: miAccion,  
            id: idcolocacion,              
            idchofer: idchofer,
            fechacarga: $("#inp-col-fechacarga").val(),
            idcontenedor: idcontenedor,
            idpuntocarga: idpuntocarga,
            idpuntodescarga: idpuntodescarga
        }
    })
    .done(showInfoColocacion)
    .fail(showError)
    .always(function() {
        // setTimeout('$("#btnguardarcontenedor").removeAttr("disabled")', 1500);
        // LoadAllContenedor();   
    });
    LoadAllColocacion();
}; 

// Muestra información en ventana
function showInfoColocacion() {
    //alert('show info');
    swal({
        title: "Colocacion Diaria Insertada!",
        text: "Correctamente!",
        icon: "success",
      });
};

function CleanCtlsColocacion() {
    $("#inp-col-chofer").val('');
    $("#inp-col-fechacarga").val('');
    $("#inp-col-contenedor").val('');
    $("#inp-cont-marchamo").val('');
    $("#inp-cont-puntocarga").val('');
    $("#inp-cont-puntodescarga").val('');
};

// Carga lista
function LoadAllColocacion() {
    id=null;
    $.ajax({
        type: "POST",
        url: "class/Colocacion.php",
        data: {
            action: "LoadAll"
        }
    })
    .done(function (e) {
        //CleanCtlsColocacion();
        ShowDataColocacion(e);
    })
    .fail(showError);
};