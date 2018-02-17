// DOM
// var
// finca
var id= null;
// nombre
// ubicacion
// telefono

$(document).ready(function () {
    $(document).on('click', '#menu-finca', function (event) {    
        finca();
        $('#div-finca').show();
        mantenimientofinca();
    });
});

// $(document).on('click','#tblfinca tr', function(){        
//     //SELECCIONA LA FILA Y LA INSERTA EN EL INPUT DC
//     document.getElementById('inp-finca').value = $(this).find('td:first').html();
// });


function finca(){
    LimpiaTitulo(); 
    $('#div-mant-titulo').append("<h3 id='titulo-finca'>FINCA</h3>");
    $('#div-mants').append("<table id='tblfinca'class='tbl'>");
    var col="<thead><tr><th>NOMBRE</th><th>UBICACION</th><th>TELEFONO</th></thead><tbody id='tableBody-finca'></tbody>";
    $('#tblfinca').append(col);
    //$('#tableBody').append(row1+row2+row3+row4+row5);  

    $('#tblfinca').DataTable({
        "order": [[ 1, "asc" ]],
        "paging":   false,
        "scrollY": "180px",
        "scrollCollapse": true,
        "bInfo" : false
    });
    LoadAllFinca();
}

// Muestra información en ventana
// function showInfo() {
//     //alert('show info');
//     /*$(".modal").css({ display: "none" });  
//     $("#textomensaje").text("Información almacenada correctamente!!");
//     $("#mensajetop").css("background-color", "#016DC4");
//     $("#mensajetop").css("color", "#FFFFFF");    
//     $("#mensajetop").css("visibility", "visible");
//     $("#mensajetop").slideDown("slow");
//     $("#mensajetop").slideDown("slow").delay(3000).slideUp("slow");*/
// };

// Muestra errores en ventana
// function showError() {
//     alert('show error');
//     /*$(".modal").css({ display: "none" });  
//     $("#textomensaje").text("Error al procesar la información");
//     $("#mensajetop").css("background-color", "firebrick");
//     $("#mensajetop").css("color", "white");    
//     $("#mensajetop").css("visibility", "visible");
//     $("#mensajetop").slideDown("slow");
//     $("#mensajetop").slideDown("slow").delay(3000).slideUp("slow");*/
// };

// Carga lista
function LoadAllFinca() {
    id=null;
    $.ajax({
        type: "POST",
        url: "class/Finca.php",
        data: {
            action: "LoadAll"
        }
    })
    .done(function (e) {
        CleanCtlsFinca();
        ShowDataFinca(e);
    })
    .fail(showError);
};

function ShowDataFinca(e) {
    // Limpia el div que contiene la tabla.
    $('#tableBody-finca').html("");
    // carga lista con datos.
    var data = JSON.parse(e);
    // Recorre arreglo.
    $.each(data, function (i, item) {
        var row =
            '<tr>' +
            '<td style="display:none;">' + item.id + '</td>' +
            '<td>' + item.nombre + '</td>' +
            '<td>' + item.ubicacion + '</td>' +
            //'<td>' + item.telefono + '</td>' +
            
            '<td><img id=btnmodingreso'+ item.id + ' class=borrar src=img/file_mod.png></td>'+
            '<td><img id=btnborraingreso'+ item.id + ' class=borrar src=img/file_delete.png></td>'+
            '</tr>';
        $('#tableBody-finca').append(row);
        // evento click del boton modificar-eliminar
        $('#btnmodingreso' + item.id).click(UpdateEventHandlerFinca);
        $('#btnborraingreso' + item.id).click(DeleteEventHandlerFinca);
    })
};

function UpdateEventHandlerFinca() {
    id = $(this).parents("tr").find("td").eq(0).text();  //Columna 0 de la fila seleccionda= ID.
    $.ajax({
        type: "POST",
        url: "class/Finca.php",
        data: {
            action: 'Load',
            id: id
        }
    })
    .done(function (e) {
        ShowItemDataFinca(e);
    })
    .fail(showError);
};

function DeleteEventHandlerFinca() {
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
        DeleteFinca();
    })
};

function DeleteFinca() {
    $.ajax({
        type: "POST",
        url: "class/Finca.php",
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
        LoadAllFinca();
    })    
    .fail(showError);
};

function CleanCtlsFinca() {
    $("#inp-nombre-finca").val('');
    $("#inp-ubicacion-finca").val('');    
    $("#inp-telefono-finca").val('');
};

function ShowItemDataFinca(e) {
    // Limpia el controles
    CleanCtlsFinca();
    // carga lista con datos.
    var data = JSON.parse(e);
    $("#inp-nombre-finca").val(data[0].nombre);
    $("#inp-ubicacion-finca").val(data[0].ubicacion);
    $("#inp-tel-finca").val(data[0].telefono);
};

function FormValidateFinca(){
    $("#frmfinca").validate({
        rules: {
            'inp-nombre-finca': "required",
            'inp-ubicacion-finca': "required"
            // 'inp-ubicacion-finca': {
            //     required: true,
            //     number:true
            //     //minlenght:5
            // },
            // 'inp-var5-finca': {
            //     required: true,
            //     email: true
            // },
            // 'inp-var4-finca': {
            //     number: true
            // }
        },
        submitHandler: SaveFinca
    });  
};

// Save
function SaveFinca(){   
    // Ajax: insert / Update.
    var miAccion= id==null ? 'Insert' : 'Update';
    $.ajax({
        type: "POST",
        url: "class/Finca.php",
        data: { 
            action: miAccion,  
            id: id,              
            nombre:  $("#inp-nombre-finca").val(),
            ubicacion: $("#inp-ubicacion-finca").val(),           
            telefono: $("#inp-tel-finca").val()
        }
    })
    .done(showInfo)
    .fail(showError)
    .always(LoadAllFinca);
}; 