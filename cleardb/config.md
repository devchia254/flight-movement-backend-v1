# Clear DB guide

## How to create the tables using clearDB:

- Preferably, create tables from the **MySQL CLI** and not from Workbench

- Create each table _separately_ and in its _respective order_ below

---

```sql
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `role_id` int NOT NULL,
  `role_type` varchar(255) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
INSERT INTO `roles` VALUES (1, 'user');
INSERT INTO `roles` VALUES (2, 'admin');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_email` varchar(191) NOT NULL,
  `first_name` varchar(191) NOT NULL,
  `last_name` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `flights`;
CREATE TABLE `flights` (
  `flight_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `flight_no` varchar(191) NOT NULL,
  `company` varchar(191) NOT NULL,
  `ac_reg` varchar(191) NOT NULL,
  `destination` varchar(191) NOT NULL,
  `check_in` datetime NOT NULL,
  `etd` datetime NOT NULL,
  `eta` datetime NOT NULL,
  `status` varchar(191) NOT NULL,
  `updated_by` varchar(191) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_email` varchar(191) NOT NULL,
  PRIMARY KEY (`flight_id`),
  KEY `user_email` (`user_email`),
  CONSTRAINT `flights_ibfk_1` FOREIGN KEY (`user_email`) REFERENCES `users` (`user_email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```
