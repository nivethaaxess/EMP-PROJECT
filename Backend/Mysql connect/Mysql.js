const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', /* MySQL User */
    password: '', /* MySQL Password */
    database: 'employeedata' /* MySQL Database */
  });


  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('MySQL connected...');
  });
  
  module.exports = connection;