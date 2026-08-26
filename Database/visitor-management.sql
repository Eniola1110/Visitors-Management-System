-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: visitors_management_system
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Human Resources','2026-08-18 17:13:30'),(2,'Finance','2026-08-18 17:13:54'),(3,'IT','2026-08-18 17:14:10'),(4,'Marketing','2026-08-18 17:14:30'),(5,'Sales','2026-08-18 17:14:40'),(6,'Management','2026-08-18 17:14:51'),(7,'Operations','2026-08-18 17:15:13'),(8,'Others','2026-08-18 17:15:23');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitors`
--

DROP TABLE IF EXISTS `visitors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visitors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `company` varchar(150) DEFAULT NULL,
  `person_to_visit` varchar(100) NOT NULL,
  `reason` text,
  `department_id` int DEFAULT NULL,
  `purpose` varchar(100) DEFAULT NULL,
  `visitor_type` varchar(50) NOT NULL,
  `id_number` varchar(100) DEFAULT NULL,
  `check_in_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `check_out_time` datetime DEFAULT NULL,
  `status` enum('checked_in','checked_out') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `items_brought_in` text,
  `id_type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `visitors_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitors`
--

LOCK TABLES `visitors` WRITE;
/*!40000 ALTER TABLE `visitors` DISABLE KEYS */;
INSERT INTO `visitors` VALUES (4,'Esther','adrc@gmail.com','09034563563','ABD','Mr Bayo','Business Meeting',4,'Business Meeting','Contractor','5679','2026-08-19 09:44:33','2026-08-19 09:58:52','checked_out','2026-08-19 08:44:33','Black Backpack','National ID'),(5,'Chike','chike@gmail.com','09035672453','Chowdeck','Miss Funmi','Delivery',5,'Delivery','Delivery','678','2026-08-19 10:47:43','2026-08-19 10:48:30','checked_out','2026-08-19 09:47:43','Backpack','Other'),(6,'Lola','lola@gmail.com','0892u','jhj','nj','bhs',6,'bhs','Guest','njz','2026-08-19 10:58:18','2026-08-19 14:02:12','checked_out','2026-08-19 09:58:18','hjjai','National ID'),(7,'Shade','shade@gmail.com','09026745782','ABC','Mr Femi','Meeting',7,'Meeting','Contractor','8789','2026-08-20 12:08:23','2026-08-20 12:18:01','checked_out','2026-08-20 11:08:23','Documents','National ID'),(8,'Joke','eniolami004@gmail.com','08121596422','ABC','Mr Bayo','Meeting',4,'Meeting','Contractor','768','2026-08-20 12:42:43','2026-08-20 12:43:01','checked_out','2026-08-20 11:42:43','hj','International Passport');
/*!40000 ALTER TABLE `visitors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-26  9:40:40
