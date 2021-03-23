-- DROP DATABASE IF EXISTS productAPI;

CREATE DATABASE productAPI;

use productAPI;

-- id, name, slogan, description, category, default_price
CREATE TABLE products (
  product_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL DEFAULT '',
  slogan VARCHAR(500) NOT NULL DEFAULT '',
  description VARCHAR(500) NOT NULL DEFAULT '',
  category VARCHAR(50) NOT NULL DEFAULT '',
  default_price VARCHAR(50) NOT NULL DEFAULT '',
  PRIMARY KEY (product_id)
);

LOAD DATA LOCAL INFILE './tmp/product.csv'
INTO TABLE products
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

CREATE TABLE features (
  feature_id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  feature VARCHAR(100) NOT NULL DEFAULT '',
  value VARCHAR (100) DEFAULT NULL,
  PRIMARY KEY (feature_id),
  FOREIGN KEY (product_id)
  REFERENCES products(product_id)
  ON DELETE CASCADE
);

LOAD DATA LOCAL INFILE './tmp/features.csv'
INTO TABLE features
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';


-- CREATE TABLE features_products (
--   relationship_id INT NOT NULL AUTO_INCREMENT,
--   product_id INT NOT NULL,
--   feature_id INT NOT NULL,
--   PRIMARY KEY (relationship_id),
--   FOREIGN KEY (product_id)
--   REFERENCES products(product_id)
--   ON DELETE CASCADE,
--   FOREIGN KEY (feature_id)
--   REFERENCES features(feature_id)
--   ON DELETE CASCADE
-- );

CREATE TABLE styles (
  style_id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  name VARCHAR(50) NOT NULL DEFAULT '',
  sale_price VARCHAR (50) NOT NULL DEFAULT '',
  original_price VARCHAR (50) NOT NULL DEFAULT '',
  default_style TINYINT,
  FOREIGN KEY (product_id)
  REFERENCES products(product_id)
  ON DELETE CASCADE,
  PRIMARY KEY (style_id)
);

LOAD DATA LOCAL INFILE './tmp/styles.csv'
INTO TABLE styles
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

CREATE TABLE skus (
  sku_id INT NOT NULL AUTO_INCREMENT,
  style_id INT NOT NULL,
  size VARCHAR(10) NOT NULL DEFAULT '',
  quantity INT NOT NULL DEFAULT 0,
  FOREIGN KEY (style_id)
  REFERENCES styles(style_id)
  ON DELETE CASCADE,
  PRIMARY KEY (sku_id)
);

LOAD DATA LOCAL INFILE './tmp/skus.csv'
INTO TABLE skus
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

CREATE TABLE photos (
  photo_id INT NOT NULL AUTO_INCREMENT,
  style_id INT NOT NULL,
  url VARCHAR(700) NOT NULL DEFAULT '',
  thumbnail_url VARCHAR(700) NOT NULL DEFAULT '',
  FOREIGN KEY (style_id)
  REFERENCES styles(style_id)
  ON DELETE CASCADE,
  PRIMARY KEY (photo_id)
);

LOAD DATA LOCAL INFILE './tmp/photos.csv'
INTO TABLE photos
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

CREATE TABLE related (
  related_id INT NOT NULL AUTO_INCREMENT,
  current_product_id INT NOT NULL,
  related_product_id INT NOT NULL,
  CONSTRAINT relationship UNIQUE KEY (current_product_id, related_product_id),
  FOREIGN KEY (current_product_id)
  REFERENCES products(product_id)
  ON DELETE CASCADE,
  FOREIGN KEY (related_product_id)
  REFERENCES products(product_id)
  ON DELETE CASCADE,
  PRIMARY KEY (related_id)
);

LOAD DATA LOCAL INFILE './tmp/related.csv'
INTO TABLE related
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;