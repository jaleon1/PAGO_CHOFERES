
$(document).on('click','#menu-liquidacion', function(){        
    mantenimientoliquidaciones();
    listaliquidaciones();
});

function mantenimientoliquidaciones(){
    $('#contenido-form').html(""); 
    var inputs = '<div id="div-liquidacion">'+
        '<div id=div-liquidacion-titulo>'+
            '<h3>LIQUIDACIÓN</h3>'+
        '</div>'+
        '<div id=div-lista-liquidacion>'+
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
    $('#div-lista-liquidacion').append("<table id='tblliquidacion'class='tbl'>");
    var col="<thead> <tr><th>FECHA CARGA</th><th>CONTENEDOR</th><th>PUNTO CARGA</th><th>PUNTO DESCARGA</th> <th></th></tr ></thead> <tbody id='tableBody-liquidacion'></tbody>";
    $('#tblliquidacion').append(col); 

    $('#tblliquidacion').DataTable( {
        "order": [[ 0, "asc" ]],
        "paging":   true,
        "scrollY": "400px",
        "scrollCollapse": true,
        "bInfo" : true,
        dom: 'Bfrtip',
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5']
    });
};
