-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 16, 2025 at 09:09 AM
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
(4, 'โรคทั่วไป'),
(5, 'ศีรษะ'),
(6, 'ลำตัว'),
(7, 'ลำตัวส่วนล่าง'),
(8, 'อุบัติเหตุ');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `value`, `created_at`) VALUES
(1, 'ทดสอบ', '2025-03-15 18:11:34'),
(2, 'ทดสอบครั้งที่1 ', '2025-03-15 18:11:34'),
(3, 'loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem', '2025-03-15 18:11:34');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL COMMENT 'คนโพสต์',
  `category_id` int(11) NOT NULL,
  `cover_image_url` varchar(255) DEFAULT NULL,
  `video_link` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_update_id` int(11) DEFAULT NULL COMMENT 'คนอัพเดทล่าสุด',
  `isActive` tinyint(1) DEFAULT 1,
  `views` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `user_id`, `category_id`, `cover_image_url`, `video_link`, `content`, `created_at`, `updated_at`, `user_update_id`, `isActive`, `views`) VALUES
(6, 'กลาก', 7, 4, 'http://res.cloudinary.com/dcq3ijz0g/image/upload/v1742038619/icare/vsolsh2yvdsq3yqaezjv.jpg', 'https://youtu.be/RmNqEtn1314?si=3zU0vvC_CttIOTOq', '<p>โรคกลากเกิดจากการติดเชื้อราที่ผิวหนัง มักพบได้ตามส่วนต่าง ๆ ของร่างกาย ไม่ว่าจะเป็นบริเวณใบหน้าลำตัวแขนขาทำให้เกิดผื่นเป็นรูปวงกลมหรือวงรี มี สีชมพูจนถึงสีแดงขอบจะเป็นสะเก็ดที่นูนขึ้นผื่นที่เป็นจะค่อยๆ ลามออกโดยมีลักษณะเป็นวงที่มีขอบยกให้เห็นชัดเจน ตรงกลางวงอาจมีสีผิวปกติ&nbsp;<br><br></p><h4><strong>อาการของโรคกลาก</strong></h4><p>- เป็นผื่นรูปวงรี มีขุย พบได้บ่อยบริเวณก้น ลำตัว แขนและขา</p><ul><li><p>- มีอาการคันบริเวณผื่น</p></li><li><p>- ตรงกลางผื่นเป็นสีจางคล้ายสีผิวปกติ</p></li><li><p>- ผื่นจะค่อย ๆ ลามออก มองเห็นขอบยกขึ้นเล็กน้อย<br><br><br><img src=\"http://res.cloudinary.com/dcq3ijz0g/image/upload/v1742038864/icare/vcioq5xncsmi4jtd2yel.jpg\"><br></p></li><li><p><strong>โรคกลากติดต่ออย่างไร</strong></p></li><li><p><strong>- </strong>จากคนสู่คน ติดต่อได้โดยตรงจากการสัมผัสผู้ที่เป็นกลาก</p></li><li><p><strong>- </strong>จากสัตว์สู่คน สามารถติดต่อจากการสัมผัสสัตว์เลี้ยง เช่น หมาหรือแมวได้</p></li><li><p><strong>- </strong>จากพื้นดินสู่คน เกิดได้เมื่อเดินเท้าเปล่าหรือสัมผัสกับพื้นดินที่มีเชื้อรา &nbsp;แต่การติดต่อรูปแบบนี้เกิดขึ้นได้น้อย&nbsp;</p></li><li><p><br></p></li><li><p><strong>วิธีรักษาโรคกลาก</strong></p></li><li><p>- ใช้ยาต้านเชื้อราชนิดทาหรือชนิดใช้เฉพาะที่ ที่มีตัวยาสำคัญ เช่น โคลไตรมาโซล (Clotrimazole) คีโตโคนาโซล (Ketoconazole) ไมโคนาโซล (Miconazole)</p></li><li><p>- ใช้ยาต้านเชื้อรารูปแบบรับประทาน</p></li></ul><p><br><br></p><p></p><p>เครดิตรูปภาพ : https://katudermatology.com/post_service/%E0%B8%81%E0%B8%A5%E0%B8%B2%E0%B8%81/</p>', '2025-03-15 04:44:13', '2025-03-16 00:50:00', 7, 1, 29),
(7, 'ท้องร่วง', 7, 6, 'http://res.cloudinary.com/dcq3ijz0g/image/upload/v1742039195/icare/jzwz8yhb7c4mq7b2xec0.png', 'https://youtu.be/1i6RXLm-Evs?si=mGtiZI4XAnkN_kPe', '<p><img src=\"http://res.cloudinary.com/dcq3ijz0g/image/upload/v1742039369/icare/drpsblt98qkkksykmwbc.png\"></p><p><br><br><strong>อุจจาระร่วงเฉียบพลันเกิดได้อย่างไร?</strong></p><ul><li><p>- เกิดจากเชื้อโรค เช่น แบคทีเรีย (E. coli, Salmonella, Shigella), ไวรัส (Rotavirus, Norovirus) และพยาธิ (Giardia)</p></li><li><p>- การบริโภคอาหารหรือน้ำที่ปนเปื้อน</p></li><li><p>- สัมผัสโดยตรงกับผู้ติดเชื้อ</p></li><li><p>- ปัจจัยอื่นๆ เช่น การแพ้อาหาร ยาปฏิชีวนะ และโรคระบบทางเดินอาหาร<br><br></p></li></ul><p><strong>วิธีการรักษา</strong></p><ul><li><p>- ดื่มน้ำและเกลือแร่ (ORS) เพื่อป้องกันภาวะขาดน้ำ</p></li><li><p>- อาหารย่อยง่าย เช่น ข้าว กล้วย น้ำแอปเปิ้ล ขนมปังปิ้ง</p></li><li><p>- หลีกเลี่ยงยาหยุดถ่าย (Loperamide) หากไม่มีคำแนะนำจากแพทย์</p></li><li><p>- หากมีอาการรุนแรง เช่น ขาดน้ำมาก ถ่ายเป็นเลือด หรืออาการไม่ดีขึ้น ควรพบแพทย์</p></li></ul><p><br><br></p><p>เครดิตรูปภาพ : https://samitivejthonburi.com/th/article/277/thai-summer-disease-episode-3-acute-diar.html</p>', '2025-03-15 04:51:52', '2025-03-15 17:45:02', 7, 1, 2),
(8, 'กระเพาะปัสสาวะอักเสบ', 7, 7, 'http://res.cloudinary.com/dcq3ijz0g/image/upload/v1742039674/icare/ymuj6csqprtpeglzebyb.jpg', 'https://youtu.be/UFA1NHMS05o?si=tR7TuyOnhQjchmxB', '<p><img src=\"http://res.cloudinary.com/dcq3ijz0g/image/upload/v1742039871/icare/esi2jxyqx9xhwipagyiy.jpg\"><br><br><strong>กระเพาะปัสสาวะอักเสบเกิดได้อย่างไร?</strong><br>- เกิดจากการติดเชื้อแบคทีเรีย โดยเฉพาะ <em>Escherichia coli (E. coli)</em> ที่เข้าสู่ทางเดินปัสสาวะ</p><ul><li><p>- การกลั้นปัสสาวะบ่อยๆ หรือดื่มน้ำน้อย</p></li><li><p>- การทำความสะอาดบริเวณจุดซ่อนเร้นไม่ถูกวิธี (เช่น เช็ดจากหลังมาหน้า)</p></li><li><p>- การใช้สายสวนปัสสาวะ หรือภาวะสุขภาพบางอย่าง เช่น เบาหวาน<br><br><strong>วิธีการรักษา</strong><br>- ดื่มน้ำมากๆ เพื่อช่วยขับเชื้อออกจากทางเดินปัสสาวะ</p></li><li><p>- ปัสสาวะให้บ่อยขึ้น อย่ากลั้นปัสสาวะ</p></li><li><p>- รับประทานยาปฏิชีวนะ ตามแพทย์สั่ง หากเป็นการติดเชื้อแบคทีเรีย</p></li><li><p>- หลีกเลี่ยงเครื่องดื่มที่ระคายเคืองกระเพาะปัสสาวะ เช่น กาแฟ แอลกอฮอล์ และน้ำอัดลม</p></li><li><p>- หากมีอาการรุนแรง เช่น ปวดมาก ไข้สูง หรือปัสสาวะเป็นเลือด ควรพบแพทย์ทันที<br><br>เครดิตรูป : https://ch9airport.com/th/อาการกระเพาะปัสสาวะอัก/</p></li></ul>', '2025-03-15 04:58:03', '2025-03-15 19:55:34', 7, 1, 4),
(9, 'ตากุ้งยิง', 7, 5, 'http://res.cloudinary.com/dcq3ijz0g/image/upload/v1742039914/icare/qiscbzk8jhvs5roy9plr.jpg', 'https://youtu.be/oj_3BZWLsV4?si=23XY3uIe-1AhitXs', '<p><img src=\"http://res.cloudinary.com/dcq3ijz0g/image/upload/v1742040007/icare/grdwdouqfdiyqiegbh7g.jpg\"><br><strong>ตากุ้งยิงเกิดได้อย่างไร?</strong><br>- เกิดจากการติดเชื้อแบคทีเรีย <em>Staphylococcus aureus</em> ที่ต่อมไขมันบริเวณเปลือกตา</p><ul><li><p>- การสัมผัสดวงตาด้วยมือสกปรก</p></li><li><p>- การใช้เครื่องสำอางเก่า หรือไม่ล้างเครื่องสำอางก่อนนอน</p></li><li><p>- ภูมิคุ้มกันอ่อนแอ หรือมีภาวะเปลือกตาอักเสบเรื้อรัง<br><br><strong>วิธีการรักษา</strong><br>- ประคบอุ่น วันละ 3-4 ครั้ง ครั้งละ 10-15 นาที เพื่อลดอาการบวมและช่วยให้หัวหนองแตกเอง</p></li><li><p>- ล้างมือให้สะอาด หลีกเลี่ยงการขยี้ตา</p></li><li><p>- งดใช้เครื่องสำอางรอบดวงตา จนกว่าอาการจะหาย</p></li><li><p>- หากเป็นบ่อยหรือมีหนองมาก อาจต้องใช้ยาปฏิชีวนะ หรือพบแพทย์เพื่อระบายหนองออก<br><br>เครดิตรูป : https://www.vimut.com/article/Hordeolum<br><br></p></li></ul>', '2025-03-15 05:02:45', '2025-03-16 07:16:05', 7, 1, 4),
(10, 'ตกจากที่สูง', 7, 8, 'http://res.cloudinary.com/dcq3ijz0g/image/upload/v1742040299/icare/kw7kay5xnjcnhzqbgiqr.jpg', 'https://youtu.be/TmhXhavqwTk?si=s4_rfKYx16Jg-kFr', '<h4><img src=\"http://res.cloudinary.com/dcq3ijz0g/image/upload/v1742040382/icare/zwypiegzshhxojel1eay.jpg\"><br><strong>ตกจากที่สูงเกิดได้อย่างไร?</strong></h4><ul><li><p>อุบัติเหตุจากการทำงาน เช่น ก่อสร้าง ปีนบันได หรือซ่อมแซมที่สูง</p></li><li><p>การพลัดตกจากที่สูง เช่น ตกจากระเบียง ต้นไม้ หรือหลังคา</p></li><li><p>อุบัติเหตุจากการเล่นกีฬา หรือกิจกรรมผาดโผน<br><br><strong>วิธีการปฐมพยาบาลและรักษา</strong><br>- อย่าขยับผู้บาดเจ็บ หากสงสัยว่ามีอาการบาดเจ็บที่กระดูกสันหลังหรือศีรษะ</p></li><li><p>- ตรวจชีพจร และการหายใจ หากหมดสติ ให้ทำ CPR ทันที</p></li><li><p>- กดห้ามเลือด หากมีบาดแผลที่เลือดออกมาก</p></li><li><p>- ประคบเย็น เพื่อลดอาการบวมในกรณีฟกช้ำ</p></li><li><p>- เรียกรถพยาบาลทันที หากมีอาการรุนแรง เช่น หมดสติ กระดูกหัก ปวดศีรษะรุนแรง อาเจียน หรือแขนขาอ่อนแรง<br><br>เครดิตรูป : https://glovetex.com/wp-content/uploads/2024/02/1395-5.jpg</p></li></ul>', '2025-03-15 05:08:04', '2025-03-15 17:25:57', 7, 1, 4),
(11, 'asdasd', 7, 6, 'http://res.cloudinary.com/dcq3ijz0g/image/upload/v1742058994/icare/rkd6npfghwhdsqrrwa19.png', '', '<p>asdasd</p>', '2025-03-15 10:16:39', '2025-03-16 00:51:39', 7, 1, 6);

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
(7, 'admin', '$2b$10$V6XclZefioWeQNRW3160Ae4BiLWtLHtRMjm9Xgbge5tq8PJdKUCte', 'admin', 0, '2025-03-14 02:38:11', '2025-03-16 07:53:53'),
(8, 'ฟหก', '$2b$10$xUAuIR7ClSAdXiwwcjEz5O1hrAaDxtGBDit8TZOAlKzLxOT.5KCOq', 'admin', 1, '2025-03-14 02:48:42', '2025-03-14 02:48:42'),
(9, 'หกด', '$2b$10$BuQM9pOJ3rywYk61juCaFeD1c2Bg95kUMrjiA4Ok/clsP3qkcFP4y', 'admin', 1, '2025-03-14 02:48:46', '2025-03-14 02:48:46'),
(10, 'กดเ', '$2b$10$nqvIXwEDJqWEmsWaRzRO3.ftHm87EtMnnN9FuZej8JbMTJsNc/0e2', 'admin', 1, '2025-03-14 02:48:51', '2025-03-14 02:48:51'),
(11, 'dfgdfg', '$2b$10$LxBeePQ5CseMtKgnzVofYOMfuV54Osrwk.BEXRv0narmruUtVISBW', 'admin', 1, '2025-03-14 02:50:50', '2025-03-14 02:50:50'),
(12, 'fgh', '$2b$10$Bv1DaU3HcN/rUI563bfN7.oJZmdTw1YmBeWXPm69HQlOIMcDy8KR6', 'admin', 1, '2025-03-14 02:50:57', '2025-03-14 02:50:57'),
(13, 'ghj', '$2b$10$iiSAU47XCEXEWB3/N2si8uel2GjS7GclEORGGf5Zep88mN7W4g5Y6', 'admin', 1, '2025-03-14 02:51:03', '2025-03-14 02:51:03'),
(14, 'fgg', '$2b$10$RxyNG5.Mpav5RtvzSx55HuajIhiJIzAWcQYfbzpIDjaKe7dLiv1pG', 'admin', 1, '2025-03-14 02:51:26', '2025-03-14 02:51:26'),
(15, 'ghjghj', '$2b$10$d9OWHLJNVJM4EPlUAG3nz.WgoimkiPBJLzlktmzi6UE5F.4VYm2Hi', 'admin', 1, '2025-03-14 02:51:34', '2025-03-14 02:51:34'),
(16, 'dfg', '$2b$10$brwsBlM8AA.R/ojOsTdnpukUfzKFLK5BYAucOeQWwHoHH0VsYWbra', 'admin', 1, '2025-03-14 02:51:44', '2025-03-14 02:51:44'),
(17, 'sdfsdf', '$2b$10$cHLMDdnfnN0CxCznrrtFKOM8qp8SI.GS/NwFUTZgPs33iitajRZ8.', 'admin', 1, '2025-03-14 02:51:51', '2025-03-14 02:51:51'),
(18, 'hongkong', '$2b$10$vLCbhbuH5WZGpWiZO3LyveDVCuupA6jrNJ7tsHjmvh8O2sW8q2a32', 'admin', 1, '2025-03-15 10:18:31', '2025-03-15 10:18:31');

-- --------------------------------------------------------

--
-- Table structure for table `video_links`
--

CREATE TABLE `video_links` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `url` varchar(500) NOT NULL,
  `user_id` int(11) DEFAULT NULL COMMENT 'คนสร้าง',
  `update_id` int(11) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL,
  `views` int(11) NOT NULL DEFAULT 0,
  `thumbnail_url` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `video_links`
--

INSERT INTO `video_links` (`id`, `title`, `description`, `url`, `user_id`, `update_id`, `isActive`, `views`, `thumbnail_url`, `created_at`, `updated_at`) VALUES
(2, 'ทดสอบ111', 'ทดสอบ111', 'https://youtu.be/Mf6K-HpDRig?si=aaqDmc9luTiYRDtn', 7, 7, 1, 33, 'http://res.cloudinary.com/dcq3ijz0g/image/upload/v1742110895/icare/bdgz7almbx7buiiwzry9.png', '2025-03-15 12:28:18', '2025-03-16 07:49:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `fk_head_user_id` (`user_id`),
  ADD KEY `fk_user_update_id` (`user_update_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `video_links`
--
ALTER TABLE `video_links`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id` (`user_id`),
  ADD KEY `fk_update_id` (`update_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `video_links`
--
ALTER TABLE `video_links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_head_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_update_id` FOREIGN KEY (`user_update_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Constraints for table `video_links`
--
ALTER TABLE `video_links`
  ADD CONSTRAINT `fk_update_id` FOREIGN KEY (`update_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
