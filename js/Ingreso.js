// Carga lista
//Listo
function LoadAllIngreso() {
    id=null;
    $.ajax({
        type: "POST",
        url: "class/Ingreso.php",
        data: {
            action: "LoadAll"
        }
    })
    .done(function (e) {
        CleanCtlsIngreso();
        ShowDataIngreso(e);
    })
    .fail(showError);
};

//Listo
function ShowDataIngreso(e) {
    // Limpia el div que contiene la tabla.
    $('#tblbodyingresos').html("");
    // carga lista con datos.
    var data = JSON.parse(e);
    // Recorre arreglo.
    $.each(data, function (i, item) {
        var row =
            '<tr>' +
            '<td style="display:none;">' + item.id + '</td>' +
            '<td>' + item.nombre + '</td>' +
            '<td>' + item.monto + '</td>' +
            '<td>' + item.porcentaje + '</td>' +
            '<td><img id=btnmodingreso'+ item.id + ' class=borrar src=img/file_mod.png></td>'+
            '<td><img id=btnborraingreso'+ item.id + ' class=borrar src=img/file_delete.png></td>'+
            '</tr>';
        $('#tblbodyingresos').append(row);
        // evento click del boton modificar-eliminar
        $('#btnmodingreso' + item.id).click(UpdateEventHandlerIngreso);
        $('#btnborraingreso' + item.id).click(DeleteEventHandlerIngreso);
    })
};


function UpdateEventHandlerIngreso() {
    id = $(this).parents("tr").find("td").eq(0).text();  //Columna 0 de la fila seleccionda= ID.
    $.ajax({
        type: "POST",
        url: "class/Ingreso.php",
        data: {
            action: 'Load',
            id: id
        }
    })
    .done(function (e) {
        ShowItemDataIngreso(e);
    })
    .fail(showError);
};

function DeleteEventHandlerIngreso() {
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
        DeleteIngreso();
    })
};

function DeleteIngreso() {
    $.ajax({
        type: "POST",
        url: "class/Ingreso.php",
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
        LoadAllIngreso();
    })    
    .fail(showError);
};

//Listo
function CleanCtlsIngreso() {
    $("#inp-nombre-inggas").val('');
    $("#inp-monto-inggas").val('');    
    $("#inp-porc-inggas").val('');
};

function ShowItemDataIngreso(e) {
    // Limpia el controles
    CleanCtlsIngreso();
    // carga lista con datos.
    var data = JSON.parse(e);
    $("#inp-nombre-inggas").val(data[0].nombre);
    $("#inp-monto-inggas").val(data[0].monto);
    $("#inp-porc-inggas").val(data[0].porcentaje);
};

function FormValidateIngreso(){
    $("#frmingresogasto").validate({
        lang: 'es', 
        rules: {
            'inp-nombre-inggas': "required"
        },
        submitHandler: SaveIngreso
    }); 
};

// Save
function SaveIngreso(){   
    // Ajax: insert / Update.
    var miAccion= id==null ? 'Insert' : 'Update';
    $.ajax({
        type: "POST",
        url: "class/Ingreso.php",
        data: { 
            action: miAccion,  
            id: id,              
            nombre:  $("#inp-nombre-inggas").val(),
            monto: $("#inp-monto-inggas").val(),           
            porcentaje: $("#inp-porc-inggas").val()
        }
    })
    .done(showInfo)
    .fail(showError)
    .always(LoadAllIngreso);
}; 