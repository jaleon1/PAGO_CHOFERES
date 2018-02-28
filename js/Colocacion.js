
$(document).on('click','#menu-colocacion', function(){        
    mantenimientocolocaciones();
    listacolocaciones();
});

function mantenimientocolocaciones(){
    $('#contenido-form').html(""); 
    var inputs = '<div id="div-colocacion">'+
        '<div id=div-colocacion-titulo>'+
            '<h3>COLOCACIONES DIARIAS</h3>'+
        '</div>'+
        '<div id=div-lista-colocacion>'+
        '</div>'+
        '<div class=div-opcion-report>'+
            '<div class=div-tercio>'+
                '<div class=div-opciones>'+
                    '<label id="lbl-fecha" for="form-date-crtl" class="lbl-style">Fecha de Carga</label>'+
                    '<input type="date" id="date-fechacarga" name="date-fechacarga" class="input-format" onchange="ConsultaFecha()" required/>'+
                '</div>'+
                '<div class=div-total-botones></div>'+
            '</div>'+
            '<div class=div-tercio>'+
                '<div class=div-opciones>'+
                    '<input type="button" id="btnpdfcolocacion" class="inputformat" value="Generar Reporte">'+
                '</div>'+
                '<div class=div-total-botones></div>'+
            '</div>'+
            '<div class=div-tercio>'+
                '<div class=div-opciones></div>'+
                '<div class=div-total-botones></div>'+
            '</div>'+
        '</div>'+    
    '</div>';
    $('#contenido-form').append(inputs);
};

/* REPORTES*/
function listacolocaciones(){        
    $('#div-lista-colocacion').append("<table id='tblcolocacion'class='tbl'>");
    var col="<thead> <tr> <th>CHOFER</th> <th>FECHA CARGA</th>  <th>CONTENEDOR</th> <th>PUNTO CARGA</th> <th>PUNTO DESCARGA</th> <th></th></tr ></thead> <tbody id='tableBody-colocacion'></tbody>";
    $('#tblcolocacion').append(col); 

    $('#tblcolocacion').DataTable( {
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'excel', 'pdf']
    });
};

$(document).on('click', '#btnpdfcolocacion', function (event) {    

});

// Carga lista
function ConsultaFecha() {
    $.ajax({
        type: "POST",
        url: "class/Colocacion.php",
        data: { 
            action: "ConsultaFecha",
            estado:  '1',
            fechacarga: $("#date-fechacarga").val()
        }
    })
    .done(function( e ) {
        // var data = JSON.parse(e);
        // alert(data.length);
        ShowDataColocacion(e);
    })    
    .fail(function(msg){
        alert("Error al Cargar Reportes");
    });    
};

jQuery(document).on( "onchange", "#date-fechacarga", function(){ 
    listacolocaciones();
    ConsultaFecha();
});

function ShowDataColocacion(e) {
    $('#tableBody-colocacion').html("");
    $('#contenido-form').append("<table id='tblcolocacion'class='display'>");
    // carga lista con datos.
    var data= JSON.parse(e);

    // Recorre arreglo.
    $.each(data, function(i, item) {
        
        var row="<tr class='fila'>"+
            "<td class='id-form' style='display:none;'>"+ item.id+"</td>" +
            "<td>"+ item.chofer +"</td>" +
            "<td>"+ item.fechacarga +"</td>" +
            "<td>"+ item.contenedor +"</td>" +
            "<td>"+ item.puntocarga +"</td>" +
            "<td>"+ item.puntodescarga +"</td>" +
            '<td><img id=btndeletecolocación'+ item.id +' src=img/file_delete.png class=borrar></td>'+
        "</tr>";
        $('#tableBody-colocacion').append(row);  
        $('.id-form').hide();       
    })
};