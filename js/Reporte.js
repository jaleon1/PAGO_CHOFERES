var idfiltro= null;
const TipoFiltro = {
    chofer: 'chofer',
    naviera: 'naviera',
    finca:'finca'
};
const Filtro = Object.freeze(TipoFiltro);

$(document).ready(function () {   
    $(document).on('click','#menu-reporte', function(event){        
        mantenimientoreportes();
        listareportes();
        ConsultaGeneral();
    });
    // Filtro
    $(document).on('click','#tblchofer tr', function(){   
        idfiltro = $(this).children().eq(0).text();      
        ConsultaFiltro(Filtro.chofer);
    });

    $(document).on('click','#tblfinca tr', function(){   
        idfiltro = $(this).children().eq(0).text();      
        ConsultaFiltro(Filtro.finca);
    });

    $(document).on('click','#tblnaviera tr', function(){   
        idfiltro = $(this).children().eq(0).text();      
        ConsultaFiltro(Filtro.naviera);
    });


});


function mantenimientoreportes(){
    $('#contenido-form').html(""); 
    var inputs = '<div id="div-repo">'+
        '<div id=div-report-titulo>'+
            '<h3>REPORTES</h3>'+
        '</div>'+
        '<div id=div-lista-reporte>'+
        
        '</div>'+
        '<div id=div-opcion-report>'+
            '<div class=div-tercio>'+
                '<div class=div-opciones></div>'+
                '<div class=div-total-botones></div>'+
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
    var col="<thead> <tr><th>#</th> <th>CHOFER</th> <th>FECHA CARGA</th>  <th>CONTENEDOR</th> <th>PLACA</th> <th>FINCA</th> <th>NAVIERA</th> <th>kms</th> <th>VALOR KM</th> <th>TOTAL PAGO</th> </tr ></thead> <tbody id='tableBody-reportes'></tbody>";
    $('#tblreportes').append(col); 

    $('#tblreportes').DataTable( {
        "order": [[ 0, "asc" ]],
        "paging":   false,
        "scrollY": "225px",
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
        ShowData(e);
    })    
    .fail(function(msg){
        alert("Error al Cargar Reportes");
    });    
};

// Carga lista
function ConsultaFiltro(t) {
    $.ajax({
        type: "POST",
        url: "class/Reporte.php",
        data: { 
            action: "ConsultaFiltro",
            idfiltro:  idfiltro,
            tipo: t
        }
    })
    .done(function( e ) {
        ShowData(e);
    })    
    .fail(function(msg){
        alert("Error al Cargar Reportes");
    });    
};

function ShowData(e) {
    $('#tableBody-reportes').html("");
    $('#contenido-form').append("<table id='tblreportes'class='display'>");
    // carga lista con datos.
    var data= JSON.parse(e);
    visitantes = data;
    // Recorre arreglo.
    $.each(data, function(i, item) {
        var row="<tr class='fila'>"+
            "<td class='id-form' style='display:none;'>"+ item.id+"</td>" +
            "<td>"+ item.comprobante +"</td>" +
            "<td>"+ item.chofer +"</td>" +
            "<td>"+ item.fecha +"</td>" +
            "<td>"+ item.contenedor +"</td>" +
            "<td>"+ item.placa +"</td>" +
            "<td>"+ item.finca +"</td>" +
            "<td>"+ item.naviera +"</td>" +
            "<td>"+ item.kms +"</td>" +
            "<td>"+ item.valorkm +"</td>" +
            "<td class='totalpago'>"+ item.totalpago +"</td>" +
            // "<td><img id=imgmod src=img/file_mod.png class=borrar></td>"+
            // "<td><img id=imgdelete src=img/file_delete.png class=borrar></td>"+
        "</tr>";
        $('#tableBody-reportes').append(row);  
        $('.id-form').hide();       
    })
    // Summary
    var foot= '<label for="inp-sumtotal" class="lbl-style">TOTAL</label>'+ 
        '<input type="text" id="inp-sumtotal" name="inp-sumtotal" class="input-format" value="0" readonly />';
    //'<tfoot> <tr> <th>Total:</th> <th></th> <th></th> <th></th> <th></th> <th id="sumtotal"> </th> </tr> </tfoot>';
    $('#tableBody-reportes').append(foot);
    var sumtotal=0;
    $('.totalpago').each(function() {
        sumtotal += parseFloat( $(this).text() );
        $('#inp-sumtotal').val(sumtotal);
    });
};