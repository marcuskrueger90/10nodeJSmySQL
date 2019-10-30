DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INT NOT NULL ATUO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL (10,2) zerofill,
    stock_quantity INT(50) NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;