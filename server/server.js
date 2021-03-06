const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

const db = require('../db/connection.js');
const router = require('../routes/routes.js')

app.use('/', router.products)

app.listen(port, ()=> {
  console.log(`Listening on ${port}`)
});