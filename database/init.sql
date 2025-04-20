-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Mar 11, 2025 at 05:32 PM
-- Server version: 8.4.4
-- PHP Version: 8.2.27
SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
  time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;

/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacation_tagging_system`
--
CREATE DATABASE IF NOT EXISTS `vacation_tagging_system` DEFAULT CHARACTER
SET
  utf8mb4 COLLATE utf8mb4_general_ci;

USE `vacation_tagging_system`;

-- --------------------------------------------------------
--
-- Table structure for table `users`
--
CREATE TABLE
  `users` (
    `id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
    `first_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
    `last_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
    `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
    `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
    `role` enum ('user', 'admin') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user',
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `users`
--
INSERT INTO
  `users` (
    `id`,
    `first_name`,
    `last_name`,
    `email`,
    `password`,
    `role`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    '9c485dc6-fe9e-11ef-b2c4-0242ac130002',
    'John',
    'Doe',
    'john@example.com',
    '$2b$10$q6h7W8/6Bg0NiFhzl9O9de7J0jXXrJZ/SKtZzQX5xUKfPVoXJPq2i',
    'user',
    '2025-03-11 17:31:05',
    '2025-03-11 17:31:05'
  ),
  (
    '9c4aa7cc-fe9e-11ef-b2c4-0242ac130002',
    'Jane',
    'Smith',
    'jane@example.com',
    '$2b$10$q6h7W8/6Bg0NiFhzl9O9de7J0jXXrJZ/SKtZzQX5xUKfPVoXJPq2i',
    'user',
    '2025-03-11 17:31:05',
    '2025-03-11 17:31:05'
  ),
  (
    '9c4cadaf-fe9e-11ef-b2c4-0242ac130002',
    'Bob',
    'Johnson',
    'bob@example.com',
    '$2b$10$q6h7W8/6Bg0NiFhzl9O9de7J0jXXrJZ/SKtZzQX5xUKfPVoXJPq2i',
    'user',
    '2025-03-11 17:31:05',
    '2025-03-11 17:31:05'
  ),
  (
    'c8af34c4-fe8e-11ef-b2c4-0242ac130002',
    'Admin',
    'User',
    'admin@example.com',
    '$2b$10$FVJyOKqIr5x7x/Cn4/QrDeuJZikN3YBxQwT.cIsAb7SOlYBz7ufuO',
    'admin',
    '2025-03-11 15:37:47',
    '2025-03-11 15:37:47'
  );

-- --------------------------------------------------------
--
-- Table structure for table `vacations`
--
CREATE TABLE
  `vacations` (
    `id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
    `destination` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
    `description` text COLLATE utf8mb4_general_ci NOT NULL,
    `start_date` date NOT NULL,
    `end_date` date NOT NULL,
    `price` decimal(10, 2) NOT NULL,
    `image_file_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--
INSERT INTO
  `vacations` (
    `id`,
    `destination`,
    `description`,
    `start_date`,
    `end_date`,
    `price`,
    `image_file_name`,
    `created_at`,
    `updated_at`
  )
VALUES
  (
    'c8b0f347-fe8e-11ef-b2c4-0242ac130002',
    'Paris, France',
    'Experience the magic of Paris with guided tours of the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.',
    '2025-06-15',
    '2025-06-22',
    1200.00,
    'paris.jpg',
    '2025-03-11 15:37:47',
    '2025-03-11 15:37:47'
  ),
  (
    'c8b0fbfe-fe8e-11ef-b2c4-0242ac130002',
    'Cancun, Mexico',
    'Relax on pristine beaches, swim in crystal-clear waters, and explore ancient Mayan ruins.',
    '2025-07-10',
    '2025-07-17',
    950.00,
    'cancun.jpg',
    '2025-03-11 15:37:47',
    '2025-03-11 15:37:47'
  ),
  (
    'c8b0feed-fe8e-11ef-b2c4-0242ac130002',
    'Tokyo, Japan',
    'Immerse yourself in Japanese culture, visit historic temples, and enjoy world-class cuisine.',
    '2025-08-05',
    '2025-08-15',
    1800.00,
    'tokyo.jpg',
    '2025-03-11 15:37:47',
    '2025-03-11 15:37:47'
  ),
  (
    'c8b10091-fe8e-11ef-b2c4-0242ac130002',
    'Rome, Italy',
    'Walk through the ancient ruins of the Colosseum and Forum, visit the Vatican, and enjoy authentic Italian cuisine.',
    '2025-09-20',
    '2025-09-27',
    1350.00,
    'rome.jpg',
    '2025-03-11 15:37:47',
    '2025-03-11 15:37:47'
  ),
  (
    'c8b10134-fe8e-11ef-b2c4-0242ac130002',
    'Bali, Indonesia',
    'Experience tropical paradise with lush rice terraces, beautiful beaches, and rich cultural heritage.',
    '2025-10-15',
    '2025-10-25',
    1100.00,
    'bali.jpg',
    '2025-03-11 15:37:47',
    '2025-03-11 15:37:47'
  );

-- --------------------------------------------------------
--
-- Table structure for table `vacation_tags`
--
CREATE TABLE
  `vacation_tags` (
    `user_id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
    `vacation_id` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Indexes for dumped tables
--
--
-- Indexes for table `users`
--
ALTER TABLE `users` ADD PRIMARY KEY (`id`),
ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations` ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vacation_tags`
--
ALTER TABLE `vacation_tags` ADD PRIMARY KEY (`user_id`, `vacation_id`),
ADD KEY `vacation_id` (`vacation_id`);

--
-- Constraints for dumped tables
--
--
-- Constraints for table `vacation_tags`
--
ALTER TABLE `vacation_tags` ADD CONSTRAINT `vacation_tags_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
ADD CONSTRAINT `vacation_tags_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;