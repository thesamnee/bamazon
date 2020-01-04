DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	id INT(4) auto_increment,
    product_name VARCHAR(70),
    department_name VARCHAR(30),
    price INT(10),
    stock INT(10),
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock)
VALUES("Cool Hat", "Apparel", 30, 10),
("Pants", "Apparel", 40, 30),
("Car", "Automotive", 30000, 1),
("Cat", "Pets", 2, 80),
("Fan", "Home", 40, 3),
("PC", "Electronics", 1200, 3);