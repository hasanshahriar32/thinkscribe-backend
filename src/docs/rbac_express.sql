CREATE DATABASE IF NOT EXISTS `rbac_express` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `rbac_express`;
-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (x86_64)
--
-- Host: 127.0.0.1    Database: rbac_express
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `action`
--

DROP TABLE IF EXISTS `action`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `action` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `action`
--

LOCK TABLES `action` WRITE;
/*!40000 ALTER TABLE `action` DISABLE KEYS */;
INSERT INTO `action` VALUES ('242b2ed2-0757-11f0-9bc1-32adce0096f0','Create',NULL,0,'2025-03-22 19:52:09','2025-03-22 20:47:50',NULL,'ff570050-01a1-11f0-9bc1-32adce0096f0',NULL,NULL),('242b6262-0757-11f0-9bc1-32adce0096f0','Delete',NULL,0,'2025-03-22 19:52:09','2025-03-22 20:47:51',NULL,'ff570050-01a1-11f0-9bc1-32adce0096f0',NULL,NULL),('9e50ed1a-075b-11f0-9bc1-32adce0096f0','View',NULL,0,'2025-03-22 20:24:12','2025-03-22 20:47:51',NULL,'ff570050-01a1-11f0-9bc1-32adce0096f0',NULL,NULL),('a18f576e-075b-11f0-9bc1-32adce0096f0','Update',NULL,0,'2025-03-22 20:24:18','2025-03-22 20:24:18',NULL,'ff570050-01a1-11f0-9bc1-32adce0096f0',NULL,NULL);
/*!40000 ALTER TABLE `action` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `channel`
--

DROP TABLE IF EXISTS `channel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `channel` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `channel`
--

LOCK TABLES `channel` WRITE;
/*!40000 ALTER TABLE `channel` DISABLE KEYS */;
INSERT INTO `channel` VALUES ('6682d258-05e0-11f0-9bc1-32adce0096f0','Web',NULL,0,'2025-03-20 23:09:39','2025-03-20 23:09:39',NULL,'ff570050-01a1-11f0-9bc1-32adce0096f0',NULL,NULL),('b366f7a2-0761-11f0-9bc1-32adce0096f0','Desktop',NULL,1,'2025-03-22 21:07:45','2025-03-22 21:10:58',NULL,'ff570050-01a1-11f0-9bc1-32adce0096f0',NULL,NULL);
/*!40000 ALTER TABLE `channel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `channel_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
INSERT INTO `module` VALUES ('2059b11a-05dc-11f0-9bc1-32adce0096f0','User Management',NULL,0,'2025-03-20 22:39:04','2025-03-20 23:40:12',NULL,'ab546ce6-f5f2-11ef-9bc1-32adce0096f0',NULL,NULL,'6682d258-05e0-11f0-9bc1-32adce0096f0'),('394472fe-0a42-11f0-9bc1-32adce0096f0','Unit',NULL,0,'2025-03-26 12:59:59','2025-03-26 12:59:59',NULL,'ff570050-01a1-11f0-9bc1-32adce0096f0',NULL,NULL,'6682d258-05e0-11f0-9bc1-32adce0096f0'),('83732965-a8aa-44a4-b1d5-30b2ef267d2a','Product',NULL,0,'2025-04-21 12:31:48','2025-04-21 12:31:48',NULL,'ff570050-01a1-11f0-9bc1-32adce0096f0',NULL,NULL,'6682d258-05e0-11f0-9bc1-32adce0096f0');
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `module_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sub_module_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `channel_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES ('19bfa30c-1ead-11f0-b5b5-df40a1682685',0,'2025-04-21 12:35:25','2025-04-21 12:35:25',NULL,NULL,NULL,NULL,'2059b11a-05dc-11f0-9bc1-32adce0096f0','4ddd5b28-05e6-11f0-9bc1-32adce0096f0','6682d258-05e0-11f0-9bc1-32adce0096f0','91e945da-0a45-11f0-9bc1-32adce0096f0','9e50ed1a-075b-11f0-9bc1-32adce0096f0'),('19bfa7f8-1ead-11f0-b5b5-df40a1682685',0,'2025-04-21 12:35:25','2025-04-21 12:35:25',NULL,NULL,NULL,NULL,'2059b11a-05dc-11f0-9bc1-32adce0096f0','4ddd5b28-05e6-11f0-9bc1-32adce0096f0','6682d258-05e0-11f0-9bc1-32adce0096f0','91e945da-0a45-11f0-9bc1-32adce0096f0','a18f576e-075b-11f0-9bc1-32adce0096f0'),('19bfa9ce-1ead-11f0-b5b5-df40a1682685',0,'2025-04-21 12:35:25','2025-04-21 12:35:25',NULL,NULL,NULL,NULL,'2059b11a-05dc-11f0-9bc1-32adce0096f0','4ddd5b28-05e6-11f0-9bc1-32adce0096f0','6682d258-05e0-11f0-9bc1-32adce0096f0','91e945da-0a45-11f0-9bc1-32adce0096f0','242b6262-0757-11f0-9bc1-32adce0096f0'),('19bfaaf0-1ead-11f0-b5b5-df40a1682685',0,'2025-04-21 12:35:25','2025-04-21 12:35:25',NULL,NULL,NULL,NULL,'2059b11a-05dc-11f0-9bc1-32adce0096f0','4ddd5b28-05e6-11f0-9bc1-32adce0096f0','6682d258-05e0-11f0-9bc1-32adce0096f0','91e945da-0a45-11f0-9bc1-32adce0096f0','242b2ed2-0757-11f0-9bc1-32adce0096f0'),('19bfac12-1ead-11f0-b5b5-df40a1682685',0,'2025-04-21 12:35:25','2025-04-21 12:35:25',NULL,NULL,NULL,NULL,'2059b11a-05dc-11f0-9bc1-32adce0096f0','78a5a376-1e8f-11f0-b5b5-df40a1682685','6682d258-05e0-11f0-9bc1-32adce0096f0','91e945da-0a45-11f0-9bc1-32adce0096f0','9e50ed1a-075b-11f0-9bc1-32adce0096f0'),('19bfae7e-1ead-11f0-b5b5-df40a1682685',0,'2025-04-21 12:35:25','2025-04-21 12:35:25',NULL,NULL,NULL,NULL,'2059b11a-05dc-11f0-9bc1-32adce0096f0','78a5a376-1e8f-11f0-b5b5-df40a1682685','6682d258-05e0-11f0-9bc1-32adce0096f0','91e945da-0a45-11f0-9bc1-32adce0096f0','a18f576e-075b-11f0-9bc1-32adce0096f0'),('19bfb004-1ead-11f0-b5b5-df40a1682685',0,'2025-04-21 12:35:25','2025-04-21 12:35:25',NULL,NULL,NULL,NULL,'2059b11a-05dc-11f0-9bc1-32adce0096f0','78a5a376-1e8f-11f0-b5b5-df40a1682685','6682d258-05e0-11f0-9bc1-32adce0096f0','91e945da-0a45-11f0-9bc1-32adce0096f0','242b6262-0757-11f0-9bc1-32adce0096f0'),('19bfb108-1ead-11f0-b5b5-df40a1682685',0,'2025-04-21 12:35:25','2025-04-21 12:35:25',NULL,NULL,NULL,NULL,'2059b11a-05dc-11f0-9bc1-32adce0096f0','78a5a376-1e8f-11f0-b5b5-df40a1682685','6682d258-05e0-11f0-9bc1-32adce0096f0','91e945da-0a45-11f0-9bc1-32adce0096f0','242b2ed2-0757-11f0-9bc1-32adce0096f0'),('19bfb2d4-1ead-11f0-b5b5-df40a1682685',0,'2025-04-21 12:35:25','2025-04-21 12:35:25',NULL,NULL,NULL,NULL,'83732965-a8aa-44a4-b1d5-30b2ef267d2a','1976b4cc-f6c6-4529-b628-6cd03c8c2616','6682d258-05e0-11f0-9bc1-32adce0096f0','91e945da-0a45-11f0-9bc1-32adce0096f0','9e50ed1a-075b-11f0-9bc1-32adce0096f0'),('19bfb3e2-1ead-11f0-b5b5-df40a1682685',0,'2025-04-21 12:35:25','2025-04-21 12:35:25',NULL,NULL,NULL,NULL,'83732965-a8aa-44a4-b1d5-30b2ef267d2a','1976b4cc-f6c6-4529-b628-6cd03c8c2616','6682d258-05e0-11f0-9bc1-32adce0096f0','91e945da-0a45-11f0-9bc1-32adce0096f0','a18f576e-075b-11f0-9bc1-32adce0096f0'),('19bfb4d2-1ead-11f0-b5b5-df40a1682685',0,'2025-04-21 12:35:25','2025-04-21 12:35:25',NULL,NULL,NULL,NULL,'83732965-a8aa-44a4-b1d5-30b2ef267d2a','1976b4cc-f6c6-4529-b628-6cd03c8c2616','6682d258-05e0-11f0-9bc1-32adce0096f0','91e945da-0a45-11f0-9bc1-32adce0096f0','242b6262-0757-11f0-9bc1-32adce0096f0'),('19bfb5cc-1ead-11f0-b5b5-df40a1682685',0,'2025-04-21 12:35:25','2025-04-21 12:35:25',NULL,NULL,NULL,NULL,'83732965-a8aa-44a4-b1d5-30b2ef267d2a','1976b4cc-f6c6-4529-b628-6cd03c8c2616','6682d258-05e0-11f0-9bc1-32adce0096f0','91e945da-0a45-11f0-9bc1-32adce0096f0','242b2ed2-0757-11f0-9bc1-32adce0096f0'),('19bfb6bc-1ead-11f0-b5b5-df40a1682685',0,'2025-04-21 12:35:25','2025-04-21 12:35:25',NULL,NULL,NULL,NULL,'83732965-a8aa-44a4-b1d5-30b2ef267d2a','86b59139-2c35-440e-9c1a-5004b2ff3996','6682d258-05e0-11f0-9bc1-32adce0096f0','91e945da-0a45-11f0-9bc1-32adce0096f0','9e50ed1a-075b-11f0-9bc1-32adce0096f0'),('19bfb7a2-1ead-11f0-b5b5-df40a1682685',0,'2025-04-21 12:35:25','2025-04-21 12:35:25',NULL,NULL,NULL,NULL,'83732965-a8aa-44a4-b1d5-30b2ef267d2a','86b59139-2c35-440e-9c1a-5004b2ff3996','6682d258-05e0-11f0-9bc1-32adce0096f0','91e945da-0a45-11f0-9bc1-32adce0096f0','a18f576e-075b-11f0-9bc1-32adce0096f0'),('19bfb93c-1ead-11f0-b5b5-df40a1682685',0,'2025-04-21 12:35:25','2025-04-21 12:35:25',NULL,NULL,NULL,NULL,'83732965-a8aa-44a4-b1d5-30b2ef267d2a','86b59139-2c35-440e-9c1a-5004b2ff3996','6682d258-05e0-11f0-9bc1-32adce0096f0','91e945da-0a45-11f0-9bc1-32adce0096f0','242b6262-0757-11f0-9bc1-32adce0096f0'),('19bfbad6-1ead-11f0-b5b5-df40a1682685',0,'2025-04-21 12:35:25','2025-04-21 12:35:25',NULL,NULL,NULL,NULL,'83732965-a8aa-44a4-b1d5-30b2ef267d2a','86b59139-2c35-440e-9c1a-5004b2ff3996','6682d258-05e0-11f0-9bc1-32adce0096f0','91e945da-0a45-11f0-9bc1-32adce0096f0','242b2ed2-0757-11f0-9bc1-32adce0096f0');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int NOT NULL,
  `category_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_category` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_by` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_by` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('91e945da-0a45-11f0-9bc1-32adce0096f0','Admin',NULL,0,'2025-03-26 13:23:56','2025-03-26 13:23:56',NULL,'ff570050-01a1-11f0-9bc1-32adce0096f0',NULL,NULL),('bfbdd16a-05e0-11f0-9bc1-32adce0096f0','Super Admin',NULL,1,'2025-03-20 23:12:09','2025-03-22 21:01:10',NULL,'ff570050-01a1-11f0-9bc1-32adce0096f0',NULL,NULL),('c8c02538-05e0-11f0-9bc1-32adce0096f0','Developer',NULL,1,'2025-03-20 23:12:24','2025-03-22 21:01:10',NULL,'ff570050-01a1-11f0-9bc1-32adce0096f0',NULL,NULL),('fbc41a9a-075f-11f0-9bc1-32adce0096f0','edited',NULL,1,'2025-03-22 20:55:27','2025-03-22 21:00:17',NULL,'ff570050-01a1-11f0-9bc1-32adce0096f0','ff570050-01a1-11f0-9bc1-32adce0096f0',NULL);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_module`
--

DROP TABLE IF EXISTS `sub_module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_module` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_by` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `module_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `channel_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_module`
--

LOCK TABLES `sub_module` WRITE;
/*!40000 ALTER TABLE `sub_module` DISABLE KEYS */;
INSERT INTO `sub_module` VALUES ('1976b4cc-f6c6-4529-b628-6cd03c8c2616','Product Category',NULL,0,'2025-04-21 12:33:04','2025-04-21 12:33:04',NULL,'ff570050-01a1-11f0-9bc1-32adce0096f0',NULL,NULL,'83732965-a8aa-44a4-b1d5-30b2ef267d2a','6682d258-05e0-11f0-9bc1-32adce0096f0'),('4ddd5b28-05e6-11f0-9bc1-32adce0096f0','User Role Assign',NULL,0,'2025-03-20 23:51:55','2025-03-20 23:51:55',NULL,'ff570050-01a1-11f0-9bc1-32adce0096f0',NULL,NULL,'2059b11a-05dc-11f0-9bc1-32adce0096f0','6682d258-05e0-11f0-9bc1-32adce0096f0'),('78a5a376-1e8f-11f0-b5b5-df40a1682685','User',NULL,0,'2025-04-21 09:03:20','2025-04-21 09:03:20',NULL,'ff570050-01a1-11f0-9bc1-32adce0096f0',NULL,NULL,'2059b11a-05dc-11f0-9bc1-32adce0096f0','6682d258-05e0-11f0-9bc1-32adce0096f0'),('86b59139-2c35-440e-9c1a-5004b2ff3996','Product',NULL,0,'2025-04-21 12:33:04','2025-04-21 12:33:04',NULL,'ff570050-01a1-11f0-9bc1-32adce0096f0',NULL,NULL,'83732965-a8aa-44a4-b1d5-30b2ef267d2a','6682d258-05e0-11f0-9bc1-32adce0096f0');
/*!40000 ALTER TABLE `sub_module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (uuid()),
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone1` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone2` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone3` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address1` text COLLATE utf8mb4_unicode_ci,
  `address2` text COLLATE utf8mb4_unicode_ci,
  `img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_by` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_by` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('9421426a-c38d-4e96-b897-dc1e7e2a825a','ko pyae','ko','pyae','kopyae@gmail.com','09899587877','','','$2b$10$XkadYbtYFga5lLFF6o9lmuioFxPrgskIGen1hiI2uKGQoTism3Fjq','yangon','','/Users/saiminpyaekyaw/Desktop/workspace/rbac-expressjs-starter/src/storage/uploads/file-1745244891156-430194354.jpg',0,'2025-04-21 14:14:51','2025-04-21 14:14:51',NULL,'ff570050-01a1-11f0-9bc1-32adce0096f0',NULL,NULL,NULL),('ff570050-01a1-11f0-9bc1-32adce0096f0','sai min','sai','min','saimin@gmail.com','09899587877','','','$2b$10$A8VkRDat6bOQYI9cljBgeeN39xd/.K5yaFK3BqYc3OmSQpkYpJRm.','yangon','','image url',0,'2025-03-15 13:32:53','2025-03-26 13:30:49',NULL,'ab546ce6-f5f2-11ef-9bc1-32adce0096f0',NULL,NULL,'91e945da-0a45-11f0-9bc1-32adce0096f0');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-21 22:27:16
