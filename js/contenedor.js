// var id= null;
$(document).ready(function () {
    $(document).on('click', '#menu-contenedor', function (event) {    
        // $("#div-mants").css("height", "340px");
        // $("#div-mant-inputs").css("height", "180px");
        $('#contenido-form').html("");
        contenedor();
        mantenimientocontenedor();
    });

});

$(document).on('click', '#inp-contenedor', function (event) {    
    // $("#div-mants").css("height", "340px");
    // $("#div-mant-inputs").css("height", "180px");
    contenedor();
    mantenimientocontenedor();
});

$(document).on('click', '#inp-cont-chofer', function (event) {    
    $("#div-mants").css("height", "340px");
    $("#div-mant-inputs").css("height", "180px");
    chofer();
    mantenimientochofer();
});

function contenedor(){
    seleccionlinea=5;
    //LimpiaTitulo();

    $('#contenido-form').append("<div id=div-form-titulo><h3 id='titulo-Contenedor'>CONTENEDOR</h3></div>");
    $('#contenido-form').append("<table id='tblcontenedor'class='tbl'>");
    var col="<thead><tr><th style='display:none;'>ID</th><th>CONTENEDOR</th><th>MARCHAMO</th><th>NAVIERA</th><th>ESTADO</th><th></th><th></th><th></th></tr></thead><tbody id='tableBody-contenedor'></tbody>";
    $('#tblcontenedor').append(col);
    //
    $('#tblcontenedor').DataTable( {
        "order": [[ 1, "asc" ]],
        "paging":   false,
        "scrollY": "200px",
        "scrollCollapse": true,
        "bInfo" : false
    } );
    // Carga lista
    LoadAllContenedor();
};

// Muestra información en ventana
 function showInfoContenedor() {
    //alert('show info');
    swal({
        title: "Contenedorr Insertado!",
        text: "Correctamente!",
        icon: "success",
      });
};

// Muestra errores en ventana
function showError() {
    alert('show error');
};

// Carga lista
function LoadAllContenedor() {
    id=null;
    $.ajax({
        type: "POST",
        url: "class/Contenedor.php",
        data: {
            action: "LoadAll"
        }
    })
    .done(function (e) {
        CleanCtlsContenedor();
        ShowDataContenedor(e);
    })
    .fail(showError);
};

function ShowDataContenedor(e) {
    // Limpia el div que contiene la tabla.
    $('#tableBody-contenedor').html("");
    // carga lista con datos.
    var data = JSON.parse(e);
    // Recorre arreglo.
    $.each(data, function (i, item) {
        var estado_cont;
        if (item.estado==true) 
            estado_cont='ACTIVO';
        else
            estado_cont='INACTIVO';
        
        var row =
            '<tr>' +
            '<td style="display:none;">' + item.id + '</td>' +
            '<td>' + item.contenedor + '</td>' +
            '<td>' + item.marchamo + '</td>' +
            '<td>' + item.naviera + '</td>' +
            '<td>' + estado_cont + '</td>' +
            '<td><img id=btncolocar'+ item.id + ' class=borrar src=img/file_check.png></td>'+
            '<td><img id=btnmodingreso'+ item.id + ' class=borrar src=img/file_mod.png></td>'+
            '<td><img id=btnborraingreso'+ item.id + ' class=borrar src=img/file_delete.png></td>'+
            '</tr>';
        $('#tableBody-contenedor').append(row);
        // evento click del boton modificar-eliminar
        $('#btncolocar' + item.id).click(ColocarEventHandlerContenedor);
        $('#btnmodingreso' + item.id).click(UpdateEventHandlerContenedor);
        $('#btnborraingreso' + item.id).click(DeleteEventHandlerContenedor);
    })
};

function ColocarEventHandlerContenedor(){
    id = $(this).parents("tr").find("td").eq(0).text();  //Columna 0 de la fila seleccionda= ID.
    $.ajax({
        type: "POST",
        url: "class/Contenedor.php",
        data: {
            action: 'Load',
            id: id
        }
    })
    .done(function (e) {
        ShowItemDataColocacion(e);
    })
    .fail(showError);
}

function UpdateEventHandlerContenedor() {
    id = $(this).parents("tr").find("td").eq(0).text();  //Columna 0 de la fila seleccionda= ID.
    $.ajax({
        type: "POST",
        url: "class/Contenedor.php",
        data: {
            action: 'Load',
            id: id
        }
    })
    .done(function (e) {
        ShowItemDataContenedor(e);
    })
    .fail(showError);
};

function DeleteEventHandlerContenedor() {
    id = $(this).parents("tr").find("td").eq(0).text(); //Columna 0 de la fila seleccionda= ID.
    // Mensaje de borrado:
    swal({
        title: 'Eliminar?',
        text: "Esta acción es irreversible!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger'
    }).then(function () {
        // eliminar registro.
        DeleteContenedor();
    })
};

function DeleteContenedor() {
    $.ajax({
        type: "POST",
        url: "class/Contenedor.php",
        data: { 
            action: 'Delete',                
            id:  id
        }            
    })
    .done(function( e ) {        
        var data = JSON.parse(e);   
        if(data.status==1)
        {
            swal(
                'Mensaje!',
                'El registro se encuentra  en uso, no es posible eliminar.',
                'error'
            );
        }
        else swal(
            'Eliminado!',
            'El registro se ha eliminado.',
            'success'
        );
        LoadAllContenedor();
    })    
    .fail(showError);
};

function CleanCtlsContenedor() {
    $("#inp-cont-naviera").val('');
    $("#inp-cont-chofer").val('');
    $("#inp-cont-contenedor").val('');
    $("#inp-cont-marchamo").val('');
    $("#inp-cont-booking").val('');
    $("#inp-cont-capacidad").val('');
    $("#inp-cont-predio").val('');
    $("#inp-cont-curena").val('');
};

function ShowItemDataColocacion(e) {
    $('#contenido-form').html("");
    listacolocaciones();
    mantenimientocolocaciones();
    // carga lista con datos.
    var data = JSON.parse(e);
    $("#inp-col-contenedor").val(FormatFecha(data[0].contenedor));
    $("#inp-col-marchamo").val(data[0].marchamo);
    idcontenedor=data[0].id;
};

function ShowItemDataContenedor(e) {
    // Limpia el controles
    CleanCtlsContenedor();
    // carga lista con datos.
    var data = JSON.parse(e);
    $("#inp-cont-fechaingreso").val(FormatFecha(data[0].fechaingreso));
    $("#inp-cont-naviera").val(data[0].naviera);
    $("#inp-cont-chofer").val(data[0].chofer);
    $("#inp-cont-contenedor").val(data[0].contenedor);
    $("#inp-cont-marchamo").val(data[0].marchamo);
    $("#inp-cont-booking").val(data[0].booking);
    $("#inp-cont-capacidad").val(data[0].capacidad);
    $("#inp-cont-predio").val(data[0].predio);
    $("#inp-cont-curena").val(data[0].curena);
    idcontenedor=data[0].id;
    idchofer=data[0].idchofer;
    idnaviera=data[0].idnaviera;
};

function FormValidateContenedor(){
    $("#frmcontenedor").validate({
        lang: 'es', 
        rules: {
            'inp-cont-naviera': "required",
            'inp-cont-chofer': "required",
            'inp-cont-contenedor': "required",
            'inp-cont-marchamo': "required",
            'inp-cont-booking': "required",
            'inp-cont-capacidad': "required",
            'inp-cont-predio': "required",
            'inp-cont-curena': "required",
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
            $('#btnguardarcontenedor').attr("disabled", "disabled");
            SaveContenedor();   
        }
    });  
};

// Save
function SaveContenedor(){   
    // Ajax: insert / Update.
    var miAccion= idcontenedor==null ? 'Insert' : 'Update';
    $.ajax({
        type: "POST",
        url: "class/Contenedor.php",
        data: { 
            action: miAccion,  
            id: idcontenedor,              
            fechaingreso: $("#inp-cont-fechaingreso").val(),
            idnaviera:  idnaviera,
            idchofer: idchofer,
            contenedor: $("#inp-cont-contenedor").val(),
            marchamo: $("#inp-cont-marchamo").val(),
            booking: $("#inp-cont-booking").val(),
            capacidad: $("#inp-cont-capacidad").val(),
            predio: $("#inp-cont-predio").val(),
            curena: $("#inp-cont-curena").val()
        }
    })
    .done(showInfoContenedor)
    .fail(showError)
    .always(function() {
        setTimeout('$("#btnguardarcontenedor").removeAttr("disabled")', 1500);
        LoadAllContenedor();   
    });
}; 

function mantenimientocontenedor(){
    //$('#div-mant-inputs').html("");
    //$('#input-ingresosgastos').html("");
    var inputs = '<form id="frmcontenedor">'+
        '<div id=input-contenedor>'+ 
            '<div class=caja-cuarto>'+  
                '<div class=contenido-input>'+  
                    '<label for="lbl-cont-fechaingreso" class="lbl-style">Fecha</label>'+ 
                    '<input type="datetime-local" id="inp-cont-fechaingreso" name="inp-cont-fechaingreso" class="input-format" value="" required/>'+ 
                '</div>'+ 
            '</div>'+
            '<div class=caja-cuarto>'+  
                '<div class=contenido-input>'+  
                    '<label for="lbl-cont-naviera" class="lbl-style">Naviera</label>'+ 
                    '<input type="text" id="inp-cont-naviera" name="inp-cont-naviera" class="input-format" value="" required/>'+ 
                '</div>'+ 
            '</div>'+

            '<div class=caja-cuarto>'+
                '<div class=contenido-input>'+ 
                    '<label for="lbl-cont-chofer" class="lbl-style">Chofer</label>'+    
                    '<input type="text" id="inp-cont-chofer" name="inp-cont-chofer" class="input-format" value="" required/>'+  
                '</div>'+ 
            '</div>'+
            
            '<div class=caja-cuarto>'+ 
                '<div class=contenido-input>'+
                    '<label for="lbl-cont-contenedor" class="lbl-style">Contenedor</label>'+
                    '<input type="text" id="inp-cont-contenedor" name="inp-cont-contenedor" class="input-format" value="" required/>'+
                '</div>'+
            '</div>'+
            
            '<div class=caja-cuarto>'+ 
                '<div class=contenido-input>'+
                    '<label for="lbl-cont-marchamo" class="lbl-style">Marchamo</label>'+
                    '<input type="text" id="inp-cont-marchamo" name="inp-cont-marchamo" class="input-format" value="" required/>'+
                '</div>'+
            '</div>'+
            
            '<div class=caja-cuarto>'+ 
                '<div class=contenido-input>'+
                    '<label for="lbl-cont-booking" class="lbl-style">Booking</label>'+
                    '<input type="text" id="inp-cont-booking" name="inp-cont-booking" class="input-format" value="" required/>'+
                '</div>'+
            '</div>'+

            '<div class=caja-cuarto>'+ 
                '<div class=contenido-input>'+
                    '<label for="lbl-cont-capacidad" class="lbl-style">Capacidad</label>'+
                    '<input type="text" id="inp-cont-capacidad" name="inp-cont-capacidad" class="input-format" value="" required/>'+
                '</div>'+
            '</div>'+
            
            '<div class=caja-cuarto>'+ 
                '<div class=contenido-input>'+
                    '<label for="lbl-cont-predio" class="lbl-style">Predio</label>'+
                    '<input type="text" id="inp-cont-predio" name="inp-cont-predio" class="input-format" value="" required/>'+
                '</div>'+
            '</div>'+

            '<div class=caja-cuarto>'+ 
                '<div class=contenido-input>'+
                    '<label for="lbl-cont-curena" class="lbl-style">Cureña</label>'+
                    '<input type="text" id="inp-cont-curena" name="inp-cont-curena" class="input-format" value="" required/>'+
                '</div>'+
            '</div>'+

            '<div class=caja-cuarto>'+ 
                '<div class=contenido-input>'+
                    '<div class=contenido-input-medio>'+
                    
                    '</div>'+
                    '<div class=contenido-input-medio>'+
                        '<input type="submit" id="btnguardarcontenedor" class="input-format" value="Guardar">'+ 
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</form>';
    //
    $('#contenido-form').append(inputs);
    $("#inp-cont-fechaingreso").val(Fecha());
    // evento
    $('#btnguardarcontenedor').click(FormValidateContenedor);
}

function FormatFecha(fecha){
    patron = " ",
    nuevoValor    = "T",
    result = fecha.replace(patron, nuevoValor);
    return result;
}