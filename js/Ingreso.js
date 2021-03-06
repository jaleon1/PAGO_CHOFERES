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
    .fail();
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
    .fail();
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
    .fail();
};

//Listo
function CleanCtlsIngreso() {
    $("#inp-nombre-ing").val('');
    $("#inp-monto-ing").val('');    
    $("#inp-porc-ing").val('');
};

function ShowItemDataIngreso(e) {
    // Limpia el controles
    CleanCtlsIngreso();
    // carga lista con datos.
    var data = JSON.parse(e);
    $("#inp-nombre-ing").val(data[0].nombre);
    $("#inp-monto-ing").val(data[0].monto);
    $("#inp-porc-ing").val(data[0].porcentaje);
};

function FormValidateIngreso(){
    // $("#frmingresogasto").validate({
    //     lang: 'es', 
    //     rules: {
    //         'inp-nombre-ing': "required"
    //     },
    //     submitHandler: SaveIngreso
    // }); 
    SaveIngreso();
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
            nombre:  $("#inp-nombre-ing").val(),
            monto: $("#inp-monto-ing").val(),           
            porcentaje: $("#inp-porc-ing").val()
        }
    })
    .done(showInfoIngreso)
    .fail()
    .always(LoadAllIngreso);
}; 

function showInfoIngreso() {
    //alert('show info');
    swal({
        title: "Ingreso Insertado!",
        text: "Correctamente!",
        icon: "success",
      });
    // $(".modal").css({ display: "none" });  
    // $("#textomensaje").text("Ingreso almacenado correctamente!!");
    // $("#mensajetop").css("background-color", "#016DC4");
    // $("#mensajetop").css("color", "#FFFFFF");    
    // $("#mensajetop").css("visibility", "visible");
    // $("#mensajetop").slideDown("slow");
    // $("#mensajetop").slideDown("slow").delay(3000).slideUp("slow");
};

function showErrorIngreso() {
    alert('Error Ingreso');
    /*$(".modal").css({ display: "none" });  
    $("#textomensaje").text("Error al procesar la información");
    $("#mensajetop").css("background-color", "firebrick");
    $("#mensajetop").css("color", "white");    
    $("#mensajetop").css("visibility", "visible");
    $("#mensajetop").slideDown("slow");
    $("#mensajetop").slideDown("slow").delay(3000).slideUp("slow");*/
};