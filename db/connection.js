const mysql = require('mysql2');

// local
// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Flagpole09',
//   database: 'productAPI',
//   insecureAuth: true
// })

//docker
var connection = mysql.createConnection({
  host: 'database',
  user: 'root',
  password: 'password',
  database: 'productAPI',
  waitFoConnections: true,
})

connection.connect((error)=> {
  if (error) {
    console.log('Error connecting to the DB', error)
  } else {
    console.log("Connected to MySQL")
  }
})

module.exports = connection;