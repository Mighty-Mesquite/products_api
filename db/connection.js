const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Flagpole09',
  database: 'productAPI',
  insecureAuth: true
})

connection.connect((error)=> {
  if (error) {
    console.log('Error connecting to the DB', error)
  } else {
    console.log("Connected to MySQL")
  }
})

module.exports = connection;