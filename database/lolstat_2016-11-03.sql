# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.42)
# Database: lolstat
# Generation Time: 2016-11-03 12:24:40 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table formatted_match_data
# ------------------------------------------------------------

DROP TABLE IF EXISTS `formatted_match_data`;

CREATE TABLE `formatted_match_data` (
  `matchId` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(20) NOT NULL DEFAULT '0',
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
  `date` int(12) DEFAULT NULL,
  `timeline` longtext,
  `teamKills` int(11) DEFAULT NULL,
  `teamDeaths` int(11) DEFAULT NULL,
  `teamAssists` int(11) DEFAULT NULL,
  `winner` char(5) DEFAULT NULL,
  PRIMARY KEY (`matchId`,`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table matches
# ------------------------------------------------------------

DROP TABLE IF EXISTS `matches`;

CREATE TABLE `matches` (
  `matchId` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `summonerId` int(11) unsigned NOT NULL DEFAULT '0',
  `region` varchar(11) DEFAULT NULL,
  `champion` int(11) DEFAULT NULL,
  `queue` varchar(50) DEFAULT NULL,
  `season` varchar(50) DEFAULT NULL,
  `timestamp` int(11) DEFAULT NULL,
  `lane` varchar(50) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `platformId` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`matchId`,`summonerId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table raw_match_data
# ------------------------------------------------------------

DROP TABLE IF EXISTS `raw_match_data`;

CREATE TABLE `raw_match_data` (
  `matchId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `data` longtext,
  PRIMARY KEY (`matchId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table static_champions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `static_champions`;

CREATE TABLE `static_champions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `key` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table summoners
# ------------------------------------------------------------

DROP TABLE IF EXISTS `summoners`;

CREATE TABLE `summoners` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(50) DEFAULT NULL,
  `summonerLevel` int(11) DEFAULT NULL,
  `revisionDate` int(15) DEFAULT NULL,
  `profileIconId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
