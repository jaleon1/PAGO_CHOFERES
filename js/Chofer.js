// POO Class Chofer
// function Chofer(id=null, nombre, ubicacion, telefono) {
//     // Var
//     this.id = id;
//     this.nombre = nombre;
//     this.ubicacion = ubicacion;
//     this.telefono = telefono;
//     // Methods
//     this.Get = function () {
//         alert(this.id);
//         alert(this.nombre);
//     };
// };
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

$(document).on('click','#tblchofer tr', function(){        
    //SELECCIONA LA FILA Y LA INSERTA EN EL INPUT DC
    document.getElementById('inp-chofer').value = $(this).find('td:first').html();
});

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
    LoadAll();
};

// Muestra información en ventana
function showInfo() {
    alert('show info');
    /*$(".modal").css({ display: "none" });  
    $("#textomensaje").text("Información almacenada correctamente!!");
    $("#mensajetop").css("background-color", "#016DC4");
    $("#mensajetop").css("color", "#FFFFFF");    
    $("#mensajetop").css("visibility", "visible");
    $("#mensajetop").slideDown("slow");
    $("#mensajetop").slideDown("slow").delay(3000).slideUp("slow");*/
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
function LoadAll() {
    $.ajax({
        type: "POST",
        url: "class/Chofer.php",
        data: {
            action: "LoadAll"
        }
    })
    .done(function (e) {
        CleanCtls();
        ShowData(e);
    })
    .fail(showError);
};

function ShowData(e) {
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
            '<td><img id=btnborraingreso class=borrar src=img/file_delete.png></td>'+
            '</tr>';
        $('#tableBody-chofer').append(row);
        // evento click del boton modificar-eliminar
        $('#btnmodingreso' + item.id).click(UpdateEventHandler);
        //$('#Delete' + item.id).click(DeleteEventHandler);
    })
};

function UpdateEventHandler() {
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
        ShowItemData(e);
    })
    .fail(showError);
};

// function DeleteEventHandler() {
//     id = $(this).parents("tr").find("td").eq(0).text();
//     // Mensaje de borrado:
//     swal({
//         title: 'Eliminar el Perfil?',
//         text: "Esta acción es irreversible!",
//         type: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Si, eliminar!',
//         cancelButtonText: 'No, cancelar!',
//         confirmButtonClass: 'btn btn-success',
//         cancelButtonClass: 'btn btn-danger'
//     }).then(function () {
//         // eliminar registro.
//         //Delete();
//     })
// };

// function Delete() {
//     /*id = $(this).parents("tr").find("td").eq(1).text();  //Columna 1 = ID tarea.
//     $.ajax({
//         type: "POST",
//         url: "class/Task.php",
//         data: { 
//             action: 'Load',                
//             id:  id
//         }            
//     })
//     .done(function( e ) {        
//         ShowTaskData(e);
//     })    
//     .fail(showError);*/
// };

function CleanCtls() {
    $("#inp-nombre-chofer").val(''),
    $("#inp-cedula-chofer").val(''),
    $("#inp-tel-chofer").val(''),
    $("#inp-cuenta-chofer").val(''),
    $("#inp-correo-chofer").val('')
};

function ShowItemData(e) {
    // Limpia el controles
    CleanCtls();
    // carga lista con datos.
    var data = JSON.parse(e);
    $("#inp-nombre-chofer").val(data[0].nombre);
    $("#inp-cedula-chofer").val(data[0].cedula);
    $("#inp-tel-chofer").val(data[0].telefono);
    $("#inp-cuenta-chofer").val(data[0].cuenta);
    //$("#inp-correo-chofer").val(data[0].correo);
};

function FormValidate(){
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
        submitHandler: Save
    });  
};

// Save
function Save(){   
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
    .always(LoadAll);
}; 