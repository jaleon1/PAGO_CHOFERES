
$(document).on('click','#menu-liquidacion', function(){        
    mantenimientoliquidaciones();
    seleccionlinea=2;
    //listaliquidaciones();
});

function mantenimientoliquidaciones(){
    $('#contenido-form').html(""); 
    var inputs = '<div id="div-liquidacion">'+
        '<div id=div-liquidacion-titulo>'+
            '<h3>LIQUIDACIÓN</h3>'+
            '<label id=lbl-chofer-liquidacion class="lbl-style"></label></br>'+
        '</div>'+
        '<div id=div-lista-liquidacion>'+
        '</div>'+
        '<div id=div-inggas-liquidacion>'+
            '<div id=div-liq-ingresos>'+
            
            '</div>'+
            '<div id=div-liq-gastos>'+
            
            '</div>'+            
        '</div>'+
        
        '<div class=div-opcion-report>'+
            '<div class=div-tercio>'+
                '<div class=div-opciones>'+
                    '<label id="lbl-fecha" for="form-date-crtl" class="lbl-style">Fecha Inicial</label>'+
                    '<input type="date" id="date-fechainicial" name="date-fechainicial" class="input-format" required/>'+
                '</div>'+
                '<div class=div-total-botones></div>'+
            '</div>'+
            '<div class=div-tercio>'+
                '<div class=div-opciones>'+
                    '<label id="lbl-fecha" for="form-date-crtl" class="lbl-style">Fecha Inicial</label>'+
                    '<input type="date" id="date-fechafinal" name="date-fechafinal" class="input-format" required/>'+
                '</div>'+
                '<div class=div-total-botones></div>'+
            '</div>'+
            '<div class=div-tercio>'+
                '<div class=div-opciones>'+
                    '<input type="button" id="btnliquidacion" class="inputformat" value="Liquidación Chofer">'+
                '</div>'+
                '<div class=div-total-botones></div>'+
            '</div>'+
        '</div>'+    
    '</div>';
    $('#contenido-form').append(inputs);
};

function DestruyeDataTable(iddatatable){
    $("#div-lista-liquidacion").empty();
    var table = $('#'+iddatatable).DataTable();
    table.destroy();
}

/* REPORTES*/
function listaliquidaciones(){        
    $('#div-lista-liquidacion').append("<table id='tblliquidacion'class='tbl'>");
    var col="<thead> <tr><th>FECHA CARGA</th><th>CONTENEDOR</th><th>PUNTO CARGA</th><th>PUNTO DESCARGA</th> <th>PAGO TOTAL</th></tr ></thead> <tbody id='tableBody-liquidacion'></tbody>";
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

/* INGRESOS Y GASTOS */
function ingresosgastosliquidacion(){
    $('#div-liq-ingresos').append("<table id='tblliqingresos'class='tbl'>");
    var col="<thead><tr class=tituloingreso><th>INGRESOS</th><th>MONTO</th></thead><tbody id='tblbodyingresos-liq'></tbody>";
    $('#tblliqingresos').append(col);
    var td= "<tr id='firsttr' class=firsttr><td></td><td></td><td></td></tr>";
    $('#tblbodyingresos-liq').append(td);

    $('#div-liq-gastos').append("<table id='tblliqgastos'class='tbl'>");
    var col="<thead><tr class=titulogasto><th>GASTOS</th><th>MONTO</th></thead><tbody id='tblbodygastos-liq'></tbody>";
    $('#tblliqgastos').append(col);
    var td2= "<tr id='firsttr2' class=firsttr><td></td><td></td><td></td></tr>";
    $('#tblbodygastos-liq').append(td2);

    $('#tblliqingresos').DataTable({
        "order": [[ 1, "asc" ]],
        "paging":   false,
        "bLengthChange": false,
        searching: false,
        "bInfo": false,
        "scrollY": "105px",
        "scrollCollapse": true,
        "bPaginate": false,
        "columns": [
            { "width": "55%" },
            null,
            null]
    });

    $('#tblliqgastos').DataTable({
        "order": [[ 1, "asc" ]],
        "paging":   false,
        "bLengthChange": false,
        searching: false,
        "bInfo": false,
        "scrollY": "105px",
        "scrollCollapse": true,
        "bPaginate": false,
        "columns": [
            { "width": "55%" },
            null,
            null]
    });  
}

$(document).on('click', '#btnliquidacion', function (event) {    
    DestruyeDataTable('tblliquidacion');
    ConsultaLiquidacion();
    ingresosgastosliquidacion();
});

// Carga lista
function ConsultaLiquidacion() {
    $.ajax({
        type: "POST",
        url: "class/Liquidacion.php",
        data: { 
            action: "Consulta",
            estado:  '1',
            fechainicial: $("#date-fechainicial").val(),
            fechafinal: $("#date-fechafinal").val(),
            idchofer:idchofer
        }
    })
    .done(function( e ) {
        ShowDataLiquidacion(e);
        ConsultaLiquidacionIngresos();
    })    
    .fail(function(msg){
        alert("Error al Cargar Reportes");
    });    
};

// Carga lista
function ConsultaLiquidacionIngresos() {
    $.ajax({
        type: "POST",
        url: "class/Liquidacion.php",
        data: { 
            action: "CargarIngreso",
            estado:  '1',
            fechainicial: $("#date-fechainicial").val(),
            fechafinal: $("#date-fechafinal").val(),
            idchofer:idchofer
        }
    })
    .done(function( e ) {
        ShowDataLiquidacionIngreso(e);
    })    
    .fail(function(msg){
        alert("Error al Cargar Reportes");
    });    
};

function ShowDataLiquidacion(e) {
    listaliquidaciones();
    var data= JSON.parse(e);

    // Recorre arreglo.
    $.each(data, function(i, item) {
        
        var row="<tr class='fila'>"+
            "<td class='id-form' style='display:none;'>"+ item.id+"</td>" +
            // "<td>"+ item.chofer +"</td>" +
            "<td>"+ item.fechacarga +"</td>" +
            "<td>"+ item.contenedor +"</td>" +
            "<td>"+ item.puntocarga +"</td>" +
            "<td>"+ item.puntodescarga +"</td>" +
            "<td>"+ item.totalpago +"</td>" +
            // '<td><img id=btndeletecolocación'+ item.id +' src=img/file_delete.png class=borrar></td>'+
        "</tr>";
        $('#tableBody-liquidacion').append(row);  
        $('.id-form').hide();       
    })
};

function ShowDataLiquidacionIngreso(e) {
    var data= JSON.parse(e);
    // Recorre arreglo.
    $.each(data, function(i, item) {
        var row="<tr class='fila'>"+
            "<td class='id-form' style='display:none;'>"+ item.id+"</td>" +
            "<td>"+ item.nombre +"</td>" +
            "<td>"+ item.monto +"</td>" +
        "</tr>";
        $('#tblbodyingresos-liq').append(row);  
        $('.id-form').hide();  
    
    })
};
