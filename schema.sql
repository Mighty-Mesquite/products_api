DROP DATABASE IF EXISTS productAPI;

CREATE DATABASE productAPI;

use productAPI;

CREATE TABLE products (
  product_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL DEFAULT '',
  slogan VARCHAR(500) NOT NULL DEFAULT '',
  description VARCHAR(500) NOT NULL DEFAULT '',
  category VARCHAR(50) NOT NULL DEFAULT '',
  default_price VARCHAR(50) NOT NULL DEFAULT '',
  PRIMARY KEY (product_id)
);

CREATE TABLE features (
  feature_id INT NOT NULL AUTO_INCREMENT,
  feature VARCHAR(100) NOT NULL DEFAULT '',
  value VARCHAR (100) DEFAULT '',
  product_id INT NOT NULL,
  FOREIGN KEY (product_id)
  REFERENCES products(product_id)
  ON DELETE CASCADE,
  PRIMARY KEY (feature_id)
);

CREATE TABLE styles (
  style_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL DEFAULT '',
  original_price VARCHAR (50) NOT NULL DEFAULT '',
  sale_price VARCHAR (50) NOT NULL DEFAULT '',
  default_style TINYINT,
  product_id INT NOT NULL,
  FOREIGN KEY (product_id)
  REFERENCES products(product_id)
  ON DELETE CASCADE,
  PRIMARY KEY (style_id)
);

CREATE TABLE skus (
  sku_id INT NOT NULL AUTO_INCREMENT,
  size VARCHAR(10) NOT NULL DEFAULT '',
  quantity INT NOT NULL DEFAULT 0,
  style_id INT NOT NULL,
  FOREIGN KEY (style_id)
  REFERENCES styles(style_id)
  ON DELETE CASCADE,
  PRIMARY KEY (sku_id)
);

CREATE TABLE photos (
  photos_id INT NOT NULL AUTO_INCREMENT,
  thumbnail_url VARCHAR(700) NOT NULL DEFAULT '',
  url VARCHAR(700) NOT NULL DEFAULT '',
  style_id INT NOT NULL,
  FOREIGN KEY (style_id)
  REFERENCES styles(style_id)
  ON DELETE CASCADE,
  PRIMARY KEY (photos_id)
);

CREATE TABLE related (
  related_id INT NOT NULL AUTO_INCREMENT,
  product1_id INT NOT NULL,
  product2_id INT NOT NULL,
  FOREIGN KEY (product1_id)
  REFERENCES products(product_id)
  ON DELETE CASCADE,
  FOREIGN KEY (product2_id)
  REFERENCES products(product_id)
  ON DELETE CASCADE,
  PRIMARY KEY (related_id)
);

