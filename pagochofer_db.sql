-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-02-2018 a las 01:40:00
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

--
-- Volcado de datos para la tabla `calculokm`
--

INSERT INTO `calculokm` (`id`, `idfinca`, `idnaviera`, `kmstotal`) VALUES
('163b7703-0b88-11e8-a44c-2c768add56de', '02954c23-0b04-11e8-a44c-2c768add56de', '27fe06b7-0b08-11e8-a44c-2c768add56de', 444);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chofer`
--

CREATE TABLE `chofer` (
  `id` char(36) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `cedula` varchar(20) DEFAULT NULL,
  `telefono` varchar(9) DEFAULT NULL,
  `cuenta` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `chofer`
--

INSERT INTO `chofer` (`id`, `nombre`, `cedula`, `telefono`, `cuenta`) VALUES
('a00cea1d-0b9a-11e8-a44c-2c768add56de', 'Jairo León González', '304190452', '8991-5749', '26591587451236587'),
('a00d4a86-0b9a-11e8-a44c-2c768add56de', 'Jason Rojas Valverde', '102560487', '8795-1454', '10002589632511247'),
('ea03ba0d-0b9a-11e8-a44c-2c768add56de', 'Manuel Sanabria Solis', '402580324', '9856-9811', '10002125469558744');

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

--
-- Volcado de datos para la tabla `finca`
--

INSERT INTO `finca` (`id`, `nombre`, `ubicacion`, `telefono`) VALUES
('02954c23-0b04-11e8-a44c-2c768add56de', 'Arcoiris', 'Guanacaste', '8499-8547'),
('0295921e-0b04-11e8-a44c-2c768add56de', 'La Irma', 'Abangares', '2998-8745');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formulariopago`
--

CREATE TABLE `formulariopago` (
  `id` char(36) NOT NULL,
  `comprovante` int(11) NOT NULL,
  `idchofer` char(36) NOT NULL,
  `idcalculokm` char(36) NOT NULL,
  `fecha` datetime NOT NULL,
  `contenedor` varchar(30) NOT NULL,
  `placa` varchar(30) NOT NULL,
  `kms` int(11) NOT NULL,
  `valorviaje` decimal(10,2) NOT NULL,
  `valorkm` decimal(10,2) NOT NULL,
  `porcentajeingreso` decimal(10,2) NOT NULL,
  `totalpago` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `formulariopago`
--

INSERT INTO `formulariopago` (`id`, `comprovante`, `idchofer`, `idcalculokm`, `fecha`, `contenedor`, `placa`, `kms`, `valorviaje`, `valorkm`, `porcentajeingreso`, `totalpago`) VALUES
('095edc51-0bd8-11e8-aade-2c768add56de', 2, 'a00cea1d-0b9a-11e8-a44c-2c768add56de', '163b7703-0b88-11e8-a44c-2c768add56de', '2018-02-07 00:30:00', '121355', '45877kk', 444, '1140.00', '1.00', '15.00', '1140.00'),
('95dfb451-0dd9-11e8-a6d1-2c768add56de', 4, 'a00cea1d-0b9a-11e8-a44c-2c768add56de', '163b7703-0b88-11e8-a44c-2c768add56de', '2018-02-09 14:38:00', 'ddd', '4566', 444, '1140.00', '1.00', '15.00', '1140.00'),
('a312cfeb-0bbe-11e8-a44c-2c768add56de', 1, 'a00cea1d-0b9a-11e8-a44c-2c768add56de', '163b7703-0b88-11e8-a44c-2c768add56de', '2018-02-06 22:24:00', '2415FRDE-25', '887741-FR', 444, '500.00', '1.90', '15.00', '350.00'),
('dabdd371-0d2f-11e8-833c-2c768add56de', 3, 'a00cea1d-0b9a-11e8-a44c-2c768add56de', '163b7703-0b88-11e8-a44c-2c768add56de', '2018-02-08 18:25:00', 'rrrr', '88888', 444, '1140.00', '1.00', '15.00', '1140.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formxgastos`
--

CREATE TABLE `formxgastos` (
  `idformulario` char(36) NOT NULL,
  `idgastos` char(36) NOT NULL,
  `monto` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formxingresos`
--

CREATE TABLE `formxingresos` (
  `idformulario` char(36) NOT NULL,
  `idingresos` char(36) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `porcentaje` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gasto`
--

CREATE TABLE `gasto` (
  `id` char(36) NOT NULL,
  `nombre` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `gasto`
--

INSERT INTO `gasto` (`id`, `nombre`) VALUES
('f43d85fd-0bbc-11e8-a44c-2c768add56de', 'Viáticos'),
('f43dc07d-0bbc-11e8-a44c-2c768add56de', 'Seguro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingreso`
--

CREATE TABLE `ingreso` (
  `id` char(36) NOT NULL,
  `nombre` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ingreso`
--

INSERT INTO `ingreso` (`id`, `nombre`) VALUES
('2a00732b-0bbd-11e8-a44c-2c768add56de', 'Cureña'),
('2a00a5d1-0bbd-11e8-a44c-2c768add56de', 'Gasolina');

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
('27fe06b7-0b08-11e8-a44c-2c768add56de', 'Japa Loid', 'Caldera', '8997-5477'),
('9710a55b-0b08-11e8-a44c-2c768add56de', 'Alammo', 'Los Patios', '8499-8874');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parametros`
--

CREATE TABLE `parametros` (
  `valorkm` decimal(10,2) NOT NULL,
  `porcentajecalculoingreso` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `parametros`
--

INSERT INTO `parametros` (`valorkm`, `porcentajecalculoingreso`) VALUES
('1.00', '15.00');

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
  ADD CONSTRAINT `calculokm_ibfk_1` FOREIGN KEY (`idfinca`) REFERENCES `finca` (`id`),
  ADD CONSTRAINT `calculokm_ibfk_2` FOREIGN KEY (`idnaviera`) REFERENCES `naviera` (`id`);

--
-- Filtros para la tabla `formulariopago`
--
ALTER TABLE `formulariopago`
  ADD CONSTRAINT `formulariopago_ibfk_2` FOREIGN KEY (`idcalculokm`) REFERENCES `calculokm` (`id`),
  ADD CONSTRAINT `formulariopago_ibfk_3` FOREIGN KEY (`idchofer`) REFERENCES `chofer` (`id`);

--
-- Filtros para la tabla `formxgastos`
--
ALTER TABLE `formxgastos`
  ADD CONSTRAINT `formxgastos_ibfk_1` FOREIGN KEY (`idformulario`) REFERENCES `formulariopago` (`id`),
  ADD CONSTRAINT `formxgastos_ibfk_2` FOREIGN KEY (`idgastos`) REFERENCES `gasto` (`id`);

--
-- Filtros para la tabla `formxingresos`
--
ALTER TABLE `formxingresos`
  ADD CONSTRAINT `formxingresos_ibfk_1` FOREIGN KEY (`idingresos`) REFERENCES `ingreso` (`id`),
  ADD CONSTRAINT `formxingresos_ibfk_2` FOREIGN KEY (`idformulario`) REFERENCES `formulariopago` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
