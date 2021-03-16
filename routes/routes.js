const express = require('express');

// Required Files
// const db = require('../db/connection.js')
const controller = require ('../controller/controller.js')

// Create a New Router Object
var products = express.Router();

// Route a GET request
products.get('/products', controller.getProducts)

products.get('/products/:product_id', controller.getOneProduct);

products.get('/products/:product_id/styles', controller.getProductStyles);

products.get('/products/:product_id/related', controller.getRelatedProducts);


module.exports.products = products;

