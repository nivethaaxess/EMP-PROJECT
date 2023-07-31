const mysql = require('mysql');

const connection = mysql.createConnection({
    // host: 'sql6.freesqldatabase.com',
    // user: 'sql6634788', /* MySQL User */
    // password: 'g6dxYFzrXK', /* MySQL Password */
    // database: 'sql6634788' /* MySQL Database */

    // host: 'localhost',
    // user: 'root', /* MySQL User */
    // password: '', /* MySQL Password */
    // database: 'employeedata' /* MySQL Database */

    host :"srv787.hstgr.io",
     user :"u842521168_new",
     password:"Admin@123",
    database:"u842521168_new"
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err); 
      return;
    }
    console.log('MySQL connected...');
  });
  
  module.exports = connection;
