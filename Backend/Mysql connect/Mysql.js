const mysql = require("mysql");

const connection = mysql.createPool({
  connectionLimit: 10,

  host: 'srv787.hstgr.io',
  user: 'u842521168_new',
  password: 'Admin@123',
  database: 'u842521168_new',


  waitForConnections: true,
  queueLimit: 0,
});

// Handle MySQL connection errors using an error event listener
function handleConnectionErrors() {

  connection.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('MySQL Connection Lost. Reconnecting...');
      connection.query('SELECT 1', (error) => { 
        if (error) {
          console.error('Error reconnecting:', error);
        } else {
          console.log('Reconnected to MySQL successfully!');
        }
      });
    } else {
      console.error('MySQL Connection Error:', err); 


      // Handle other connection errors gracefully
    }
  });
}

// Initialize the MySQL connection and error handling
function initConnection() {
  handleConnectionErrors();
  // Perform database operations here
}

initConnection(); // Start the connection initialization process

module.exports = connection;
