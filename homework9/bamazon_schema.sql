DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;


CREATE TABLE bamazonitems (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(50),
    price DECIMAL(10,2),
    stock_quantity INT(30),
    PRIMARY KEY (item_id)
  );


INSERT INTO bamazonitems (product_name, department_name, price, stock_quantity)
VALUES ("Phaser", "Security", 10.50, 20), 
("Tricorder", "Science", 5.60, 40), 
("Galaxy Class Ship", "Ships", 981324.23, 3), 
("Matter-Anti Matter Containment Field", "Engineering", 356.23, 5), 
("Shuttlepod", "Ships", 2340.32, 10), 
("Bio-neural Circut", "Engineering", 4239.32, 114), 
("Intrepid Class Starship", "Ships", 314159.26, 9),
("Photon Torpedo", "Security", 9384.23, 10),
("Level 3 Sensor", "Science", 345.12, 19),
("Deflecter Array", "Science", 3421.12, 3);
