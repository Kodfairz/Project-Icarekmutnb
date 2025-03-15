-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 15, 2025 at 11:47 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(3, 'โรคไต');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `cover_image_url` varchar(255) DEFAULT NULL,
  `video_link` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `isActive` tinyint(1) DEFAULT 1,
  `views` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `category_id`, `cover_image_url`, `video_link`, `content`, `created_at`, `updated_at`, `isActive`, `views`) VALUES
(2, 'ฟหกฟหก', 3, 'http://res.cloudinary.com/dcq3ijz0g/image/upload/v1741982951/icare/jbtymrxwqs1om40p5gpr.jpg', '', '<p>แอิแอิ</p>', '2025-03-14 13:09:17', '2025-03-15 02:29:20', 1, 0),
(3, '5555', 3, 'http://res.cloudinary.com/dcq3ijz0g/image/upload/v1742033612/icare/q12reqs5htrsfmstgkg9.jpg', 'https://youtu.be/dlI7rSqAWD4?si=MD5vvyfEbpAlwEq7', '<p>ทดสอบข้อมูลท่องเที่ยว</p><p></p><p><img src=\"http://res.cloudinary.com/dcq3ijz0g/image/upload/v1742029301/icare/l0ndho7j4wmglv2m2yc2.jpg\"></p><p></p><p>สามารถทดสอบรูปได้</p>', '2025-03-15 02:02:18', '2025-03-15 03:13:48', 0, 0),
(4, 'sdfsdf', 3, 'http://res.cloudinary.com/dcq3ijz0g/image/upload/v1742030571/icare/ciy0fndj4mgz2ioxy4mp.jpg', '', '<p>sdfsdfsdf</p>', '2025-03-15 02:22:53', '2025-03-15 02:24:10', 1, 0),
(5, 'สวัสดีครับ1111', 3, 'http://res.cloudinary.com/dcq3ijz0g/image/upload/v1742033522/icare/dwcg9kwgfuoqrordagnb.jpg', 'https://youtu.be/dlI7rSqAWD4?si=MD5vvyfEbpAlwEq7', '<p>ทดสอบข้อมูลท่องเที่ยว ทดสอบ</p><p></p><p></p><p>สามารถทดสอบรูปได้</p>', '2025-03-15 03:12:25', '2025-03-15 03:12:25', 0, 0);

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
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

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
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
