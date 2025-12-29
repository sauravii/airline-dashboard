CREATE TABLE IF NOT EXISTS `admin` (
  `admin_id` BIGINT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `uk_admin_username` (`username`)
);

CREATE TABLE IF NOT EXISTS `aircraft` (
  `aircraft_id` BIGINT NOT NULL AUTO_INCREMENT,
  `model` VARCHAR(255) NOT NULL,
  `total_seats` INT NOT NULL,
  `status` VARCHAR(50) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`aircraft_id`)
);

CREATE TABLE IF NOT EXISTS `flight` (
  `flight_id` BIGINT NOT NULL AUTO_INCREMENT,
  `aircraft_id` BIGINT NOT NULL,
  `origin` VARCHAR(255) NOT NULL,
  `destination` VARCHAR(255) NOT NULL,
  `departure_time` DATETIME NOT NULL,
  `arrival_time` DATETIME NOT NULL,
  `total_seats` INT NOT NULL,
  `remaining_seats` INT NOT NULL,
  PRIMARY KEY (`flight_id`),
  KEY `idx_flight_aircraft_id` (`aircraft_id`),
  CONSTRAINT `fk_flight_aircraft` FOREIGN KEY (`aircraft_id`) REFERENCES `aircraft` (`aircraft_id`)
);

CREATE TABLE IF NOT EXISTS `price` (
  `price_id` BIGINT NOT NULL AUTO_INCREMENT,
  `flight_id` BIGINT NOT NULL,
  `price` DECIMAL(12,2) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`price_id`),
  KEY `idx_price_flight_id` (`flight_id`),
  CONSTRAINT `fk_price_flight` FOREIGN KEY (`flight_id`) REFERENCES `flight` (`flight_id`)
);

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uk_user_email` (`email`)
);

CREATE TABLE IF NOT EXISTS `reservation` (
  `booking_id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `flight_id` BIGINT NOT NULL,
  `total_seats` INT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `idx_reservation_user_id` (`user_id`),
  KEY `idx_reservation_flight_id` (`flight_id`),
  CONSTRAINT `fk_reservation_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `fk_reservation_flight` FOREIGN KEY (`flight_id`) REFERENCES `flight` (`flight_id`)
);

CREATE TABLE IF NOT EXISTS `passenger` (
  `passenger_id` BIGINT NOT NULL AUTO_INCREMENT,
  `booking_id` BIGINT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `gender` VARCHAR(50) NOT NULL,
  `dob` DATE NOT NULL,
  `nationality` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`passenger_id`),
  KEY `idx_passenger_booking_id` (`booking_id`),
  CONSTRAINT `fk_passenger_reservation` FOREIGN KEY (`booking_id`) REFERENCES `reservation` (`booking_id`)
);
