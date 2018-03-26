// DOM
// var
// puntocarga
var id= null;
// nombre
// ubicacion
// telefono

$(document).ready(function () {
    $(document).on('click', '#menu-puntocarga', function (event) {    
        puntocarga();
        $('#div-puntocarga').show();
        mantenimientopuntocarga();
    });
});

function mantenimientopuntocarga(){
    $('#div-mant-inputs').html(""); 
    var inputs = '<form id="frmpuntocarga">'+
                    '<div id=input-puntocarga>'+
                        '<div class=caja-cuarto>'+
                            '<div class=contenido-input>'+
                                '<label for="lbl-nombre-puntocarga" class="lbl-style">Nombre</label>'+
                                '<input type="text" id="inp-nombre-puntocarga" name="inp-nombre-puntocarga" class="input-format" value="" required/>'+
                            '</div>'+
                        '</div>'+
                        '<div class=caja-cuarto>'+
                            '<div class=contenido-input>'+
                                '<label for="lbl-ubicacion-puntocarga" class="lbl-style">Ubicación</label>'+
                                '<input type="text" id="inp-ubicacion-puntocarga" name="inp-ubicacion-puntocarga" class="input-format" value="" required/>'+
                            '</div>'+
                        '</div>'+
                        '<div class=caja-cuarto>'+
                            '<div class=contenido-input>'+
                                '<label for="lbl-tel-puntocarga" class="lbl-style">Telefono</label>'+
                                '<input type="text" id="inp-tel-puntocarga" name="inp-tel-puntocarga" class="input-format" value="" required/>'+                        
                            '</div>'+
                        '</div>'+
                        '<div class=caja-cuarto>'+
                            '<div class=contenido-input>'+
                                '<label for="lbl-valorviaje-puntocarga" class="lbl-style">Valor Viaje</label>'+
                                '<input type="text" id="inp-valorviaje-puntocarga" name="inp-valorviaje-puntocarga" class="input-format" value="" required/>'+ 
                            '</div>'+
                        '</div>'+
                        '<div class=caja-cuarto>'+
                            '<div class=contenido-input>'+
                            '</div>'+
                        '</div>'+
                        '<div class=caja-cuarto>'+
                            '<div class=contenido-input>'+
                            '</div>'+
                        '</div>'+
                        '<div class=caja-cuarto>'+
                            '<div class=contenido-input>'+
                            '</div>'+
                        '</div>'+
                            '<div class=caja-cuarto>'+
                            '<div class=contenido-input>'+
                            '</div>'+
                        '</div>'+
            
                        '<div class=caja-cuarto>'+
                            '<div class=contenido-input>'+
                                '<input type="submit" id="btnguardarpuntocarga" class="input-format" value="Guardar">'+        
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</form>';
    $('#div-mant-inputs').append(inputs);
    // evento
    $('#btnguardarpuntocarga').click(FormValidatePuntoCarga);
}

function puntocarga(){
    LimpiaTitulo(); 
    $('#div-mant-titulo').append("<h3 id='titulo-puntocarga'>PUNTO DE CARGA</h3>");
    $('#div-mants').append("<table id='tblpuntocarga'class='tbl'>");
    var col="<thead><tr><th>NOMBRE</th><th>UBICACION</th><th>TELEFONO</th><th></th><th></th></thead><tbody id='tableBody-puntocarga'></tbody>";
    $('#tblpuntocarga').append(col);
    //$('#tableBody').append(row1+row2+row3+row4+row5);  

    $('#tblpuntocarga').DataTable({
        "order": [[ 1, "asc" ]],
        "paging":   false,
        "scrollY": "180px",
        "scrollCollapse": true,
        "bInfo" : false
    });
    LoadAllPuntoCarga();
}

// Carga lista
function LoadAllPuntoCarga() {
    id=null;
    $.ajax({
        type: "POST",
        url: "class/PuntoCarga.php",
        data: {
            action: "LoadAll"
        }
    })
    .done(function (e) {
        CleanCtlsPuntoCarga();
        ShowDataPuntoCarga(e);
    })
    .fail(showError);
};

function ShowDataPuntoCarga(e) {
    // Limpia el div que contiene la tabla.
    $('#tableBody-puntocarga').html("");
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
            '<td>' + item.valorviaje + '</td>' +
            '<td><img id=btnmodingreso'+ item.id + ' class=borrar src=img/file_mod.png></td>'+
            '<td><img id=btnborraingreso'+ item.id + ' class=borrar src=img/file_delete.png></td>'+
            '</tr>';
        $('#tableBody-puntocarga').append(row);
        // evento click del boton modificar-eliminar
        $('#btnmodingreso' + item.id).click(UpdateEventHandlerPuntoCarga);
        $('#btnborraingreso' + item.id).click(DeleteEventHandlerPuntoCarga);
    })
};

function UpdateEventHandlerPuntoCarga() {
    id = $(this).parents("tr").find("td").eq(0).text();  //Columna 0 de la fila seleccionda= ID.
    $.ajax({
        type: "POST",
        url: "class/PuntoCarga.php",
        data: {
            action: 'Load',
            id: id
        }
    })
    .done(function (e) {
        ShowItemDataPuntoCarga(e);
    })
    .fail(showError);
};

function DeleteEventHandlerPuntoCarga() {
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
        DeletePuntoCarga();
    })
};

function DeletePuntoCarga() {
    $.ajax({
        type: "POST",
        url: "class/PuntoCarga.php",
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
        LoadAllPuntoCarga();
    })    
    .fail(showError);
};

function CleanCtlsPuntoCarga() {
    $("#inp-nombre-puntocarga").val('');
    $("#inp-ubicacion-puntocarga").val('');    
    $("#inp-tel-puntocarga").val('');
    $("#inp-valorviaje-puntocarga").val('');
};

function ShowItemDataPuntoCarga(e) {
    // Limpia el controles
    CleanCtlsPuntoCarga();
    // carga lista con datos.
    var data = JSON.parse(e);
    $("#inp-nombre-puntocarga").val(data[0].nombre);
    $("#inp-ubicacion-puntocarga").val(data[0].ubicacion);
    $("#inp-tel-puntocarga").val(data[0].telefono);
    $("#inp-valorviaje-puntocarga").val(data[0].valorviaje);
};

function FormValidatePuntoCarga(){
    $("#frmpuntocarga").validate({
        rules: {
            'inp-nombre-puntocarga': "required",
            'inp-ubicacion-puntocarga': "required",
            'inp-valorviaje-puntocarga': "required"
            // 'inp-ubicacion-puntocarga': {
            //     required: true,
            //     number:true
            //     //minlenght:5
            // },
            // 'inp-var5-puntocarga': {
            //     required: true,
            //     email: true
            // },
            // 'inp-var4-puntocarga': {
            //     number: true
            // }
        },
        submitHandler: function() {
            $('#btnguardarpuntocarga').attr("disabled", "disabled");
            SavePuntoCarga();   
        }
    });  
};

// Save
function SavePuntoCarga(){   
    // Ajax: insert / Update.
    var miAccion= id==null ? 'Insert' : 'Update';
    $.ajax({
        type: "POST",
        url: "class/PuntoCarga.php",
        data: { 
            action: miAccion,  
            id: id,              
            nombre:  $("#inp-nombre-puntocarga").val(),
            valorviaje: $("#inp-valorviaje-puntocarga").val(),
            ubicacion: $("#inp-ubicacion-puntocarga").val(),           
            telefono: $("#inp-tel-puntocarga").val()
        }
    })
    .done(showInfo)
    .fail(showError)
    .always(function() {
        setTimeout('$("#btnguardarpuntocarga").removeAttr("disabled")', 1500);
        LoadAllPuntoCarga();   
    });
}; 

$(document).on('click','#tblpuntocarga tr', function(){        
    if (seleccionlinea==4) {
        idpuntocarga = $(this).closest('tr').children('td:first').text();  //Columna 0 de la fila seleccionda= ID.
        $("#inp-col-puntocarga").val($(this).find('td:nth-child(2)').html());
    }
});

$(document).on('click','#tblpuntodescarga tr', function(){        
    if (seleccionlinea==4) {
        idpuntodescarga = $(this).closest('tr').children('td:first').text();  //Columna 0 de la fila seleccionda= ID.
        $("#inp-col-puntodescarga").val($(this).find('td:nth-child(2)').html());   
    }
});
