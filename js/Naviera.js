// DOM
// var
// naviera
var id= null;
// nombre
// ubicacion
// telefono

$(document).ready(function () {
    $(document).on('click', '#menu-naviera', function (event) {    
        naviera();
        mantenimientonaviera();
    });
});

// $(document).on('click','#tblnaviera tr', function(){        
//     //SELECCIONA LA FILA Y LA INSERTA EN EL INPUT DC
//     document.getElementById('inp-naviera').value = $(this).find('td:first').html();
//     document.getElementById('inp-valor-viaje').value = '$710';
// });

function naviera(){
    LimpiaTitulo();
    $('#div-mant-titulo').append("<h3 id='titulo-naviera'>NAVIERA</h3>");
    $('#div-mants').append("<table id='tblnaviera'class='tbl'>");
    var col="<thead><tr><th>NOMBRE</th><th>UBICACION</th><th>TELEFONO</th></thead><tbody id='tableBody-naviera'></tbody>";
    $('#tblnaviera').append(col);
   
    //$('#tableBody').append(row1+row2+row3+row4);  
    $('#tblnaviera').DataTable({
        "order": [[ 1, "asc" ]],
        "paging":   false,
        "scrollY": "180px",
        "scrollCollapse": true,
        "bInfo" : false
    });

    LoadAllNaviera();
};

// Carga lista
function LoadAllNaviera() {
    id=null;
    $.ajax({
        type: "POST",
        url: "class/Naviera.php",
        data: {
            action: "LoadAll"
        }
    })
    .done(function (e) {
        CleanCtlsNaviera();
        ShowDataNaviera(e);
    })
    .fail(showError);
};

function ShowDataNaviera(e) {
    // Limpia el div que contiene la tabla.
    $('#tableBody-naviera').html("");
    // carga lista con datos.
    var data = JSON.parse(e);
    // Recorre arreglo.
    $.each(data, function (i, item) {
        var row =
            '<tr>' +
            '<td style="display:none;">' + item.id + '</td>' +
            '<td style="width: 80px">' + item.nombre + '</td>' +
            '<td style="width: 160px">' + item.ubicacion + '</td>' +
            //'<td>' + item.telefono + '</td>' +
            '<td><img id=btnmodingreso'+ item.id + ' class=borrar src=img/file_mod.png></td>'+
            '<td><img id=btnborraingreso'+ item.id + ' class=borrar src=img/file_delete.png></td>'+
            '</tr>';
        $('#tableBody-naviera').append(row);
        // evento click del boton modificar-eliminar
        $('#btnmodingreso' + item.id).click(UpdateEventHandlerNaviera);
        $('#btnborraingreso' + item.id).click(DeleteEventHandlerNaviera);
    })
};

function UpdateEventHandlerNaviera() {
    id = $(this).parents("tr").find("td").eq(0).text();  //Columna 0 de la fila seleccionda= ID.
    $.ajax({
        type: "POST",
        url: "class/Naviera.php",
        data: {
            action: 'Load',
            id: id
        }
    })
    .done(function (e) {
        ShowItemDataNaviera(e);
    })
    .fail(showError);
};

function DeleteEventHandlerNaviera() {
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
        DeleteNaviera();
    })
};

function DeleteNaviera() {
    $.ajax({
        type: "POST",
        url: "class/Naviera.php",
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
        LoadAllNaviera();
    })    
    .fail(showError);
};

function CleanCtlsNaviera() {
    $("#inp-nombre-naviera").val('');
    $("#inp-ubicacion-naviera").val('');    
    $("#inp-tel-naviera").val('');
};

function ShowItemDataNaviera(e) {
    // Limpia el controles
    CleanCtlsNaviera();
    // carga lista con datos.
    var data = JSON.parse(e);
    $("#inp-nombre-naviera").val(data[0].nombre);
    $("#inp-ubicacion-naviera").val(data[0].ubicacion);
    $("#inp-tel-naviera").val(data[0].telefono);
};

function FormValidateNaviera(){
    $("#frmnaviera").validate({
        lang: 'es', 
        rules: {
            'inp-nombre-naviera': "required"
        },
        submitHandler: SaveNaviera
    }); 
};

// Save
function SaveNaviera(){   
    // Ajax: insert / Update.
    var miAccion= id==null ? 'Insert' : 'Update';
    $.ajax({
        type: "POST",
        url: "class/Naviera.php",
        data: { 
            action: miAccion,  
            id: id,              
            nombre:  $("#inp-nombre-naviera").val(),
            ubicacion: $("#inp-ubicacion-naviera").val(),           
            telefono: $("#inp-tel-naviera").val()
        }
    })
    .done(showInfo)
    .fail(showError)
    .always(LoadAllNaviera);
}; 