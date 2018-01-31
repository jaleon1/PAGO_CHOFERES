<?php
if (!isset($_SESSION)) 
    session_start();
    
?>

<!doctype html>
<html lang="en">
  <head>
    <title>Pago Choferes</title>

    <link rel="stylesheet" href="css/datatables.css" type="text/css"/>
    <script src="js/jquery.js" type="text/jscript"></script>
    <script src="js/datatables.js" type="text/javascript" charset="utf8"></script>
    <script src="js/FuncionesPagoChofer.js" languaje="javascript" type="text/javascript"></script> 
    <link rel="stylesheet" href="css/dropdownmenu.css" type="text/css"/>
    <script type="text/javascript" src="js/cssrefresh.js"></script>

    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
    <!-- Main CSS -->
    <link rel="stylesheet" href="css\style2.css" type="text/css">
    
    <!-- Font Awesome CDN -->
    <!--<script src="https://use.fontawesome.com/a128d9602f.js"></script>
    <!-- Google Fonts -->
    <!--<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"> -->

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
                <h1>TRANSPACIFIC CR BELEN S.A</h1>
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
                                            <li><a id="menu-finca" tabindex="-1" href="#">Finca</a></li>
                                            <li><a id="menu-naviera" tabindex="-1" href="#">Naviera</a></li>
                                            <li><a id="menu-calculokm" tabindex="-1" href="#">Viajes</a></li>
                                            <li><a id="menu-ingresos-gastos" tabindex="-1" href="#">Ingresos y Gastos</a></li>
                                        </ul>
                                </div>
                            </li>
                            <li class="list-inline-item">
                                <div class="btn-group">
                                    <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                                        Reportes
                                        <span class="caret"></span>
                                        </a>
                                        <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
                                            <li><a id="menu-diario" tabindex="-1" href="#">Diario</a></li>
                                            <li><a id="menu-semanal" tabindex="-1" href="#">Semanal</a></li>
                                            <li><a id="menu-Mensual" tabindex="-1" href="#">Mensual</a></li>
                                            <li><a id="menu-choferes" tabindex="-1" href="#">Choferes</a></li>
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
                <div id="div-mant" class="">
                    <div id="div-mant-titulo"></div>
                    <div id="div-mants"></div>
                    <div id="div-mant-inputs">
                        <div id=input-finca>
                            <div class=caja-media>
                                <div class=contenido-input>
                                    <label for="lbl-nombre-finca" class="lbl-style">Nombre</label>
                                    <linput type="text" id="inp-nombre-finca" name="inp-nombre-finca" class="input-format" value="" required/>
                                </div>
                                <div class=contenido-input>

                                </div>
                                <div class=contenido-input>

                                </div>
                            </div>
                            <div class=caja-cuarto>
                                <div class=contenido-input>
                                    <label for="lbl-ubicacion-finca" class="lbl-style">Ubicación</label>
                                    <linput type="text" id="inp-ubicacion-finca" name="inp-ubicacion-finca" class="input-format" value="" required/>
                                </div>
                                <div id=xxx class=contenido-input>

                                </div>
                                <div class=contenido-input>
                                    
                                </div>
                            </div>
                            <div class=caja-cuarto>
                                <div class=contenido-input>
                                    <label for="lbl-tel-finca" class="lbl-style">Telefono</label>
                                    <linput type="text" id="inp-tel-finca" name="inp-tel-finca" class="input-format" value="" required/>                        
                                </div>
                                <div class=contenido-input>

                                </div>
                                <div id=boton class=contenido-input>
                                    <linput type="button" id="btnguardarfinca" class="btn" value="Guardar">
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>                

                </div>
                <div class=prin-margen-center></div>
            </div>
            <div class=prin-formulario>
                <div class=prin-margen-center></div>
                <div class=contenido-form>

                    <div id="div-form" class="">
                        <div id="div-form-titulo">
                            <h3>FORMULARIO DE PAGO</h3>
                            <label >COMPROBANTE #</label>
                            <label id="lbl-comprovante" class="lbl-style">19291108</label>
                        </div>
                        <div id="div-form-chofer">
                            <label for="lbl-chofer" class="lbl-style">Chofer</label>
                            <input type="text" id="inp-chofer" name="inp-chofer" class="input-format" readonly="readonly" value="" required/> 
                        </div>
                        <div id="div-form-fecha">
                            <label id="lbl-fecha" for="form-date-crtl" class="lbl-style">Fecha de Carga</label>
                            <input type="datetime-local" id="form-date-crtl" name="form-date-crtl" class="input-format" required/>
                        </div>
                        <div id="div-form-contenedor">
                            <label for="lbl-contenedor" class="lbl-style">Contenedor</label>
                            <input type="text" id="inp-contenedor" name="inp-contenedor" class="input-format" value="" required/> 
                        </div>
                        <div id="div-form-placa">
                            <label for="lbl-placa" class="lbl-style">Placa</label>
                            <input type="text" id="inp-placa" name="inp-placa" class="input-format" value="" required/> 
                        </div>
                        <div id="div-form-finca">
                            <label for="lbl-finca" class="lbl-style">Finca</label>
                            <input type="text" id="inp-finca" name="inp-finca" class="input-format" readonly="readonly" value="" required/> 
                        </div>
                        <div id="div-form-naviera">
                            <label for="lbl-naviera" class="lbl-style">Naviera</label>
                            <input type="text" id="inp-naviera" name="inp-naviera" class="input-format" readonly="readonly" value="" required/> 
                        </div>
                        <div id="div-form-valor-viaje">
                            <label for="lbl-valor-viaje" class="lbl-style">VALOR DEL VIAJE</label>
                            <input type="text" id="inp-valor-viaje" name="inp-valor-viaje" class="input-format" readonly="readonly" value="" required/> 
                        </div>
                        <div id="div-form-conversion">
                            <button id="btncambio">$/</button>
                        </div>
                        <div id="div-form-ingresos">
                            
                        </div>
                        <div id="div-form-gastos">

                        </div>
                        <div id="div-form-total-pago">
                            <label for="lbl-total-pago" class="lbl-style">TOTAL A PAGAR</label>
                            <input type="text" id="inp-total-pago" name="inp-total-pago" class="input-format" readonly="readonly" value="" required/> 
                            <input type="button" id="btnguardar" class="" value="Guardar">  
                        </div>
                    </div>
                </div>   
                <div class=prin-margen></div>            
            </div>
        </div>

    </div>

  </body>
</html>