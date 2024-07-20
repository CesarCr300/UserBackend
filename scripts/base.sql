-- MySQL dump 10.13  Distrib 8.0.37, for Linux (x86_64)
--
-- Host: localhost    Database: nolatech
-- ------------------------------------------------------
-- Server version	8.0.37-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_user`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_user` (
  `int_id` int NOT NULL AUTO_INCREMENT,
  `vch_email` varchar(100) NOT NULL,
  `vch_password` varchar(255) NOT NULL,
  `vch_username` varchar(20) NOT NULL,
  `vch_name` varchar(100) NOT NULL,
  `vch_lastname` varchar(100) NOT NULL,
  `int_created_by` int DEFAULT NULL,
  `dtt_created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `int_updated_by` int DEFAULT NULL,
  `dtt_updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `dtt_deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`int_id`),
  KEY `int_created_by` (`int_created_by`),
  KEY `int_updated_by` (`int_updated_by`),
  CONSTRAINT `tbl_user_ibfk_1` FOREIGN KEY (`int_created_by`) REFERENCES `tbl_user` (`int_id`),
  CONSTRAINT `tbl_user_ibfk_2` FOREIGN KEY (`int_updated_by`) REFERENCES `tbl_user` (`int_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user`
--

LOCK TABLES `tbl_user` WRITE;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` VALUES (1,'c@c.com','$2b$10$zlwRQ3en/iViMOUPnSYA2e0haeOSBE.XqZA.QUVGVlXwB6lI0D.A.','cesar123','Cesar Jesus 123','Contreras Romero 123',NULL,'2024-07-17 10:35:30',1,'2024-07-19 23:37:43',NULL);
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'nolatech'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-20 16:25:48