/*
SQLyog Ultimate
MySQL - 5.5.28 : Database - testes_usuarios
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `usu_Code` int(11) NOT NULL AUTO_INCREMENT,
  `usu_Nome` varchar(50) NOT NULL,
  `usu_Email` varchar(50) NOT NULL,
  `usu_Senha` varchar(50) NOT NULL,
  PRIMARY KEY (`usu_Code`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `usuarios` */

insert  into `usuarios`(`usu_Code`,`usu_Nome`,`usu_Email`,`usu_Senha`) values 
(1,'Benevenuto','bene.venuto@gmail.com','12345'),
(2,'Benevenuto','bene.venuto@gmail.com','12345'),
(3,'Jeremias','jeremias.jaime@gmail.com','12345'),
(4,'Robotunico','robotuniquera@hotmail.com','98765'),
(5,'Klebin Plays','klebindoplay@hotmail.com','12345');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
