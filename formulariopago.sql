-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-02-2018 a las 02:28:21
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
-- Estructura de tabla para la tabla `formulariopago`
--

CREATE TABLE `formulariopago` (
  `id` char(36) NOT NULL,
  `comprobante` int(11) NOT NULL,
  `idchofer` char(36) NOT NULL,
  `idcalculokm` char(36) NOT NULL,
  `fecha` datetime NOT NULL,
  `contenedor` varchar(30) NOT NULL,
  `placa` varchar(30) NOT NULL,
  `kms` int(11) NOT NULL,
  `valorviaje` decimal(10,2) NOT NULL,
  `valorkm` decimal(10,2) NOT NULL,
  `porcentajeingreso` decimal(10,2) NOT NULL,
  `totalpago` decimal(10,2) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `formulariopago`
--

INSERT INTO `formulariopago` (`id`, `comprobante`, `idchofer`, `idcalculokm`, `fecha`, `contenedor`, `placa`, `kms`, `valorviaje`, `valorkm`, `porcentajeingreso`, `totalpago`, `estado`) VALUES
('0679f50b-176f-11e8-a8ac-2c768add56de', 105, 'bad1d334-14b6-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-21 19:23:00', '123', '456', 700, '1330.00', '1.90', '15.00', '1121.00', 0),
('32613995-15f5-11e8-91f4-2c768add56de', 101, 'bad1d334-14b6-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-19 22:19:09', 'abc', '123', 700, '1330.00', '1.00', '15.00', '1330.00', 0),
('3b63598d-1648-11e8-9229-2c768add56de', 102, 'a00cea1d-0b9a-11e8-a44c-2c768add56de', 'b6df24e2-1331-11e8-aff2-2c768add56de', '2018-02-20 08:13:32', 'asdf', '1234', 700, '1330.00', '1.00', '15.00', '1330.00', 0),
('3d0054a8-1649-11e8-9229-2c768add56de', 102, 'a00cea1d-0b9a-11e8-a44c-2c768add56de', 'b6df24e2-1331-11e8-aff2-2c768add56de', '2018-02-20 08:20:44', 'asdf', '1234', 700, '1330.00', '1.00', '15.00', '1330.00', 0),
('47779677-175c-11e8-a8ac-2c768add56de', 104, '8e8c3599-14b2-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-21 14:02:00', '123132', 'jhkjhkjk', 700, '1330.00', '1.90', '15.00', '1335.00', 0),
('7d619d75-15ef-11e8-9465-2c768add56de', 100, 'bad1d334-14b6-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-19 21:38:18', 'abc', '123', 700, '1330.00', '1.00', '15.00', '1330.00', 0),
('uuid()', 103, '8e8c3599-14b2-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-21 02:22:00', 'jkhñk', '21565', 500, '1330.00', '1.90', '15.00', '1350.00', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `formulariopago`
--
ALTER TABLE `formulariopago`
  ADD PRIMARY KEY (`id`(32)),
  ADD KEY `id` (`id`),
  ADD KEY `idchofer` (`idchofer`),
  ADD KEY `idcalculokm` (`idcalculokm`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `formulariopago`
--
ALTER TABLE `formulariopago`
  ADD CONSTRAINT `formulariopago_ibfk_3` FOREIGN KEY (`idchofer`) REFERENCES `chofer` (`id`),
  ADD CONSTRAINT `formulariopago_ibfk_4` FOREIGN KEY (`idcalculokm`) REFERENCES `calculokm` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
