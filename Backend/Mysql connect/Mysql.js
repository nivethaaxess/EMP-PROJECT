const mysql = require('mysql');

const connection = mysql.createConnection({
    // host: 'localhost',
    // user: 'root', /* MySQL User */
    // password: '', /* MySQL Password */
    // database: 'employeedata' /* MySQL Database */

///////////////////////////////////////////////////////////     
connectionLimit: 10,
    host: 'srv787.hstgr.io',
    user: 'u842521168_new', /* MySQL User */
    password: 'Admin@123', /* MySQL Password */
    // database: 'employeedata'
    database: 'u842521168_new' ,  /* MySQL Database */
    waitForConnections: true,
  queueLimit: 0
     
  });


  function handleDisconnect() {
    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
        // Retry the connection after a short delay
        setTimeout(handleDisconnect, 2000);
      } else {
        console.log('Connected to MySQL successfully!'); 
      }
    });          
  
    connection.on('error', (err) => {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('MySQL Connection Lost. Reconnecting...');    
        handleDisconnect();
      } else {     
        console.error('MySQL Connection Error:', err);
        // For other errors, you might choose to handle them differently
        // or terminate the application gracefully.
      }
    });
  }
  
  handleDisconnect();
  


  
  module.exports = connection;
