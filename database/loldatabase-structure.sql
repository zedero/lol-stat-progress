-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 28, 2019 at 08:08 PM
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
) ENGINE=InnoDB AUTO_INCREMENT=3906607295 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=3906607295 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=3906607295 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=556 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `static_items`
--

INSERT INTO `static_items` (`id`, `name`, `gold`, `health`, `magicresistance`, `armor`, `cdReduction`, `mana`, `isBoot`, `percentBonusHealth`, `consideredTankItem`, `comment`) VALUES
(1, 'Banner of Command', 2200, 0, 30, 60, 0, 0, 0, 0, 1, NULL),
(2, 'Dead Man\'s Plate', 2900, 425, 0, 60, 0, 0, 0, 0, 1, NULL),
(3, 'Frozen Heart', 2700, 0, 0, 100, 20, 400, 0, 0, 1, NULL),
(4, 'Guardian Angel', 2800, 0, 0, 40, 0, 0, 0, 0, 0, NULL),
(5, 'Iceborn Gauntlet', 2700, 0, 0, 65, 20, 500, 0, 0, 0, NULL),
(6, 'Knight\'s Vow', 2200, 250, 0, 40, 10, 0, 0, 0, 1, ''),
(7, 'Locket of the Iron Solari', 2200, 0, 60, 30, 0, 0, 0, 0, 1, 'count shield as health??'),
(8, 'Ninja Tabi', 1100, 0, 0, 20, 0, 0, 1, 0, 1, '12% basic attack dmg reduction'),
(9, 'Ohmwrecker', 2650, 300, 0, 50, 10, 0, 0, 0, 1, NULL),
(10, 'Randuin\'s Omen', 2900, 400, 0, 60, 0, 0, 0, 0, 1, NULL),
(11, 'Sunfire Cape', 2750, 425, 0, 60, 0, 0, 0, 0, 1, NULL),
(12, 'Talisman of Ascension', 2200, 0, 0, 45, 10, 0, 0, 0, 1, NULL),
(13, 'Thornmail', 2900, 250, 0, 80, 0, 0, 0, 0, 1, NULL),
(14, 'Zeke\'s Harbinger', 2250, 0, 0, 30, 10, 250, 0, 0, 1, NULL),
(15, 'Zhonya\'s Hourglass', 2900, 0, 0, 45, 10, 0, 0, 0, 0, NULL),
(16, 'Zz\'Rot Portal', 2700, 0, 55, 55, 0, 0, 0, 0, 1, NULL),
(17, 'Abyssal Scepter', 2800, 300, 65, 0, 10, 0, 0, 0, 0, NULL),
(18, 'Athene\'s Unholy Grail', 2100, 0, 30, 0, 10, 0, 0, 0, 0, NULL),
(19, 'Banshee\'s Veil', 3000, 0, 60, 0, 10, 0, 0, 0, 0, NULL),
(20, 'Edge of Night', 3000, 250, 0, 0, 0, 0, 0, 0, 0, NULL),
(21, 'Maw of Malmortius', 3250, 0, 50, 0, 10, 0, 0, 0, 0, NULL),
(22, 'Mercurial Scimitar', 3400, 0, 35, 0, 0, 0, 0, 0, 0, NULL),
(23, 'Mercury\'s Treads', 1100, 0, 25, 0, 0, 0, 1, 0, 1, NULL),
(24, 'Mikael\'s Crucible', 2100, 0, 40, 0, 10, 0, 0, 0, 0, NULL),
(25, 'Spirit Visage', 2800, 450, 55, 0, 10, 0, 0, 0, 1, NULL),
(26, 'Wit\'s End', 2400, 0, 40, 0, 0, 0, 0, 0, 0, NULL),
(27, 'Doran\'s Shield', 450, 80, 0, 0, 0, 0, 0, 0, 1, NULL),
(28, 'Eye of the Equinox', 2300, 500, 0, 0, 10, 0, 0, 0, 1, NULL),
(29, 'Eye of the Oasis', 1900, 200, 0, 0, 10, 0, 0, 0, 1, NULL),
(30, 'Eye of the Watchers', 1800, 200, 0, 0, 10, 0, 0, 0, 0, NULL),
(31, 'Face of the Mountain', 2200, 450, 0, 0, 10, 0, 0, 0, 1, NULL),
(32, 'Frozen Mallet', 3100, 700, 0, 0, 0, 0, 0, 0, 0, NULL),
(33, 'Hextech GLP-800', 3000, 300, 0, 0, 10, 600, 0, 0, 0, NULL),
(34, 'Hextech Protobelt-01', 2500, 300, 0, 0, 10, 0, 0, 0, 0, NULL),
(35, 'Liandry\'s Torment', 3100, 300, 0, 0, 0, 0, 0, 0, 0, NULL),
(36, 'Redemption', 2100, 200, 0, 0, 10, 0, 0, 0, 1, NULL),
(37, 'Righteous Glory', 2650, 400, 0, 0, 10, 300, 0, 0, 1, NULL),
(38, 'Rod of Ages', 2700, 300, 0, 0, 0, 300, 0, 0, 0, 'stacks NOT calculated into stats'),
(39, 'Ruby Sightstone', 1600, 500, 0, 0, 0, 0, 0, 0, 0, NULL),
(40, 'Rylai\'s Crystal Scepter', 2600, 300, 0, 0, 0, 0, 0, 0, 0, NULL),
(41, 'Sterak\'s Gage', 3200, 450, 0, 0, 0, 0, 0, 0, 0, NULL),
(42, 'Titanic Hydra', 3500, 450, 0, 0, 0, 0, 0, 0, 0, NULL),
(43, 'Trinity Force', 3733, 250, 0, 0, 20, 0, 0, 0, 0, NULL),
(44, 'Warmog\'s Armor', 2850, 800, 0, 0, 10, 0, 0, 0, 1, NULL),
(45, 'Cinderhulk', 2500, 300, 0, 0, 0, 0, 0, 15, 1, NULL),
(46, 'Cloth armor', 300, 0, 0, 15, 0, 0, 0, 0, 1, NULL),
(47, 'Null-Magic Mantle', 450, 0, 25, 0, 0, 0, 0, 0, 0, NULL),
(48, 'Ruby Crystal', 400, 150, 0, 0, 0, 0, 0, 0, 0, NULL),
(49, 'Sightstone', 800, 150, 0, 0, 0, 0, 0, 0, 0, NULL),
(50, 'Adaptive Helm', 2800, 350, 55, 0, 10, 0, 0, 0, 1, NULL),
(51, 'Gargoyle Stoneplate', 2500, 0, 40, 40, 0, 0, 0, 0, 1, NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
