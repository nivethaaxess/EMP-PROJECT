
const connection = require("../Mysql connect/Mysql");

const userCourseList = (req, res) => {

  let userId = req.params.id;

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

    let { userId, course } = req.query;
  
    let level = ["basic", "intermediate", "advance", "project", "other"];
  
    let finalCount = {};
  
    try {
      for (const a of level) {

        // Execute the first query
        const query1 = `SELECT COUNT(subTopic_id) AS total FROM sub_topics WHERE  LEVEL = '${a}' AND TOPIC_ID = (SELECT topic_id from topics where topic_name = '${course}')`;
        const totalResult = await executeQuery(query1);
  
        finalCount[a] = { total: totalResult[0].total };
  
        // Execute the second query
        const query2 = `SELECT COUNT(subTopic_id) AS completed FROM status WHERE user_id = '${userId}' AND subTopic_id IN (SELECT subTopic_id FROM sub_topics WHERE LEVEL = '${a}' AND TOPIC_ID = (SELECT topic_id FROM topics WHERE topic_name = '${course}'))`;
        const completedResult = await executeQuery(query2);
  
        finalCount[a].completed = completedResult[0].completed;
      }
      res.json(finalCount);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  
  // Helper function to execute SQL queries using a Promise
  function executeQuery(query) {
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
  
  
const InsertUser = async (req, res) => {
  try {
    let { firstName, lastName, email, password, role, domainName } = req.body;

    let query1 = `select domain_id from DOMAIN where domain_name = (?)`;

    connection.query(query1, domainName, (err, results) => {
      if (err) return res.status(500).send("domain name not inserted");

      let domain_id = results[0].domain_id;

      let query = `INSERT INTO USERS (First_name ,Last_name ,Email,Password,role,domain_id) VALUES (?)`;

      let values = [firstName, lastName, email, password, role, domain_id];

      connection.query(query, [values], (err, result) => {
        if (err) return res.status(500).send("user not inserted");
        return res.send("uservalues inserted successfuly ");
      });
    });
  } catch {
    res.send("server error");
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


module.exports = {
  userCourseList,
  subTopicCount,
  InsertUser,
  updatestatus,
  getdata
};
 