
$(document).on('click','#menu-colocacion', function(){        
    mantenimientocolocaciones();
    //listacolocaciones();
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
                    '<input type="button" id="btnpdfcolocacion" class="inputformat" value="Generar Reporte" >'+
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
    var td= "<tr id='firsttr-col' class=firsttr-col><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
    $('#tableBody-colocacion').append(td); 

    $('#tblcolocacion').DataTable( {
        "order": [[ 0, "asc" ]],
        "paging":   false,
        "scrollY": "350px",
        "scrollCollapse": true,
        "bInfo" : false,
        "columns": [
            { "width": "34%" },
            { "width": "34%" },
            { "width": "9%" },
            { "width": "10%" },
            { "width": "9%" },{ "width": "3%" }]
    });
};

// $('#btnpdfcolocacion').on( 'click', function () {
    
// });

$(document).on('click', '#btnpdfcolocacion', function (event) {    
    // tableToExcel('tblcolocacion','Colocacion Diaria','ColocacionDiaria.xls');
    descargarExcel();
});

function descargarExcel(){
    $(".borrar").remove();
    $(".id-form").remove();
    //Creamos un Elemento Temporal en forma de enlace
    var tmpElemento = document.createElement('a');
    // obtenemos la información desde el div que lo contiene en el html
    // Obtenemos la información de la tabla
    var data_type = 'data:application/vnd.ms-excel';
    var tabla_div = document.getElementById('tblcolocacion');
    var tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
    tmpElemento.href = data_type + ', ' + tabla_html;
    //Asignamos el nombre a nuestro EXCEL
    tmpElemento.download = 'ColocaciónDiaria.xls';
    // Simulamos el click al elemento creado para descargarlo
    tmpElemento.click();
    ConsultaFecha();
}

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
        ShowDataColocacion(e);
    })    
    .fail(function(msg){
        alert("Error al Cargar Reportes");
    });    
};

$(document).on('onchange', '#date-fechacarga', function (event) {    
    // listacolocaciones();
    ConsultaFecha();
});

function ShowDataColocacion(e) {
    $('#div-lista-colocacion').empty();
    DestruyeDataTable('tblcolocacion');
    listacolocaciones();
    //$('#tableBody-colocacion').html("");
    //$('#contenido-form').append("<table id='tblcolocacion'class='display'>");
    // carga lista con datos.
    var data= JSON.parse(e);
    $("#firsttr-col").remove();
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