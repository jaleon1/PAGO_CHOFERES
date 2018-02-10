var id = "NULL";

$(document).ready( function () {
    //Da la apariencia del css datatable
    ReCargar();

    //vuelve al menu
    this.onVuelve = function(){
        location.href = "XX.php";                       
    }; 

    // cierra el modal
    $(".close").click( function(){
        $(".modal").css({ display: "none" });
    });

     // Cierra el MODAL en cualquier parte de la ventana
    window.onclick = function(event) {
        if (event.target.className=="modal") {
            $(".modal").css({ display: "none" });
        }    
    };

    //vuelve al menu
    this.Cerrar = function(){
        $(".modal").css({ display: "none" });
    }; 
    // load list.
    LoadAll();

});

// Muestra información en ventana
function showInfo(){     
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
function showError(){        
    alert('show error');
    /*$(".modal").css({ display: "none" });  
    $("#textomensaje").text("Error al procesar la información");
    $("#mensajetop").css("background-color", "firebrick");
    $("#mensajetop").css("color", "white");    
    $("#mensajetop").css("visibility", "visible");
    $("#mensajetop").slideDown("slow");
    $("#mensajetop").slideDown("slow").delay(3000).slideUp("slow");*/
};

function LoadAll(){
    $.ajax({
        type: "POST",
        url: "class/Chofer.php",
        data: { 
            action: "LoadAll"
        }
    })
    .done(function( e ) {            
        ShowData(e); 
    })    
    .fail(showError);
};

function ShowData(e){
    // Limpia el div que contiene la tabla.
    $('#task-tbody').html(""); 
    // carga lista con datos.
    var data= JSON.parse(e);
    // Recorre arreglo.
    $.each(data, function(i, item) {
        var row=
            '<tr>'+
                '<td align="center">'+
                    '<a id=Update'+item.id+' class="btn btn-default"><em class="fa fa-pencil"></em></a>'+
                    '<a id=Delete'+item.id+' class="btn btn-danger"><em class="fa fa-trash"></em></a>'+
                '</td>'+
                '<td class="hidden-xs">'+ item.id +'</td>'+
                '<td>'+ item.nombre +'</td>'+                
                '<td>'+ item.cedula + '</td>'+
                '<td>'+ item.tel +'</td>'+
                '<td>'+ item.correo + '</td>'+
                '<td>'+ item.cuenta + '</td>'+
            '</tr>';
        $('#task-tbody').append(row);            
        // evento click del boton modificar-eliminar
        $('#Update'+item.id).click(UpdateEventHandler);
        //$('#Delete'+item.id).click(UpdateEventHandler);
    })
};

function UpdateEventHandler(){  
    $(".modal").css({ display: "block" });  
    id = $(this).parents("tr").find("td").eq(1).text();  //Columna 1 = ID.
    $.ajax({
        type: "POST",
        url: "class/Chofer.php",
        data: { 
            action: 'LoadDatabyID',                
            id:  id
        }            
    })
    .done(function( e ) {        
        ShowDatabyID(e);
    })    
    .fail(showError);
};

function CleanCtls(){
    $("#xx").val('');
    $("#xx").val('');
    $("#xx").val('');
    $("#xx").val('');
    $("#xx").val('');
    $("#xx").val('');
    $("#xx").val('');
};

function ShowDatabyID(e){
    // Limpia el controles
    CleanCtls();
    // carga lista con datos.
    var data= JSON.parse(e);
    $("#nombre").val(data[0].xxx);
    $("#xxx").val(data[0].xxx);       
    $("#xxx").val(data[0].xxx);
};
