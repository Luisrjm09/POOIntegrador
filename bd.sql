-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-05-2021 a las 03:04:31
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ste`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `nombre`) VALUES
(1, 'Reparacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `idCliente` int(11) NOT NULL,
  `primerNombre` varchar(15) NOT NULL,
  `segundoNombre` varchar(15) DEFAULT NULL,
  `apellidoPaterno` varchar(15) NOT NULL,
  `apellidoMaterno` varchar(15) NOT NULL,
  `numero` bigint(20) NOT NULL,
  `recomendadoPor` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`idCliente`, `primerNombre`, `segundoNombre`, `apellidoPaterno`, `apellidoMaterno`, `numero`, `recomendadoPor`) VALUES
(1, 'Jose ', 'Luis', 'Perez ', 'Olguin', 8111932475, 1),
(2, 'Adrian', '', 'Alardin', 'Iracheta', 8121966517, 3),
(3, 'Miguel', 'Angel', 'Cazares', 'Caballero', 8164891501, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE `contacto` (
  `idContacto` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `contacto`
--

INSERT INTO `contacto` (`idContacto`, `nombre`) VALUES
(1, 'Facebook'),
(2, 'Whatsapp'),
(3, 'Recomendacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dinero`
--

CREATE TABLE `dinero` (
  `idEstadoCaja` int(11) NOT NULL,
  `montoInicial` float NOT NULL,
  `montoFinal` float NOT NULL,
  `dia` int(2) NOT NULL,
  `mes` int(2) NOT NULL,
  `yearTime` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `dinero`
--

INSERT INTO `dinero` (`idEstadoCaja`, `montoInicial`, `montoFinal`, `dia`, `mes`, `yearTime`) VALUES
(1, 999.99, 0, 9, 5, 2021);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados`
--

CREATE TABLE `estados` (
  `idEstado` int(11) NOT NULL,
  `nombreEstado` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estados`
--

INSERT INTO `estados` (`idEstado`, `nombreEstado`) VALUES
(1, 'Apagado'),
(2, 'Chip'),
(3, 'Encendido'),
(4, 'Sim');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formaspago`
--

CREATE TABLE `formaspago` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gastos`
--

CREATE TABLE `gastos` (
  `idGasto` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gestion`
--

CREATE TABLE `gestion` (
  `id` int(11) NOT NULL,
  `descripcion` longtext NOT NULL,
  `gasto` int(20) NOT NULL,
  `tipo` int(1) NOT NULL,
  `dia` int(2) NOT NULL,
  `mes` int(2) NOT NULL,
  `yearData` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `codigo` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` longtext NOT NULL,
  `stock` int(20) NOT NULL,
  `categoria` int(10) NOT NULL,
  `precioCompra` float NOT NULL,
  `precioVenta` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`codigo`, `nombre`, `descripcion`, `stock`, `categoria`, `precioCompra`, `precioVenta`) VALUES
(1, '', 'Kit brocas', 5, 1, 49.99, 99.99);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimientos`
--

CREATE TABLE `movimientos` (
  `idMovimiento` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `tipo` tinyint(1) NOT NULL COMMENT '[1-Egreso]■[0-Ingreso]',
  `precio` float NOT NULL,
  `idCorte` int(11) DEFAULT NULL,
  `diaMovimiento` int(2) NOT NULL,
  `mesMovimiento` int(2) NOT NULL,
  `yearMovimiento` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `movimientos`
--

INSERT INTO `movimientos` (`idMovimiento`, `nombre`, `tipo`, `precio`, `idCorte`, `diaMovimiento`, `mesMovimiento`, `yearMovimiento`) VALUES
(1, 'Luz', 1, 399.99, 1, 9, 5, 2021),
(2, 'Internet', 1, 299.99, 1, 9, 5, 2021),
(3, 'Ventana rota', 1, 949.99, 1, 9, 5, 2021),
(4, 'Devolucion celular', 0, 999.99, 1, 9, 5, 2021),
(5, 'Un billete tirado', 0, 100, 0, 9, 5, 2021);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `idServicio` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`idServicio`, `nombre`, `descripcion`) VALUES
(1, 'Pantalla', 'Pantalla'),
(2, 'Bateria', 'Bateria'),
(3, 'Wifi', 'Wifi'),
(4, 'Memoria', 'Memoria'),
(5, 'Camara', 'Camara');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticket`
--

CREATE TABLE `ticket` (
  `idTicket` int(11) NOT NULL,
  `diaRecoleccion` int(2) NOT NULL,
  `mesRecoleccion` int(2) NOT NULL,
  `recolectionYear` int(4) NOT NULL,
  `diaEntrega` int(2) NOT NULL,
  `mesEntrega` int(2) NOT NULL,
  `entregaYear` int(4) NOT NULL,
  `modelo` varchar(30) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `servicio` varchar(50) NOT NULL,
  `cotizacion` float NOT NULL,
  `medioContactoId` int(11) DEFAULT NULL,
  `medioPagoId` int(11) DEFAULT NULL COMMENT '[1-Efectivo]■[0-Tarjeta]',
  `totalPago` float NOT NULL,
  `clienteId` int(11) NOT NULL,
  `estadoReparacion` tinyint(1) NOT NULL COMMENT '[0-Reparado] [1-No Reparado]',
  `estadoEquipo` int(11) NOT NULL,
  `nombreCliente` varchar(50) DEFAULT NULL,
  `numeroCliente` bigint(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ticket`
--

INSERT INTO `ticket` (`idTicket`, `diaRecoleccion`, `mesRecoleccion`, `recolectionYear`, `diaEntrega`, `mesEntrega`, `entregaYear`, `modelo`, `descripcion`, `servicio`, `cotizacion`, `medioContactoId`, `medioPagoId`, `totalPago`, `clienteId`, `estadoReparacion`, `estadoEquipo`, `nombreCliente`, `numeroCliente`) VALUES
(38, 8, 5, 2021, 15, 5, 2021, 'Galaxy', 'Pila inflada', '2', 349.99, 1, 0, 399.99, 2, 1, 1, 'Adrian  Alardin Iracheta', 8121966517),
(39, 8, 5, 2021, 11, 5, 2021, 'S Mini', 'No agarra el sim', '4', 299.99, 1, 1, 399.99, 3, 0, 1, 'Miguel Angel Cazares Caballero', 8164891501);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticketestados`
--

CREATE TABLE `ticketestados` (
  `idTicketsEstado` int(11) NOT NULL,
  `idEstadoTicketNombre` int(11) NOT NULL,
  `ticketCorresponde` int(11) NOT NULL,
  `estado` tinyint(4) NOT NULL COMMENT '[1-Check]■[0-NotCheck]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ticketestados`
--

INSERT INTO `ticketestados` (`idTicketsEstado`, `idEstadoTicketNombre`, `ticketCorresponde`, `estado`) VALUES
(13, 1, 38, 1),
(14, 2, 38, 1),
(15, 3, 38, 0),
(16, 4, 38, 1),
(17, 1, 39, 0),
(18, 2, 39, 1),
(19, 3, 39, 1),
(20, 4, 39, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`idCliente`);

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`idContacto`);

--
-- Indices de la tabla `dinero`
--
ALTER TABLE `dinero`
  ADD PRIMARY KEY (`idEstadoCaja`);

--
-- Indices de la tabla `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`idEstado`);

--
-- Indices de la tabla `formaspago`
--
ALTER TABLE `formaspago`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `gastos`
--
ALTER TABLE `gastos`
  ADD PRIMARY KEY (`idGasto`);

--
-- Indices de la tabla `gestion`
--
ALTER TABLE `gestion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `categoria` (`categoria`);

--
-- Indices de la tabla `movimientos`
--
ALTER TABLE `movimientos`
  ADD PRIMARY KEY (`idMovimiento`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`idServicio`);

--
-- Indices de la tabla `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`idTicket`);

--
-- Indices de la tabla `ticketestados`
--
ALTER TABLE `ticketestados`
  ADD PRIMARY KEY (`idTicketsEstado`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `contacto`
--
ALTER TABLE `contacto`
  MODIFY `idContacto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `dinero`
--
ALTER TABLE `dinero`
  MODIFY `idEstadoCaja` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `estados`
--
ALTER TABLE `estados`
  MODIFY `idEstado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `formaspago`
--
ALTER TABLE `formaspago`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `gastos`
--
ALTER TABLE `gastos`
  MODIFY `idGasto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `gestion`
--
ALTER TABLE `gestion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `movimientos`
--
ALTER TABLE `movimientos`
  MODIFY `idMovimiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `idServicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `ticket`
--
ALTER TABLE `ticket`
  MODIFY `idTicket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `ticketestados`
--
ALTER TABLE `ticketestados`
  MODIFY `idTicketsEstado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `gastos`
--
ALTER TABLE `gastos`
  ADD CONSTRAINT `gastos_ibfk_1` FOREIGN KEY (`idGasto`) REFERENCES `gestion` (`id`);

--
-- Filtros para la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`idCategoria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
