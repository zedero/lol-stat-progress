# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.42)
# Database: lolstat
# Generation Time: 2017-05-05 08:19:51 +0000
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
  `matchId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
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
  `matchCreation` bigint(20) DEFAULT NULL,
  `timeline` longtext,
  `teamKills` int(11) DEFAULT NULL,
  `teamDeaths` int(11) DEFAULT NULL,
  `teamAssists` int(11) unsigned DEFAULT NULL,
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



# Dump of table matches
# ------------------------------------------------------------

DROP TABLE IF EXISTS `matches`;

CREATE TABLE `matches` (
  `matchId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `summonerId` int(11) unsigned NOT NULL DEFAULT '0',
  `champion` int(11) DEFAULT NULL,
  `queue` varchar(50) DEFAULT NULL,
  `season` varchar(50) DEFAULT NULL,
  `timestamp` bigint(20) DEFAULT NULL,
  `lane` varchar(50) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `platformId` varchar(11) DEFAULT NULL,
  `gameId` int(20) DEFAULT NULL,
  `accountId` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`matchId`,`summonerId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table queue
# ------------------------------------------------------------

DROP TABLE IF EXISTS `queue`;

CREATE TABLE `queue` (
  `id` int(11) unsigned NOT NULL,
  `handle` char(50) DEFAULT NULL,
  `name` char(50) DEFAULT NULL,
  `depricated` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `queue` WRITE;
/*!40000 ALTER TABLE `queue` DISABLE KEYS */;

INSERT INTO `queue` (`id`, `handle`, `name`, `depricated`)
VALUES
	(0,'CUSTOM','',0),
	(2,'NORMAL_5x5_BLIND',NULL,0),
	(4,'RANKED_SOLO_5x5',NULL,0),
	(6,'RANKED_PREMADE_5x5',NULL,1),
	(7,'BOT_5x5',NULL,1),
	(8,'NORMAL_3x3',NULL,0),
	(9,'RANKED_FLEX_TT',NULL,1),
	(14,'NORMAL_5x5_DRAFT',NULL,0),
	(16,'ODIN_5x5_BLIND',NULL,0),
	(17,'ODIN_5x5_DRAFT',NULL,0),
	(25,'BOT_ODIN_5x5',NULL,0),
	(31,'BOT_5x5_INTRO',NULL,0),
	(32,'BOT_5x5_BEGINNER',NULL,0),
	(33,'BOT_5x5_INTERMEDIATE',NULL,0),
	(41,'RANKED_TEAM_3x3',NULL,1),
	(42,'RANKED_TEAM_5x5',NULL,0),
	(52,'BOT_TT_3x3',NULL,0),
	(61,'GROUP_FINDER_5x5',NULL,0),
	(65,'ARAM_5x5',NULL,0),
	(70,'ONEFORALL_5x5',NULL,0),
	(72,'FIRSTBLOOD_1x1',NULL,0),
	(73,'FIRSTBLOOD_2x2',NULL,0),
	(75,'SR_6x6',NULL,0),
	(76,'URF_5x5',NULL,0),
	(78,'ONEFORALL_MIRRORMODE',NULL,0),
	(83,'BOT_URF_5x5',NULL,0),
	(91,'NIGHTMARE_BOT_5x5_RANK1',NULL,0),
	(92,'NIGHTMARE_BOT_5x5_RANK2',NULL,0),
	(93,'NIGHTMARE_BOT_5x5_RANK3',NULL,0),
	(96,'ASCENSION_5x5',NULL,0),
	(98,'HEXAKILL',NULL,0),
	(100,'BILGEWATER_ARAM_5x5',NULL,0),
	(300,'KING_PORO_5x5',NULL,0),
	(310,'COUNTER_PICK',NULL,0),
	(313,'BILGEWATER_5x5',NULL,0),
	(315,'SIEGE',NULL,0),
	(317,'DEFINITELY_NOT_DOMINION_5x5',NULL,0),
	(318,'ARURF_5X5',NULL,0),
	(325,'ARSR_5x5',NULL,0),
	(400,'TEAM_BUILDER_DRAFT_UNRANKED_5x5',NULL,0),
	(410,'TEAM_BUILDER_DRAFT_RANKED_5x5',NULL,1),
	(420,'TEAM_BUILDER_RANKED_SOLO',NULL,0),
	(440,'RANKED_FLEX_SR',NULL,0),
	(600,'ASSASSINATE_5x5',NULL,0),
	(610,'DARKSTAR_3x3',NULL,0);

/*!40000 ALTER TABLE `queue` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table raw_match_data
# ------------------------------------------------------------

DROP TABLE IF EXISTS `raw_match_data`;

CREATE TABLE `raw_match_data` (
  `matchId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `data` longtext,
  PRIMARY KEY (`matchId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table regions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `regions`;

CREATE TABLE `regions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `region` char(6) DEFAULT NULL,
  `platform_id` char(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;

INSERT INTO `regions` (`id`, `region`, `platform_id`)
VALUES
	(1,'NA','NA1'),
	(2,'EUNE','EUN1'),
	(3,'EUW','EUW1'),
	(4,'KR','KR'),
	(5,'BR','BR1'),
	(6,'JP','JP1'),
	(7,'LAN','LA1'),
	(8,'LAS','LA2'),
	(9,'OCE','OC1'),
	(10,'TR','TR1'),
	(11,'RU','RU'),
	(12,'PBE','PBE1'),
	(13,'Global','global');

/*!40000 ALTER TABLE `regions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table season
# ------------------------------------------------------------

DROP TABLE IF EXISTS `season`;

CREATE TABLE `season` (
  `id` int(11) unsigned NOT NULL,
  `handle` char(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `season` WRITE;
/*!40000 ALTER TABLE `season` DISABLE KEYS */;

INSERT INTO `season` (`id`, `handle`)
VALUES
	(0,'PRESEASON3'),
	(1,'SEASON3'),
	(2,'PRESEASON2014'),
	(3,'SEASON2014'),
	(4,'PRESEASON2015'),
	(5,'SEASON2015'),
	(6,'PRESEASON2016'),
	(7,'SEASON2016'),
	(8,'PRESEASON2017');

/*!40000 ALTER TABLE `season` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table static_champions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `static_champions`;

CREATE TABLE `static_champions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
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

LOCK TABLES `static_champions` WRITE;
/*!40000 ALTER TABLE `static_champions` DISABLE KEYS */;

INSERT INTO `static_champions` (`id`, `name`, `title`, `key`, `attack`, `magic`, `crowdcontrol`, `defence_armour`, `defence_magic`, `heal`, `shield`, `tags`, `stats`)
VALUES
	(0,'Select a champion','title','select',0,0,0,0,0,0,0,'[\"\"]','{\"armor\":0,\"armorperlevel\":0,\"attackdamage\":0,\"attackdamageperlevel\":0,\"attackrange\":0,\"attackspeedoffset\":0,\"attackspeedperlevel\":0,\"crit\":0,\"critperlevel\":0,\"hp\":0,\"hpperlevel\":0,\"hpregen\":0,\"hpregenperlevel\":0,\"movespeed\":0,\"mp\":0,\"mpperlevel\":0,\"mpregen\":0,\"mpregenperlevel\":0,\"spellblock\":0,\"spellblockperlevel\":0}'),
	(1,'Annie','the Dark Child','Annie',2,10,8,3,3,0,0,'[\"Mage\"]','{\"armor\":19.22,\"armorperlevel\":4,\"attackdamage\":50.41,\"attackdamageperlevel\":2.625,\"attackrange\":575,\"attackspeedoffset\":0.08,\"attackspeedperlevel\":1.36,\"crit\":0,\"critperlevel\":0,\"hp\":511.68,\"hpperlevel\":76,\"hpregen\":5.424,\"hpregenperlevel\":0.55,\"movespeed\":335,\"mp\":334,\"mpperlevel\":50,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(2,'Olaf','the Berserker','Olaf',9,3,4,5,5,4,0,'[\"Fighter\",\"Tank\"]','{\"armor\":26.04,\"armorperlevel\":3,\"attackdamage\":59.98,\"attackdamageperlevel\":3.5,\"attackrange\":125,\"attackspeedoffset\":-0.1,\"attackspeedperlevel\":2.7,\"crit\":0,\"critperlevel\":0,\"hp\":597.24,\"hpperlevel\":93,\"hpregen\":8.512,\"hpregenperlevel\":0.9,\"movespeed\":350,\"mp\":315.6,\"mpperlevel\":42,\"mpregen\":7.466,\"mpregenperlevel\":0.575,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(3,'Galio','the Colossus','Galio',1,6,9,8,10,0,4,'[\"Tank\",\"Mage\"]','{\"armor\":27,\"armorperlevel\":3.5,\"attackdamage\":59,\"attackdamageperlevel\":3.5,\"attackrange\":150,\"attackspeedoffset\":0,\"attackspeedperlevel\":1.5,\"crit\":0,\"critperlevel\":0,\"hp\":550,\"hpperlevel\":100,\"hpregen\":8,\"hpregenperlevel\":0.8,\"movespeed\":335,\"mp\":400,\"mpperlevel\":40,\"mpregen\":7,\"mpregenperlevel\":0.7,\"spellblock\":32,\"spellblockperlevel\":1.25}'),
	(4,'Twisted Fate','the Card Master','TwistedFate',6,6,7,2,2,0,0,'[\"Mage\"]','{\"armor\":20.542,\"armorperlevel\":3.15,\"attackdamage\":49.954,\"attackdamageperlevel\":3.3,\"attackrange\":525,\"attackspeedoffset\":-0.04,\"attackspeedperlevel\":3.22,\"crit\":0,\"critperlevel\":0,\"hp\":521.76,\"hpperlevel\":82,\"hpregen\":5.508,\"hpregenperlevel\":0.6,\"movespeed\":330,\"mp\":265.84,\"mpperlevel\":38,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(5,'Xin Zhao','the Seneschal of Demacia','XinZhao',8,3,8,6,6,6,0,'[\"Fighter\",\"Assassin\"]','{\"armor\":25.88,\"armorperlevel\":3.5,\"attackdamage\":57.544,\"attackdamageperlevel\":3.3,\"attackrange\":175,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.6,\"crit\":0,\"critperlevel\":0,\"hp\":600,\"hpperlevel\":92,\"hpregen\":8.176,\"hpregenperlevel\":0.7,\"movespeed\":345,\"mp\":273.8,\"mpperlevel\":35,\"mpregen\":7.256,\"mpregenperlevel\":0.45,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(6,'Urgot','the Headsman\'s Pride','Urgot',8,3,6,5,5,0,2,'[\"Marksman\",\"Fighter\"]','{\"armor\":24.544,\"armorperlevel\":3.3,\"attackdamage\":54.05,\"attackdamageperlevel\":3.6,\"attackrange\":425,\"attackspeedoffset\":-0.03,\"attackspeedperlevel\":2.9,\"crit\":0,\"critperlevel\":0,\"hp\":586.52,\"hpperlevel\":89,\"hpregen\":6.508,\"hpregenperlevel\":0.6,\"movespeed\":335,\"mp\":312.4,\"mpperlevel\":55,\"mpregen\":8.592,\"mpregenperlevel\":0.65,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(7,'LeBlanc','the Deceiver','Leblanc',1,10,4,4,4,0,0,'[\"Assassin\",\"Mage\"]','{\"armor\":21.88,\"armorperlevel\":3.5,\"attackdamage\":54.88,\"attackdamageperlevel\":3.5,\"attackrange\":525,\"attackspeedoffset\":0,\"attackspeedperlevel\":1.4,\"crit\":0,\"critperlevel\":0,\"hp\":516,\"hpperlevel\":80,\"hpregen\":7.4,\"hpregenperlevel\":0.55,\"movespeed\":340,\"mp\":334,\"mpperlevel\":50,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(8,'Vladimir','the Crimson Reaper','Vladimir',2,8,3,6,6,9,0,'[\"Mage\",\"Tank\"]','{\"armor\":23,\"armorperlevel\":3.3,\"attackdamage\":55,\"attackdamageperlevel\":3,\"attackrange\":450,\"attackspeedoffset\":-0.05,\"attackspeedperlevel\":2,\"crit\":0,\"critperlevel\":0,\"hp\":525,\"hpperlevel\":84,\"hpregen\":7.008,\"hpregenperlevel\":0.6,\"movespeed\":330,\"mp\":2,\"mpperlevel\":0,\"mpregen\":0,\"mpregenperlevel\":0,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(9,'Fiddlesticks','the Harbinger of Doom','Fiddlesticks',2,9,6,3,3,3,0,'[\"Mage\",\"Support\"]','{\"armor\":20.88,\"armorperlevel\":3.5,\"attackdamage\":48.36,\"attackdamageperlevel\":2.625,\"attackrange\":480,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.11,\"crit\":0,\"critperlevel\":0,\"hp\":524.4,\"hpperlevel\":80,\"hpregen\":5.608,\"hpregenperlevel\":0.6,\"movespeed\":335,\"mp\":400.12,\"mpperlevel\":56,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(10,'Kayle','The Judicator','Kayle',6,7,3,6,6,4,0,'[\"Fighter\",\"Support\"]','{\"armor\":26.88,\"armorperlevel\":3.5,\"attackdamage\":51,\"attackdamageperlevel\":2.8,\"attackrange\":125,\"attackspeedoffset\":-0.02,\"attackspeedperlevel\":2.2,\"crit\":0,\"critperlevel\":0,\"hp\":574.24,\"hpperlevel\":93,\"hpregen\":8.26,\"hpregenperlevel\":0.75,\"movespeed\":335,\"mp\":322.2,\"mpperlevel\":40,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(11,'Master Yi','the Wuju Bladesman','MasterYi',10,2,0,4,4,2,0,'[\"Assassin\",\"Fighter\"]','{\"armor\":24.04,\"armorperlevel\":3,\"attackdamage\":60.04,\"attackdamageperlevel\":3,\"attackrange\":125,\"attackspeedoffset\":-0.08,\"attackspeedperlevel\":2,\"crit\":0,\"critperlevel\":0,\"hp\":598.56,\"hpperlevel\":92,\"hpregen\":7.592,\"hpregenperlevel\":0.65,\"movespeed\":355,\"mp\":250.56,\"mpperlevel\":42,\"mpregen\":7.256,\"mpregenperlevel\":0.45,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(12,'Alistar','the Minotaur','Alistar',6,5,9,9,9,3,0,'[\"Tank\",\"Support\"]','{\"armor\":24.38,\"armorperlevel\":3.5,\"attackdamage\":61.1116,\"attackdamageperlevel\":3.62,\"attackrange\":125,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.125,\"crit\":0,\"critperlevel\":0,\"hp\":613.36,\"hpperlevel\":106,\"hpregen\":8.678,\"hpregenperlevel\":0.85,\"movespeed\":330,\"mp\":278.84,\"mpperlevel\":38,\"mpregen\":8.5,\"mpregenperlevel\":0.8,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(13,'Ryze','the Rune Mage','Ryze',2,10,6,2,2,0,3,'[\"Mage\",\"Fighter\"]','{\"armor\":21.552,\"armorperlevel\":3,\"attackdamage\":55.04,\"attackdamageperlevel\":3,\"attackrange\":550,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.112,\"crit\":0,\"critperlevel\":0,\"hp\":558.48,\"hpperlevel\":86,\"hpregen\":7,\"hpregenperlevel\":0.55,\"movespeed\":340,\"mp\":400,\"mpperlevel\":50,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(14,'Sion','The Undead Juggernaut','Sion',5,3,8,9,9,0,5,'[\"Tank\",\"Fighter\"]','{\"armor\":23.04,\"armorperlevel\":3,\"attackdamage\":59.72,\"attackdamageperlevel\":4,\"attackrange\":175,\"attackspeedoffset\":-0.08,\"attackspeedperlevel\":1.3,\"crit\":0,\"critperlevel\":0,\"hp\":542.64,\"hpperlevel\":73,\"hpregen\":10.18,\"hpregenperlevel\":0.8,\"movespeed\":345,\"mp\":325.6,\"mpperlevel\":42,\"mpregen\":8.008,\"mpregenperlevel\":0.6,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(15,'Sivir','the Battle Mistress','Sivir',9,1,0,3,3,0,0,'[\"Marksman\"]','{\"armor\":22.21,\"armorperlevel\":3.25,\"attackdamage\":57.46,\"attackdamageperlevel\":2.41,\"attackrange\":500,\"attackspeedoffset\":0,\"attackspeedperlevel\":1.6,\"crit\":0,\"critperlevel\":0,\"hp\":515.76,\"hpperlevel\":82,\"hpregen\":5.174,\"hpregenperlevel\":0.55,\"movespeed\":335,\"mp\":284,\"mpperlevel\":50,\"mpregen\":8.012,\"mpregenperlevel\":0.9,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(16,'Soraka','the Starchild','Soraka',2,7,4,5,5,10,0,'[\"Support\",\"Mage\"]','{\"armor\":23.384,\"armorperlevel\":3.8,\"attackdamage\":50.04,\"attackdamageperlevel\":3,\"attackrange\":550,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.14,\"crit\":0,\"critperlevel\":0,\"hp\":529.04,\"hpperlevel\":78,\"hpregen\":2.5,\"hpregenperlevel\":0.5,\"movespeed\":325,\"mp\":350.8,\"mpperlevel\":60,\"mpregen\":11.5,\"mpregenperlevel\":0.4,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(17,'Teemo','the Swift Scout','Teemo',5,7,4,3,3,0,0,'[\"Marksman\",\"Assassin\"]','{\"armor\":24.3,\"armorperlevel\":3.75,\"attackdamage\":49.54,\"attackdamageperlevel\":3,\"attackrange\":500,\"attackspeedoffset\":-0.0947,\"attackspeedperlevel\":3.38,\"crit\":0,\"critperlevel\":0,\"hp\":515.76,\"hpperlevel\":82,\"hpregen\":5.742,\"hpregenperlevel\":0.65,\"movespeed\":330,\"mp\":267.2,\"mpperlevel\":40,\"mpregen\":7.206,\"mpregenperlevel\":0.45,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(18,'Tristana','the Yordle Gunner','Tristana',9,5,5,3,3,0,0,'[\"Marksman\",\"Assassin\"]','{\"armor\":22,\"armorperlevel\":3,\"attackdamage\":56.96,\"attackdamageperlevel\":2.41,\"attackrange\":550,\"attackspeedoffset\":-0.0473,\"attackspeedperlevel\":1.5,\"crit\":0,\"critperlevel\":0,\"hp\":542.76,\"hpperlevel\":82,\"hpregen\":6.192,\"hpregenperlevel\":0.65,\"movespeed\":325,\"mp\":246.76,\"mpperlevel\":32,\"mpregen\":7.206,\"mpregenperlevel\":0.45,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(19,'Warwick','the Uncaged Wrath of Zaun','Warwick',9,3,6,5,5,8,4,'[\"Fighter\",\"Tank\"]','{\"armor\":24.04,\"armorperlevel\":3.2,\"attackdamage\":58,\"attackdamageperlevel\":3,\"attackrange\":125,\"attackspeedoffset\":-0.02,\"attackspeedperlevel\":2.3,\"crit\":0,\"critperlevel\":0,\"hp\":550,\"hpperlevel\":85,\"hpregen\":3.75,\"hpregenperlevel\":0.75,\"movespeed\":335,\"mp\":280,\"mpperlevel\":35,\"mpregen\":7.466,\"mpregenperlevel\":0.575,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(20,'Nunu','the Yeti Rider','Nunu',4,7,3,6,6,4,0,'[\"Support\",\"Fighter\"]','{\"armor\":26.38,\"armorperlevel\":3.5,\"attackdamage\":59,\"attackdamageperlevel\":4,\"attackrange\":125,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.25,\"crit\":0,\"critperlevel\":0,\"hp\":575,\"hpperlevel\":90,\"hpregen\":7,\"hpregenperlevel\":0.8,\"movespeed\":350,\"mp\":283.56,\"mpperlevel\":42,\"mpregen\":7.44,\"mpregenperlevel\":0.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(21,'Miss Fortune','the Bounty Hunter','MissFortune',8,5,5,2,2,0,0,'[\"Marksman\"]','{\"armor\":24.04,\"armorperlevel\":3,\"attackdamage\":46,\"attackdamageperlevel\":1,\"attackrange\":550,\"attackspeedoffset\":-0.0473,\"attackspeedperlevel\":3,\"crit\":0,\"critperlevel\":0,\"hp\":530,\"hpperlevel\":85,\"hpregen\":6.192,\"hpregenperlevel\":0.65,\"movespeed\":325,\"mp\":325.84,\"mpperlevel\":35,\"mpregen\":8.042,\"mpregenperlevel\":0.65,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(22,'Ashe','the Frost Archer','Ashe',7,2,8,3,3,0,0,'[\"Marksman\",\"Support\"]','{\"armor\":21.212,\"armorperlevel\":3.4,\"attackdamage\":56.508,\"attackdamageperlevel\":2.26,\"attackrange\":600,\"attackspeedoffset\":-0.05,\"attackspeedperlevel\":3.33,\"crit\":0,\"critperlevel\":0,\"hp\":527.72,\"hpperlevel\":79,\"hpregen\":5.424,\"hpregenperlevel\":0.55,\"movespeed\":325,\"mp\":280,\"mpperlevel\":32,\"mpregen\":6.972,\"mpregenperlevel\":0.4,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(23,'Tryndamere','the Barbarian King','Tryndamere',10,2,4,5,5,3,0,'[\"Fighter\",\"Assassin\"]','{\"armor\":24.108,\"armorperlevel\":3.1,\"attackdamage\":61.376,\"attackdamageperlevel\":3.2,\"attackrange\":125,\"attackspeedoffset\":-0.0672,\"attackspeedperlevel\":2.9,\"crit\":0,\"critperlevel\":0,\"hp\":625.64,\"hpperlevel\":98,\"hpregen\":8.512,\"hpregenperlevel\":0.9,\"movespeed\":345,\"mp\":100,\"mpperlevel\":0,\"mpregen\":0,\"mpregenperlevel\":0,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(24,'Jax','Grandmaster at Arms','Jax',7,7,5,5,5,0,0,'[\"Fighter\",\"Assassin\"]','{\"armor\":27.04,\"armorperlevel\":3,\"attackdamage\":61.97,\"attackdamageperlevel\":3.375,\"attackrange\":125,\"attackspeedoffset\":-0.02,\"attackspeedperlevel\":3.4,\"crit\":0,\"critperlevel\":0,\"hp\":592.8,\"hpperlevel\":85,\"hpregen\":8.374,\"hpregenperlevel\":0.55,\"movespeed\":350,\"mp\":338.8,\"mpperlevel\":32,\"mpregen\":7.576,\"mpregenperlevel\":0.7,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(25,'Morgana','Fallen Angel','Morgana',1,8,8,6,6,0,7,'[\"Mage\",\"Support\"]','{\"armor\":25.384,\"armorperlevel\":3.8,\"attackdamage\":55.46,\"attackdamageperlevel\":3.5,\"attackrange\":450,\"attackspeedoffset\":0,\"attackspeedperlevel\":1.53,\"crit\":0,\"critperlevel\":0,\"hp\":547.48,\"hpperlevel\":86,\"hpregen\":5.708,\"hpregenperlevel\":0.6,\"movespeed\":335,\"mp\":340.8,\"mpperlevel\":60,\"mpregen\":8.5,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(26,'Zilean','the Chronokeeper','Zilean',2,8,7,4,4,0,0,'[\"Support\",\"Mage\"]','{\"armor\":19.134,\"armorperlevel\":3.8,\"attackdamage\":51.64,\"attackdamageperlevel\":3,\"attackrange\":550,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.13,\"crit\":0,\"critperlevel\":0,\"hp\":499.28,\"hpperlevel\":77,\"hpregen\":5.44,\"hpregenperlevel\":0.5,\"movespeed\":335,\"mp\":360.8,\"mpperlevel\":60,\"mpregen\":8.5,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(27,'Singed','the Mad Chemist','Singed',4,7,6,8,8,6,0,'[\"Tank\",\"Fighter\"]','{\"armor\":27.88,\"armorperlevel\":3.5,\"attackdamage\":62.32,\"attackdamageperlevel\":3.375,\"attackrange\":125,\"attackspeedoffset\":0.02,\"attackspeedperlevel\":1.81,\"crit\":0,\"critperlevel\":0,\"hp\":542.76,\"hpperlevel\":82,\"hpregen\":8.024,\"hpregenperlevel\":0.55,\"movespeed\":345,\"mp\":290.6,\"mpperlevel\":45,\"mpregen\":7.524,\"mpregenperlevel\":0.55,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(28,'Evelynn','the Widowmaker','Evelynn',4,7,4,2,2,0,4,'[\"Assassin\",\"Mage\"]','{\"armor\":26.5,\"armorperlevel\":3.8,\"attackdamage\":53.88,\"attackdamageperlevel\":3.5,\"attackrange\":125,\"attackspeedoffset\":0,\"attackspeedperlevel\":3.6,\"crit\":0,\"critperlevel\":0,\"hp\":531.2,\"hpperlevel\":90,\"hpregen\":9.824,\"hpregenperlevel\":0.55,\"movespeed\":340,\"mp\":315.6,\"mpperlevel\":42,\"mpregen\":8.108,\"mpregenperlevel\":0.6,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(29,'Twitch','the Plague Rat','Twitch',9,3,3,2,2,0,0,'[\"Marksman\",\"Assassin\"]','{\"armor\":23.04,\"armorperlevel\":3,\"attackdamage\":55.46,\"attackdamageperlevel\":2.41,\"attackrange\":550,\"attackspeedoffset\":-0.08,\"attackspeedperlevel\":3.38,\"crit\":0,\"critperlevel\":0,\"hp\":525.08,\"hpperlevel\":81,\"hpregen\":6.008,\"hpregenperlevel\":0.6,\"movespeed\":330,\"mp\":287.2,\"mpperlevel\":40,\"mpregen\":7.256,\"mpregenperlevel\":0.45,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(30,'Karthus','the Deathsinger','Karthus',2,10,4,2,2,0,0,'[\"Mage\"]','{\"armor\":20.88,\"armorperlevel\":3.5,\"attackdamage\":45.66,\"attackdamageperlevel\":3.25,\"attackrange\":450,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.11,\"crit\":0,\"critperlevel\":0,\"hp\":516,\"hpperlevel\":75,\"hpregen\":6.424,\"hpregenperlevel\":0.55,\"movespeed\":335,\"mp\":372.48,\"mpperlevel\":61,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(31,'Cho\'Gath','the Terror of the Void','Chogath',3,7,8,7,7,3,0,'[\"Tank\",\"Mage\"]','{\"armor\":28.88,\"armorperlevel\":3.5,\"attackdamage\":61.156,\"attackdamageperlevel\":4.2,\"attackrange\":125,\"attackspeedoffset\":0,\"attackspeedperlevel\":1.44,\"crit\":0,\"critperlevel\":0,\"hp\":574.4,\"hpperlevel\":80,\"hpregen\":8.928,\"hpregenperlevel\":0.85,\"movespeed\":345,\"mp\":272.2,\"mpperlevel\":40,\"mpregen\":7.206,\"mpregenperlevel\":0.45,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(32,'Amumu','the Sad Mummy','Amumu',2,8,8,6,6,0,0,'[\"Tank\",\"Mage\"]','{\"armor\":23.544,\"armorperlevel\":3.8,\"attackdamage\":53.384,\"attackdamageperlevel\":3.8,\"attackrange\":125,\"attackspeedoffset\":-0.02,\"attackspeedperlevel\":2.18,\"crit\":0,\"critperlevel\":0,\"hp\":613.12,\"hpperlevel\":84,\"hpregen\":8.878,\"hpregenperlevel\":0.85,\"movespeed\":335,\"mp\":287.2,\"mpperlevel\":40,\"mpregen\":7.382,\"mpregenperlevel\":0.525,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(33,'Rammus','the Armordillo','Rammus',4,5,7,10,8,0,0,'[\"Tank\",\"Fighter\"]','{\"armor\":31.384,\"armorperlevel\":4.3,\"attackdamage\":55.88,\"attackdamageperlevel\":3.5,\"attackrange\":125,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.215,\"crit\":0,\"critperlevel\":0,\"hp\":564.48,\"hpperlevel\":86,\"hpregen\":7.924,\"hpregenperlevel\":0.55,\"movespeed\":335,\"mp\":310.44,\"mpperlevel\":33,\"mpregen\":7.84,\"mpregenperlevel\":0.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(34,'Anivia','the Cryophoenix','Anivia',1,10,8,4,4,0,0,'[\"Mage\",\"Support\"]','{\"armor\":21.22,\"armorperlevel\":4,\"attackdamage\":51.376,\"attackdamageperlevel\":3.2,\"attackrange\":600,\"attackspeedoffset\":0,\"attackspeedperlevel\":1.68,\"crit\":0,\"critperlevel\":0,\"hp\":467.6,\"hpperlevel\":70,\"hpregen\":5.574,\"hpregenperlevel\":0.55,\"movespeed\":325,\"mp\":396.04,\"mpperlevel\":50,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(35,'Shaco','the Demon Jester','Shaco',9,3,5,5,5,0,0,'[\"Assassin\"]','{\"armor\":24.88,\"armorperlevel\":3.5,\"attackdamage\":57.58,\"attackdamageperlevel\":3.5,\"attackrange\":125,\"attackspeedoffset\":-0.1,\"attackspeedperlevel\":3,\"crit\":0,\"critperlevel\":0,\"hp\":582.12,\"hpperlevel\":84,\"hpregen\":8.374,\"hpregenperlevel\":0.55,\"movespeed\":350,\"mp\":297.2,\"mpperlevel\":40,\"mpregen\":7.156,\"mpregenperlevel\":0.45,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(36,'Dr. Mundo','the Madman of Zaun','DrMundo',5,6,2,7,7,7,0,'[\"Fighter\",\"Tank\"]','{\"armor\":26.88,\"armorperlevel\":3.5,\"attackdamage\":61.27,\"attackdamageperlevel\":3,\"attackrange\":125,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.8,\"crit\":0,\"critperlevel\":0,\"hp\":582.52,\"hpperlevel\":89,\"hpregen\":7.76,\"hpregenperlevel\":0.75,\"movespeed\":345,\"mp\":0,\"mpperlevel\":0,\"mpregen\":0,\"mpregenperlevel\":0,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(37,'Sona','Maven of the Strings','Sona',5,8,6,2,2,8,6,'[\"Support\",\"Mage\"]','{\"armor\":20.544,\"armorperlevel\":3.3,\"attackdamage\":50.04,\"attackdamageperlevel\":3,\"attackrange\":550,\"attackspeedoffset\":-0.03,\"attackspeedperlevel\":2.3,\"crit\":0,\"critperlevel\":0,\"hp\":482.36,\"hpperlevel\":77,\"hpregen\":5.424,\"hpregenperlevel\":0.55,\"movespeed\":325,\"mp\":340.6,\"mpperlevel\":45,\"mpregen\":11.5,\"mpregenperlevel\":0.4,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(38,'Kassadin','the Void Walker','Kassadin',3,8,3,3,5,0,4,'[\"Assassin\",\"Mage\"]','{\"armor\":23.376,\"armorperlevel\":3.2,\"attackdamage\":58.852,\"attackdamageperlevel\":3.9,\"attackrange\":150,\"attackspeedoffset\":-0.023,\"attackspeedperlevel\":3.7,\"crit\":0,\"critperlevel\":0,\"hp\":564.04,\"hpperlevel\":78,\"hpregen\":7.79,\"hpregenperlevel\":0.5,\"movespeed\":340,\"mp\":397.6,\"mpperlevel\":67,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(39,'Irelia','the Will of the Blades','Irelia',7,5,5,4,4,6,0,'[\"Fighter\",\"Assassin\"]','{\"armor\":25.3,\"armorperlevel\":3.75,\"attackdamage\":61.544,\"attackdamageperlevel\":3.3,\"attackrange\":125,\"attackspeedoffset\":-0.06,\"attackspeedperlevel\":3.2,\"crit\":0,\"critperlevel\":0,\"hp\":607.2,\"hpperlevel\":90,\"hpregen\":8.592,\"hpregenperlevel\":0.65,\"movespeed\":345,\"mp\":338.8,\"mpperlevel\":32,\"mpregen\":8.1,\"mpregenperlevel\":0.65,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(40,'Janna','the Storm\'s Fury','Janna',3,7,8,5,5,6,9,'[\"Support\",\"Mage\"]','{\"armor\":19.384,\"armorperlevel\":3.8,\"attackdamage\":51.956,\"attackdamageperlevel\":2.95,\"attackrange\":475,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.61,\"crit\":0,\"critperlevel\":0,\"hp\":487.04,\"hpperlevel\":78,\"hpregen\":5.424,\"hpregenperlevel\":0.55,\"movespeed\":335,\"mp\":409.52,\"mpperlevel\":64,\"mpregen\":11.5,\"mpregenperlevel\":0.4,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(41,'Gangplank','the Saltwater Scourge','Gangplank',7,4,4,6,6,4,0,'[\"Fighter\"]','{\"armor\":26,\"armorperlevel\":3,\"attackdamage\":56,\"attackdamageperlevel\":3,\"attackrange\":125,\"attackspeedoffset\":0,\"attackspeedperlevel\":3.2,\"crit\":0,\"critperlevel\":0,\"hp\":540,\"hpperlevel\":82,\"hpregen\":6,\"hpregenperlevel\":0.6,\"movespeed\":345,\"mp\":282,\"mpperlevel\":40,\"mpregen\":7.5,\"mpregenperlevel\":0.7,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(42,'Corki','the Daring Bombardier','Corki',8,6,3,3,3,0,0,'[\"Marksman\"]','{\"armor\":23.38,\"armorperlevel\":3.5,\"attackdamage\":56,\"attackdamageperlevel\":3.5,\"attackrange\":550,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.3,\"crit\":0,\"critperlevel\":0,\"hp\":512.76,\"hpperlevel\":82,\"hpregen\":5.424,\"hpregenperlevel\":0.55,\"movespeed\":325,\"mp\":350.16,\"mpperlevel\":34,\"mpregen\":7.424,\"mpregenperlevel\":0.55,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(43,'Karma','the Enlightened One','Karma',1,8,6,7,7,2,9,'[\"Mage\",\"Support\"]','{\"armor\":20.384,\"armorperlevel\":3.8,\"attackdamage\":53.544,\"attackdamageperlevel\":3.3,\"attackrange\":525,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.3,\"crit\":0,\"critperlevel\":0,\"hp\":522.44,\"hpperlevel\":83,\"hpregen\":5.624,\"hpregenperlevel\":0.55,\"movespeed\":335,\"mp\":374,\"mpperlevel\":50,\"mpregen\":8.5,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(44,'Taric','the Shield of Valoran','Taric',4,5,6,8,8,5,7,'[\"Support\",\"Fighter\"]','{\"armor\":25,\"armorperlevel\":3.4,\"attackdamage\":55,\"attackdamageperlevel\":3.5,\"attackrange\":150,\"attackspeedoffset\":0,\"attackspeedperlevel\":2,\"crit\":0,\"critperlevel\":0,\"hp\":575,\"hpperlevel\":90,\"hpregen\":6,\"hpregenperlevel\":0.5,\"movespeed\":340,\"mp\":300,\"mpperlevel\":60,\"mpregen\":5,\"mpregenperlevel\":1,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(45,'Veigar','the Tiny Master of Evil','Veigar',2,10,7,2,2,0,0,'[\"Mage\"]','{\"armor\":22.55,\"armorperlevel\":3.75,\"attackdamage\":50.71,\"attackdamageperlevel\":2.625,\"attackrange\":525,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.24,\"crit\":0,\"critperlevel\":0,\"hp\":492.76,\"hpperlevel\":82,\"hpregen\":5.424,\"hpregenperlevel\":0.55,\"movespeed\":340,\"mp\":392.4,\"mpperlevel\":52,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(48,'Trundle','the Troll King','Trundle',7,2,7,6,6,5,0,'[\"Fighter\",\"Tank\"]','{\"armor\":27.536,\"armorperlevel\":2.7,\"attackdamage\":60.04,\"attackdamageperlevel\":3,\"attackrange\":175,\"attackspeedoffset\":-0.0672,\"attackspeedperlevel\":2.9,\"crit\":0,\"critperlevel\":0,\"hp\":616.28,\"hpperlevel\":96,\"hpregen\":6,\"hpregenperlevel\":0.75,\"movespeed\":350,\"mp\":281.6,\"mpperlevel\":45,\"mpregen\":7.508,\"mpregenperlevel\":0.6,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(50,'Swain','the Master Tactician','Swain',2,9,4,6,6,9,0,'[\"Mage\",\"Fighter\"]','{\"armor\":22.72,\"armorperlevel\":4,\"attackdamage\":52.04,\"attackdamageperlevel\":3,\"attackrange\":500,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.11,\"crit\":0,\"critperlevel\":0,\"hp\":516.04,\"hpperlevel\":90,\"hpregen\":7.842,\"hpregenperlevel\":0.65,\"movespeed\":335,\"mp\":374,\"mpperlevel\":47,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(51,'Caitlyn','the Sheriff of Piltover','Caitlyn',8,1,6,2,2,0,0,'[\"Marksman\"]','{\"armor\":22.88,\"armorperlevel\":3.5,\"attackdamage\":53.66,\"attackdamageperlevel\":2.18,\"attackrange\":650,\"attackspeedoffset\":0.1,\"attackspeedperlevel\":4,\"crit\":0,\"critperlevel\":0,\"hp\":524.4,\"hpperlevel\":80,\"hpregen\":5.674,\"hpregenperlevel\":0.55,\"movespeed\":325,\"mp\":313.7,\"mpperlevel\":35,\"mpregen\":7.4,\"mpregenperlevel\":0.55,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(53,'Blitzcrank','the Great Steam Golem','Blitzcrank',4,5,8,8,8,0,3,'[\"Tank\",\"Fighter\"]','{\"armor\":24.38,\"armorperlevel\":4,\"attackdamage\":61.54,\"attackdamageperlevel\":3.5,\"attackrange\":125,\"attackspeedoffset\":0,\"attackspeedperlevel\":1.13,\"crit\":0,\"critperlevel\":0,\"hp\":582.6,\"hpperlevel\":95,\"hpregen\":8.51,\"hpregenperlevel\":0.75,\"movespeed\":325,\"mp\":267.2,\"mpperlevel\":40,\"mpregen\":8.5,\"mpregenperlevel\":0.8,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(54,'Malphite','Shard of the Monolith','Malphite',5,7,7,9,9,0,3,'[\"Tank\",\"Fighter\"]','{\"armor\":28.3,\"armorperlevel\":3.75,\"attackdamage\":61.97,\"attackdamageperlevel\":3.375,\"attackrange\":125,\"attackspeedoffset\":-0.02,\"attackspeedperlevel\":3.4,\"crit\":0,\"critperlevel\":0,\"hp\":574.2,\"hpperlevel\":90,\"hpregen\":7,\"hpregenperlevel\":0.55,\"movespeed\":335,\"mp\":282.2,\"mpperlevel\":40,\"mpregen\":7.324,\"mpregenperlevel\":0.55,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(55,'Katarina','the Sinister Blade','Katarina',4,9,0,3,3,0,0,'[\"Assassin\",\"Mage\"]','{\"armor\":27.88,\"armorperlevel\":3.5,\"attackdamage\":58,\"attackdamageperlevel\":3.2,\"attackrange\":125,\"attackspeedoffset\":-0.05,\"attackspeedperlevel\":2.74,\"crit\":0,\"critperlevel\":0,\"hp\":590,\"hpperlevel\":82,\"hpregen\":7.5,\"hpregenperlevel\":0.7,\"movespeed\":340,\"mp\":0,\"mpperlevel\":0,\"mpregen\":0,\"mpregenperlevel\":0,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(56,'Nocturne','the Eternal Nightmare','Nocturne',9,2,5,5,5,5,0,'[\"Assassin\",\"Fighter\"]','{\"armor\":26.88,\"armorperlevel\":3.5,\"attackdamage\":59.208,\"attackdamageperlevel\":3.1,\"attackrange\":125,\"attackspeedoffset\":-0.065,\"attackspeedperlevel\":2.7,\"crit\":0,\"critperlevel\":0,\"hp\":582.8,\"hpperlevel\":85,\"hpregen\":8.26,\"hpregenperlevel\":0.75,\"movespeed\":345,\"mp\":273.8,\"mpperlevel\":35,\"mpregen\":6.756,\"mpregenperlevel\":0.45,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(57,'Maokai','the Twisted Treant','Maokai',3,6,8,8,8,6,3,'[\"Tank\",\"Mage\"]','{\"armor\":30,\"armorperlevel\":4,\"attackdamage\":63.544,\"attackdamageperlevel\":3.3,\"attackrange\":125,\"attackspeedoffset\":-0.1,\"attackspeedperlevel\":2.125,\"crit\":0,\"critperlevel\":0,\"hp\":540,\"hpperlevel\":95,\"hpregen\":5,\"hpregenperlevel\":0.75,\"movespeed\":335,\"mp\":377.28,\"mpperlevel\":43,\"mpregen\":7.206,\"mpregenperlevel\":0.45,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(58,'Renekton','the Butcher of the Sands','Renekton',8,2,6,5,5,6,0,'[\"Fighter\",\"Tank\"]','{\"armor\":25.584,\"armorperlevel\":3.8,\"attackdamage\":58.328,\"attackdamageperlevel\":3.1,\"attackrange\":125,\"attackspeedoffset\":-0.06,\"attackspeedperlevel\":2.65,\"crit\":0,\"critperlevel\":0,\"hp\":572.16,\"hpperlevel\":87,\"hpregen\":7.96,\"hpregenperlevel\":0.75,\"movespeed\":345,\"mp\":100,\"mpperlevel\":0,\"mpregen\":0,\"mpregenperlevel\":0,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(59,'Jarvan IV','the Exemplar of Demacia','JarvanIV',6,3,6,8,8,0,2,'[\"Tank\",\"Fighter\"]','{\"armor\":29,\"armorperlevel\":3.6,\"attackdamage\":55.712,\"attackdamageperlevel\":3.4,\"attackrange\":175,\"attackspeedoffset\":-0.05,\"attackspeedperlevel\":2.5,\"crit\":0,\"critperlevel\":0,\"hp\":571.2,\"hpperlevel\":90,\"hpregen\":8.176,\"hpregenperlevel\":0.7,\"movespeed\":340,\"mp\":302.2,\"mpperlevel\":40,\"mpregen\":6.756,\"mpregenperlevel\":0.45,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(60,'Elise','the Spider Queen','Elise',6,7,7,5,5,0,0,'[\"Mage\",\"Fighter\"]','{\"armor\":22.128,\"armorperlevel\":3.35,\"attackdamage\":50.54,\"attackdamageperlevel\":3,\"attackrange\":550,\"attackspeedoffset\":0,\"attackspeedperlevel\":1.75,\"crit\":0,\"critperlevel\":0,\"hp\":529.4,\"hpperlevel\":80,\"hpregen\":5.708,\"hpregenperlevel\":0.6,\"movespeed\":325,\"mp\":324,\"mpperlevel\":50,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(61,'Orianna','the Lady of Clockwork','Orianna',4,9,7,3,3,0,8,'[\"Mage\",\"Support\"]','{\"armor\":17.04,\"armorperlevel\":3,\"attackdamage\":40.368,\"attackdamageperlevel\":2.6,\"attackrange\":525,\"attackspeedoffset\":-0.05,\"attackspeedperlevel\":3.5,\"crit\":0,\"critperlevel\":0,\"hp\":517.72,\"hpperlevel\":79,\"hpregen\":6.874,\"hpregenperlevel\":0.55,\"movespeed\":325,\"mp\":334,\"mpperlevel\":50,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(62,'Wukong','the Monkey King','MonkeyKing',8,2,6,5,5,0,0,'[\"Fighter\",\"Tank\"]','{\"armor\":24.88,\"armorperlevel\":3.5,\"attackdamage\":59.876,\"attackdamageperlevel\":3.2,\"attackrange\":175,\"attackspeedoffset\":-0.05,\"attackspeedperlevel\":3,\"crit\":0,\"critperlevel\":0,\"hp\":577.8,\"hpperlevel\":85,\"hpregen\":6.192,\"hpregenperlevel\":0.65,\"movespeed\":345,\"mp\":265.84,\"mpperlevel\":38,\"mpregen\":8.042,\"mpregenperlevel\":0.65,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(63,'Brand','the Burning Vengeance','Brand',2,9,6,2,2,0,0,'[\"Mage\"]','{\"armor\":21.88,\"armorperlevel\":3.5,\"attackdamage\":57.04,\"attackdamageperlevel\":3,\"attackrange\":550,\"attackspeedoffset\":0,\"attackspeedperlevel\":1.36,\"crit\":0,\"critperlevel\":0,\"hp\":507.68,\"hpperlevel\":76,\"hpregen\":5.424,\"hpregenperlevel\":0.55,\"movespeed\":340,\"mp\":375.6,\"mpperlevel\":42,\"mpregen\":8.008,\"mpregenperlevel\":0.6,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(64,'Lee Sin','the Blind Monk','LeeSin',8,3,5,5,5,3,6,'[\"Fighter\",\"Assassin\"]','{\"armor\":24.216,\"armorperlevel\":3.7,\"attackdamage\":61.176,\"attackdamageperlevel\":3.2,\"attackrange\":125,\"attackspeedoffset\":-0.04,\"attackspeedperlevel\":3,\"crit\":0,\"critperlevel\":0,\"hp\":570.8,\"hpperlevel\":85,\"hpregen\":7.426,\"hpregenperlevel\":0.7,\"movespeed\":350,\"mp\":200,\"mpperlevel\":0,\"mpregen\":50,\"mpregenperlevel\":0,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(67,'Vayne','the Night Hunter','Vayne',10,1,5,1,1,0,0,'[\"Marksman\",\"Assassin\"]','{\"armor\":19.012,\"armorperlevel\":3.4,\"attackdamage\":55.88,\"attackdamageperlevel\":1.66,\"attackrange\":550,\"attackspeedoffset\":-0.05,\"attackspeedperlevel\":4,\"crit\":0,\"critperlevel\":0,\"hp\":498.44,\"hpperlevel\":83,\"hpregen\":5.424,\"hpregenperlevel\":0.55,\"movespeed\":330,\"mp\":231.8,\"mpperlevel\":35,\"mpregen\":6.972,\"mpregenperlevel\":0.4,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(68,'Rumble','the Mechanized Menace','Rumble',3,8,4,6,6,0,3,'[\"Fighter\",\"Mage\"]','{\"armor\":25.88,\"armorperlevel\":3.5,\"attackdamage\":61.036,\"attackdamageperlevel\":3.2,\"attackrange\":125,\"attackspeedoffset\":-0.03,\"attackspeedperlevel\":1.85,\"crit\":0,\"critperlevel\":0,\"hp\":584.4,\"hpperlevel\":80,\"hpregen\":8.008,\"hpregenperlevel\":0.6,\"movespeed\":345,\"mp\":100,\"mpperlevel\":0,\"mpregen\":0,\"mpregenperlevel\":0,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(69,'Cassiopeia','the Serpent\'s Embrace','Cassiopeia',2,9,6,3,3,4,0,'[\"Mage\"]','{\"armor\":25,\"armorperlevel\":3.5,\"attackdamage\":53,\"attackdamageperlevel\":3,\"attackrange\":550,\"attackspeedoffset\":-0.034,\"attackspeedperlevel\":1.5,\"crit\":0,\"critperlevel\":0,\"hp\":525,\"hpperlevel\":75,\"hpregen\":5.5,\"hpregenperlevel\":0.5,\"movespeed\":328,\"mp\":375,\"mpperlevel\":60,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(72,'Skarner','the Crystal Vanguard','Skarner',7,5,6,6,6,0,4,'[\"Fighter\",\"Tank\"]','{\"armor\":29.384,\"armorperlevel\":3.8,\"attackdamage\":57.156,\"attackdamageperlevel\":4.5,\"attackrange\":125,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.1,\"crit\":0,\"critperlevel\":0,\"hp\":601.28,\"hpperlevel\":90,\"hpregen\":8.928,\"hpregenperlevel\":0.85,\"movespeed\":335,\"mp\":272.2,\"mpperlevel\":40,\"mpregen\":7.206,\"mpregenperlevel\":0.45,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(74,'Heimerdinger','the Revered Inventor','Heimerdinger',2,8,6,5,5,0,0,'[\"Mage\",\"Support\"]','{\"armor\":19.04,\"armorperlevel\":3,\"attackdamage\":55.536,\"attackdamageperlevel\":2.7,\"attackrange\":550,\"attackspeedoffset\":0,\"attackspeedperlevel\":1.36,\"crit\":0,\"critperlevel\":0,\"hp\":476,\"hpperlevel\":75,\"hpregen\":11.008,\"hpregenperlevel\":1.75,\"movespeed\":340,\"mp\":307.2,\"mpperlevel\":40,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(75,'Nasus','the Curator of the Sands','Nasus',6,7,5,5,5,5,0,'[\"Fighter\",\"Tank\"]','{\"armor\":24.88,\"armorperlevel\":3.5,\"attackdamage\":59.18,\"attackdamageperlevel\":3.5,\"attackrange\":125,\"attackspeedoffset\":-0.02,\"attackspeedperlevel\":3.48,\"crit\":0,\"critperlevel\":0,\"hp\":561.2,\"hpperlevel\":90,\"hpregen\":9.012,\"hpregenperlevel\":0.9,\"movespeed\":350,\"mp\":325.6,\"mpperlevel\":42,\"mpregen\":7.44,\"mpregenperlevel\":0.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(76,'Nidalee','the Bestial Huntress','Nidalee',5,7,0,4,4,3,0,'[\"Assassin\",\"Fighter\"]','{\"armor\":22.88,\"armorperlevel\":3.5,\"attackdamage\":53,\"attackdamageperlevel\":3.5,\"attackrange\":525,\"attackspeedoffset\":-0.02,\"attackspeedperlevel\":3.22,\"crit\":0,\"critperlevel\":0,\"hp\":540,\"hpperlevel\":80,\"hpregen\":6.008,\"hpregenperlevel\":0.6,\"movespeed\":335,\"mp\":295.6,\"mpperlevel\":45,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(77,'Udyr','the Spirit Walker','Udyr',8,4,7,7,7,3,6,'[\"Fighter\",\"Tank\"]','{\"armor\":25.47,\"armorperlevel\":4,\"attackdamage\":58.286,\"attackdamageperlevel\":3.2,\"attackrange\":125,\"attackspeedoffset\":-0.05,\"attackspeedperlevel\":2.67,\"crit\":0,\"critperlevel\":0,\"hp\":593.32,\"hpperlevel\":99,\"hpregen\":6,\"hpregenperlevel\":0.75,\"movespeed\":345,\"mp\":270.4,\"mpperlevel\":30,\"mpregen\":7.506,\"mpregenperlevel\":0.45,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(78,'Poppy','Keeper of the Hammer','Poppy',6,2,8,7,7,0,5,'[\"Tank\",\"Fighter\"]','{\"armor\":29,\"armorperlevel\":3.5,\"attackdamage\":56,\"attackdamageperlevel\":4,\"attackrange\":125,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.5,\"crit\":0,\"critperlevel\":0,\"hp\":540,\"hpperlevel\":90,\"hpregen\":8,\"hpregenperlevel\":0.8,\"movespeed\":345,\"mp\":280,\"mpperlevel\":40,\"mpregen\":7,\"mpregenperlevel\":0.7,\"spellblock\":32,\"spellblockperlevel\":1.25}'),
	(79,'Gragas','the Rabble Rouser','Gragas',4,6,9,7,7,5,0,'[\"Fighter\",\"Mage\"]','{\"armor\":29.05,\"armorperlevel\":3.6,\"attackdamage\":61.38,\"attackdamageperlevel\":3.5,\"attackrange\":125,\"attackspeedoffset\":-0.04,\"attackspeedperlevel\":2.05,\"crit\":0,\"critperlevel\":0,\"hp\":583.52,\"hpperlevel\":89,\"hpregen\":5.5,\"hpregenperlevel\":0.5,\"movespeed\":330,\"mp\":400,\"mpperlevel\":47,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(80,'Pantheon','the Artisan of War','Pantheon',9,3,6,4,4,0,0,'[\"Fighter\",\"Assassin\"]','{\"armor\":27.652,\"armorperlevel\":3.9,\"attackdamage\":55.572,\"attackdamageperlevel\":2.9,\"attackrange\":150,\"attackspeedoffset\":-0.03,\"attackspeedperlevel\":2.95,\"crit\":0,\"critperlevel\":0,\"hp\":579.16,\"hpperlevel\":87,\"hpregen\":7.842,\"hpregenperlevel\":0.65,\"movespeed\":355,\"mp\":317.12,\"mpperlevel\":31,\"mpregen\":7.356,\"mpregenperlevel\":0.45,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(81,'Ezreal','the Prodigal Explorer','Ezreal',7,6,0,2,2,0,0,'[\"Marksman\",\"Mage\"]','{\"armor\":21.88,\"armorperlevel\":3.5,\"attackdamage\":55.66,\"attackdamageperlevel\":2.41,\"attackrange\":550,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.8,\"crit\":0,\"critperlevel\":0,\"hp\":484.4,\"hpperlevel\":80,\"hpregen\":6.424,\"hpregenperlevel\":0.55,\"movespeed\":325,\"mp\":360.6,\"mpperlevel\":42,\"mpregen\":8.092,\"mpregenperlevel\":0.65,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(82,'Mordekaiser','the Iron Revenant','Mordekaiser',4,7,0,6,6,6,7,'[\"Fighter\"]','{\"armor\":20,\"armorperlevel\":3.75,\"attackdamage\":61,\"attackdamageperlevel\":5,\"attackrange\":175,\"attackspeedoffset\":0.04,\"attackspeedperlevel\":2.2,\"crit\":0,\"critperlevel\":0,\"hp\":525,\"hpperlevel\":73,\"hpregen\":4,\"hpregenperlevel\":0.3,\"movespeed\":325,\"mp\":0,\"mpperlevel\":0,\"mpregen\":0,\"mpregenperlevel\":0,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(83,'Yorick','Shepherd of Souls','Yorick',6,4,5,6,6,6,0,'[\"Fighter\",\"Tank\"]','{\"armor\":30,\"armorperlevel\":4,\"attackdamage\":57,\"attackdamageperlevel\":5,\"attackrange\":175,\"attackspeedoffset\":0,\"attackspeedperlevel\":2,\"crit\":0,\"critperlevel\":0,\"hp\":580,\"hpperlevel\":100,\"hpregen\":8,\"hpregenperlevel\":0.8,\"movespeed\":340,\"mp\":300,\"mpperlevel\":40,\"mpregen\":7.5,\"mpregenperlevel\":0.75,\"spellblock\":32,\"spellblockperlevel\":1.25}'),
	(84,'Akali','the Fist of Shadow','Akali',5,8,3,3,3,0,0,'[\"Assassin\"]','{\"armor\":26.38,\"armorperlevel\":3.5,\"attackdamage\":58.376,\"attackdamageperlevel\":3.2,\"attackrange\":125,\"attackspeedoffset\":-0.1,\"attackspeedperlevel\":3.1,\"crit\":0,\"critperlevel\":0,\"hp\":587.8,\"hpperlevel\":85,\"hpregen\":8.342,\"hpregenperlevel\":0.65,\"movespeed\":350,\"mp\":200,\"mpperlevel\":0,\"mpregen\":50,\"mpregenperlevel\":0,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(85,'Kennen','the Heart of the Tempest','Kennen',6,7,8,4,4,0,0,'[\"Mage\",\"Marksman\"]','{\"armor\":24.3,\"armorperlevel\":3.75,\"attackdamage\":50.544,\"attackdamageperlevel\":3.3,\"attackrange\":550,\"attackspeedoffset\":-0.0947,\"attackspeedperlevel\":3.4,\"crit\":0,\"critperlevel\":0,\"hp\":535.72,\"hpperlevel\":79,\"hpregen\":5.592,\"hpregenperlevel\":0.65,\"movespeed\":335,\"mp\":200,\"mpperlevel\":0,\"mpregen\":50,\"mpregenperlevel\":0,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(86,'Garen','The Might of Demacia','Garen',7,1,1,7,7,0,0,'[\"Fighter\",\"Tank\"]','{\"armor\":27.536,\"armorperlevel\":3,\"attackdamage\":57.88,\"attackdamageperlevel\":4.5,\"attackrange\":175,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.9,\"crit\":0,\"critperlevel\":0,\"hp\":616.28,\"hpperlevel\":84.25,\"hpregen\":7.84,\"hpregenperlevel\":0.5,\"movespeed\":340,\"mp\":0,\"mpperlevel\":0,\"mpregen\":0,\"mpregenperlevel\":0,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(89,'Leona','the Radiant Dawn','Leona',4,3,9,8,8,0,0,'[\"Tank\",\"Support\"]','{\"armor\":27.208,\"armorperlevel\":3.6,\"attackdamage\":60.04,\"attackdamageperlevel\":3,\"attackrange\":125,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.9,\"crit\":0,\"critperlevel\":0,\"hp\":576.16,\"hpperlevel\":87,\"hpregen\":8.428,\"hpregenperlevel\":0.85,\"movespeed\":335,\"mp\":302.2,\"mpperlevel\":40,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(90,'Malzahar','the Prophet of the Void','Malzahar',2,9,7,2,2,0,0,'[\"Mage\",\"Assassin\"]','{\"armor\":18,\"armorperlevel\":3.5,\"attackdamage\":55,\"attackdamageperlevel\":3,\"attackrange\":500,\"attackspeedoffset\":0,\"attackspeedperlevel\":1.5,\"crit\":0,\"critperlevel\":0,\"hp\":525,\"hpperlevel\":75,\"hpregen\":6,\"hpregenperlevel\":0.6,\"movespeed\":335,\"mp\":300,\"mpperlevel\":55,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(91,'Talon','the Blade\'s Shadow','Talon',9,1,4,3,3,0,0,'[\"Assassin\",\"Fighter\"]','{\"armor\":26.88,\"armorperlevel\":3.5,\"attackdamage\":60,\"attackdamageperlevel\":3.1,\"attackrange\":125,\"attackspeedoffset\":-0.065,\"attackspeedperlevel\":2.9,\"crit\":0,\"critperlevel\":0,\"hp\":583,\"hpperlevel\":90,\"hpregen\":8.51,\"hpregenperlevel\":0.75,\"movespeed\":335,\"mp\":377.2,\"mpperlevel\":37,\"mpregen\":7.6,\"mpregenperlevel\":0.8,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(92,'Riven','the Exile','Riven',8,1,6,5,5,0,6,'[\"Fighter\",\"Assassin\"]','{\"armor\":24.376,\"armorperlevel\":3.2,\"attackdamage\":56.04,\"attackdamageperlevel\":3,\"attackrange\":125,\"attackspeedoffset\":0,\"attackspeedperlevel\":3.5,\"crit\":0,\"critperlevel\":0,\"hp\":558.48,\"hpperlevel\":86,\"hpregen\":5.34,\"hpregenperlevel\":0.5,\"movespeed\":340,\"mp\":0,\"mpperlevel\":0,\"mpregen\":0,\"mpregenperlevel\":0,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(96,'Kog\'Maw','the Mouth of the Abyss','KogMaw',8,5,3,2,2,0,0,'[\"Marksman\",\"Mage\"]','{\"armor\":19.88,\"armorperlevel\":3.5,\"attackdamage\":57.46,\"attackdamageperlevel\":2.41,\"attackrange\":500,\"attackspeedoffset\":-0.06,\"attackspeedperlevel\":2.65,\"crit\":0,\"critperlevel\":0,\"hp\":517.76,\"hpperlevel\":82,\"hpregen\":5.924,\"hpregenperlevel\":0.55,\"movespeed\":325,\"mp\":322.2,\"mpperlevel\":40,\"mpregen\":8.676,\"mpregenperlevel\":0.7,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(98,'Shen','the Eye of Twilight','Shen',3,3,5,9,9,0,7,'[\"Tank,melee\"]','{\"armor\":25,\"armorperlevel\":3,\"attackdamage\":60,\"attackdamageperlevel\":3,\"attackrange\":125,\"attackspeedoffset\":0,\"attackspeedperlevel\":2,\"crit\":0,\"critperlevel\":0,\"hp\":540,\"hpperlevel\":85,\"hpregen\":8.5,\"hpregenperlevel\":0.75,\"movespeed\":340,\"mp\":400,\"mpperlevel\":0,\"mpregen\":50,\"mpregenperlevel\":0,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(99,'Lux','the Lady of Luminosity','Lux',2,9,7,4,4,0,6,'[\"Mage\",\"Support\"]','{\"armor\":18.72,\"armorperlevel\":4,\"attackdamage\":53.544,\"attackdamageperlevel\":3.3,\"attackrange\":550,\"attackspeedoffset\":0,\"attackspeedperlevel\":1.36,\"crit\":0,\"critperlevel\":0,\"hp\":477.72,\"hpperlevel\":79,\"hpregen\":5.424,\"hpregenperlevel\":0.55,\"movespeed\":330,\"mp\":384,\"mpperlevel\":47,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(101,'Xerath','the Magus Ascendant','Xerath',1,10,6,3,3,0,0,'[\"Mage\",\"Assassin\"]','{\"armor\":21.88,\"armorperlevel\":3.5,\"attackdamage\":54.7,\"attackdamageperlevel\":3,\"attackrange\":525,\"attackspeedoffset\":0,\"attackspeedperlevel\":1.36,\"crit\":0,\"critperlevel\":0,\"hp\":514.4,\"hpperlevel\":80,\"hpregen\":5.424,\"hpregenperlevel\":0.55,\"movespeed\":340,\"mp\":366.96,\"mpperlevel\":44,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(102,'Shyvana','the Half-Dragon','Shyvana',8,3,4,6,6,0,0,'[\"Fighter\",\"Tank\"]','{\"armor\":27.628,\"armorperlevel\":3.35,\"attackdamage\":60.712,\"attackdamageperlevel\":3.4,\"attackrange\":125,\"attackspeedoffset\":-0.05,\"attackspeedperlevel\":2.5,\"crit\":0,\"critperlevel\":0,\"hp\":595,\"hpperlevel\":95,\"hpregen\":8.6,\"hpregenperlevel\":0.8,\"movespeed\":350,\"mp\":100,\"mpperlevel\":0,\"mpregen\":0,\"mpregenperlevel\":0,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(103,'Ahri','the Nine-Tailed Fox','Ahri',3,9,5,4,4,0,0,'[\"Mage\",\"Assassin\"]','{\"armor\":20.88,\"armorperlevel\":3.5,\"attackdamage\":53.04,\"attackdamageperlevel\":3,\"attackrange\":550,\"attackspeedoffset\":-0.065,\"attackspeedperlevel\":2,\"crit\":0,\"critperlevel\":0,\"hp\":514.4,\"hpperlevel\":80,\"hpregen\":6.508,\"hpregenperlevel\":0.6,\"movespeed\":330,\"mp\":334,\"mpperlevel\":50,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(104,'Graves','the Outlaw','Graves',8,3,3,5,5,0,0,'[\"Marksman\"]','{\"armor\":24.376,\"armorperlevel\":3.4,\"attackdamage\":60.83,\"attackdamageperlevel\":2.41,\"attackrange\":425,\"attackspeedoffset\":0.3,\"attackspeedperlevel\":2.6,\"crit\":0,\"critperlevel\":0,\"hp\":551.12,\"hpperlevel\":84,\"hpregen\":6.676,\"hpregenperlevel\":0.7,\"movespeed\":340,\"mp\":322.2,\"mpperlevel\":40,\"mpregen\":7.9,\"mpregenperlevel\":0.7,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(105,'Fizz','the Tidal Trickster','Fizz',6,7,4,4,4,0,0,'[\"Assassin\",\"Fighter\"]','{\"armor\":22.412,\"armorperlevel\":3.4,\"attackdamage\":58.04,\"attackdamageperlevel\":3,\"attackrange\":175,\"attackspeedoffset\":-0.05,\"attackspeedperlevel\":3.1,\"crit\":0,\"critperlevel\":0,\"hp\":558.48,\"hpperlevel\":86,\"hpregen\":8.176,\"hpregenperlevel\":0.7,\"movespeed\":335,\"mp\":317.2,\"mpperlevel\":37,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(106,'Volibear','the Thunder\'s Roar','Volibear',7,4,6,7,7,2,0,'[\"Fighter\",\"Tank\"]','{\"armor\":26.38,\"armorperlevel\":3.5,\"attackdamage\":59.544,\"attackdamageperlevel\":3.3,\"attackrange\":125,\"attackspeedoffset\":-0.05,\"attackspeedperlevel\":2.67,\"crit\":0,\"critperlevel\":0,\"hp\":584.48,\"hpperlevel\":86,\"hpregen\":8.092,\"hpregenperlevel\":0.65,\"movespeed\":345,\"mp\":270.4,\"mpperlevel\":30,\"mpregen\":8.092,\"mpregenperlevel\":0.65,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(107,'Rengar','the Pridestalker','Rengar',7,2,5,4,4,3,0,'[\"Assassin\",\"Fighter\"]','{\"armor\":22,\"armorperlevel\":3,\"attackdamage\":60,\"attackdamageperlevel\":1.5,\"attackrange\":125,\"attackspeedoffset\":0,\"attackspeedperlevel\":3.5,\"crit\":0,\"critperlevel\":0,\"hp\":586.2,\"hpperlevel\":90,\"hpregen\":7,\"hpregenperlevel\":0.5,\"movespeed\":345,\"mp\":4,\"mpperlevel\":0,\"mpregen\":0,\"mpregenperlevel\":0,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(110,'Varus','the Arrow of Retribution','Varus',7,4,7,3,3,0,0,'[\"Marksman\",\"Mage\"]','{\"armor\":23.212,\"armorperlevel\":3.4,\"attackdamage\":54.66,\"attackdamageperlevel\":2.41,\"attackrange\":575,\"attackspeedoffset\":-0.05,\"attackspeedperlevel\":3,\"crit\":0,\"critperlevel\":0,\"hp\":537.76,\"hpperlevel\":82,\"hpregen\":5.424,\"hpregenperlevel\":0.55,\"movespeed\":330,\"mp\":360.48,\"mpperlevel\":33,\"mpregen\":7.34,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(111,'Nautilus','the Titan of the Depths','Nautilus',4,6,10,7,7,0,4,'[\"Tank\",\"Fighter\"]','{\"armor\":26.46,\"armorperlevel\":3.75,\"attackdamage\":57.544,\"attackdamageperlevel\":3.3,\"attackrange\":175,\"attackspeedoffset\":0.02,\"attackspeedperlevel\":1,\"crit\":0,\"critperlevel\":0,\"hp\":576.48,\"hpperlevel\":86,\"hpregen\":8.374,\"hpregenperlevel\":0.55,\"movespeed\":325,\"mp\":334,\"mpperlevel\":47,\"mpregen\":8.626,\"mpregenperlevel\":0.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(112,'Viktor','the Machine Herald','Viktor',2,10,5,4,4,0,4,'[\"Mage\"]','{\"armor\":22.72,\"armorperlevel\":4,\"attackdamage\":52.04,\"attackdamageperlevel\":3,\"attackrange\":525,\"attackspeedoffset\":-0.05,\"attackspeedperlevel\":2.11,\"crit\":0,\"critperlevel\":0,\"hp\":516.04,\"hpperlevel\":78,\"hpregen\":7.842,\"hpregenperlevel\":0.65,\"movespeed\":335,\"mp\":324,\"mpperlevel\":50,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(113,'Sejuani','Fury of the North','Sejuani',5,6,9,7,7,0,0,'[\"Tank\",\"Fighter\"]','{\"armor\":27,\"armorperlevel\":4,\"attackdamage\":56,\"attackdamageperlevel\":3,\"attackrange\":150,\"attackspeedoffset\":0,\"attackspeedperlevel\":3,\"crit\":0,\"critperlevel\":0,\"hp\":600,\"hpperlevel\":95,\"hpregen\":8.5,\"hpregenperlevel\":0.85,\"movespeed\":340,\"mp\":400,\"mpperlevel\":40,\"mpregen\":7,\"mpregenperlevel\":0.7,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(114,'Fiora','the Grand Duelist','Fiora',10,2,4,4,4,6,0,'[\"Fighter\",\"Assassin\"]','{\"armor\":24,\"armorperlevel\":3.5,\"attackdamage\":60,\"attackdamageperlevel\":3.3,\"attackrange\":150,\"attackspeedoffset\":0,\"attackspeedperlevel\":3.2,\"crit\":0,\"critperlevel\":0,\"hp\":550,\"hpperlevel\":85,\"hpregen\":8.25,\"hpregenperlevel\":0.55,\"movespeed\":345,\"mp\":300,\"mpperlevel\":40,\"mpregen\":8,\"mpregenperlevel\":0.7,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(115,'Ziggs','the Hexplosives Expert','Ziggs',2,9,5,4,4,0,0,'[\"Mage\"]','{\"armor\":21.544,\"armorperlevel\":3.3,\"attackdamage\":54.208,\"attackdamageperlevel\":3.1,\"attackrange\":550,\"attackspeedoffset\":-0.0473,\"attackspeedperlevel\":2,\"crit\":0,\"critperlevel\":0,\"hp\":524.4,\"hpperlevel\":80,\"hpregen\":6.258,\"hpregenperlevel\":0.6,\"movespeed\":325,\"mp\":384,\"mpperlevel\":47,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(117,'Lulu','the Fae Sorceress','Lulu',4,7,8,5,5,0,9,'[\"Support\",\"Mage\"]','{\"armor\":19.216,\"armorperlevel\":3.7,\"attackdamage\":46.368,\"attackdamageperlevel\":2.6,\"attackrange\":550,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.25,\"crit\":0,\"critperlevel\":0,\"hp\":552.76,\"hpperlevel\":74,\"hpregen\":6.008,\"hpregenperlevel\":0.6,\"movespeed\":330,\"mp\":350,\"mpperlevel\":55,\"mpregen\":11,\"mpregenperlevel\":0.6,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(119,'Draven','the Glorious Executioner','Draven',9,1,5,3,3,0,0,'[\"Marksman\"]','{\"armor\":25.544,\"armorperlevel\":3.3,\"attackdamage\":55.8,\"attackdamageperlevel\":2.91,\"attackrange\":550,\"attackspeedoffset\":-0.08,\"attackspeedperlevel\":2.7,\"crit\":0,\"critperlevel\":0,\"hp\":557.76,\"hpperlevel\":82,\"hpregen\":6.176,\"hpregenperlevel\":0.7,\"movespeed\":330,\"mp\":360.56,\"mpperlevel\":39,\"mpregen\":8.042,\"mpregenperlevel\":0.65,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(120,'Hecarim','the Shadow of War','Hecarim',8,4,8,6,6,4,0,'[\"Fighter\",\"Tank\"]','{\"armor\":26.72,\"armorperlevel\":4,\"attackdamage\":58,\"attackdamageperlevel\":3.2,\"attackrange\":175,\"attackspeedoffset\":-0.0672,\"attackspeedperlevel\":2.5,\"crit\":0,\"critperlevel\":0,\"hp\":580,\"hpperlevel\":90,\"hpregen\":7,\"hpregenperlevel\":0.75,\"movespeed\":345,\"mp\":277.2,\"mpperlevel\":40,\"mpregen\":6.5,\"mpregenperlevel\":0.6,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(121,'Kha\'Zix','the Voidreaver','Khazix',9,3,4,4,4,0,0,'[\"Assassin\",\"Fighter\"]','{\"armor\":27,\"armorperlevel\":3,\"attackdamage\":55.21,\"attackdamageperlevel\":3.1,\"attackrange\":125,\"attackspeedoffset\":-0.065,\"attackspeedperlevel\":2.7,\"crit\":0,\"critperlevel\":0,\"hp\":572.8,\"hpperlevel\":85,\"hpregen\":7.51,\"hpregenperlevel\":0.75,\"movespeed\":350,\"mp\":327.2,\"mpperlevel\":40,\"mpregen\":7.59,\"mpregenperlevel\":0.5,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(122,'Darius','the Hand of Noxus','Darius',9,1,5,6,6,6,0,'[\"Fighter\",\"Tank\"]','{\"armor\":30,\"armorperlevel\":4,\"attackdamage\":56,\"attackdamageperlevel\":5,\"attackrange\":175,\"attackspeedoffset\":0,\"attackspeedperlevel\":1,\"crit\":0,\"critperlevel\":0,\"hp\":582.24,\"hpperlevel\":100,\"hpregen\":9.846,\"hpregenperlevel\":0.95,\"movespeed\":340,\"mp\":263,\"mpperlevel\":37.5,\"mpregen\":6.588,\"mpregenperlevel\":0.35,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(126,'Jayce','the Defender of Tomorrow','Jayce',8,3,4,4,4,0,0,'[\"Fighter\",\"Marksman\"]','{\"armor\":22.38,\"armorperlevel\":3.5,\"attackdamage\":50.38,\"attackdamageperlevel\":3.5,\"attackrange\":125,\"attackspeedoffset\":-0.05,\"attackspeedperlevel\":3,\"crit\":0,\"critperlevel\":0,\"hp\":571.2,\"hpperlevel\":90,\"hpregen\":7.344,\"hpregenperlevel\":0.8,\"movespeed\":335,\"mp\":357.2,\"mpperlevel\":37,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(127,'Lissandra','the Ice Witch','Lissandra',2,8,9,5,5,2,0,'[\"Mage\"]','{\"armor\":20.216,\"armorperlevel\":3.7,\"attackdamage\":50.536,\"attackdamageperlevel\":2.7,\"attackrange\":550,\"attackspeedoffset\":0,\"attackspeedperlevel\":1.36,\"crit\":0,\"critperlevel\":0,\"hp\":506.12,\"hpperlevel\":75,\"hpregen\":6.924,\"hpregenperlevel\":0.55,\"movespeed\":325,\"mp\":304,\"mpperlevel\":50,\"mpregen\":5.672,\"mpregenperlevel\":0.4,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(131,'Diana','Scorn of the Moon','Diana',7,8,5,6,6,0,5,'[\"Fighter\",\"Mage\"]','{\"armor\":26.048,\"armorperlevel\":3.6,\"attackdamage\":53.04,\"attackdamageperlevel\":3,\"attackrange\":150,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.25,\"crit\":0,\"critperlevel\":0,\"hp\":589.2,\"hpperlevel\":90,\"hpregen\":7.428,\"hpregenperlevel\":0.85,\"movespeed\":345,\"mp\":297.2,\"mpperlevel\":40,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(133,'Quinn','Demacia\'s Wings','Quinn',9,2,4,4,4,0,0,'[\"Marksman\",\"Fighter\"]','{\"armor\":23.38,\"armorperlevel\":3.5,\"attackdamage\":54.46,\"attackdamageperlevel\":2.41,\"attackrange\":525,\"attackspeedoffset\":-0.065,\"attackspeedperlevel\":3.1,\"crit\":0,\"critperlevel\":0,\"hp\":532.8,\"hpperlevel\":85,\"hpregen\":5.424,\"hpregenperlevel\":0.55,\"movespeed\":335,\"mp\":268.8,\"mpperlevel\":35,\"mpregen\":6.972,\"mpregenperlevel\":0.4,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(134,'Syndra','the Dark Sovereign','Syndra',2,9,5,3,3,0,0,'[\"Mage\",\"Support\"]','{\"armor\":24.712,\"armorperlevel\":3.4,\"attackdamage\":53.872,\"attackdamageperlevel\":2.9,\"attackrange\":550,\"attackspeedoffset\":0,\"attackspeedperlevel\":2,\"crit\":0,\"critperlevel\":0,\"hp\":511.04,\"hpperlevel\":78,\"hpregen\":6.508,\"hpregenperlevel\":0.6,\"movespeed\":330,\"mp\":384,\"mpperlevel\":60,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(136,'Aurelion Sol','The Star Forger','AurelionSol',2,8,5,3,3,0,0,'[\"Mage\",\"Fighter\"]','{\"armor\":19,\"armorperlevel\":3.6,\"attackdamage\":57,\"attackdamageperlevel\":3.2,\"attackrange\":550,\"attackspeedoffset\":0,\"attackspeedperlevel\":1.36,\"crit\":0,\"critperlevel\":0,\"hp\":550,\"hpperlevel\":80,\"hpregen\":6.5,\"hpregenperlevel\":0.6,\"movespeed\":325,\"mp\":350,\"mpperlevel\":50,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(143,'Zyra','Rise of the Thorns','Zyra',3,8,7,3,3,0,0,'[\"Mage\",\"Support\"]','{\"armor\":20.04,\"armorperlevel\":3,\"attackdamage\":53.376,\"attackdamageperlevel\":3.2,\"attackrange\":575,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.11,\"crit\":0,\"critperlevel\":0,\"hp\":499.32,\"hpperlevel\":74,\"hpregen\":5.69,\"hpregenperlevel\":0.5,\"movespeed\":340,\"mp\":334,\"mpperlevel\":50,\"mpregen\":8.5,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(150,'Gnar','the Missing Link','Gnar',6,5,8,5,5,0,0,'[\"Fighter\",\"Tank\"]','{\"armor\":23,\"armorperlevel\":2.5,\"attackdamage\":51,\"attackdamageperlevel\":3,\"attackrange\":175,\"attackspeedoffset\":0,\"attackspeedperlevel\":6,\"crit\":0,\"critperlevel\":0,\"hp\":540,\"hpperlevel\":65,\"hpregen\":4.5,\"hpregenperlevel\":1.75,\"movespeed\":325,\"mp\":100,\"mpperlevel\":0,\"mpregen\":0,\"mpregenperlevel\":0,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(154,'Zac','the Secret Weapon','Zac',3,7,8,7,7,8,0,'[\"Tank\",\"Fighter\"]','{\"armor\":24,\"armorperlevel\":3.5,\"attackdamage\":60,\"attackdamageperlevel\":3.375,\"attackrange\":175,\"attackspeedoffset\":-0.02,\"attackspeedperlevel\":1.6,\"crit\":0,\"critperlevel\":0,\"hp\":615,\"hpperlevel\":95,\"hpregen\":8,\"hpregenperlevel\":0.5,\"movespeed\":340,\"mp\":0,\"mpperlevel\":0,\"mpregen\":0,\"mpregenperlevel\":0,\"spellblock\":32,\"spellblockperlevel\":1.25}'),
	(157,'Yasuo','the Unforgiven','Yasuo',8,4,6,4,4,0,3,'[\"Fighter\",\"Assassin\"]','{\"armor\":24.712,\"armorperlevel\":3.4,\"attackdamage\":55.376,\"attackdamageperlevel\":3.2,\"attackrange\":175,\"attackspeedoffset\":-0.067,\"attackspeedperlevel\":2.5,\"crit\":0,\"critperlevel\":0,\"hp\":517.76,\"hpperlevel\":82,\"hpregen\":6.512,\"hpregenperlevel\":0.9,\"movespeed\":345,\"mp\":100,\"mpperlevel\":0,\"mpregen\":0,\"mpregenperlevel\":0,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(161,'Vel\'Koz','the Eye of the Void','Velkoz',2,10,5,2,2,0,0,'[\"Mage\"]','{\"armor\":21.88,\"armorperlevel\":3.5,\"attackdamage\":54.9379,\"attackdamageperlevel\":3.1416,\"attackrange\":525,\"attackspeedoffset\":0,\"attackspeedperlevel\":1.36,\"crit\":0,\"critperlevel\":0,\"hp\":507.68,\"hpperlevel\":76,\"hpregen\":5.424,\"hpregenperlevel\":0.55,\"movespeed\":340,\"mp\":375.6,\"mpperlevel\":42,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(163,'Taliyah','the Stoneweaver','Taliyah',1,8,6,6,6,0,0,'[\"Mage\",\"Support\"]','{\"armor\":20,\"armorperlevel\":3,\"attackdamage\":56,\"attackdamageperlevel\":3.3,\"attackrange\":525,\"attackspeedoffset\":0,\"attackspeedperlevel\":1.36,\"crit\":0,\"critperlevel\":0,\"hp\":520,\"hpperlevel\":75,\"hpregen\":7,\"hpregenperlevel\":0.7,\"movespeed\":325,\"mp\":340,\"mpperlevel\":60,\"mpregen\":7,\"mpregenperlevel\":0.85,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(164,'Camille','the Steel Shadow','Camille',8,3,7,6,6,5,3,'[\"Fighter\",\"Tank\"]','{\"armor\":26,\"armorperlevel\":3.8,\"attackdamage\":60,\"attackdamageperlevel\":3.5,\"attackrange\":125,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.5,\"crit\":0,\"critperlevel\":0,\"hp\":575.6,\"hpperlevel\":85,\"hpregen\":8.5,\"hpregenperlevel\":0.8,\"movespeed\":340,\"mp\":338.8,\"mpperlevel\":32,\"mpregen\":8.15,\"mpregenperlevel\":0.75,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(201,'Braum','the Heart of the Freljord','Braum',3,4,9,9,9,0,3,'[\"Support\",\"Tank\"]','{\"armor\":26.72,\"armorperlevel\":4.5,\"attackdamage\":55.376,\"attackdamageperlevel\":3.2,\"attackrange\":125,\"attackspeedoffset\":-0.03,\"attackspeedperlevel\":3.5,\"crit\":0,\"critperlevel\":0,\"hp\":576.16,\"hpperlevel\":87,\"hpregen\":8.18,\"hpregenperlevel\":1,\"movespeed\":335,\"mp\":310.6,\"mpperlevel\":45,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(202,'Jhin','the Virtuoso','Jhin',10,5,5,2,2,0,0,'[\"Marksman\",\"Assassin\"]','{\"armor\":20,\"armorperlevel\":3.5,\"attackdamage\":53,\"attackdamageperlevel\":4,\"attackrange\":550,\"attackspeedoffset\":0,\"attackspeedperlevel\":0,\"crit\":0,\"critperlevel\":0,\"hp\":540,\"hpperlevel\":85,\"hpregen\":6,\"hpregenperlevel\":0.55,\"movespeed\":330,\"mp\":300,\"mpperlevel\":50,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(203,'Kindred','The Eternal Hunters','Kindred',8,2,3,2,2,0,0,'[\"Marksman\"]','{\"armor\":20,\"armorperlevel\":3.5,\"attackdamage\":54,\"attackdamageperlevel\":1.7,\"attackrange\":500,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.5,\"crit\":0,\"critperlevel\":0,\"hp\":540,\"hpperlevel\":85,\"hpregen\":7,\"hpregenperlevel\":0.55,\"movespeed\":325,\"mp\":300,\"mpperlevel\":35,\"mpregen\":6.972,\"mpregenperlevel\":0.4,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(222,'Jinx','the Loose Cannon','Jinx',9,3,4,2,2,0,0,'[\"Marksman\"]','{\"armor\":22.88,\"armorperlevel\":3.5,\"attackdamage\":58.46,\"attackdamageperlevel\":2.41,\"attackrange\":525,\"attackspeedoffset\":0,\"attackspeedperlevel\":1,\"crit\":0,\"critperlevel\":0,\"hp\":517.76,\"hpperlevel\":82,\"hpregen\":5.84,\"hpregenperlevel\":0.5,\"movespeed\":325,\"mp\":245.6,\"mpperlevel\":45,\"mpregen\":6.68,\"mpregenperlevel\":1,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(223,'Tahm Kench','the River King','TahmKench',3,6,7,9,9,0,3,'[\"Support\",\"Tank\"]','{\"armor\":27,\"armorperlevel\":3.5,\"attackdamage\":56,\"attackdamageperlevel\":3.2,\"attackrange\":175,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.5,\"crit\":0,\"critperlevel\":0,\"hp\":610,\"hpperlevel\":95,\"hpregen\":6.5,\"hpregenperlevel\":0.55,\"movespeed\":335,\"mp\":325,\"mpperlevel\":40,\"mpregen\":8,\"mpregenperlevel\":1,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(236,'Lucian','the Purifier','Lucian',8,3,0,5,5,0,0,'[\"Marksman\"]','{\"armor\":24.04,\"armorperlevel\":3,\"attackdamage\":57.46,\"attackdamageperlevel\":2.41,\"attackrange\":500,\"attackspeedoffset\":-0.02,\"attackspeedperlevel\":3.3,\"crit\":0,\"critperlevel\":0,\"hp\":554.4,\"hpperlevel\":80,\"hpregen\":6.192,\"hpregenperlevel\":0.65,\"movespeed\":335,\"mp\":348.88,\"mpperlevel\":38,\"mpregen\":8.176,\"mpregenperlevel\":0.7,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(238,'Zed','the Master of Shadows','Zed',9,1,2,2,2,0,0,'[\"Assassin\",\"Fighter\"]','{\"armor\":26.88,\"armorperlevel\":3.5,\"attackdamage\":54.712,\"attackdamageperlevel\":3.4,\"attackrange\":125,\"attackspeedoffset\":-0.03,\"attackspeedperlevel\":2.1,\"crit\":0,\"critperlevel\":0,\"hp\":579.4,\"hpperlevel\":80,\"hpregen\":7.092,\"hpregenperlevel\":0.65,\"movespeed\":345,\"mp\":200,\"mpperlevel\":0,\"mpregen\":50,\"mpregenperlevel\":0,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(240,'Kled','the Cantankerous Cavalier','Kled',8,2,7,2,2,0,3,'[\"Fighter\",\"Tank\"]','{\"armor\":26,\"armorperlevel\":4,\"attackdamage\":55,\"attackdamageperlevel\":3,\"attackrange\":125,\"attackspeedoffset\":0,\"attackspeedperlevel\":3.5,\"crit\":0,\"critperlevel\":0,\"hp\":340,\"hpperlevel\":70,\"hpregen\":6,\"hpregenperlevel\":0.75,\"movespeed\":345,\"mp\":100,\"mpperlevel\":0,\"mpregen\":0,\"mpregenperlevel\":0,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(245,'Ekko','the Boy Who Shattered Time','Ekko',5,7,4,3,3,3,4,'[\"Assassin\",\"Fighter\"]','{\"armor\":27,\"armorperlevel\":3,\"attackdamage\":55,\"attackdamageperlevel\":3,\"attackrange\":125,\"attackspeedoffset\":0,\"attackspeedperlevel\":3.3,\"crit\":0,\"critperlevel\":0,\"hp\":580,\"hpperlevel\":80,\"hpregen\":9,\"hpregenperlevel\":0.9,\"movespeed\":340,\"mp\":280,\"mpperlevel\":50,\"mpregen\":7,\"mpregenperlevel\":0.8,\"spellblock\":32,\"spellblockperlevel\":1.25}'),
	(254,'Vi','the Piltover Enforcer','Vi',8,3,8,5,5,0,3,'[\"Fighter\",\"Assassin\"]','{\"armor\":25.88,\"armorperlevel\":3.5,\"attackdamage\":55.88,\"attackdamageperlevel\":3.5,\"attackrange\":125,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.5,\"crit\":0,\"critperlevel\":0,\"hp\":582.8,\"hpperlevel\":85,\"hpregen\":9.012,\"hpregenperlevel\":0.9,\"movespeed\":340,\"mp\":295.6,\"mpperlevel\":45,\"mpregen\":8.092,\"mpregenperlevel\":0.65,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(266,'Aatrox','the Darkin Blade','Aatrox',8,3,6,4,4,4,0,'[\"Fighter\",\"Tank\"]','{\"armor\":24.384,\"armorperlevel\":3.8,\"attackdamage\":60.376,\"attackdamageperlevel\":3.2,\"attackrange\":150,\"attackspeedoffset\":-0.04,\"attackspeedperlevel\":3,\"crit\":0,\"critperlevel\":0,\"hp\":580,\"hpperlevel\":85,\"hpregen\":6.59,\"hpregenperlevel\":0.5,\"movespeed\":345,\"mp\":100,\"mpperlevel\":0,\"mpregen\":0,\"mpregenperlevel\":0,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(267,'Nami','the Tidecaller','Nami',4,7,7,3,3,8,0,'[\"Support\",\"Mage\"]','{\"armor\":19.72,\"armorperlevel\":4,\"attackdamage\":51.208,\"attackdamageperlevel\":3.1,\"attackrange\":550,\"attackspeedoffset\":-0.03,\"attackspeedperlevel\":2.61,\"crit\":0,\"critperlevel\":0,\"hp\":489.32,\"hpperlevel\":74,\"hpregen\":5.424,\"hpregenperlevel\":0.55,\"movespeed\":335,\"mp\":377.24,\"mpperlevel\":43,\"mpregen\":11.5,\"mpregenperlevel\":0.4,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(268,'Azir','the Emperor of the Sands','Azir',4,8,5,3,3,0,2,'[\"Mage\",\"Marksman\"]','{\"armor\":19.04,\"armorperlevel\":3,\"attackdamage\":52,\"attackdamageperlevel\":2.8,\"attackrange\":525,\"attackspeedoffset\":-0.02,\"attackspeedperlevel\":1.5,\"crit\":0,\"critperlevel\":0,\"hp\":524.4,\"hpperlevel\":80,\"hpregen\":6.924,\"hpregenperlevel\":0.55,\"movespeed\":325,\"mp\":350.56,\"mpperlevel\":42,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(412,'Thresh','the Chain Warden','Thresh',5,6,9,6,6,0,2,'[\"Support\",\"Fighter\"]','{\"armor\":16,\"armorperlevel\":0,\"attackdamage\":47.696,\"attackdamageperlevel\":2.2,\"attackrange\":450,\"attackspeedoffset\":0,\"attackspeedperlevel\":3.5,\"crit\":0,\"critperlevel\":0,\"hp\":560.52,\"hpperlevel\":93,\"hpregen\":6.924,\"hpregenperlevel\":0.55,\"movespeed\":335,\"mp\":273.92,\"mpperlevel\":44,\"mpregen\":6,\"mpregenperlevel\":0.8,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(420,'Illaoi','the Kraken Priestess','Illaoi',8,3,4,6,6,3,0,'[\"Fighter\",\"Tank\"]','{\"armor\":26,\"armorperlevel\":3.8,\"attackdamage\":60,\"attackdamageperlevel\":5,\"attackrange\":125,\"attackspeedoffset\":0,\"attackspeedperlevel\":2.5,\"crit\":0,\"critperlevel\":0,\"hp\":585.6,\"hpperlevel\":95,\"hpregen\":9.5,\"hpregenperlevel\":0.8,\"movespeed\":340,\"mp\":300,\"mpperlevel\":40,\"mpregen\":7.5,\"mpregenperlevel\":0.75,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(421,'Rek\'Sai','the Void Burrower','RekSai',8,2,6,5,5,2,0,'[\"Fighter\"]','{\"armor\":24,\"armorperlevel\":3.4,\"attackdamage\":55.628,\"attackdamageperlevel\":3.35,\"attackrange\":175,\"attackspeedoffset\":0,\"attackspeedperlevel\":2,\"crit\":0,\"critperlevel\":0,\"hp\":570,\"hpperlevel\":90,\"hpregen\":7.342,\"hpregenperlevel\":0.65,\"movespeed\":335,\"mp\":100,\"mpperlevel\":0,\"mpregen\":0,\"mpregenperlevel\":0,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(427,'Ivern','the Green Father','Ivern',3,7,8,5,5,0,9,'[\"Support\",\"Mage\"]','{\"armor\":22,\"armorperlevel\":3.5,\"attackdamage\":50,\"attackdamageperlevel\":3,\"attackrange\":125,\"attackspeedoffset\":-0.03,\"attackspeedperlevel\":3.4,\"crit\":0,\"critperlevel\":0,\"hp\":580,\"hpperlevel\":90,\"hpregen\":6.9,\"hpregenperlevel\":0.85,\"movespeed\":330,\"mp\":450,\"mpperlevel\":60,\"mpregen\":6,\"mpregenperlevel\":0.75,\"spellblock\":32.1,\"spellblockperlevel\":1.25}'),
	(429,'Kalista','the Spear of Vengeance','Kalista',8,4,6,2,2,0,0,'[\"Marksman\"]','{\"armor\":19.012,\"armorperlevel\":3.5,\"attackdamage\":63,\"attackdamageperlevel\":2.9,\"attackrange\":550,\"attackspeedoffset\":-0.03,\"attackspeedperlevel\":2.5,\"crit\":0,\"critperlevel\":0,\"hp\":517.76,\"hpperlevel\":83,\"hpregen\":6,\"hpregenperlevel\":0.55,\"movespeed\":325,\"mp\":231.8,\"mpperlevel\":35,\"mpregen\":6.3,\"mpregenperlevel\":0.4,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(432,'Bard','the Wandering Caretaker','Bard',4,5,8,4,4,3,0,'[\"Support\",\"Mage\"]','{\"armor\":25,\"armorperlevel\":4,\"attackdamage\":52,\"attackdamageperlevel\":3,\"attackrange\":500,\"attackspeedoffset\":0,\"attackspeedperlevel\":2,\"crit\":0,\"critperlevel\":0,\"hp\":535,\"hpperlevel\":89,\"hpregen\":5.4,\"hpregenperlevel\":0.55,\"movespeed\":330,\"mp\":350,\"mpperlevel\":50,\"mpregen\":6,\"mpregenperlevel\":0.45,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(497,'Rakan','The Charmer','Rakan',2,8,8,4,4,6,8,'[\"Support\"]','{\"armor\":24,\"armorperlevel\":3.9,\"attackdamage\":62,\"attackdamageperlevel\":3.5,\"attackrange\":300,\"attackspeedoffset\":0,\"attackspeedperlevel\":3,\"crit\":0,\"critperlevel\":0,\"hp\":510,\"hpperlevel\":85,\"hpregen\":5,\"hpregenperlevel\":0.5,\"movespeed\":335,\"mp\":315,\"mpperlevel\":50,\"mpregen\":8.75,\"mpregenperlevel\":0.5,\"spellblock\":30,\"spellblockperlevel\":0.5}'),
	(498,'Xayah','the Rebel','Xayah',10,1,4,5,5,0,0,'[\"Marksman\"]','{\"armor\":24,\"armorperlevel\":3,\"attackdamage\":56,\"attackdamageperlevel\":2.2,\"attackrange\":525,\"attackspeedoffset\":0,\"attackspeedperlevel\":3.3,\"crit\":0,\"critperlevel\":0,\"hp\":545,\"hpperlevel\":80,\"hpregen\":6,\"hpregenperlevel\":0.75,\"movespeed\":325,\"mp\":340,\"mpperlevel\":40,\"mpregen\":8.25,\"mpregenperlevel\":0.75,\"spellblock\":30,\"spellblockperlevel\":0.5}');

/*!40000 ALTER TABLE `static_champions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table static_items
# ------------------------------------------------------------

DROP TABLE IF EXISTS `static_items`;

CREATE TABLE `static_items` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
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

LOCK TABLES `static_items` WRITE;
/*!40000 ALTER TABLE `static_items` DISABLE KEYS */;

INSERT INTO `static_items` (`id`, `name`, `gold`, `health`, `magicresistance`, `armor`, `cdReduction`, `mana`, `isBoot`, `percentBonusHealth`, `consideredTankItem`, `comment`)
VALUES
	(1,'Banner of Command',2200,0,30,60,10,400,0,0,1,NULL),
	(2,'Dead Man\'s Plate',2900,425,0,60,0,0,0,0,1,NULL),
	(3,'Frozen Heart',2700,0,0,90,20,400,0,0,1,NULL),
	(4,'Guardian Angel',2400,0,0,30,0,0,0,0,0,NULL),
	(5,'Iceborn Gauntlet',2700,0,0,65,20,500,0,0,0,NULL),
	(6,'Knight\'s Vow',2300,400,0,40,0,0,0,0,1,''),
	(7,'Locket of the Iron Solari',2200,0,60,30,0,0,0,0,1,'count shield as health??'),
	(8,'Ninja Tabi',1100,0,0,30,0,0,1,0,1,'12% basic attack dmg reduction'),
	(9,'Ohmwrecker',2650,300,0,50,10,0,0,0,1,NULL),
	(10,'Randuin\'s Omen',2900,350,0,60,0,0,0,0,1,NULL),
	(11,'Sunfire Cape',2900,425,0,60,0,0,0,0,1,NULL),
	(12,'Talisman of Ascension',2400,0,0,45,10,0,0,0,1,NULL),
	(13,'Thornmail',2300,0,0,100,0,0,0,0,1,NULL),
	(14,'Zeke\'s Harbinger',2250,0,0,30,10,250,0,0,1,NULL),
	(15,'Zhonya\'s Hourglass',2900,0,0,45,10,0,0,0,0,NULL),
	(16,'Zz\'Rot Portal',2700,0,55,55,0,0,0,0,1,NULL),
	(17,'Abyssal Scepter',2800,300,65,0,10,0,0,0,0,NULL),
	(18,'Athene\'s Unholy Grail',2100,0,30,0,20,0,0,0,0,NULL),
	(19,'Banshee\'s Veil',2500,0,45,0,0,0,0,0,0,NULL),
	(20,'Edge of Night',3100,0,35,0,0,0,0,0,0,NULL),
	(21,'Maw of Malmortius',3250,0,45,0,10,0,0,0,0,NULL),
	(22,'Mercurial Scimitar',3600,0,35,0,0,0,0,0,0,NULL),
	(23,'Mercury\'s Treads',1100,0,25,0,0,0,1,0,1,NULL),
	(24,'Mikael\'s Crucible',2100,0,40,0,10,0,0,0,0,NULL),
	(25,'Spirit Visage',2800,425,60,0,10,0,0,0,1,NULL),
	(26,'Wit\'s End',2500,0,40,0,0,0,0,0,0,NULL),
	(27,'Doran\'s Shield',400,80,0,0,0,0,0,0,1,NULL),
	(28,'Eye of the Equinox',2300,500,0,0,10,0,0,0,1,NULL),
	(29,'Eye of the Oasis',1900,200,0,0,10,0,0,0,1,NULL),
	(30,'Eye of the Watchers',2200,200,0,0,10,0,0,0,0,NULL),
	(31,'Face of the Mountain',2200,450,0,0,10,0,0,0,1,NULL),
	(32,'Frozen Mallet',3100,700,0,0,0,0,0,0,0,NULL),
	(33,'Hextech GLP-800',3000,300,0,0,0,400,0,0,0,NULL),
	(34,'Hextech Protobelt-01',2500,300,0,0,10,0,0,0,0,NULL),
	(35,'Liandry\'s Torment',3100,300,0,0,0,0,0,0,0,NULL),
	(36,'Redemption',2100,300,0,0,10,0,0,0,1,NULL),
	(37,'Righteous Glory',2500,500,0,0,0,300,0,0,1,NULL),
	(38,'Rod of Ages',2700,300,0,0,0,300,0,0,0,'stacks NOT calculated into stats'),
	(39,'Ruby Sightstone',1600,500,0,0,0,0,0,0,0,NULL),
	(40,'Rylai\'s Crystal Scepter',2600,300,0,0,0,0,0,0,0,NULL),
	(41,'Sterak\'s Gage',2600,400,0,0,0,0,0,0,0,NULL),
	(42,'Titanic Hydra',3500,450,0,0,0,0,0,0,0,NULL),
	(43,'Trinity Force',3733,250,0,0,20,0,0,0,0,NULL),
	(44,'Warmog\'s Armor',2800,800,0,0,0,0,0,0,1,NULL),
	(45,'Cinderhulk',1625,400,0,0,0,0,0,15,1,NULL),
	(46,'Cloth armor',300,0,0,15,0,0,0,0,1,NULL),
	(47,'Null-Magic Mantle',450,0,25,0,0,0,0,0,0,NULL),
	(48,'Ruby Crystal',400,150,0,0,0,0,0,0,0,NULL),
	(49,'Sightstone',800,150,0,0,0,0,0,0,0,NULL),
	(50,'Adaptive Helm',2800,300,55,0,10,0,0,0,1,NULL),
	(51,'Gargoyle Stoneplate',2500,0,40,40,0,0,0,0,1,NULL);

/*!40000 ALTER TABLE `static_items` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table summoners
# ------------------------------------------------------------

DROP TABLE IF EXISTS `summoners`;

CREATE TABLE `summoners` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `accountId` int(20) DEFAULT NULL,
  `name` char(50) DEFAULT NULL,
  `profileIconId` int(11) DEFAULT NULL,
  `revisionDate` bigint(20) DEFAULT NULL,
  `summonerLevel` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `summoners` WRITE;
/*!40000 ALTER TABLE `summoners` DISABLE KEYS */;

INSERT INTO `summoners` (`id`, `accountId`, `name`, `profileIconId`, `revisionDate`, `summonerLevel`)
VALUES
	(19887289,32639237,'Imaqtpie',1487,1493668280000,30),
	(37762998,200755205,'Frozenw0lf',1606,1493446490000,30),
	(47646370,210424798,'Flemg',1606,1493766627000,30),
	(49268546,211984974,'IWillDominate',1445,1482626994000,30),
	(64882059,226915636,'Vuile hond',1606,1493937744000,30),
	(64952242,226919193,'CBasher',1606,1493935827000,30),
	(65002229,226919565,'I am Zedero',1594,1493312205000,30),
	(69850999,230047125,'Pienaarsteven',1606,1493937744000,30);

/*!40000 ALTER TABLE `summoners` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table version
# ------------------------------------------------------------

DROP TABLE IF EXISTS `version`;

CREATE TABLE `version` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `version` char(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `version` WRITE;
/*!40000 ALTER TABLE `version` DISABLE KEYS */;

INSERT INTO `version` (`id`, `version`)
VALUES
	(1,'7.9.2');

/*!40000 ALTER TABLE `version` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
