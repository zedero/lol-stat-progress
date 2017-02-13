# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.42)
# Database: lolstat
# Generation Time: 2016-11-15 10:18:10 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table summoners
# ------------------------------------------------------------

LOCK TABLES `summoners` WRITE;
/*!40000 ALTER TABLE `summoners` DISABLE KEYS */;

INSERT INTO `summoners` (`id`, `name`, `summonerLevel`, `revisionDate`, `profileIconId`)
VALUES
	(19887289,'Imaqtpie',30,1478808555000,629),
	(37762998,'Frozenw0lf',30,1478808555000,26),
	(47646370,'Flemg',30,1478808555000,661),
	(64882059,'Vuile hond',30,1478808555000,1116),
	(64952242,'CBasher',30,1478808555000,953),
	(65002229,'I am Zedero',30,1478808555000,870),
	(69850999,'Pienaarsteven',30,1478808555000,1381);

/*!40000 ALTER TABLE `summoners` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
