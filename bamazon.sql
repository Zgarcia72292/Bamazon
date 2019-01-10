DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NULL NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Milk", "Grocery", 2.50, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Curtains", "Home Decor", 74.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tylenol", "Pharmacy", 20.00, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Time Cop", "T.V. & Entertainment", 8.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Floaties", "Sports & Recreation", 3.25, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ghost Busters Mug", "Kitchen", 3.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jeff Bezos", "Amazon", 1, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tide Pods", "Laundry", 18.99, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Basketball", "Sports & Recreation", 14.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nicolas Cage T-Shirt", "Dank Apparel", 17.99, 15);

