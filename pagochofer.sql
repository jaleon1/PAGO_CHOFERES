-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-01-2018 a las 00:11:23
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
-- Base de datos: `pagochofer`
--
CREATE DATABASE IF NOT EXISTS `pagochofer` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `pagochofer`;

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
  `nombre` varchar(30) NOT NULL,
  `cedula` varchar(20) NOT NULL,
  `telefono` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `finca`
--

CREATE TABLE `finca` (
  `id` char(36) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `ubicacion` varchar(20) NOT NULL,
  `telefono` varchar(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formulariopago`
--

CREATE TABLE `formulariopago` (
  `id` char(36) NOT NULL,
  `comprovante` varchar(30) NOT NULL,
  `idchofer` char(36) NOT NULL,
  `idcalculokm` char(36) NOT NULL,
  `fecha` datetime NOT NULL,
  `contenedor` varchar(30) NOT NULL,
  `placa` varchar(30) NOT NULL,
  `kms` int(11) NOT NULL,
  `valorviaje` decimal(10,0) NOT NULL,
  `valorkm` decimal(10,0) NOT NULL,
  `porcentajeingreso` decimal(10,0) NOT NULL,
  `totalpago` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formxgastos`
--

CREATE TABLE `formxgastos` (
  `idformulario` char(36) NOT NULL,
  `idgastos` char(36) NOT NULL,
  `monto` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formxingresos`
--

CREATE TABLE `formxingresos` (
  `idformulario` char(36) NOT NULL,
  `idingresos` char(36) NOT NULL,
  `monto` decimal(10,0) NOT NULL,
  `porcentaje` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gasto`
--

CREATE TABLE `gasto` (
  `id` char(36) NOT NULL,
  `nombre` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingreso`
--

CREATE TABLE `ingreso` (
  `id` char(36) NOT NULL,
  `nombre` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parametros`
--

CREATE TABLE `parametros` (
  `valorkm` decimal(10,0) NOT NULL,
  `porcentajecalculoingreso` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Indices de la tabla `finca`
--
ALTER TABLE `finca`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `formulariopago`
--
ALTER TABLE `formulariopago`
  ADD PRIMARY KEY (`id`(32)),
  ADD KEY `id` (`id`),
  ADD KEY `idchofer` (`idchofer`),
  ADD KEY `idcalculokm` (`idcalculokm`);

--
-- Indices de la tabla `formxgastos`
--
ALTER TABLE `formxgastos`
  ADD KEY `idformulario` (`idformulario`),
  ADD KEY `idgastos` (`idgastos`);

--
-- Indices de la tabla `formxingresos`
--
ALTER TABLE `formxingresos`
  ADD KEY `idformulario` (`idformulario`),
  ADD KEY `idingresos` (`idingresos`);

--
-- Indices de la tabla `gasto`
--
ALTER TABLE `gasto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ingreso`
--
ALTER TABLE `ingreso`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `naviera`
--
ALTER TABLE `naviera`
  ADD PRIMARY KEY (`id`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `calculokm`
--
ALTER TABLE `calculokm`
  ADD CONSTRAINT `calculokm_ibfk_1` FOREIGN KEY (`id`) REFERENCES `formulariopago` (`idcalculokm`);

--
-- Filtros para la tabla `chofer`
--
ALTER TABLE `chofer`
  ADD CONSTRAINT `chofer_ibfk_1` FOREIGN KEY (`id`) REFERENCES `formulariopago` (`idchofer`);

--
-- Filtros para la tabla `finca`
--
ALTER TABLE `finca`
  ADD CONSTRAINT `finca_ibfk_1` FOREIGN KEY (`id`) REFERENCES `calculokm` (`idfinca`);

--
-- Filtros para la tabla `formulariopago`
--
ALTER TABLE `formulariopago`
  ADD CONSTRAINT `formulariopago_ibfk_1` FOREIGN KEY (`id`) REFERENCES `formxingresos` (`idformulario`);

--
-- Filtros para la tabla `formxgastos`
--
ALTER TABLE `formxgastos`
  ADD CONSTRAINT `formxgastos_ibfk_1` FOREIGN KEY (`idformulario`) REFERENCES `formulariopago` (`id`);

--
-- Filtros para la tabla `gasto`
--
ALTER TABLE `gasto`
  ADD CONSTRAINT `gasto_ibfk_1` FOREIGN KEY (`id`) REFERENCES `formxgastos` (`idgastos`);

--
-- Filtros para la tabla `ingreso`
--
ALTER TABLE `ingreso`
  ADD CONSTRAINT `ingreso_ibfk_1` FOREIGN KEY (`id`) REFERENCES `formxingresos` (`idingresos`);

--
-- Filtros para la tabla `naviera`
--
ALTER TABLE `naviera`
  ADD CONSTRAINT `naviera_ibfk_1` FOREIGN KEY (`id`) REFERENCES `calculokm` (`idnaviera`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
