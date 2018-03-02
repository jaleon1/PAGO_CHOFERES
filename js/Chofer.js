// DOM
var id= null;
$(document).ready(function () {
    $(document).on('click', '#menu-chofer', function (event) {    
        $("#div-mants").css("height", "340px");
        $("#div-mant-inputs").css("height", "180px");
        chofer();
        mantenimientochofer();
    });

});

// $(document).on('click','#tblchofer tr', function(){        
//     //SELECCIONA LA FILA Y LA INSERTA EN EL INPUT DC
//     document.getElementById('inp-chofer').value = $(this).find('td:first').html();
// });

$(document).on('click', '#inp-chofer', function (event) {    
    $("#div-mants").css("height", "340px");
    $("#div-mant-inputs").css("height", "180px");
    chofer();
    mantenimientochofer();
});

function chofer(){
    LimpiaTitulo();
    $('#div-mant-titulo').append("<h3 id='titulo-Chofer'>CHOFER</h3>");
    $('#div-mants').append("<table id='tblchofer'class='tbl'>");
    var col="<thead><tr><th style='display:none;'>ID</th><th>NOMBRE</th><th>CEDULA</th><th>CUENTA</th><th></th><th></th></tr></thead><tbody id='tableBody-chofer'></tbody>";
    $('#tblchofer').append(col);
    //
    $('#tblchofer').DataTable( {
        "order": [[ 1, "asc" ]],
        "paging":   false,
        "scrollY": "180px",
        "scrollCollapse": true,
        "bInfo" : false
    } );
    // Carga lista
    LoadAllChofer();
};

// Muestra información en ventana
 function showInfo() {
    alert('show info');
//     /*$(".modal").css({ display: "none" });  
//     $("#textomensaje").text("Información almacenada correctamente!!");
//     $("#mensajetop").css("background-color", "#016DC4");
//     $("#mensajetop").css("color", "#FFFFFF");    
//     $("#mensajetop").css("visibility", "visible");
//     $("#mensajetop").slideDown("slow");
//     $("#mensajetop").slideDown("slow").delay(3000).slideUp("slow");*/
};

// Muestra errores en ventana
function showError() {
    alert('show error');
    /*$(".modal").css({ display: "none" });  
    $("#textomensaje").text("Error al procesar la información");
    $("#mensajetop").css("background-color", "firebrick");
    $("#mensajetop").css("color", "white");    
    $("#mensajetop").css("visibility", "visible");
    $("#mensajetop").slideDown("slow");
    $("#mensajetop").slideDown("slow").delay(3000).slideUp("slow");*/
};

// Carga lista
function LoadAllChofer() {
    id=null;
    $.ajax({
        type: "POST",
        url: "class/Chofer.php",
        data: {
            action: "LoadAll"
        }
    })
    .done(function (e) {
        CleanCtlsChofer();
        ShowDataChofer(e);
    })
    .fail(showError);
};

function ShowDataChofer(e) {
    // Limpia el div que contiene la tabla.
    $('#tableBody-chofer').html("");
    // carga lista con datos.
    var data = JSON.parse(e);
    // Recorre arreglo.
    $.each(data, function (i, item) {
        var row =
            '<tr>' +
            '<td style="display:none;">' + item.id + '</td>' +
            '<td>' + item.nombre + '</td>' +
            '<td>' + item.cedula + '</td>' +
            '<td>' + item.cuenta + '</td>' +
            '<td><img id=btnmodingreso'+ item.id + ' class=borrar src=img/file_mod.png></td>'+
            '<td><img id=btnborraingreso'+ item.id + ' class=borrar src=img/file_delete.png></td>'+
            '</tr>';
        $('#tableBody-chofer').append(row);
        // evento click del boton modificar-eliminar
        $('#btnmodingreso' + item.id).click(UpdateEventHandlerChofer);
        $('#btnborraingreso' + item.id).click(DeleteEventHandlerChofer);
    })
};

function UpdateEventHandlerChofer() {
    id = $(this).parents("tr").find("td").eq(0).text();  //Columna 0 de la fila seleccionda= ID.
    $.ajax({
        type: "POST",
        url: "class/Chofer.php",
        data: {
            action: 'Load',
            id: id
        }
    })
    .done(function (e) {
        ShowItemDataChofer(e);
    })
    .fail(showError);
};

function DeleteEventHandlerChofer() {
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
        DeleteChofer();
    })
};

function DeleteChofer() {
    $.ajax({
        type: "POST",
        url: "class/Chofer.php",
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
        LoadAllChofer();
    })    
    .fail(showError);
};

function CleanCtlsChofer() {
    $("#inp-nombre-chofer").val('');
    $("#inp-cedula-chofer").val('');
    $("#inp-tel-chofer").val('');
    $("#inp-cuenta-chofer").val('');
    $("#inp-correo-chofer").val('');
};

function ShowItemDataChofer(e) {
    // Limpia el controles
    CleanCtlsChofer();
    // carga lista con datos.
    var data = JSON.parse(e);
    $("#inp-nombre-chofer").val(data[0].nombre);
    $("#inp-cedula-chofer").val(data[0].cedula);
    $("#inp-tel-chofer").val(data[0].telefono);
    $("#inp-cuenta-chofer").val(data[0].cuenta);
    $("#inp-correo-chofer").val(data[0].correo);
};

function FormValidateChofer(){
    $("#frmchofer").validate({
        lang: 'es', 
        rules: {
            'inp-nombre-chofer': "required",
            'inp-cuenta-chofer': "required",
            'inp-cedula-chofer': {
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
            }
        },
        // messages: {
        //     'inp-nombre-chofer': "Ingrese el nombre del Chofer.",
        //     'inp-cuenta-chofer': "Ingrese el cuenta del Chofer.",
        //     'inp-cedula-chofer': "Ingrese el cedula del Chofer."            
        // },
        submitHandler: SaveChofer
    });  
};

// Save
function SaveChofer(){   
    // Ajax: insert / Update.
    var miAccion= id==null ? 'Insert' : 'Update';
    $.ajax({
        type: "POST",
        url: "class/Chofer.php",
        data: { 
            action: miAccion,  
            id: id,              
            nombre:  $("#inp-nombre-chofer").val(),
            cedula: $("#inp-cedula-chofer").val(),
            telefono: $("#inp-tel-chofer").val(),
            cuenta: $("#inp-cuenta-chofer").val(),
            correo: $("#inp-correo-chofer").val()
        }
    })
    .done(showInfo)
    .fail(showError)
    .always(LoadAllChofer);
}; 