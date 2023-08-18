
const connection = require("../Mysql connect/Mysql");

const userCourseList = (req, res) => {
console.log("userlist")
  let userId = req.params.id;
  console.log("userlisnnnnt",userId)
  try {
    let query = `SELECT topic_name,LEVEL FROM topics WHERE domain_id = (SELECT domain_id FROM user WHERE User_id = ${userId});`;

    connection.query(query, (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    });
  } catch {
    res.send("server error");
  }
};


const subTopicCount = async (req, res) => {

  try {
    let { userId, course } = req.query;
  
    // let level = ["basic", "intermediate", "advance", "project", "other"];
    const query = `select LEVEL from topics where topic_name = '${course}'`;
    console.log("queryyy",query)

    const courseLevel = await executeQuery(query);
    const level = JSON.parse(courseLevel[0].LEVEL)
    console.log("le",level)
console.log("courseLevel",Array.isArray(level))

  
    let finalCount = {};    
    
      for (const a of level) {

        console.log("a",a)
        // Execute the first query
        const query1 = `SELECT COUNT(subTopic_id) AS total FROM sub_topics WHERE  LEVEL = '${a}' AND TOPIC_ID = (SELECT topic_id from topics where topic_name = '${course}')`;
        const totalResult = await executeQuery(query1);
  
        finalCount[a] = { total: totalResult[0].total };
  
        // Execute the second query
        const query2 = `SELECT COUNT(subTopic_id) AS completed FROM status WHERE user_id = '${userId}' AND subTopic_id IN (SELECT subTopic_id FROM sub_topics WHERE LEVEL = '${a}' AND TOPIC_ID = (SELECT topic_id FROM topics WHERE topic_name = '${course}'))`;
        const completedResult = await executeQuery(query2);
  
        finalCount[a].completed = completedResult[0].completed;
      }
      console.log(finalCount,"final")
      res.json(finalCount);
    } catch (err) {
      console.log("errr",err)
      res.status(500).send(err);
    }
  
  
  // Helper function to execute SQL queries using a Promise
  function executeQuery(query) {
    
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err){ console.log("sss",err) ;reject(err)} 
        else resolve(result);
      });
    });
  }
};
 
const InsertUser = async (req, res) => {
  try {
  
    let { firstName, lastName, email, password, role, domainName } = req.body;

    let query1 = `select domain_id from domain where domain_name = (?)`;
    let results = await runQuery(query1, domainName);
    let domain_id = results[0].domain_id;

    let query = `INSERT INTO user (First_name ,Last_name ,Email,Password,role,domain_id) VALUES (?,?,?,?,?,?)`;
    let values = [firstName, lastName, email, password, role, domain_id];
    let insert =  await runQuery(query, values);


      function runQuery(query, values) {
        console.log("query",query,"values",values)
        return new Promise((resolve, reject) => {
          connection.query(query, values, (err, result) => {
            if (err) {
              
              console.log("runQuery",err)
              return reject(err);}
            resolve(result);
          });
        });
      }

  } catch (err){
    console.log("ins err",err)
    res.send(err);
  }
};

const updatestatus = async (req, res) => {
  
  console.log("updatestatus called")
  try {

    let { subtopic_name, status, userId } = req.body;
    let query1 = `select subTopic_id from sub_topics where subTopic_name = (?)`;
    let query2 = `select TOPIC_ID from sub_topics where subTopic_id = (?)`;
    let query3 = `select domain_id from topics where topic_id = (?)`;

    function runQuery(query, values) {
      return new Promise((resolve, reject) => {
        connection.query(query, values, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    }

    let subTopicIdResult = await runQuery(query1, subtopic_name);
    let subTopicId = subTopicIdResult[0].subTopic_id;

    let topicIdResult = await runQuery(query2, subTopicId);
    let topicId = topicIdResult[0].TOPIC_ID;

    let domainIdResult = await runQuery(query3, topicId);
    let domainId = domainIdResult[0].domain_id;

    let query, values;
    if (status == "completed") {
      query = `INSERT INTO status (status, subTopic_id, topic_id, domain_id, user_id) VALUES (?)`;
      values = ["completed", subTopicId, topicId, domainId, userId];

      let insertResult = await runQuery(query, [values]);

      return res.send("status inserted successfully");

    } else {
      query = `DELETE from status where subTopic_id = ? AND user_id = ? ;`;
      values = [subTopicId, userId];

      let insertResult = await runQuery(query, values);

      return res.send("deleted successfully");
    }
  } catch (err) {
    console.log("catch err", err);
    res.status(500).send("Server error");
  }
};


const getdata =async (req,res)=>{

  let {userId,course,level} = req.query
  let finalCount = {};

  try{
              // Execute the first query
              const query1 = `SELECT subTopic_name, LINK FROM sub_topics WHERE subTopic_id NOT IN ( SELECT subTopic_id FROM status WHERE user_id = ${userId} AND topic_id = (select topic_id from topics where topic_name = '${course}') ) and topic_id = (select topic_id from topics where topic_name = '${course}') AND LEVEL = '${level}'`;
              const inprogress = await executeQuery(query1);
        
        
              // Execute the second query
              const query2 = `SELECT st.subTopic_name, st.LINK
              FROM sub_topics st
              JOIN status s ON st.subTopic_id = s.subTopic_id
              WHERE s.status = 'completed'
                AND s.user_id = ${userId}
                AND st.LEVEL = '${level}'
                AND s.topic_id = (select topic_id from topics where topic_name = '${course}') `;
              const completed = await executeQuery(query2);
        
              finalCount = {completed,inprogress};

              res.json(finalCount);


  }
  catch (error){

    res.status(500).send('Error executing queries');
  }

  function executeQuery(query) {
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

}
const logindata  = async(req,res) =>

{    
  console.log('data received');
    const {Email,Password} = req.body
    

    try
    {
           // Validate the input parameters (optional but recommended)
  // if (!Email || !Password) {
  //   return res.status(400).json({ error: 'Invalid input parameters' });
  // }

  // Prepare the SQL query with input parameters
  const sqlQuery = `SELECT * FROM user WHERE Email = ? AND Password = ?`;

  // Execute the query with input parameters
  connection.query(sqlQuery, [Email, Password], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user data if found
    res.status(200).json({ data: results[0] });
  });
    }
    catch (error){

      console.error('Error executing queries:', error);
      res.status(500).send('Error executing queries');
    }
}

const Userchange  = async(req,res) =>

{    
  console.log('data received');
    const {First_name,Email} = req.body
    
    try
    {
           // Validate the input parameters (optional but recommended)
  // if (!Email || !Password) {
  //   return res.status(400).json({ error: 'Invalid input parameters' });
  // }

  // Prepare the SQL query with input parameters
  const sqlQuery = `SELECT * FROM user WHERE First_name = ? AND Email = ?`;


  // Execute the query with input parameters
  connection.query(sqlQuery, [First_name, Email], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user data if found
    res.status(200).json({ data: results[0] });
  });
    }
    catch (error){

      console.error('Error executing queries:', error);
      res.status(500).send('Error executing queries');
    }
}

const domaingetdata  = (req,res)=>
 {
   try
   {
    const {domain_name} = req.query

      const domainquery = `SELECT domain_name from domain`

    collection.query(domainquery ,[domain_name], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Return the fetched data as a JSON response
      res.json(result);
    });
   }
   catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
      
 }

 const Userupdate =(req,res)=>
      
          {
   
    try
    {
      const Userid = req.params.User_Id 
        console.log('User1===>',Userid)
      const {User_Id,Password} = req.body;
      console.log('req.bodyr===>',req.body)
      console.log('update')
           const updatequery = `UPDATE user
           SET Password = ?
           WHERE User_Id = ?`; 
            console.log('table')
        connection.query(updatequery,[Password,User_Id],(error, results) => {
          console.log('ttt--=>')
            
          if (error) {
            console.error('Error updating user information:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
          console.log('User information updated successfully');
          res.json({ message: 'User information updated successfully' });
        })
    }
    catch
    {
      console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });  
    }
 }

module.exports = {
  userCourseList,
  subTopicCount,
  InsertUser,
  updatestatus,
  getdata,
  logindata,
  domaingetdata,
  Userchange,
  Userupdate

};
 