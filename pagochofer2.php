<?php
if (!isset($_SESSION)) 
    session_start();
    
?>

<!doctype html>
<html lang="en">
  <head>
    <title>Pago Choferes</title>
    

    <link rel="stylesheet" href="css/datatables.css" type="text/css"/>
    <script type="text/jscript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/datatables.js" charset="utf8"></script>
    <link rel="stylesheet" href="css/sweetalert.css" type="text/css"/>
    <script type="text/javascript" src="js/sweetalert.js"></script>
    <link rel="stylesheet" href="css\style2.css" type="text/css">
    <script type="text/javascript" src="js/jquery.validate.min.js" languaje="javascript"></script>

    <script src="js/FuncionesPagoChofer.js" languaje="javascript" type="text/javascript"></script> 
    <script src="js/Chofer.js" languaje="javascript" type="text/javascript"></script> 
    <script src="js/PuntoCarga.js" languaje="javascript" type="text/javascript"></script> 
    <script src="js/PuntoDescarga.js" languaje="javascript" type="text/javascript"></script> 
    <script src="js/Naviera.js" languaje="javascript" type="text/javascript"></script> 
    <script src="js/Viajes.js" languaje="javascript" type="text/javascript"></script>
    <script src="js/Reporte.js" languaje="javascript" type="text/javascript"></script>
    <script src="js/Ingreso.js" languaje="javascript" type="text/javascript"></script>
    <script src="js/Gasto.js" languaje="javascript" type="text/javascript"></script>
    <script src="js/Colocacion.js" languaje="javascript" type="text/javascript"></script>
    <script src="js/Liquidacion.js" languaje="javascript" type="text/javascript"></script>
    <script src="js/contenedor.js" languaje="javascript" type="text/javascript"></script>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- <link rel="stylesheet" href="css/jquery.dataTables.min.css" type="text/css"/> -->
    
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous"> -->

    <!-- <script type="text/javascript" src="js/TableToExcel.js"></script> -->
    <!-- <script type="text/javascript" src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script> -->

    <link rel="stylesheet" href="css/bootstrap.min.css">
    <!-- <link rel="stylesheet" href="css/bootstrap-theme.min.css"> -->
    <script src="js/bootstrap.min.js"></script>
    <!-- <script src="js/filesaver.js" type="text/javascript"></script>
    <script src="js/html2canvas.js" type="text/javascript"></script>  -->

    

  </head>
  <body>
    <header>
        <div class=container>
            <div class=row>
                <div class="col-lg-6">
                    <i class="fa fa-truck fa-5x whiteiconcolor" aria-hidden="true"></i>
                    <!--<i id=icon-main class="fa fa-id-card-o fa-5x whiteiconcolor" aria-hidden="true"></i>-->
                    <i class="fa fa-money fa-5x whiteiconcolor" aria-hidden="true"></i>
                    <!--<i class="fa fa-ship fa-5x whiteiconcolor" aria-hidden="true"></i>
                    <i class="fa fa-tree fa-5x whiteiconcolor" aria-hidden="true"></i>-->
                </div>
                <div class="col-lg-6">
                <h1 id=tituloempresa>TRANSPACIFIC CR BELEN S.A</h1>
                </div>
            </div>
        </div>
        <div class="menu-bar text-xs-right">
            <nav class=container role="menu">
                <div class="row">
                    <div id="div-menu-mant" class="col">
                        <ul class="menu-list list-inline">
                            <li class="list-inline-item">
                                <div class="btn-group">
                                    <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                                        Mantenimiento
                                        <span class="caret"></span>
                                        </a>
                                        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
                                            <li><a id="menu-chofer" tabindex="-1" href="#">Chofer</a></li>
                                            <li><a id="menu-puntocarga" tabindex="-1" href="#">Punto de Carga</a></li>
                                            <li><a id="menu-puntodescarga" tabindex="-1" href="#">Punto de Descarga</a></li>
                                            <li><a id="menu-naviera" tabindex="-1" href="#">Naviera</a></li>
                                            <li><a id="menu-ingresos-gastos" tabindex="-1" href="#">Ingresos y Gastos</a></li>
                                        </ul>
                                </div>
                            </li>
                            <li class="list-inline-item">
                                <div class="btn-group">
                                    <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                                        Procesos
                                        <span class="caret"></span>
                                        </a>
                                        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
                                            <li><a id="menu-contenedor" tabindex="-1" href="#">Contenedores</a></li>
                                            <li><a id="menu-colocacion" tabindex="-1" href="#">Colocaciones Diarias</a></li>
                                            <li><a id="menu-formulario-pago" tabindex="-1" href="#">Liquidaciones</a></li>
                                            <li><a id="menu-liquidacion" tabindex="-1" href="#">Historial Liquidación</a></li>
                                            <li><a id="menu-reporte" tabindex="-1" href="#">Historial</a></li>
                                        </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div id="div-menu-form" class="col">

                    </div>
                </row>
            </nav>
        </div>
    </header>

    <div id=principal>
        <div class=principal-row>
            <div class=prin-mantenimiento>
                <div class=prin-margen></div>
                <div class=contenido-mant>
                    <div id="div-mant">
                        <div id="div-mant-titulo"></div>
                        <div id="div-mants"></div>
                        <div id="div-mant-inputs"></div>
                    </div>                
                </div>
                <div class=prin-margen-center></div>
            </div>
            <div class=prin-formulario>
                <div class=prin-margen-center></div>
                <div id=contenido-form class=contenido-form>                
                </div>   
                <div class=prin-margen></div>            
            </div>
        </div>
    </div>
  </body>
</html>