var idfiltro= null;
var filtrofecha= null;
var idformulario;
const TipoFiltro = {
    todos: 'todos',
    chofer: 'chofer',
    naviera: 'naviera',
    finca:'finca'
};
var Filtro = Object.freeze(TipoFiltro);
$(document).ready(function () {   
    $(document).on('click','#menu-reporte', function(event){       
        Filtro= TipoFiltro.todos;     
        mantenimientoreportes();
        listareportes();
        ConsultaGeneral();
        $("#filtrofecha").show();
        seleccionlinea=1;
    });
    // Filtro por tabla
    $(document).on('click','#tblchofer tr', function(){   
        idfiltro = $(this).children().eq(0).text();  
        Filtro= TipoFiltro.chofer;    
        ConsultaFiltro();
    });

    $(document).on('click','#tblfinca tr', function(){   
        idfiltro = $(this).children().eq(0).text();      
        Filtro= TipoFiltro.finca;
        ConsultaFiltro();
    });

    $(document).on('click','#tblnaviera tr', function(){   
        idfiltro = $(this).children().eq(0).text();    
        Filtro= TipoFiltro.naviera;  
        ConsultaFiltro();
    });
    // Filtro por fecha
    $('#filtrofecha').on('change', function (e) {
        //var optionSelected = $("option:selected", this);
        filtrofecha = this.value;
        ConsultaFiltro();
    });


});

function mantenimientoreportes(){
    $('#contenido-form').html(""); 
    var inputs ='<div id="div-repo">'+
                    '<div id=div-report-titulo>'+
                        '<h3>HISTORIAL</h3>'+
                    '</div>'+
                    '<div id=div-lista-reporte>'+
                    '</div>'+

                    '<div class=div-opcion-report>'+
                        '<div class=div-tercio>'+
                            '<select id=select-repor onchange="TipoReporte()">'+
                                '<option value="TODOS">TODOS</option>'+
                                '<option value="ACTIVOS">ACTIVOS</option>'+
                                '<option value="PENDIENTES">PENDIENTES</option>'+
                            '</select>'+
                        '</div>'+
                        '<div class=div-tercio>'+
                            '<div class=div-opciones>'+
                            
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
function listareportes(){        
    $('#div-lista-reporte').append("<table id='tblreportes'class='tbl'>");
    var col="<thead> <tr><th>#</th> <th>CHOFER</th> <th>FECHA</th>  <th>CONTENEDOR</th> <th>EST</th> <th></th><th></th> </tr ></thead> <tbody id='tableBody-reportes'></tbody>";
    $('#tblreportes').append(col); 

    $('#tblreportes').DataTable( {
        "order": [[ 0, "asc" ]],
        "paging":   false,
        "scrollY": "340px",
        "scrollCollapse": true,
        "bInfo" : false
    });
};

//RECARGA LA TABLA CON LOS VISITANTES POR FORMULARIO AJAX
function ConsultaGeneral(){
    $.ajax({
        type: "POST",
        url: "class/Reporte.php",
        data: { action: "ConsultaGeneral"}
    })
    .done(function( e ) {
        ShowDataReporte(e);
    })    
    .fail(function(msg){
        alert("Error al Cargar Reportes");
    });    
};

function ConsultaFormActivo(){
    $.ajax({
        type: "POST",
        url: "class/Reporte.php",
        data: { action: "ConsultaActivos"}
    })
    .done(function( e ) {
        ShowDataReporteActivos(e);
    })    
    .fail(function(msg){
        alert("Error al Cargar Reportes");
    });    
};

function ConsultaFormPendiente(){
    $.ajax({
        type: "POST",
        url: "class/Reporte.php",
        data: { action: "ConsultaPendientes"}
    })
    .done(function( e ) {
        ShowDataReportePendientes(e);
    })    
    .fail(function(msg){
        alert("Error al Cargar Reportes");
    });    
};

function TipoReporte() {    
    var x = document.getElementById("select-repor").value;
    if (x=='TODOS') 
        ConsultaGeneral();
    if (x=='ACTIVOS')
        ConsultaFormActivo();    
    if (x=='PENDIENTES')
        ConsultaFormPendiente();
}

// Carga lista
function ConsultaFiltro() {
    $.ajax({
        type: "POST",
        url: "class/Reporte.php",
        data: { 
            action: "ConsultaFiltro",
            idfiltro:  idfiltro,
            tipo: Filtro,
            filtrofecha: filtrofecha
        }
    })
    .done(function( e ) {
        ShowDataReporte(e);
    })    
    .fail(function(msg){
        alert("Error al Cargar Reportes");
    });    
};

function ShowDataReporte(e) {
    $('#tableBody-reportes').html("");
    $('#contenido-form').append("<table id='tblreportes'class='display'>");
    // carga lista con datos.
    var data= JSON.parse(e);
    visitantes = data;
    // Recorre arreglo.
    $.each(data, function(i, item) {
        var estado_form;
        if (item.estado=="0") 
            estado_form="PENDIENTE";
        else
            estado_form="ACTIVO";
        
        var row="<tr class='fila'>"+
            "<td class='id-form' style='display:none;'>"+ item.id+"</td>" +
            "<td>"+ item.comprobante +"</td>" +
            "<td>"+ item.chofer +"</td>" +
            "<td>"+ item.fechacarga +"</td>" +
            "<td>"+ item.contenedor +"</td>" +
            // "<td>"+ item.placa +"</td>" +
            // "<td>"+ item.finca +"</td>" +
            // "<td>"+ item.naviera +"</td>" +
            // "<td>"+ item.kms +"</td>" +
            "<td>"+ estado_form +"</td>" +
            // "<td class='totalpago'>"+ item.totalpago +"</td>" +
            '<td><img id=btnmodform'+ item.id +' src=img/file_mod.png class=borrar></td>'+
            '<td><img id=btndeleteform'+ item.id +' src=img/file_delete.png class=borrar></td>'+
        "</tr>";
        $('#tableBody-reportes').append(row);  
        $('#btnmodform' + item.id).click(UpdateEventHandlerFormulario);
        $('.id-form').hide();       
    })
};

function ShowDataReporteActivos(e) {
    $('#tableBody-reportes').html("");
    $('#contenido-form').append("<table id='tblreportes'class='display'>");
    // carga lista con datos.
    var data= JSON.parse(e);
    visitantes = data;
    // Recorre arreglo.
    $.each(data, function(i, item) {
        var estado_form;
        if (item.estado=="0") 
            estado_form="PENDIENTE";
        else
            estado_form="ACTIVO";
        
        var row="<tr class='fila'>"+
            "<td class='id-form' style='display:none;'>"+ item.id+"</td>" +
            "<td>"+ item.comprobante +"</td>" +
            "<td>"+ item.chofer +"</td>" +
            "<td>"+ item.fechacarga +"</td>" +
            "<td>"+ item.contenedor +"</td>" +
            // "<td>"+ item.placa +"</td>" +
            // "<td>"+ item.finca +"</td>" +
            // "<td>"+ item.naviera +"</td>" +
            // "<td>"+ item.kms +"</td>" +
            "<td>"+ estado_form +"</td>" +
            // "<td class='totalpago'>"+ item.totalpago +"</td>" +
            '<td><img id=btnmodform'+ item.id +' src=img/file_mod.png class=borrar></td>'+
            '<td><img id=btndeleteform'+ item.id +' src=img/file_delete.png class=borrar></td>'+
        "</tr>";
        $('#tableBody-reportes').append(row);  
        $('#btnmodform' + item.id).click(UpdateEventHandlerFormulario);
        $('.id-form').hide();       
    })
};

function ShowDataReportePendientes(e) {
    $('#tableBody-reportes').html("");
    $('#contenido-form').append("<table id='tblreportes'class='display'>");
    // carga lista con datos.
    var data= JSON.parse(e);
    visitantes = data;
    // Recorre arreglo.
    $.each(data, function(i, item) {
        var estado_form;
        if (item.estado=="0") 
            estado_form="PENDIENTE";
        else
            estado_form="ACTIVO";
        
        var row="<tr class='fila'>"+
            "<td class='id-form' style='display:none;'>"+ item.id+"</td>" +
            "<td>"+ item.comprobante +"</td>" +
            "<td>"+ item.chofer +"</td>" +
            "<td>"+ item.fechacarga +"</td>" +
            "<td>"+ item.contenedor +"</td>" +
            // "<td>"+ item.placa +"</td>" +
            // "<td>"+ item.finca +"</td>" +
            // "<td>"+ item.naviera +"</td>" +
            // "<td>"+ item.kms +"</td>" +
            "<td>"+ estado_form +"</td>" +
            // "<td class='totalpago'>"+ item.totalpago +"</td>" +
            '<td><img id=btnmodform'+ item.id +' src=img/file_mod.png class=borrar></td>'+
            '<td><img id=btndeleteform'+ item.id +' src=img/file_delete.png class=borrar></td>'+
        "</tr>";
        $('#tableBody-reportes').append(row);  
        $('#btnmodform' + item.id).click(UpdateEventHandlerFormulario);
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
    $("#inp-booking").val(data[0][14]);
    $("#inp-marchamo").val(data[0][15]);
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