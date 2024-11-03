-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-11-2024 a las 21:15:10
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dota2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `matches`
--

CREATE TABLE `matches` (
  `match_id` int(11) NOT NULL,
  `match_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `matches`
--

INSERT INTO `matches` (`match_id`, `match_date`) VALUES
(1, '2023-10-15 14:30:00'),
(2, '2023-10-16 16:00:00'),
(3, '2023-10-17 18:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `match_history`
--

CREATE TABLE `match_history` (
  `history_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `match_id` int(11) NOT NULL,
  `hero` varchar(50) NOT NULL,
  `result` enum('won','lost') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `match_history`
--

INSERT INTO `match_history` (`history_id`, `user_id`, `match_id`, `hero`, `result`) VALUES
(1, 1, 1, 'axe', 'won'),
(2, 1, 2, 'invoker', 'lost'),
(3, 2, 3, 'rikimaru', 'won');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`) VALUES
(1, 'Jugador1', 'jugador1@example.com'),
(2, 'Jugador2', 'jugador2@example.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`match_id`);

--
-- Indices de la tabla `match_history`
--
ALTER TABLE `match_history`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `match_id` (`match_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `matches`
--
ALTER TABLE `matches`
  MODIFY `match_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `match_history`
--
ALTER TABLE `match_history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `match_history`
--
ALTER TABLE `match_history`
  ADD CONSTRAINT `match_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `match_history_ibfk_2` FOREIGN KEY (`match_id`) REFERENCES `matches` (`match_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
