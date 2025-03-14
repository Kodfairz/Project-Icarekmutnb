-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 14, 2025 at 04:01 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `icare`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `isActive`, `createdAt`, `updatedAt`) VALUES
(7, 'admin', '$2b$10$V6XclZefioWeQNRW3160Ae4BiLWtLHtRMjm9Xgbge5tq8PJdKUCte', 'admin', 1, '2025-03-14 02:38:11', '2025-03-14 09:47:17'),
(8, 'ฟหก', '$2b$10$xUAuIR7ClSAdXiwwcjEz5O1hrAaDxtGBDit8TZOAlKzLxOT.5KCOq', 'admin', 1, '2025-03-14 02:48:42', '2025-03-14 02:48:42'),
(9, 'หกด', '$2b$10$BuQM9pOJ3rywYk61juCaFeD1c2Bg95kUMrjiA4Ok/clsP3qkcFP4y', 'admin', 1, '2025-03-14 02:48:46', '2025-03-14 02:48:46'),
(10, 'กดเ', '$2b$10$nqvIXwEDJqWEmsWaRzRO3.ftHm87EtMnnN9FuZej8JbMTJsNc/0e2', 'admin', 1, '2025-03-14 02:48:51', '2025-03-14 02:48:51'),
(11, 'dfgdfg', '$2b$10$LxBeePQ5CseMtKgnzVofYOMfuV54Osrwk.BEXRv0narmruUtVISBW', 'admin', 1, '2025-03-14 02:50:50', '2025-03-14 02:50:50'),
(12, 'fgh', '$2b$10$Bv1DaU3HcN/rUI563bfN7.oJZmdTw1YmBeWXPm69HQlOIMcDy8KR6', 'admin', 1, '2025-03-14 02:50:57', '2025-03-14 02:50:57'),
(13, 'ghj', '$2b$10$iiSAU47XCEXEWB3/N2si8uel2GjS7GclEORGGf5Zep88mN7W4g5Y6', 'admin', 1, '2025-03-14 02:51:03', '2025-03-14 02:51:03'),
(14, 'fgg', '$2b$10$RxyNG5.Mpav5RtvzSx55HuajIhiJIzAWcQYfbzpIDjaKe7dLiv1pG', 'admin', 1, '2025-03-14 02:51:26', '2025-03-14 02:51:26'),
(15, 'ghjghj', '$2b$10$d9OWHLJNVJM4EPlUAG3nz.WgoimkiPBJLzlktmzi6UE5F.4VYm2Hi', 'admin', 1, '2025-03-14 02:51:34', '2025-03-14 02:51:34'),
(16, 'dfg', '$2b$10$brwsBlM8AA.R/ojOsTdnpukUfzKFLK5BYAucOeQWwHoHH0VsYWbra', 'admin', 1, '2025-03-14 02:51:44', '2025-03-14 02:51:44'),
(17, 'sdfsdf', '$2b$10$cHLMDdnfnN0CxCznrrtFKOM8qp8SI.GS/NwFUTZgPs33iitajRZ8.', 'admin', 1, '2025-03-14 02:51:51', '2025-03-14 02:51:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
