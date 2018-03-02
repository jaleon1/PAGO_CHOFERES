-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-03-2018 a las 05:55:42
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

--
-- Volcado de datos para la tabla `calculokm`
--

INSERT INTO `calculokm` (`id`, `idfinca`, `idnaviera`, `kmstotal`) VALUES
('1840d23e-13fa-11e8-a54c-2c768add56de', '02954c23-0b04-11e8-a44c-2c768add56de', '27fe06b7-0b08-11e8-a44c-2c768add56de', 500),
('225ee673-14b8-11e8-a154-2c768add56de', '02954c23-0b04-11e8-a44c-2c768add56de', '27fe06b7-0b08-11e8-a44c-2c768add56de', 250),
('b6df24e2-1331-11e8-aff2-2c768add56de', '0295921e-0b04-11e8-a44c-2c768add56de', '27fe06b7-0b08-11e8-a44c-2c768add56de', 600),
('f48fee42-13f9-11e8-a54c-2c768add56de', '02954c23-0b04-11e8-a44c-2c768add56de', '9710a55b-0b08-11e8-a44c-2c768add56de', 700);

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
  `correo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `chofer`
--

INSERT INTO `chofer` (`id`, `nombre`, `cedula`, `telefono`, `cuenta`, `correo`) VALUES
('8e8c3599-14b2-11e8-a154-2c768add56de', 'Joel Peña Figueroa', '304190458', '88772145', '1254873611000001', ''),
('a00cea1d-0b9a-11e8-a44c-2c768add56de', 'Jairo León González', '304190452', '8991-5749', '26591587451236587', ''),
('a00d4a86-0b9a-11e8-a44c-2c768add56de', 'Jason Rojas Valverde', '102560487', '8795-1454', '10002589632511247', ''),
('b179ce52-1462-11e8-930b-2c768add56de', 'Samantha Salas Jimenez', '404890412', '88665748', '251987541000025104', ''),
('bad1d334-14b6-11e8-a154-2c768add56de', 'Juan Perez salas', '102540458', '99888954', '123456789145870001', ''),
('ea03ba0d-0b9a-11e8-a44c-2c768add56de', 'Manuel Sanabria Solis', '402580324', '9856-9811', '10002125469558744', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contenedor`
--

CREATE TABLE `contenedor` (
  `id` char(36) NOT NULL,
  `contenedor` varchar(30) NOT NULL,
  `idformulario` varchar(36) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `contenedor`
--

INSERT INTO `contenedor` (`id`, `contenedor`, `idformulario`, `estado`) VALUES
('073fc516-1db6-11e8-8410-2c768add56de', '55555A', 'a3ba05a5-1dae-11e8-a979-2c768add56de', 0),
('1c4df994-1daa-11e8-a979-2c768add56de', '55', '1c3ab742-1daa-11e8-a979-2c768add56de', 0),
('22bcfed7-1daa-11e8-a979-2c768add56de', '55555', '22b312d4-1daa-11e8-a979-2c768add56de', 0),
('25a9f8ab-1dae-11e8-a979-2c768add56de', 'ooooo', '25a4e292-1dae-11e8-a979-2c768add56de', 0),
('37c7f3df-18fb-11e8-9b1a-2c768add56de', 'oooo', '37bafc7e-18fb-11e8-9b1a-2c768add56de', 0),
('3df0baf3-1daf-11e8-a979-2c768add56de', '558UY', '3afc015e-1daf-11e8-a979-2c768add56de', 0),
('414418b5-1dad-11e8-a979-2c768add56de', '55555A', '41398ca5-1dad-11e8-a979-2c768add56de', 0),
('458caecd-1c25-11e8-8c0d-2c768add56de', '789', '098e9a40-1b93-11e8-9500-2c768add56de', 0),
('4bb73d46-19e3-11e8-bf7d-2c768add56de', 'Bueno', '29882b3a-192a-11e8-a4a5-2c768add56de', 0),
('4de5d78c-1ad2-11e8-b0a0-2c768add56de', '789', '4acf8c5a-1ad2-11e8-b0a0-2c768add56de', 0),
('5928fa00-1786-11e8-a8ac-2c768add56de', 'ABC-123', 'a3ddd864-1785-11e8-a8ac-2c768add56de', 0),
('6314c2dd-1db4-11e8-8410-2c768add56de', '8574iuyt', '61d61e42-1db4-11e8-8410-2c768add56de', 0),
('6ae20966-1b91-11e8-9500-2c768add56de', '', '6ada8921-1b91-11e8-9500-2c768add56de', 0),
('81f53ea2-1bba-11e8-9500-2c768add56de', '4444', '81eaa925-1bba-11e8-9500-2c768add56de', 0),
('85ee546a-17f1-11e8-a531-2c768add56de', '123', '85e89386-17f1-11e8-a531-2c768add56de', 0),
('86bcfd97-17f0-11e8-a531-2c768add56de', '123', '86b2e2a0-17f0-11e8-a531-2c768add56de', 0),
('8ceddfbb-1c24-11e8-8c0d-2c768add56de', 'ui789', '6e5252d1-1b95-11e8-9500-2c768add56de', 0),
('8ec73049-1b90-11e8-9500-2c768add56de', '999999', '84535af0-1aea-11e8-b0a0-2c768add56de', 0),
('a2c5b83b-1905-11e8-9b1a-2c768add56de', 'contenedor XXXX', 'a2bb2063-1905-11e8-9b1a-2c768add56de', 0),
('a34cc0b0-1dae-11e8-a979-2c768add56de', '55555A', 'a341340b-1dae-11e8-a979-2c768add56de', 0),
('a37a302e-1dae-11e8-a979-2c768add56de', '55555A', 'a375b10f-1dae-11e8-a979-2c768add56de', 0),
('a397cf2f-1dae-11e8-a979-2c768add56de', '55555A', 'a391c2e2-1dae-11e8-a979-2c768add56de', 0),
('a3abd3d7-1dae-11e8-a979-2c768add56de', '55555A', 'a3a7900a-1dae-11e8-a979-2c768add56de', 0),
('a6d56401-1b95-11e8-9500-2c768add56de', 'JJI111', '9e60bc34-1b95-11e8-9500-2c768add56de', 0),
('ab55e432-18fe-11e8-9b1a-2c768add56de', 'contenedor XXXX', 'ab49ea22-18fe-11e8-9b1a-2c768add56de', 0),
('b2d41c68-17f0-11e8-a531-2c768add56de', '123', 'b2cd7fda-17f0-11e8-a531-2c768add56de', 0),
('b2f01f4d-17f0-11e8-a531-2c768add56de', '123', 'b2ecebe8-17f0-11e8-a531-2c768add56de', 0),
('b79bbd81-1dad-11e8-a979-2c768add56de', '55555A', 'b7916d6e-1dad-11e8-a979-2c768add56de', 0),
('ba641255-17ef-11e8-af5d-2c768add56de', '123', 'ab882cdc-17ef-11e8-af5d-2c768add56de', 0),
('c431ba1b-1db0-11e8-a979-2c768add56de', '1237XXXX', 'c2b06b23-1db0-11e8-a979-2c768add56de', 0),
('c58e6ff3-1db2-11e8-a979-2c768add56de', '88777iiikj', 'c58723b1-1db2-11e8-a979-2c768add56de', 0),
('cbe8570a-1db1-11e8-a979-2c768add56de', '1121245', 'cb21219f-1db1-11e8-a979-2c768add56de', 0),
('d6ce1352-1db4-11e8-8410-2c768add56de', '8444mkjj', 'd60124cb-1db4-11e8-8410-2c768add56de', 0),
('e3f9e5c5-19e3-11e8-bf7d-2c768add56de', 'uuuuuu', '69b7113d-1907-11e8-9b1a-2c768add56de', 0),
('e636c88e-1c27-11e8-8c0d-2c768add56de', '789', 'b7f68fc4-1b92-11e8-9500-2c768add56de', 0),
('ec24b7d2-1dad-11e8-a979-2c768add56de', 'YYYYY27', 'ec194bb6-1dad-11e8-a979-2c768add56de', 0),
('f587d6e6-17f0-11e8-a531-2c768add56de', '123', 'f1fd552b-17f0-11e8-a531-2c768add56de', 0),
('f9a2e407-1905-11e8-9b1a-2c768add56de', 'contenedor XXXX', 'f999c5b6-1905-11e8-9b1a-2c768add56de', 0);

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
('0295921e-0b04-11e8-a44c-2c768add56de', 'La Irma', 'Abangares', '2998-8745'),
('3b85fbe5-13fa-11e8-a54c-2c768add56de', 'Prueba', 'San carlos', '2553-5046'),
('6e45ca6c-14b2-11e8-a154-2c768add56de', 'FInca2', 'Cartago', '25534064');

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

--
-- Volcado de datos para la tabla `formgastos`
--

INSERT INTO `formgastos` (`id`, `idformulario`, `nombre`, `monto`) VALUES
('06a177cc-176f-11e8-a8ac-2c768add56de', '0679f50b-176f-11e8-a8ac-2c768add56de', 'Viaticos', '40.00'),
('06a7cc03-176f-11e8-a8ac-2c768add56de', '0679f50b-176f-11e8-a8ac-2c768add56de', 'Y', '50.00'),
('074e87ea-1db6-11e8-8410-2c768add56de', 'a3ba05a5-1dae-11e8-a979-2c768add56de', 'SAM', '25.00'),
('1c5e9d42-1daa-11e8-a979-2c768add56de', '1c3ab742-1daa-11e8-a979-2c768add56de', 'SAM', '25.00'),
('1c7c4f20-16e3-11e8-896a-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'Alimentación', '35.00'),
('22c2ddcf-1daa-11e8-a979-2c768add56de', '22b312d4-1daa-11e8-a979-2c768add56de', 'SAM', '25.00'),
('25b03809-1dae-11e8-a979-2c768add56de', '25a4e292-1dae-11e8-a979-2c768add56de', '', '0.00'),
('2fd90e8a-17ee-11e8-af5d-2c768add56de', '2fb30d0b-17ee-11e8-af5d-2c768add56de', 'Y', '15.00'),
('37e12500-18fb-11e8-9b1a-2c768add56de', '37bafc7e-18fb-11e8-9b1a-2c768add56de', 'Viaticos', '40.00'),
('37e8e7e5-18fb-11e8-9b1a-2c768add56de', '37bafc7e-18fb-11e8-9b1a-2c768add56de', 'YYY', '100.00'),
('3b52f7fd-17f1-11e8-a531-2c768add56de', 'f1fd552b-17f0-11e8-a531-2c768add56de', 'Gasto', '15.50'),
('4148b202-1dad-11e8-a979-2c768add56de', '41398ca5-1dad-11e8-a979-2c768add56de', 'SAM', '25.00'),
('417de9b7-1daf-11e8-a979-2c768add56de', '3afc015e-1daf-11e8-a979-2c768add56de', 'Viaticos', '40.00'),
('45ab910a-1c25-11e8-8c0d-2c768add56de', '098e9a40-1b93-11e8-9500-2c768add56de', 'Viaticos', '40.00'),
('4bd0e856-19e3-11e8-bf7d-2c768add56de', '29882b3a-192a-11e8-a4a5-2c768add56de', 'Viaticos', '40.00'),
('4df0db7b-1ad2-11e8-b0a0-2c768add56de', '4acf8c5a-1ad2-11e8-b0a0-2c768add56de', 'Viaticos', '40.00'),
('68983803-1db4-11e8-8410-2c768add56de', '61d61e42-1db4-11e8-8410-2c768add56de', 'Viaticos', '40.00'),
('6b068767-1b91-11e8-9500-2c768add56de', '6ada8921-1b91-11e8-9500-2c768add56de', 'Viaticos', '40.00'),
('6b091d10-1b91-11e8-9500-2c768add56de', '6ada8921-1b91-11e8-9500-2c768add56de', 'RRR', '20.00'),
('6f327bd3-175c-11e8-a8ac-2c768add56de', '47779677-175c-11e8-a8ac-2c768add56de', 'Y', '20.00'),
('7d4f0046-16e2-11e8-896a-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'Alimentación', '35.00'),
('7fd44e3e-16e2-11e8-896a-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'Alimentación', '35.00'),
('8201df48-1bba-11e8-9500-2c768add56de', '81eaa925-1bba-11e8-9500-2c768add56de', 'Viaticos', '40.00'),
('85fafaac-17f1-11e8-a531-2c768add56de', '85e89386-17f1-11e8-a531-2c768add56de', 'Gasto', '14.66'),
('86c6f740-17f0-11e8-a531-2c768add56de', '86b2e2a0-17f0-11e8-a531-2c768add56de', 'Y', '15.00'),
('8cff68e1-1c24-11e8-8c0d-2c768add56de', '6e5252d1-1b95-11e8-9500-2c768add56de', 'Viaticos', '40.00'),
('8ed2a02b-1b90-11e8-9500-2c768add56de', '84535af0-1aea-11e8-b0a0-2c768add56de', 'Viaticos', '40.00'),
('8ed5192f-1b90-11e8-9500-2c768add56de', '84535af0-1aea-11e8-b0a0-2c768add56de', 'Viaticos', '40.00'),
('9d537657-16e3-11e8-896a-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'Alimentación', '35.00'),
('a26b8779-16d9-11e8-a908-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'y', '25.00'),
('a36383f1-1dae-11e8-a979-2c768add56de', 'a341340b-1dae-11e8-a979-2c768add56de', 'SAM', '25.00'),
('a38d224e-1dae-11e8-a979-2c768add56de', 'a375b10f-1dae-11e8-a979-2c768add56de', 'SAM', '25.00'),
('a39da9dd-1dae-11e8-a979-2c768add56de', 'a391c2e2-1dae-11e8-a979-2c768add56de', 'SAM', '25.00'),
('a3b34753-1dae-11e8-a979-2c768add56de', 'a3a7900a-1dae-11e8-a979-2c768add56de', 'SAM', '25.00'),
('ab781266-18fe-11e8-9b1a-2c768add56de', 'ab49ea22-18fe-11e8-9b1a-2c768add56de', 'Viaticos', '40.00'),
('ab7a8628-18fe-11e8-9b1a-2c768add56de', 'ab49ea22-18fe-11e8-9b1a-2c768add56de', 'RRR', '20.00'),
('ad5adde5-16d9-11e8-a908-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'y', '25.00'),
('ae17ca1f-16e2-11e8-896a-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'Alimentación', '35.00'),
('aea5eb44-164b-11e8-9229-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'Y', '50.00'),
('afb2742b-1b95-11e8-9500-2c768add56de', '9e60bc34-1b95-11e8-9500-2c768add56de', 'Viaticos', '40.00'),
('b2e72c4f-17f0-11e8-a531-2c768add56de', 'b2cd7fda-17f0-11e8-a531-2c768add56de', 'Gasto', '15.50'),
('b2fa1fcf-17f0-11e8-a531-2c768add56de', 'b2ecebe8-17f0-11e8-a531-2c768add56de', 'Gasto', '15.50'),
('b7b4a17d-1dad-11e8-a979-2c768add56de', 'b7916d6e-1dad-11e8-a979-2c768add56de', 'SAM', '25.00'),
('b7d67bca-1784-11e8-a8ac-2c768add56de', 'b7b63b6e-1784-11e8-a8ac-2c768add56de', 'Viaticos', '40.00'),
('b7daa101-1784-11e8-a8ac-2c768add56de', 'b7b63b6e-1784-11e8-a8ac-2c768add56de', 'Y', '50.00'),
('c00cbd9c-17ef-11e8-af5d-2c768add56de', 'ab882cdc-17ef-11e8-af5d-2c768add56de', 'Y', '15.00'),
('c596a387-1db2-11e8-a979-2c768add56de', 'c58723b1-1db2-11e8-a979-2c768add56de', 'Viaticos', '40.00'),
('c75652ef-1db0-11e8-a979-2c768add56de', 'c2b06b23-1db0-11e8-a979-2c768add56de', 'uu', '55.00'),
('ccd4ba06-164c-11e8-9229-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'Y', '50.00'),
('cedb95d3-1db1-11e8-a979-2c768add56de', 'cb21219f-1db1-11e8-a979-2c768add56de', '', '0.00'),
('d068020e-16d9-11e8-a908-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'y', '25.00'),
('d9538a01-1db4-11e8-8410-2c768add56de', 'd60124cb-1db4-11e8-8410-2c768add56de', 'Viaticos', '40.00'),
('e3e875a5-15f6-11e8-91f4-2c768add56de', '32613995-15f5-11e8-91f4-2c768add56de', 'Alimentación', '35.00'),
('e40a4152-19e3-11e8-bf7d-2c768add56de', '69b7113d-1907-11e8-9b1a-2c768add56de', 'Viaticos', '40.00'),
('e40cb663-19e3-11e8-bf7d-2c768add56de', '69b7113d-1907-11e8-9b1a-2c768add56de', 'RUSSS', '25.00'),
('e43a7663-164a-11e8-9229-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'Alimentación', '35.00'),
('e44eeafb-164a-11e8-9229-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'Y', '35.00'),
('e650337f-1c27-11e8-8c0d-2c768add56de', 'b7f68fc4-1b92-11e8-9500-2c768add56de', 'y', '50.00'),
('ec3b120d-1dad-11e8-a979-2c768add56de', 'ec194bb6-1dad-11e8-a979-2c768add56de', '', '0.00'),
('f9b5c83c-1905-11e8-9b1a-2c768add56de', 'f999c5b6-1905-11e8-9b1a-2c768add56de', 'Viaticos', '40.00'),
('f9b8671d-1905-11e8-9b1a-2c768add56de', 'f999c5b6-1905-11e8-9b1a-2c768add56de', 'RRR', '20.00');

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

--
-- Volcado de datos para la tabla `formingresos`
--

INSERT INTO `formingresos` (`id`, `idformulario`, `nombre`, `monto`, `porcentaje`) VALUES
('0685a18d-176f-11e8-a8ac-2c768add56de', '0679f50b-176f-11e8-a8ac-2c768add56de', 'Cureña', '199.50', '0.15'),
('0694b1f4-176f-11e8-a8ac-2c768add56de', '0679f50b-176f-11e8-a8ac-2c768add56de', 'X', '100.00', '0.15'),
('074ad1f2-1db6-11e8-8410-2c768add56de', 'a3ba05a5-1dae-11e8-a979-2c768add56de', 'SAM', '15.00', '0.15'),
('1c56c750-1daa-11e8-a979-2c768add56de', '1c3ab742-1daa-11e8-a979-2c768add56de', 'SAM', '15.00', '0.15'),
('1c6df044-16e3-11e8-896a-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'Cureña', '199.50', '0.15'),
('22c070bf-1daa-11e8-a979-2c768add56de', '22b312d4-1daa-11e8-a979-2c768add56de', 'SAM', '15.00', '0.15'),
('25adb9b4-1dae-11e8-a979-2c768add56de', '25a4e292-1dae-11e8-a979-2c768add56de', 'SAM3', '44.00', '0.15'),
('2a597bd5-17f1-11e8-a531-2c768add56de', 'f1fd552b-17f0-11e8-a531-2c768add56de', 'Igreso', '77.50', '0.15'),
('2fcb64a0-17ee-11e8-af5d-2c768add56de', '2fb30d0b-17ee-11e8-af5d-2c768add56de', 'X', '25.00', '0.15'),
('37d0dae9-18fb-11e8-9b1a-2c768add56de', '37bafc7e-18fb-11e8-9b1a-2c768add56de', 'Igreso', '15.77', '0.15'),
('37d6fdef-18fb-11e8-9b1a-2c768add56de', '37bafc7e-18fb-11e8-9b1a-2c768add56de', 'Ingreso2', '20.00', '0.15'),
('37deaf65-18fb-11e8-9b1a-2c768add56de', '37bafc7e-18fb-11e8-9b1a-2c768add56de', 'Cureña', '199.50', '0.15'),
('406e141f-1daf-11e8-a979-2c768add56de', '3afc015e-1daf-11e8-a979-2c768add56de', 'Cureña', '199.50', '0.15'),
('414665b3-1dad-11e8-a979-2c768add56de', '41398ca5-1dad-11e8-a979-2c768add56de', 'SAM', '15.00', '0.15'),
('459d8f91-1c25-11e8-8c0d-2c768add56de', '098e9a40-1b93-11e8-9500-2c768add56de', 'Cureña', '199.50', '0.15'),
('4bc7d2d2-19e3-11e8-bf7d-2c768add56de', '29882b3a-192a-11e8-a4a5-2c768add56de', 'Cureña', '71.25', '0.15'),
('4bca50ae-19e3-11e8-bf7d-2c768add56de', '29882b3a-192a-11e8-a4a5-2c768add56de', 'XXX', '25.00', '0.15'),
('4dee68fc-1ad2-11e8-b0a0-2c768add56de', '4acf8c5a-1ad2-11e8-b0a0-2c768add56de', 'Cureña', '71.25', '0.15'),
('54374c19-164b-11e8-9229-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'Cureña', '199.50', '0.15'),
('549da97d-164b-11e8-9229-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'X', '15.00', '0.15'),
('668e475e-1db4-11e8-8410-2c768add56de', '61d61e42-1db4-11e8-8410-2c768add56de', 'Cureña', '142.50', '0.15'),
('6af7a935-1b91-11e8-9500-2c768add56de', '6ada8921-1b91-11e8-9500-2c768add56de', 'Cureña', '199.50', '0.15'),
('6b0404d3-1b91-11e8-9500-2c768add56de', '6ada8921-1b91-11e8-9500-2c768add56de', 'VVV', '15.00', '0.15'),
('6df06fb7-175c-11e8-a8ac-2c768add56de', '47779677-175c-11e8-a8ac-2c768add56de', 'X', '15.00', '0.15'),
('7d43161d-16e2-11e8-896a-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'Cureña', '199.50', '0.15'),
('7fc50e98-16e2-11e8-896a-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'Cureña', '199.50', '0.15'),
('81fb9fb5-1bba-11e8-9500-2c768add56de', '81eaa925-1bba-11e8-9500-2c768add56de', 'R', '55.00', '0.15'),
('85f383ef-17f1-11e8-a531-2c768add56de', '85e89386-17f1-11e8-a531-2c768add56de', 'Igreso', '15.77', '0.15'),
('86c35369-17f0-11e8-a531-2c768add56de', '86b2e2a0-17f0-11e8-a531-2c768add56de', 'X', '25.00', '0.15'),
('8cfcc596-1c24-11e8-8c0d-2c768add56de', '6e5252d1-1b95-11e8-9500-2c768add56de', 'Cureña', '199.50', '0.15'),
('8ecdbcb3-1b90-11e8-9500-2c768add56de', '84535af0-1aea-11e8-b0a0-2c768add56de', 'Cureña', '71.25', '0.15'),
('8ed0051e-1b90-11e8-9500-2c768add56de', '84535af0-1aea-11e8-b0a0-2c768add56de', 'Cureña', '71.25', '0.15'),
('9d462d94-16e3-11e8-896a-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'Cureña', '199.50', '0.15'),
('a25cac77-16d9-11e8-a908-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'x', '15.00', '0.15'),
('a35cede0-1dae-11e8-a979-2c768add56de', 'a341340b-1dae-11e8-a979-2c768add56de', 'SAM', '15.00', '0.15'),
('a37dea9f-1dae-11e8-a979-2c768add56de', 'a375b10f-1dae-11e8-a979-2c768add56de', 'SAM', '15.00', '0.15'),
('a39b2670-1dae-11e8-a979-2c768add56de', 'a391c2e2-1dae-11e8-a979-2c768add56de', 'SAM', '15.00', '0.15'),
('a3af8a4d-1dae-11e8-a979-2c768add56de', 'a3a7900a-1dae-11e8-a979-2c768add56de', 'SAM', '15.00', '0.15'),
('ab6a4b65-18fe-11e8-9b1a-2c768add56de', 'ab49ea22-18fe-11e8-9b1a-2c768add56de', 'Cureña', '199.50', '0.15'),
('ab7576c1-18fe-11e8-9b1a-2c768add56de', 'ab49ea22-18fe-11e8-9b1a-2c768add56de', 'VVV', '15.00', '0.15'),
('ac555477-1b95-11e8-9500-2c768add56de', '9e60bc34-1b95-11e8-9500-2c768add56de', 'Cureña', '199.50', '0.15'),
('ad527e92-16d9-11e8-a908-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'x', '15.00', '0.15'),
('ae0ea38c-16e2-11e8-896a-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'Cureña', '199.50', '0.15'),
('ae93be4e-164b-11e8-9229-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'Cureña', '199.50', '0.15'),
('ae9f1626-164b-11e8-9229-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'X', '100.00', '0.15'),
('b2d91b10-17f0-11e8-a531-2c768add56de', 'b2cd7fda-17f0-11e8-a531-2c768add56de', 'X', '77.50', '0.15'),
('b2f664f3-17f0-11e8-a531-2c768add56de', 'b2ecebe8-17f0-11e8-a531-2c768add56de', 'X', '77.50', '0.15'),
('b7a4b005-1dad-11e8-a979-2c768add56de', 'b7916d6e-1dad-11e8-a979-2c768add56de', 'SAM', '15.00', '0.15'),
('b7c55f41-1784-11e8-a8ac-2c768add56de', 'b7b63b6e-1784-11e8-a8ac-2c768add56de', 'Cureña', '199.50', '0.15'),
('b7d2fcab-1784-11e8-a8ac-2c768add56de', 'b7b63b6e-1784-11e8-a8ac-2c768add56de', 'X', '100.00', '0.15'),
('bedc6a8e-17ef-11e8-af5d-2c768add56de', 'ab882cdc-17ef-11e8-af5d-2c768add56de', 'X', '25.00', '0.15'),
('c590809c-1db2-11e8-a979-2c768add56de', 'c58723b1-1db2-11e8-a979-2c768add56de', 'Cureña', '199.50', '0.15'),
('c5f5675f-1db0-11e8-a979-2c768add56de', 'c2b06b23-1db0-11e8-a979-2c768add56de', 'ING', '55.00', '0.15'),
('ca5d2efe-164c-11e8-9229-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'Cureña', '199.50', '0.15'),
('cb41e43e-164c-11e8-9229-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'X', '100.00', '0.15'),
('cdba5b0d-1db1-11e8-a979-2c768add56de', 'cb21219f-1db1-11e8-a979-2c768add56de', 'HOI', '154.00', '0.15'),
('cf7555aa-16d9-11e8-a908-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'x', '15.00', '0.15'),
('d87d0d6d-1db4-11e8-8410-2c768add56de', 'd60124cb-1db4-11e8-8410-2c768add56de', 'Cureña', '71.25', '0.15'),
('e3522b16-15f6-11e8-91f4-2c768add56de', '32613995-15f5-11e8-91f4-2c768add56de', 'Y', '15.00', '0.15'),
('e4067768-19e3-11e8-bf7d-2c768add56de', '69b7113d-1907-11e8-9b1a-2c768add56de', 'Cureña', '199.50', '0.15'),
('e42a4779-164a-11e8-9229-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'Cureña', '199.50', '0.15'),
('e43413a3-164a-11e8-9229-2c768add56de', '3b63598d-1648-11e8-9229-2c768add56de', 'X', '15.00', '0.15'),
('e64c744d-1c27-11e8-8c0d-2c768add56de', 'b7f68fc4-1b92-11e8-9500-2c768add56de', 'x', '100.00', '0.15'),
('ec38aa78-1dad-11e8-a979-2c768add56de', 'ec194bb6-1dad-11e8-a979-2c768add56de', 'SAM2', '55.00', '0.15'),
('ecb9010b-18f6-11e8-9b1a-2c768add56de', '85e89386-17f1-11e8-a531-2c768add56de', 'Ingreso2', '20.00', '0.12'),
('f9a56873-1905-11e8-9b1a-2c768add56de', 'f999c5b6-1905-11e8-9b1a-2c768add56de', 'Cureña', '199.50', '0.15'),
('f9abc699-1905-11e8-9b1a-2c768add56de', 'f999c5b6-1905-11e8-9b1a-2c768add56de', 'VVV', '15.00', '0.15');

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
  `fechacarga` datetime NOT NULL,
  `contenedor` varchar(30) NOT NULL,
  `placa` varchar(30) NOT NULL,
  `booking` varchar(30) DEFAULT NULL,
  `marchamo` varchar(30) DEFAULT NULL,
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

INSERT INTO `formulariopago` (`id`, `comprobante`, `idchofer`, `idcalculokm`, `fecha`, `fechacarga`, `contenedor`, `placa`, `booking`, `marchamo`, `kms`, `valorviaje`, `valorkm`, `porcentajeingreso`, `totalpago`, `estado`) VALUES
('0679f50b-176f-11e8-a8ac-2c768add56de', 105, 'bad1d334-14b6-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-21 19:23:00', '2018-02-26 00:00:00', '123', '456', NULL, NULL, 700, '1330.00', '1.90', '15.00', '1121.00', 0),
('098e9a40-1b93-11e8-9500-2c768add56de', 133, 'a00d4a86-0b9a-11e8-a44c-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-27 01:49:00', '2018-02-28 19:18:00', '789', '111', '111', NULL, 700, '1330.00', '1.00', '15.00', '1171.00', 1),
('1c3ab742-1daa-11e8-a979-2c768add56de', 137, 'b179ce52-1462-11e8-930b-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-03-01 17:41:49', '2018-02-27 17:40:00', '55', '555', '555', NULL, 700, '1330.00', '1.90', '15.00', '1340.00', 0),
('22b312d4-1daa-11e8-a979-2c768add56de', 138, 'b179ce52-1462-11e8-930b-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-03-01 17:41:59', '2018-02-27 17:40:00', '55555', '555', '555', NULL, 700, '1330.00', '1.90', '15.00', '1340.00', 0),
('25a4e292-1dae-11e8-a979-2c768add56de', 142, 'b179ce52-1462-11e8-930b-2c768add56de', '1840d23e-13fa-11e8-a54c-2c768add56de', '2018-03-01 18:10:42', '2018-03-01 18:10:00', 'ooooo', '12345', '787878', NULL, 500, '950.00', '1.90', '15.00', '906.00', 1),
('29882b3a-192a-11e8-a4a5-2c768add56de', 128, 'b179ce52-1462-11e8-930b-2c768add56de', '225ee673-14b8-11e8-a154-2c768add56de', '2018-05-29 00:00:00', '2018-02-25 00:00:00', 'Bueno', 'Vencida', NULL, NULL, 250, '475.00', '1.00', '15.00', '419.00', 1),
('2fb30d0b-17ee-11e8-af5d-2c768add56de', 113, '8e8c3599-14b2-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-22 10:29:00', '2018-02-24 00:00:00', '123', '456', NULL, NULL, 700, '1330.00', '1.90', '15.00', '1320.00', 1),
('32613995-15f5-11e8-91f4-2c768add56de', 101, 'bad1d334-14b6-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-19 22:19:09', '2018-03-01 00:00:00', 'abc', '123', NULL, NULL, 700, '1330.00', '1.00', '15.00', '1330.00', 1),
('37bafc7e-18fb-11e8-9b1a-2c768add56de', 123, 'a00cea1d-0b9a-11e8-a44c-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'oooo', 'yyyyy', NULL, NULL, 700, '1330.00', '1.90', '15.00', '1236.00', 0),
('3afc015e-1daf-11e8-a979-2c768add56de', 148, 'a00cea1d-0b9a-11e8-a44c-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-03-01 18:18:28', '2018-03-01 18:16:00', '558UY', '123', '123', NULL, 700, '1330.00', '1.90', '15.00', '1171.00', 0),
('3b63598d-1648-11e8-9229-2c768add56de', 102, 'a00cea1d-0b9a-11e8-a44c-2c768add56de', 'b6df24e2-1331-11e8-aff2-2c768add56de', '2018-02-20 08:13:32', '0000-00-00 00:00:00', 'asdf', '1234', NULL, NULL, 700, '1330.00', '1.00', '15.00', '1330.00', 0),
('3d0054a8-1649-11e8-9229-2c768add56de', 102, 'a00cea1d-0b9a-11e8-a44c-2c768add56de', 'b6df24e2-1331-11e8-aff2-2c768add56de', '2018-02-20 08:20:44', '0000-00-00 00:00:00', 'asdf', '1234', NULL, NULL, 700, '1330.00', '1.00', '15.00', '1330.00', 0),
('40d3d946-17ee-11e8-af5d-2c768add56de', 114, '8e8c3599-14b2-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-22 10:29:00', '0000-00-00 00:00:00', '123', '456', NULL, NULL, 700, '1330.00', '1.90', '15.00', '1320.00', 0),
('41398ca5-1dad-11e8-a979-2c768add56de', 139, 'b179ce52-1462-11e8-930b-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-03-01 18:04:19', '2018-02-27 17:40:00', '55555A', '555', '555', NULL, 700, '1330.00', '1.90', '15.00', '1340.00', 1),
('43f60bd8-1785-11e8-a8ac-2c768add56de', 109, 'bad1d334-14b6-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-21 19:23:00', '0000-00-00 00:00:00', 'ABC-001', '456', NULL, NULL, 700, '1330.00', '1.90', '15.00', '1121.00', 0),
('47779677-175c-11e8-a8ac-2c768add56de', 104, '8e8c3599-14b2-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-21 14:02:00', '0000-00-00 00:00:00', '123132', 'jhkjhkjk', NULL, NULL, 700, '1330.00', '1.90', '15.00', '1335.00', 0),
('4acf8c5a-1ad2-11e8-b0a0-2c768add56de', 129, 'a00d4a86-0b9a-11e8-a44c-2c768add56de', '225ee673-14b8-11e8-a154-2c768add56de', '2018-02-26 02:51:00', '0000-00-00 00:00:00', '789', '123', '456', NULL, 250, '475.00', '1.90', '15.00', '444.00', 1),
('5e41f807-1784-11e8-a8ac-2c768add56de', 106, 'bad1d334-14b6-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-21 19:23:00', '0000-00-00 00:00:00', 'ABC-000', '456', NULL, NULL, 700, '1330.00', '1.90', '15.00', '1121.00', 0),
('5f6fa345-1788-11e8-a8ac-2c768add56de', 112, 'bad1d334-14b6-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-21 19:23:00', '0000-00-00 00:00:00', 'ABC001', '456', NULL, NULL, 700, '1330.00', '1.90', '15.00', '1121.00', 0),
('61d61e42-1db4-11e8-8410-2c768add56de', 152, 'a00d4a86-0b9a-11e8-a44c-2c768add56de', '1840d23e-13fa-11e8-a54c-2c768add56de', '2018-03-01 18:55:20', '2018-03-01 18:54:00', '8574iuyt', '78787878', '45112', NULL, 500, '950.00', '1.90', '15.00', '848.00', 0),
('68cd1ef8-17ef-11e8-af5d-2c768add56de', 115, '8e8c3599-14b2-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-22 10:29:00', '0000-00-00 00:00:00', '123', '456', NULL, NULL, 700, '1330.00', '1.90', '15.00', '1320.00', 0),
('69b7113d-1907-11e8-9b1a-2c768add56de', 127, 'b179ce52-1462-11e8-930b-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-23 20:05:00', '0000-00-00 00:00:00', 'uuuuuu', '888888', NULL, NULL, 700, '1330.00', '1.00', '15.00', '1196.00', 1),
('6ada8921-1b91-11e8-9500-2c768add56de', 131, 'bad1d334-14b6-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-27 01:39:00', '0000-00-00 00:00:00', '', '', '', NULL, 0, '0.00', '1.90', '15.00', '0.00', 0),
('6e5252d1-1b95-11e8-9500-2c768add56de', 134, 'a00d4a86-0b9a-11e8-a44c-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-27 02:08:45', '2018-02-27 07:00:00', 'ui789', '789', '789', NULL, 700, '1330.00', '1.00', '15.00', '1171.00', 1),
('6f64e3c1-17ef-11e8-af5d-2c768add56de', 116, '8e8c3599-14b2-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-22 10:29:00', '0000-00-00 00:00:00', '123', '456', NULL, NULL, 700, '1330.00', '1.90', '15.00', '1320.00', 0),
('7d619d75-15ef-11e8-9465-2c768add56de', 100, 'bad1d334-14b6-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-19 21:38:18', '0000-00-00 00:00:00', 'abc', '123', NULL, NULL, 700, '1330.00', '1.00', '15.00', '1330.00', 0),
('81eaa925-1bba-11e8-9500-2c768add56de', 136, 'a00cea1d-0b9a-11e8-a44c-2c768add56de', 'b6df24e2-1331-11e8-aff2-2c768add56de', '2018-02-27 06:34:09', '2018-02-27 06:33:00', '4444', '4444', '4444', NULL, 600, '1140.00', '1.90', '15.00', '1125.00', 1),
('84535af0-1aea-11e8-b0a0-2c768add56de', 130, 'a00d4a86-0b9a-11e8-a44c-2c768add56de', '225ee673-14b8-11e8-a154-2c768add56de', '2018-02-26 05:43:00', '0000-00-00 00:00:00', '999999', '12345', '', NULL, 250, '475.00', '1.00', '15.00', '413.00', 1),
('85e89386-17f1-11e8-a531-2c768add56de', 122, '8e8c3599-14b2-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-24 10:35:15', '0000-00-00 00:00:00', '123', '456', NULL, NULL, 700, '1330.00', '1.90', '15.00', '1328.89', 0),
('86b2e2a0-17f0-11e8-a531-2c768add56de', 118, '8e8c3599-14b2-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-22 10:29:00', '0000-00-00 00:00:00', '123', '456', NULL, NULL, 700, '1330.00', '1.90', '15.00', '1320.00', 0),
('9e60bc34-1b95-11e8-9500-2c768add56de', 135, 'a00cea1d-0b9a-11e8-a44c-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-27 02:10:05', '2018-02-27 02:09:00', 'JJI111', '123', '45', NULL, 700, '1330.00', '1.90', '15.00', '1171.00', 1),
('a0a2d6bd-1786-11e8-a8ac-2c768add56de', 111, 'bad1d334-14b6-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-21 19:23:00', '0000-00-00 00:00:00', 'ABC001', '456', NULL, NULL, 700, '1330.00', '1.90', '15.00', '1121.00', 0),
('a2bb2063-1905-11e8-9b1a-2c768add56de', 125, '8e8c3599-14b2-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-23 19:00:00', '0000-00-00 00:00:00', 'contenedor XXXX', 'placa XXX', NULL, NULL, 0, '1330.00', '1.90', '15.00', '1176.00', 0),
('a341340b-1dae-11e8-a979-2c768add56de', 143, 'b179ce52-1462-11e8-930b-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-03-01 18:14:13', '2018-02-27 17:40:00', '55555A', '555', '555', NULL, 700, '1330.00', '1.90', '15.00', '1340.00', 0),
('a375b10f-1dae-11e8-a979-2c768add56de', 144, 'b179ce52-1462-11e8-930b-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-03-01 18:14:13', '2018-02-27 17:40:00', '55555A', '555', '555', NULL, 700, '1330.00', '1.90', '15.00', '1340.00', 0),
('a391c2e2-1dae-11e8-a979-2c768add56de', 145, 'b179ce52-1462-11e8-930b-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-03-01 18:14:14', '2018-02-27 17:40:00', '55555A', '555', '555', NULL, 700, '1330.00', '1.90', '15.00', '1340.00', 0),
('a3a7900a-1dae-11e8-a979-2c768add56de', 146, 'b179ce52-1462-11e8-930b-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-03-01 18:14:14', '2018-02-27 17:40:00', '55555A', '555', '555', NULL, 700, '1330.00', '1.90', '15.00', '1340.00', 0),
('a3ba05a5-1dae-11e8-a979-2c768add56de', 147, 'b179ce52-1462-11e8-930b-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-03-01 18:14:14', '2018-02-27 17:40:00', '55555A', '555', '555', NULL, 700, '1330.00', '1.00', '15.00', '1340.00', 0),
('a3ddd864-1785-11e8-a8ac-2c768add56de', 110, 'bad1d334-14b6-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-21 19:23:00', '0000-00-00 00:00:00', 'ABC-001', '456', NULL, NULL, 700, '1330.00', '1.90', '15.00', '1121.00', 0),
('ab49ea22-18fe-11e8-9b1a-2c768add56de', 124, 'a00cea1d-0b9a-11e8-a44c-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-23 19:00:00', '0000-00-00 00:00:00', 'contenedor XXXX', 'placa XXX', NULL, NULL, 0, '1330.00', '1.90', '15.00', '1176.00', 0),
('ab882cdc-17ef-11e8-af5d-2c768add56de', 117, '8e8c3599-14b2-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-22 10:29:00', '0000-00-00 00:00:00', '123', '456', NULL, NULL, 700, '1330.00', '1.90', '15.00', '1320.00', 0),
('b2cd7fda-17f0-11e8-a531-2c768add56de', 119, '8e8c3599-14b2-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-22 10:29:00', '0000-00-00 00:00:00', '123', '456', NULL, NULL, 700, '1330.00', '1.90', '15.00', '1268.00', 0),
('b2ecebe8-17f0-11e8-a531-2c768add56de', 120, '8e8c3599-14b2-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-22 10:29:00', '0000-00-00 00:00:00', '123', '456', NULL, NULL, 700, '1330.00', '1.90', '15.00', '1268.00', 0),
('b7916d6e-1dad-11e8-a979-2c768add56de', 140, 'b179ce52-1462-11e8-930b-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-03-01 18:07:38', '2018-02-27 17:40:00', '55555A', '555', '555', NULL, 700, '1330.00', '1.90', '15.00', '1340.00', 1),
('b7b63b6e-1784-11e8-a8ac-2c768add56de', 107, 'bad1d334-14b6-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-21 19:23:00', '0000-00-00 00:00:00', 'ABC-001', '456', NULL, NULL, 700, '1330.00', '1.90', '15.00', '1121.00', 0),
('b7f68fc4-1b92-11e8-9500-2c768add56de', 132, 'a00cea1d-0b9a-11e8-a44c-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-27 01:48:00', '2018-02-28 19:37:00', '789', '111', '111', NULL, 700, '1330.00', '1.00', '15.00', '1280.00', 1),
('bf97eb3d-1784-11e8-a8ac-2c768add56de', 108, 'bad1d334-14b6-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-21 19:23:00', '0000-00-00 00:00:00', 'ABC-001', '456', NULL, NULL, 700, '1330.00', '1.90', '15.00', '1121.00', 0),
('c2b06b23-1db0-11e8-a979-2c768add56de', 149, 'a00d4a86-0b9a-11e8-a44c-2c768add56de', '225ee673-14b8-11e8-a154-2c768add56de', '2018-03-01 18:29:25', '2018-03-01 18:26:00', '1237XXXX', '5558', '456455', NULL, 250, '475.00', '1.90', '15.00', '475.00', 0),
('c58723b1-1db2-11e8-a979-2c768add56de', 151, 'a00d4a86-0b9a-11e8-a44c-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-03-01 18:43:49', '2018-03-01 18:42:00', '88777iiikj', '789', '78878', NULL, 700, '1330.00', '1.90', '15.00', '1171.00', 0),
('cb21219f-1db1-11e8-a979-2c768add56de', 150, 'bad1d334-14b6-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-03-01 18:36:48', '2018-03-01 18:36:00', '1121245', '87878', '123', NULL, 700, '1330.00', '1.90', '15.00', '1176.00', 0),
('d60124cb-1db4-11e8-8410-2c768add56de', 153, 'a00d4a86-0b9a-11e8-a44c-2c768add56de', '225ee673-14b8-11e8-a154-2c768add56de', '2018-03-01 18:58:35', '2018-03-01 18:57:00', '8444mkjj', '789789', '789789', NULL, 250, '475.00', '1.90', '15.00', '444.00', 1),
('ec194bb6-1dad-11e8-a979-2c768add56de', 141, 'b179ce52-1462-11e8-930b-2c768add56de', 'b6df24e2-1331-11e8-aff2-2c768add56de', '2018-03-01 18:09:06', '2018-02-28 18:08:00', 'YYYYY27', '87997Y', '78799', NULL, 600, '1140.00', '1.90', '15.00', '1085.00', 1),
('f1fd552b-17f0-11e8-a531-2c768add56de', 121, '8e8c3599-14b2-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-22 10:29:00', '0000-00-00 00:00:00', '123', '456', NULL, NULL, 700, '1330.00', '1.90', '15.00', '1268.00', 0),
('f999c5b6-1905-11e8-9b1a-2c768add56de', 126, 'bad1d334-14b6-11e8-a154-2c768add56de', 'f48fee42-13f9-11e8-a54c-2c768add56de', '2018-02-23 19:00:00', '0000-00-00 00:00:00', 'contenedor XXXX', 'placa XXX', NULL, NULL, 0, '1330.00', '1.90', '15.00', '1176.00', 1);

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
('d0132e81-176b-11e8-a8ac-2c768add56de', 'Viaticos', '40.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingreso`
--

CREATE TABLE `ingreso` (
  `id` char(36) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `porcentaje` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ingreso`
--

INSERT INTO `ingreso` (`id`, `nombre`, `monto`, `porcentaje`) VALUES
('b9b9b77a-176b-11e8-a8ac-2c768add56de', 'Cureña', '0.00', '15.00');

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
('66ec895c-13fc-11e8-a54c-2c768add56de', 'Prueba2', 'Guana', '8525-9981'),
('9710a55b-0b08-11e8-a44c-2c768add56de', 'Alammo', 'Los Patios', '8499-8874'),
('a6e6fb61-14b2-11e8-a154-2c768add56de', 'Fedex', 'Limón', '65988745');

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
('1.90', '15.00');

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
-- Indices de la tabla `contenedor`
--
ALTER TABLE `contenedor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idformulario` (`idformulario`);

--
-- Indices de la tabla `finca`
--
ALTER TABLE `finca`
  ADD PRIMARY KEY (`id`);

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
  ADD KEY `idchofer` (`idchofer`),
  ADD KEY `idcalculokm` (`idcalculokm`);

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
-- Filtros para la tabla `contenedor`
--
ALTER TABLE `contenedor`
  ADD CONSTRAINT `contenedor_ibfk_1` FOREIGN KEY (`idformulario`) REFERENCES `formulariopago` (`id`);

--
-- Filtros para la tabla `formgastos`
--
ALTER TABLE `formgastos`
  ADD CONSTRAINT `formgastos_ibfk_1` FOREIGN KEY (`idformulario`) REFERENCES `formulariopago` (`id`);

--
-- Filtros para la tabla `formingresos`
--
ALTER TABLE `formingresos`
  ADD CONSTRAINT `formingresos_ibfk_1` FOREIGN KEY (`idformulario`) REFERENCES `formulariopago` (`id`);

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
