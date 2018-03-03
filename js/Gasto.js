// Carga lista
//Listo
function LoadAllGasto() {
    id=null;
    $.ajax({
        type: "POST",
        url: "class/Gasto.php",
        data: {
            action: "LoadAll"
        }
    })
    .done(function (e) {
        CleanCtlsGasto();
        ShowDataGasto(e);
    })
    .fail(showError);
};

//Listo
function ShowDataGasto(e) {
    // Limpia el div que contiene la tabla.
    $('#tblbodygastos').html("");
    // carga lista con datos.
    var data = JSON.parse(e);
    // Recorre arreglo.
    $.each(data, function (i, item) {
        var row =
            '<tr>' +
            '<td style="display:none;">' + item.id + '</td>' +
            '<td>' + item.nombre + '</td>' +
            '<td>' + item.monto + '</td>' +
            '<td><img id=btnmodgasto'+ item.id + ' class=borrar src=img/file_mod.png></td>'+
            '<td><img id=btnborragasto'+ item.id + ' class=borrar src=img/file_delete.png></td>'+
            '</tr>';
        $('#tblbodygastos').append(row);
        // evento click del boton modificar-eliminar
        $('#btnmodgasto' + item.id).click(UpdateEventHandlerGasto);
        $('#btnborragasto' + item.id).click(DeleteEventHandlerGasto);
    })
};


function UpdateEventHandlerGasto() {
    id = $(this).parents("tr").find("td").eq(0).text();  //Columna 0 de la fila seleccionda= ID.
    $.ajax({
        type: "POST",
        url: "class/Gasto.php",
        data: {
            action: 'Load',
            id: id
        }
    })
    .done(function (e) {
        ShowItemDataGasto(e);
    })
    .fail(showError);
};

function DeleteEventHandlerGasto() {
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
        DeleteGasto();
    })
};

function DeleteGasto() {
    $.ajax({
        type: "POST",
        url: "class/Gasto.php",
        data: { 
            action: 'Delete',                
            id:  id
        }            
    })
    .done(function( e ) {        
        if(e=="Registro en uso")
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
        LoadAllGasto();
    })    
    .fail(showError);
};

//Listo
function CleanCtlsGasto() {
    $("#inp-nombre-gas").val('');
    $("#inp-monto-gas").val('');    
};

function ShowItemDataGasto(e) {
    // Limpia el controles
    CleanCtlsGasto();
    // carga lista con datos.
    var data = JSON.parse(e);
    $("#inp-nombre-gas").val(data[0].nombre);
    $("#inp-monto-gas").val(data[0].monto);
};

function FormValidateGasto(){
    $("#frmingresogasto").validate({
        lang: 'es', 
        rules: {
            'inp-nombre-gas': "required"
        },
        submitHandler: SaveGasto
    }); 
};

// Save
function SaveGasto(){   
    // Ajax: insert / Update.
    var miAccion= id==null ? 'Insert' : 'Update';
    $.ajax({
        type: "POST",
        url: "class/Gasto.php",
        data: { 
            action: miAccion,  
            id: id,              
            nombre:  $("#inp-nombre-gas").val(),
            monto: $("#inp-monto-gas").val()
        }
    })
    .done(showInfo)
    .fail(showError)
    .always(LoadAllGasto);
}; 