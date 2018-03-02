// DOM
// var
// Viajes
var id= null;
// finca
// naviera
// idfinca
// idnaviera
// kmstotal

$(document).ready(function () {   
    $(document).on('click', '#menu-calculokm', function (event) {    
        $("#div-mants").css("height", "260px");
        $("#div-mant-inputs").css("height", "260px");
        calculokm();
        mantenimientoviajes();
        muestrafincanaviera();
    });
});

$(document).on('click','#tblfincamant tr', function(){        
    document.getElementById('inp-finca-viaje').value = $(this).find('td:eq(1)').html();
});

$(document).on('click','#tblnavieramant tr', function(){        
    document.getElementById('inp-naviera-viaje').value = $(this).find('td:eq(1)').html();
});

function calculokm(){
    LimpiaTitulo();
    $('#div-mant-titulo').append("<h3 id='titulo-calculokm'>VIAJES</h3>");
    $('#div-mants').append("<table id='tblcalculokm'class='tbl'>");
    var col="<thead><tr><th>Finca</th><th>Naviera</th><th>Kilometros</th></thead><tbody id='tableBody-calculokm'></tbody>";
    $('#tblcalculokm').append(col);
    //$('#tableBody').append(row1+row2+row3+row4);  

    $('#tblcalculokm').DataTable({
        "order": [[ 1, "asc" ]],
        "paging":   false,
        "scrollY": "180px",
        "scrollCollapse": true,
        "bInfo" : false
    });
    LoadAllViajes();
    
}

// Carga lista
function LoadAllViajes() {
    id=null;
    LoadAllFinca();
    LoadAllNaviera();
    $.ajax({
        type: "POST",
        url: "class/Viajes.php",
        data: {
            action: "LoadAll"
        }
    })
    .done(function (e) {
        CleanCtlsViajes();
        ShowDataViajes(e);
    })
    .fail(showError);
};

function ShowDataViajes(e) {
    // Limpia el div que contiene la tabla.
    $('#tableBody-calculokm').html("");
    // carga lista con datos.
    var data = JSON.parse(e);
    // Recorre arreglo.
    $.each(data, function (i, item) {
        var row =
            '<tr>' +
            '<td style="display:none;">' + item.id + '</td>' +
            '<td style="display:none;">' + item.idfinca + '</td>' +
            '<td style="display:none;">' + item.idnaviera + '</td>' +
            '<td>' + item.finca + '</td>' +
            '<td>' + item.naviera + '</td>' +          
            '<td>' + item.kmstotal + '</td>' +
            '<td><img id=btnmodingreso'+ item.id + ' class=borrar src=img/file_mod.png></td>'+
            '<td><img id=btnborraingreso'+ item.id + ' class=borrar src=img/file_delete.png></td>'+
            '</tr>';
        $('#tableBody-calculokm').append(row);
        // evento click del boton modificar-eliminar
        $('#btnmodingreso' + item.id).click(UpdateEventHandlerViajes);
        $('#btnborraingreso' + item.id).click(DeleteEventHandlerViajes);
    })
};

function UpdateEventHandlerViajes() {
    id = $(this).parents("tr").find("td").eq(0).text();  //Columna 0 de la fila seleccionda= ID.
    $.ajax({
        type: "POST",
        url: "class/Viajes.php",
        data: {
            action: 'Load',
            id: id
        }
    })
    .done(function (e) {
        ShowItemDataViajes(e);
    })
    .fail(showError);
};

function DeleteEventHandlerViajes() {
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
        DeleteViajes();
    })
};

function DeleteViajes() {
    $.ajax({
        type: "POST",
        url: "class/Viajes.php",
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
        LoadAllViajes();
    })    
    .fail(showError);
};

function CleanCtlsViajes() {
    $("#inp-finca-viaje").val('');
    $("#inp-naviera-viaje").val('');    
    //$("#inp-idfinca-Viajes").val('');
    //$("#inp-idnaviera-Viajes").val('');
    $("#inp-kms-viaje").val('');
};

function ShowItemDataViajes(e) {
    // Limpia el controles
    CleanCtlsViajes();
    // carga lista con datos.
    var data = JSON.parse(e);
    $("#inp-finca-viaje").val(data[0].finca);
    $("#inp-naviera-viaje").val(data[0].naviera);
    //$("#inp-idfinca-Viajes").val(data[0].idfinca);
    //$("#inp-idnaviera-Viajes").val(data[0].idnaviera);
    $("#inp-kms-viaje").val(data[0].kmstotal);
};

function FormValidateViajes(){
    $("#frmviajes").validate({
        rules: {
            'inp-finca-viaje': "required",
            'inp-naviera-viaje': "required",
            'inp-kms-viaje': {
                number: true,
                required: true
            }
            // 'inp-naviera-Viajes': {
            //     required: true,
            //     number:true
            //     //minlenght:5
            // },
            // 'inp-kmstotal-Viajes': {
            //     required: true,
            //     email: true
            // },
            // 'inp-idnaviera-Viajes': {
            //     number: true
            // }
        },
        submitHandler: function() {
            $('#btnguardarviaje').attr("disabled", "disabled");
            SaveViajes();   
        }
    });  
};

// Save
function SaveViajes(){   
    // Ajax: insert / Update.
    var miAccion= id==null ? 'Insert' : 'Update';
    $.ajax({
        type: "POST",
        url: "class/Viajes.php",
        data: { 
            action: miAccion,  
            id: id,              
            finca:  $("#inp-finca-viaje").val(),
            naviera: $("#inp-naviera-viaje").val(),           
            //idfinca: $("#inp-idfinca-Viajes").val(),
            //idnaviera: $("#inp-idnaviera-Viajes").val(),
            kmstotal: $("#inp-kms-viaje").val()
        }
    })
    .done(showInfo)
    .fail(showError)
    .always(function() {
        setTimeout('$("#btnguardarviaje").removeAttr("disabled")', 1500);
        LoadAllViajes();   
    });
}; 