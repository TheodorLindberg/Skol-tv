-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 22 dec 2018 kl 13:05
-- Serverversion: 10.1.36-MariaDB
-- PHP-version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `skoltv`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `cards`
--

CREATE TABLE `cards` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text,
  `creatorID` int(11) NOT NULL,
  `lastedit` datetime NOT NULL,
  `created` datetime DEFAULT NULL,
  `upvote` int(11) DEFAULT NULL,
  `folder_path` text NOT NULL,
  `status_info` text,
  `status` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumpning av Data i tabell `cards`
--

INSERT INTO `cards` (`id`, `name`, `description`, `creatorID`, `lastedit`, `created`, `upvote`, `folder_path`, `status_info`, `status`) VALUES
(38, 'fsdf', ' sd', 1, '2018-12-10 18:50:37', '2018-12-10 18:50:37', 0, 'storage/cards/fsdf', NULL, 0);

-- --------------------------------------------------------

--
-- Tabellstruktur `information`
--

CREATE TABLE `information` (
  `active_layout` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumpning av Data i tabell `information`
--

INSERT INTO `information` (`active_layout`) VALUES
(8);

-- --------------------------------------------------------

--
-- Tabellstruktur `layouts`
--

CREATE TABLE `layouts` (
  `id` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `edit_date` datetime NOT NULL,
  `creator_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `upvote` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumpning av Data i tabell `layouts`
--

INSERT INTO `layouts` (`id`, `created_date`, `edit_date`, `creator_id`, `name`, `description`, `upvote`) VALUES
(8, '2018-12-08 20:14:41', '2018-12-08 20:14:41', 1, 'test', 'tes', 0);

-- --------------------------------------------------------

--
-- Tabellstruktur `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_first` varchar(50) NOT NULL,
  `user_last` varchar(50) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_uid` varchar(50) NOT NULL,
  `user_pwd` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumpning av Data i tabell `users`
--

INSERT INTO `users` (`id`, `user_first`, `user_last`, `user_email`, `user_uid`, `user_pwd`) VALUES
(1, 'Theodor', 'Lindberg', 'thbjo_04@edu.sollentuna.se', 'Theodor123', '$2y$10$MGaTvQ0WW4kZRUlqwPaU4etm61u5VUxIkdmJ1papPaLE1l9NSf3qy');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `layouts`
--
ALTER TABLE `layouts`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `cards`
--
ALTER TABLE `cards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT för tabell `layouts`
--
ALTER TABLE `layouts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT för tabell `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
