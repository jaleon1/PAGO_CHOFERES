
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
                    '<input type="button" id="btnpdfcolocacion" class="btn" value="Generar Reporte">'+
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
    
function export_div(){
    
        var pdf = new jsPDF("p", "pt", "a4");
        pdf.addHTML($('#div-colocacion'), 15, 15, function() {
          pdf.save('div.pdf');
        });
    }

/* REPORTES*/
function listacolocaciones(){        
    $('#div-lista-colocacion').append("<table id='tblcolocacion'class='tbl'>");
    var col="<thead> <tr> <th>CHOFER</th> <th>FECHA CARGA</th>  <th>CONTENEDOR</th> <th>PUNTO CARGA</th> <th>PUNTO DESCARGA</th> <th></th></tr ></thead> <tbody id='tableBody-colocacion'></tbody>";
    $('#tblcolocacion').append(col); 

    $('#tblcolocacion').DataTable( {
        "order": [[ 0, "asc" ]],
        "paging":   false,
        "scrollY": "400px",
        "scrollCollapse": true,
        "bInfo" : false
    });
};

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
        ShowData(e);
    })    
    .fail(function(msg){
        alert("Error al Cargar Reportes");
    });    
};

jQuery(document).on( "onchange", "#date-fechacarga", function(){ 
    ConsultaFecha();
});

function ShowData(e) {
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

function UpdateEventHandlerFormulario() {
    id = $(this).parents("tr").find("td").eq(0).text();  //Columna 0 de la fila seleccionda= ID.
    $.ajax({
        type: "POST",
        url: "class/Formulario.php",
        data: {
            action: 'Cargar',
            id: id
        }
    })
    .done(function (e) {
        ShowItemDataFormulario(e);
        UpdateEventHandlerIngresoForm();
        UpdateEventHandlerGastoForm();
    })
    .fail(showError);
};

function UpdateEventHandlerIngresoForm() {
    //id = $(this).parents("tr").find("td").eq(0).text();  //Columna 0 de la fila seleccionda= ID.
    $.ajax({
        type: "POST",
        url: "class/Formulario.php",
        data: {
            action: 'CargarIngreso',
            idformulario: id
        }
    })
    .done(function (x) {
        ShowItemDataIngresoForm(x);
    })
    .fail(showError);
};

function UpdateEventHandlerGastoForm() {
    //id = $(this).parents("tr").find("td").eq(0).text();  //Columna 0 de la fila seleccionda= ID.
    $.ajax({
        type: "POST",
        url: "class/Formulario.php",
        data: {
            action: 'CargarGasto',
            idformulario: id
        }
    })
    .done(function (x) {
        ShowItemDataGastoForm(x);
    })
    .fail(showError);
};

function ShowItemDataFormulario(e) {
    AbreFormulario();
    // Limpia el controles
    
    // carga lista con datos.
    var data = JSON.parse(e);
    idformulario = data[0][0];
    $("#lbl-comprobante").text(data[0][1]);
    $("#inp-chofer").val(data[0][2]);
    $("#form-date-crtl").val(data[0][3]);
    $("#inp-contenedor").val(data[0][4]);
    $("#inp-placa").val(data[0][5]);
    $("#inp-finca").val(data[0][6]);
    $("#inp-naviera").val(data[0][7]);
    kmsviaje = data[0][8];
    $("#inp-valor-viaje").val(data[0][10]);
    $("#inp-total-pago").val(data[0][11]);
    idchofer = data[0][12];
    idcalculokm = data[0][13];
};

function ShowItemDataIngresoForm(x) {
    $('#firsttr').closest('tr').remove();
    // Limpia el controles
    
    // carga lista con datos.
    var data = JSON.parse(x);
    for (var i = 0; i < data.length; i++) {
        var td1="<tr class=cambia-ingreso><td>"+ data[i][2] +"</td><td class=montoingreso>"+ data[i][1] +"</td><td><img id=btnborraingreso class=borrar src=img/file_delete.png></td></tr>";
        $("#tblbodyingresos-form").append(td1);
    }
    ArrayIngresos();
};

function ShowItemDataGastoForm(x) {
    $('#firsttr2').closest('tr').remove();
    // Limpia el controles
    
    // carga lista con datos.
    var data = JSON.parse(x);
    for (var i = 0; i < data.length; i++) {
        var td1="<tr class=cambia-gasto><td>"+ data[i][2] +"</td><td class=montogasto>"+ data[i][1] +"</td><td><img id=btnborragasto class=borrar src=img/file_delete.png></td></tr>";
        $("#tblbodygastos-form").append(td1);
    }
    ArrayGastos();
};