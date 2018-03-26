-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-03-2018 a las 00:30:47
-- Versión del servidor: 10.1.22-MariaDB
-- Versión de PHP: 7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pagochofer2`
--
CREATE DATABASE IF NOT EXISTS `pagochofer2` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `pagochofer2`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calculokm`
--

CREATE TABLE `calculokm` (
  `id` char(36) NOT NULL,
  `idfinca` char(36) NOT NULL,
  `idnaviera` char(36) NOT NULL,
  `kmstotal` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chofer`
--

CREATE TABLE `chofer` (
  `id` char(36) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `cedula` varchar(20) DEFAULT NULL,
  `telefono` varchar(9) DEFAULT NULL,
  `cuenta` varchar(20) DEFAULT NULL,
  `correo` varchar(50) NOT NULL,
  `placa` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `chofer`
--

INSERT INTO `chofer` (`id`, `nombre`, `cedula`, `telefono`, `cuenta`, `correo`, `placa`) VALUES
('6c3f8fca-2966-11e8-929c-2c768add56de', 'Jonas Ballena', '3230155411', '45454588', '033454122000001', 'jonas@ho.com', NULL),
('e6d63cef-28c2-11e8-8168-2c768add56de', 'Jairo León González', '304190452', '89971458', '123132545450200001', 'jariolg@hotmail.com', '895223'),
('e6d68fb2-28c2-11e8-8168-2c768add56de', 'Roger Bonilla Salas', '102580455', '99858547', '132123558400008', 'rogerbo@gmail.com', '554812');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colocaciondiaria`
--

CREATE TABLE `colocaciondiaria` (
  `id` char(36) NOT NULL,
  `idchofer` char(36) NOT NULL,
  `fechacarga` datetime NOT NULL,
  `idcontenedor` char(36) NOT NULL,
  `idpuntocarga` char(36) NOT NULL,
  `idpuntodescarga` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `colocaciondiaria`
--

INSERT INTO `colocaciondiaria` (`id`, `idchofer`, `fechacarga`, `idcontenedor`, `idpuntocarga`, `idpuntodescarga`) VALUES
('3ebb0f55-2a7c-11e8-929c-2c768add56de', 'e6d63cef-28c2-11e8-8168-2c768add56de', '2018-03-18 01:15:00', '20a4bc31-2a5b-11e8-929c-2c768add56de', 'fc83502e-2a62-11e8-929c-2c768add56de', '31cdc7b3-2a63-11e8-929c-2c768add56de'),
('45680912-2ac3-11e8-a6fe-2c768add56de', 'e6d63cef-28c2-11e8-8168-2c768add56de', '2018-03-18 09:43:00', 'ba8d1dd0-2961-11e8-929c-2c768add56de', 'fc83502e-2a62-11e8-929c-2c768add56de', '31cdc7b3-2a63-11e8-929c-2c768add56de'),
('569e16aa-2ac4-11e8-a6fe-2c768add56de', 'e6d68fb2-28c2-11e8-8168-2c768add56de', '2018-03-18 09:51:00', '20a4bc31-2a5b-11e8-929c-2c768add56de', 'fc83502e-2a62-11e8-929c-2c768add56de', '31cdc7b3-2a63-11e8-929c-2c768add56de'),
('a979140a-2a7b-11e8-929c-2c768add56de', 'e6d63cef-28c2-11e8-8168-2c768add56de', '2018-03-18 01:11:00', 'ba8d1dd0-2961-11e8-929c-2c768add56de', 'fc83502e-2a62-11e8-929c-2c768add56de', '31cdc7b3-2a63-11e8-929c-2c768add56de'),
('b33346f2-2ac4-11e8-a6fe-2c768add56de', 'e6d68fb2-28c2-11e8-8168-2c768add56de', '2018-03-18 09:54:00', '860f0f2c-2ac4-11e8-a6fe-2c768add56de', 'fc83502e-2a62-11e8-929c-2c768add56de', '31cdc7b3-2a63-11e8-929c-2c768add56de');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contenedor`
--

CREATE TABLE `contenedor` (
  `id` char(36) NOT NULL,
  `fechaingreso` datetime NOT NULL,
  `idnaviera` char(36) DEFAULT NULL,
  `idchofer` char(36) NOT NULL,
  `contenedor` varchar(30) NOT NULL,
  `marchamo` varchar(30) DEFAULT NULL,
  `booking` varchar(30) DEFAULT NULL,
  `capacidad` varchar(20) DEFAULT NULL,
  `predio` varchar(30) DEFAULT NULL,
  `curena` varchar(30) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `contenedor`
--

INSERT INTO `contenedor` (`id`, `fechaingreso`, `idnaviera`, `idchofer`, `contenedor`, `marchamo`, `booking`, `capacidad`, `predio`, `curena`, `estado`) VALUES
('20a4bc31-2a5b-11e8-929c-2c768add56de', '2018-03-17 21:18:00', '5b771e50-28b4-11e8-8309-2c768add56de', '6c3f8fca-2966-11e8-929c-2c768add56de', 'YG-2558', '45887', 'jij-142', '28', '52', '78954', 1),
('860f0f2c-2ac4-11e8-a6fe-2c768add56de', '2018-03-18 07:00:00', '5b775bc1-28b4-11e8-8309-2c768add56de', 'e6d68fb2-28c2-11e8-8168-2c768add56de', '99999', '88888', '77777', '28', '56', '5555', 1),
('ba8d1dd0-2961-11e8-929c-2c768add56de', '2018-03-16 13:00:00', '5b771e50-28b4-11e8-8309-2c768add56de', 'e6d63cef-28c2-11e8-8168-2c768add56de', 'BB-1010', '123456', '12456', '30', '55', '9999', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formgastos`
--

CREATE TABLE `formgastos` (
  `id` char(36) NOT NULL,
  `idformulario` char(36) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `monto` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formingresos`
--

CREATE TABLE `formingresos` (
  `id` char(36) NOT NULL,
  `idformulario` char(36) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `porcentaje` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formulariopago`
--

CREATE TABLE `formulariopago` (
  `id` char(36) NOT NULL,
  `idcolocaciondiaria` char(36) NOT NULL,
  `comprobante` int(11) NOT NULL,
  `idingreso` char(36) NOT NULL,
  `idgasto` char(36) NOT NULL,
  `valorviaje` decimal(10,2) NOT NULL,
  `totalpago` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gasto`
--

CREATE TABLE `gasto` (
  `id` char(36) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `monto` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `gasto`
--

INSERT INTO `gasto` (`id`, `nombre`, `monto`) VALUES
('b78f225a-2aca-11e8-a6fe-2c768add56de', 'Cureña', '10.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingreso`
--

CREATE TABLE `ingreso` (
  `id` char(36) NOT NULL,
  `idtipoingreso` varchar(36) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `porcentaje` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ingreso`
--

INSERT INTO `ingreso` (`id`, `idtipoingreso`, `nombre`, `monto`, `porcentaje`) VALUES
('f9045267-2aca-11e8-a6fe-2c768add56de', 'e60bf9be-2aca-11e8-a6fe-2c768add56de', 'Cureña', '0.00', '10.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `naviera`
--

CREATE TABLE `naviera` (
  `id` char(36) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `ubicacion` varchar(20) NOT NULL,
  `telefono` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `naviera`
--

INSERT INTO `naviera` (`id`, `nombre`, `ubicacion`, `telefono`) VALUES
('5b771e50-28b4-11e8-8309-2c768add56de', 'Japa Loid', 'Guanacaste', '89915749'),
('5b775bc1-28b4-11e8-8309-2c768add56de', 'La Irma', 'San Carlos', '87918744'),
('efb12898-2961-11e8-929c-2c768add56de', 'Alammo', 'Cartago', '75498514');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parametros`
--

CREATE TABLE `parametros` (
  `valorkm` decimal(10,2) NOT NULL,
  `porcentajecalculoingreso` decimal(10,2) NOT NULL,
  `tipocambio` decimal(10,2) NOT NULL,
  `litrodiesel` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntocarga`
--

CREATE TABLE `puntocarga` (
  `id` char(36) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `valorviaje` decimal(10,2) NOT NULL,
  `ubicacion` varchar(20) NOT NULL,
  `telefono` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `puntocarga`
--

INSERT INTO `puntocarga` (`id`, `nombre`, `valorviaje`, `ubicacion`, `telefono`) VALUES
('fc83502e-2a62-11e8-929c-2c768add56de', 'Finca1', '0.00', 'San Carlos', '25534064');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntodescarga`
--

CREATE TABLE `puntodescarga` (
  `id` char(36) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `ubicacion` varchar(20) NOT NULL,
  `telefono` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `puntodescarga`
--

INSERT INTO `puntodescarga` (`id`, `nombre`, `ubicacion`, `telefono`) VALUES
('31cdc7b3-2a63-11e8-929c-2c768add56de', 'Muelle', 'Caldera', '75449544');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoingreso`
--

CREATE TABLE `tipoingreso` (
  `id` char(36) NOT NULL,
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipoingreso`
--

INSERT INTO `tipoingreso` (`id`, `nombre`) VALUES
('e60bf9be-2aca-11e8-a6fe-2c768add56de', 'Cureña'),
('e60c5589-2aca-11e8-a6fe-2c768add56de', 'Combustible');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `calculokm`
--
ALTER TABLE `calculokm`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idfinca` (`idfinca`),
  ADD KEY `idnaviera` (`idnaviera`);

--
-- Indices de la tabla `chofer`
--
ALTER TABLE `chofer`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `colocaciondiaria`
--
ALTER TABLE `colocaciondiaria`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idchofer` (`idchofer`),
  ADD KEY `idcontenedor` (`idcontenedor`),
  ADD KEY `idpuntocarga` (`idpuntocarga`),
  ADD KEY `idpuntodescarga` (`idpuntodescarga`);

--
-- Indices de la tabla `contenedor`
--
ALTER TABLE `contenedor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idnaviera` (`idnaviera`),
  ADD KEY `idchofer` (`idchofer`);

--
-- Indices de la tabla `formgastos`
--
ALTER TABLE `formgastos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idformulario` (`idformulario`);

--
-- Indices de la tabla `formingresos`
--
ALTER TABLE `formingresos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idformulario` (`idformulario`);

--
-- Indices de la tabla `formulariopago`
--
ALTER TABLE `formulariopago`
  ADD PRIMARY KEY (`id`(32)),
  ADD KEY `id` (`id`),
  ADD KEY `idcolocaciondiaria` (`idcolocaciondiaria`),
  ADD KEY `idingreso` (`idingreso`),
  ADD KEY `idgasto` (`idgasto`);

--
-- Indices de la tabla `gasto`
--
ALTER TABLE `gasto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ingreso`
--
ALTER TABLE `ingreso`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idtipoingreso` (`idtipoingreso`);

--
-- Indices de la tabla `naviera`
--
ALTER TABLE `naviera`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `puntocarga`
--
ALTER TABLE `puntocarga`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `puntodescarga`
--
ALTER TABLE `puntodescarga`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipoingreso`
--
ALTER TABLE `tipoingreso`
  ADD PRIMARY KEY (`id`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `colocaciondiaria`
--
ALTER TABLE `colocaciondiaria`
  ADD CONSTRAINT `colocaciondiaria_ibfk_1` FOREIGN KEY (`idcontenedor`) REFERENCES `contenedor` (`id`),
  ADD CONSTRAINT `colocaciondiaria_ibfk_2` FOREIGN KEY (`idpuntodescarga`) REFERENCES `puntodescarga` (`id`),
  ADD CONSTRAINT `colocaciondiaria_ibfk_3` FOREIGN KEY (`idpuntocarga`) REFERENCES `puntocarga` (`id`),
  ADD CONSTRAINT `colocaciondiaria_ibfk_4` FOREIGN KEY (`idchofer`) REFERENCES `chofer` (`id`);

--
-- Filtros para la tabla `contenedor`
--
ALTER TABLE `contenedor`
  ADD CONSTRAINT `contenedor_ibfk_1` FOREIGN KEY (`idnaviera`) REFERENCES `naviera` (`id`),
  ADD CONSTRAINT `contenedor_ibfk_2` FOREIGN KEY (`idchofer`) REFERENCES `chofer` (`id`);

--
-- Filtros para la tabla `formulariopago`
--
ALTER TABLE `formulariopago`
  ADD CONSTRAINT `formulariopago_ibfk_1` FOREIGN KEY (`idcolocaciondiaria`) REFERENCES `colocaciondiaria` (`id`),
  ADD CONSTRAINT `formulariopago_ibfk_2` FOREIGN KEY (`idingreso`) REFERENCES `formingresos` (`id`),
  ADD CONSTRAINT `formulariopago_ibfk_3` FOREIGN KEY (`idgasto`) REFERENCES `formgastos` (`id`);

--
-- Filtros para la tabla `ingreso`
--
ALTER TABLE `ingreso`
  ADD CONSTRAINT `ingreso_ibfk_1` FOREIGN KEY (`idtipoingreso`) REFERENCES `tipoingreso` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
