-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 28, 2019 at 03:55 PM
-- Server version: 5.7.24
-- PHP Version: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `loldatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `formatted_match_data`
--

DROP TABLE IF EXISTS `formatted_match_data`;
CREATE TABLE IF NOT EXISTS `formatted_match_data` (
  `matchId` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `userId` varchar(200) NOT NULL DEFAULT '0',
  `participantId` int(2) DEFAULT NULL,
  `matchDuration` int(11) DEFAULT NULL,
  `goldEarned` int(11) DEFAULT NULL,
  `visionWardsBoughtInGame` int(11) DEFAULT NULL,
  `wardsPlaced` int(11) DEFAULT NULL,
  `wardsKilled` int(11) DEFAULT NULL,
  `kills` int(11) DEFAULT NULL,
  `deaths` int(11) DEFAULT NULL,
  `assists` int(11) DEFAULT NULL,
  `minionsKilled` int(11) DEFAULT NULL,
  `neutralMinionsKilled` int(11) DEFAULT NULL,
  `champLevel` int(2) DEFAULT NULL,
  `champion` int(5) DEFAULT NULL,
  `lane` varchar(11) DEFAULT NULL,
  `role` varchar(11) DEFAULT NULL,
  `queue` varchar(11) DEFAULT NULL,
  `season` varchar(11) DEFAULT NULL,
  `matchCreation` bigint(20) DEFAULT NULL,
  `timeline` longtext,
  `teamKills` int(11) DEFAULT NULL,
  `teamDeaths` int(11) DEFAULT NULL,
  `teamAssists` int(11) UNSIGNED DEFAULT NULL,
  `winner` int(5) DEFAULT NULL,
  `visionScore` int(10) DEFAULT NULL,
  `timeCCingOthers` int(10) DEFAULT NULL,
  `damageDealtToObjectives` int(10) DEFAULT NULL,
  `damageDealtToTurrets` int(10) DEFAULT NULL,
  `objectivePlayerScore` int(10) DEFAULT NULL,
  `combatPlayerScore` int(10) DEFAULT NULL,
  `totalPlayerScore` int(10) DEFAULT NULL,
  `totalScoreRank` int(10) DEFAULT NULL,
  PRIMARY KEY (`matchId`,`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `matches`
--

DROP TABLE IF EXISTS `matches`;
CREATE TABLE IF NOT EXISTS `matches` (
  `matchId` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `summonerId` varchar(200) NOT NULL DEFAULT '0',
  `champion` int(11) DEFAULT NULL,
  `queue` varchar(50) DEFAULT NULL,
  `season` varchar(50) DEFAULT NULL,
  `timestamp` bigint(20) DEFAULT NULL,
  `lane` varchar(50) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `platformId` varchar(11) DEFAULT NULL,
  `gameId` bigint(20) DEFAULT NULL,
  `accountId` varchar(200) NOT NULL DEFAULT '0',
  PRIMARY KEY (`matchId`,`summonerId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `queue`
--

DROP TABLE IF EXISTS `queue`;
CREATE TABLE IF NOT EXISTS `queue` (
  `id` int(11) UNSIGNED NOT NULL,
  `handle` char(50) DEFAULT NULL,
  `name` char(50) DEFAULT NULL,
  `depricated` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `raw_match_data`
--

DROP TABLE IF EXISTS `raw_match_data`;
CREATE TABLE IF NOT EXISTS `raw_match_data` (
  `matchId` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `data` json NOT NULL,
  PRIMARY KEY (`matchId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
CREATE TABLE IF NOT EXISTS `regions` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `region` char(6) DEFAULT NULL,
  `platform_id` char(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `season`
--

DROP TABLE IF EXISTS `season`;
CREATE TABLE IF NOT EXISTS `season` (
  `id` int(11) UNSIGNED NOT NULL,
  `handle` char(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `static_champions`
--

DROP TABLE IF EXISTS `static_champions`;
CREATE TABLE IF NOT EXISTS `static_champions` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `key` varchar(50) DEFAULT NULL,
  `attack` int(11) DEFAULT '0',
  `magic` int(11) DEFAULT '0',
  `crowdcontrol` int(11) DEFAULT '0',
  `defence_armour` int(11) DEFAULT '0',
  `defence_magic` int(11) DEFAULT '0',
  `heal` int(11) DEFAULT '0',
  `shield` int(11) DEFAULT '0',
  `tags` varchar(50) DEFAULT NULL,
  `stats` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `static_items`
--

DROP TABLE IF EXISTS `static_items`;
CREATE TABLE IF NOT EXISTS `static_items` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `gold` double DEFAULT NULL,
  `health` double DEFAULT NULL,
  `magicresistance` int(11) DEFAULT NULL,
  `armor` int(11) DEFAULT NULL,
  `cdReduction` int(11) DEFAULT NULL,
  `mana` int(11) DEFAULT NULL,
  `isBoot` tinyint(1) DEFAULT NULL,
  `percentBonusHealth` int(11) DEFAULT NULL,
  `consideredTankItem` tinyint(1) DEFAULT NULL,
  `comment` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `summoners`
--

DROP TABLE IF EXISTS `summoners`;
CREATE TABLE IF NOT EXISTS `summoners` (
  `id` varchar(200) NOT NULL,
  `accountId` varchar(200) DEFAULT NULL,
  `name` char(50) DEFAULT NULL,
  `profileIconId` int(11) DEFAULT NULL,
  `revisionDate` bigint(20) DEFAULT NULL,
  `summonerLevel` int(11) DEFAULT NULL,
  `puuid` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `version`
--

DROP TABLE IF EXISTS `version`;
CREATE TABLE IF NOT EXISTS `version` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `version` char(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
