const mysql = require('mysql2');

// local
// var connection = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'Flagpole09',
//   database: 'productAPI',
//   insecureAuth: true
// })

//docker
var connection = mysql.createPool({
  host: 'ec2-54-176-178-50.us-west-1.compute.amazonaws.com',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'productAPI',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// connection.connect((error)=> {
//   if (error) {
//     console.log('Error connecting to the DB', error)
//   } else {
//     console.log("Connected to MySQL")
//   }
// })

module.exports = connection;