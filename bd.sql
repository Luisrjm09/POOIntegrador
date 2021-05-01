CREATE TABLE `usuario` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `username` varchar(15) NOT NULL,
  `password` varchar(100) NOT NULL
);

CREATE TABLE `clientes` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `primerNombre` varchar(15) NOT NULL,
  `segundoNombre` varchar(15),
  `apellidoPaterno` varchar(15) NOT NULL,
  `apellidoMaterno` varchar(15) NOT NULL,
  `numero` int(20) NOT NULL,
  `recomendadoPor` int(1) NOT NULL
);

CREATE TABLE `ticket` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `diaRecoleccion` int(2) NOT NULL,
  `mesRecoleccion` int(2) NOT NULL,
  `recolectionYear` int(4) NOT NULL,
  `diaEntrega` int(2) NOT NULL,
  `mesEntrega` int(2) NOT NULL,
  `entregaYear` int(4) NOT NULL,
  `modelo` varchar(30) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `servicio` varchar(50) NOT NULL,
  `cotizacion` int(20) NOT NULL,
  `medioContactoId` int,
  `medioPagoId` int,
  `totalPago` int(20) NOT NULL,
  `clienteId` int NOT NULL,
  `estado` int(1) NOT NULL
);

CREATE TABLE `formasPago` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL
);

CREATE TABLE `Inventario` (
  `codigo` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `descripcion` longtext NOT NULL,
  `stock` int(20) NOT NULL,
  `categoria` int(10) NOT NULL,
  `precioCompra` int(20) NOT NULL,
  `precioVenta` int(20) NOT NULL
);

CREATE TABLE `gestion` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `descripcion` longtext NOT NULL,
  `gasto` int(20) NOT NULL,
  `tipo` int(1) NOT NULL,
  `dia` int(2) NOT NULL,
  `mes` int(2) NOT NULL,
  `yearData` int(4) NOT NULL
);

CREATE TABLE `gastos` (
  `idGasto` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` longtext
);

CREATE TABLE `dinero` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `montoInicial` int(10) NOT NULL,
  `montoFinal` int(10) NOT NULL,
  `dia` int(2) NOT NULL,
  `mes` int(2) NOT NULL,
  `yearTime` int(4) NOT NULL
);

CREATE TABLE `movimientos` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `tipo` tinyint NOT NULL,
  `precio` int(10) NOT NULL,
  `idCorte` int NOT NULL
);

CREATE TABLE `contacto` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL
);

CREATE TABLE `categoria` (
  `idCategoria` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL
);

CREATE TABLE `servicios` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255),
  `descripcion` varchar(50)
);

ALTER TABLE `Inventario` ADD FOREIGN KEY (`categoria`) REFERENCES `categoria` (`idCategoria`);

ALTER TABLE `gastos` ADD FOREIGN KEY (`idGasto`) REFERENCES `gestion` (`id`);

ALTER TABLE `clientes` ADD FOREIGN KEY (`id`) REFERENCES `contacto` (`id`);

ALTER TABLE `clientes` ADD FOREIGN KEY (`id`) REFERENCES `ticket` (`clienteId`);

ALTER TABLE `gastos` ADD FOREIGN KEY (`idGasto`) REFERENCES `dinero` (`id`);

ALTER TABLE `formasPago` ADD FOREIGN KEY (`id`) REFERENCES `ticket` (`medioPagoId`);

ALTER TABLE `contacto` ADD FOREIGN KEY (`id`) REFERENCES `ticket` (`medioContactoId`);

ALTER TABLE `ticket` ADD FOREIGN KEY (`servicio`) REFERENCES `servicios` (`id`);
