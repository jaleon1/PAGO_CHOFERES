// DOM
// var
// puntodescarga
var id= null;
// nombre
// ubicacion
// telefono

$(document).ready(function () {
    $(document).on('click', '#menu-puntodescarga', function (event) {    
        puntodescarga();
        $('#div-puntodescarga').show();
        mantenimientopuntodescarga();
    });
});

function mantenimientopuntodescarga(){
    $('#div-mant-inputs').html(""); 
    var inputs = '<form id="frmpuntodescarga">'+
                    '<div id=input-puntodescarga>'+
                        '<div class=caja-cuarto>'+
                            '<div class=contenido-input>'+
                                '<label for="lbl-nombre-puntodescarga" class="lbl-style">Nombre</label>'+
                                '<input type="text" id="inp-nombre-puntodescarga" name="inp-nombre-puntodescarga" class="input-format" value="" required/>'+
                            '</div>'+
                        '</div>'+
                        '<div class=caja-cuarto>'+
                            '<div class=contenido-input>'+
                                '<label for="lbl-ubicacion-puntodescarga" class="lbl-style">Ubicación</label>'+
                                '<input type="text" id="inp-ubicacion-puntodescarga" name="inp-ubicacion-puntodescarga" class="input-format" value="" required/>'+
                            '</div>'+
                        '</div>'+
                        '<div class=caja-cuarto>'+
                            '<div class=contenido-input>'+
                                '<label for="lbl-tel-puntodescarga" class="lbl-style">Telefono</label>'+
                                '<input type="text" id="inp-tel-puntodescarga" name="inp-tel-puntodescarga" class="input-format" value="" required/>'+                        
                            '</div>'+
                        '</div>'+
                        '<div class=caja-cuarto>'+
                            '<div class=contenido-input>'+
                                '<input type="submit" id="btnguardarpuntodescarga" class="input-format" value="Guardar">'+  
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</form>';
    $('#div-mant-inputs').append(inputs);
    // evento
    $('#btnguardarpuntodescarga').click(FormValidatePuntoDescarga);
}
function puntodescarga(){
    LimpiaTitulo(); 
    $('#div-mant-titulo').append("<h3 id='titulo-puntodescarga'>PUNTO DE DESCARGA</h3>");
    $('#div-mants').append("<table id='tblpuntodescarga'class='tbl'>");
    var col="<thead><tr><th>NOMBRE</th><th>UBICACION</th><th>TELEFONO</th><th></th><th></th></thead><tbody id='tableBody-puntodescarga'></tbody>";
    $('#tblpuntodescarga').append(col);
    //$('#tableBody').append(row1+row2+row3+row4+row5);  

    $('#tblpuntodescarga').DataTable({
        "order": [[ 1, "asc" ]],
        "paging":   false,
        "scrollY": "180px",
        "scrollCollapse": true,
        "bInfo" : false
    });
    LoadAllPuntoDescarga();
}

// Carga lista
function LoadAllPuntoDescarga() {
    id=null;
    $.ajax({
        type: "POST",
        url: "class/PuntoDescarga.php",
        data: {
            action: "LoadAll"
        }
    })
    .done(function (e) {
        CleanCtlsPuntoDescarga();
        ShowDataPuntoDescarga(e);
    })
    .fail(showError);
};

function ShowDataPuntoDescarga(e) {
    // Limpia el div que contiene la tabla.
    $('#tableBody-puntodescarga').html("");
    // carga lista con datos.
    var data = JSON.parse(e);
    // Recorre arreglo.
    $.each(data, function (i, item) {
        var row =
            '<tr>' +
            '<td style="display:none;">' + item.id + '</td>' +
            '<td>' + item.nombre + '</td>' +
            '<td>' + item.ubicacion + '</td>' +
            '<td>' + item.telefono + '</td>' +
            
            '<td><img id=btnmodingreso'+ item.id + ' class=borrar src=img/file_mod.png></td>'+
            '<td><img id=btnborraingreso'+ item.id + ' class=borrar src=img/file_delete.png></td>'+
            '</tr>';
        $('#tableBody-puntodescarga').append(row);
        // evento click del boton modificar-eliminar
        $('#btnmodingreso' + item.id).click(UpdateEventHandlerPuntoDescarga);
        $('#btnborraingreso' + item.id).click(DeleteEventHandlerPuntoDescarga);
    })
};

function UpdateEventHandlerPuntoDescarga() {
    id = $(this).parents("tr").find("td").eq(0).text();  //Columna 0 de la fila seleccionda= ID.
    $.ajax({
        type: "POST",
        url: "class/PuntoDescarga.php",
        data: {
            action: 'Load',
            id: id
        }
    })
    .done(function (e) {
        ShowItemDataPuntoDescarga(e);
    })
    .fail(showError);
};

function DeleteEventHandlerPuntoDescarga() {
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
        DeletePuntoDescarga();
    })
};

function DeletePuntoDescarga() {
    $.ajax({
        type: "POST",
        url: "class/PuntoDescarga.php",
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
        LoadAllPuntoDescarga();
    })    
    .fail(showError);
};

function CleanCtlsPuntoDescarga() {
    $("#inp-nombre-puntodescarga").val('');
    $("#inp-ubicacion-puntodescarga").val('');    
    $("#inp-tel-puntodescarga").val('');
};

function ShowItemDataPuntoDescarga(e) {
    // Limpia el controles
    CleanCtlsPuntoDescarga();
    // carga lista con datos.
    var data = JSON.parse(e);
    $("#inp-nombre-puntodescarga").val(data[0].nombre);
    $("#inp-ubicacion-puntodescarga").val(data[0].ubicacion);
    $("#inp-tel-puntodescarga").val(data[0].telefono);
};

function FormValidatePuntoDescarga(){
    $("#frmpuntodescarga").validate({
        rules: {
            'inp-nombre-puntodescarga': "required",
            'inp-ubicacion-puntodescarga': "required"
            // 'inp-ubicacion-puntodescarga': {
            //     required: true,
            //     number:true
            //     //minlenght:5
            // },
            // 'inp-var5-puntodescarga': {
            //     required: true,
            //     email: true
            // },
            // 'inp-var4-puntodescarga': {
            //     number: true
            // }
        },
        submitHandler: function() {
            $('#btnguardarpuntodescarga').attr("disabled", "disabled");
            SavePuntoDescarga();   
        }
    });  
};

// Save
function SavePuntoDescarga(){   
    // Ajax: insert / Update.
    var miAccion= id==null ? 'Insert' : 'Update';
    $.ajax({
        type: "POST",
        url: "class/PuntoDescarga.php",
        data: { 
            action: miAccion,  
            id: id,              
            nombre:  $("#inp-nombre-puntodescarga").val(),
            ubicacion: $("#inp-ubicacion-puntodescarga").val(),           
            telefono: $("#inp-tel-puntodescarga").val()
        }
    })
    .done(showInfo)
    .fail(showError)
    .always(function() {
        setTimeout('$("#btnguardarpuntodescarga").removeAttr("disabled")', 1500);
        LoadAllPuntoDescarga();   
    });
}; 