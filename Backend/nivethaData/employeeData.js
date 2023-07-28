const { query } = require("express");
const connection = require("../Mysql connect/Mysql");
const collection = require("../Mysql connect/Mysql");

const userCourseList = (req, res) => {
  console.log("usercoarse called");
  let userId = req.params.id;

  try {
    let query = `SELECT topic_name FROM TOPICS WHERE domain_id = (SELECT domain_id FROM USERS WHERE User_id = ${userId});`;

    connection.query(query, (err, result) => {
      if (err) res.send("db connection error");

      res.send(result);
    });
  } catch {
    res.send("server error");
  }
};

// const subTopicCount = async (req, res) => {
// console.log("subtopic called");

//   let { userId, course } = req.query;

//   let level = ["basic", "intermediate", "advance", "project", "other"];

//   let finalCount = {};


//   try {
//     for (const a of level) {
//       console.log("course", course, "a", a);
//       let query2 = `SELECT COUNT(subTopic_id) FROM SUBTOPICS WHERE  LEVEL = '${a}' AND TOPIC_ID = (SELECT topic_id from TOPICS where topic_name = '${course}') `;

//      await connection.query(query2, (err, result) => {
//         if (err) return console.log("err", err);
//         console.log("total");
//         finalCount[a] = { ...finalCount[a],total: result[0]["COUNT(subTopic_id)"] };

//         let query3 = `SELECT COUNT(subTopic_id) FROM STATUS WHERE user_id = '${userId}' AND subTopic_id IN (SELECT subTopic_id FROM SUBTOPICS WHERE LEVEL = '${a}' AND topic_id = (SELECT topic_id FROM TOPICS WHERE topic_name = '${course}'))`;

//      connection.query(query3, (err, result) => {
//           if (err) return console.log("completdcount", err);
//           console.log("result", result[0]);
//           finalCount[a] = {...finalCount[a], completed: result[0]["COUNT(subTopic_id)"] };

//           if (Object.keys(finalCount).length === level.length) {
//             console.log("cofinalCountunt", finalCount);
//             res.json(finalCount);
//           }
//         });
//       });
//     };
//   } catch {
//     res.send("server error");
//   }  
// };
const subTopicCount = async (req, res) => {
    console.log("subtopic called");
    
    let { userId, course } = req.query;
  
    let level = ["basic", "intermediate", "advance", "project", "other"];
  
    let finalCount = {};
  
    try {
      for (const a of level) {
        console.log("course", course, "a", a);
  
        // Execute the first query
        const query1 = `SELECT COUNT(subTopic_id) AS total FROM SUBTOPICS WHERE  LEVEL = '${a}' AND TOPIC_ID = (SELECT topic_id from TOPICS where topic_name = '${course}')`;
        const totalResult = await executeQuery(query1);
  
        finalCount[a] = { total: totalResult[0].total };
  
        // Execute the second query
        const query2 = `SELECT COUNT(subTopic_id) AS completed FROM STATUS WHERE user_id = '${userId}' AND subTopic_id IN (SELECT subTopic_id FROM SUBTOPICS WHERE LEVEL = '${a}' AND topic_id = (SELECT topic_id FROM TOPICS WHERE topic_name = '${course}'))`;
        const completedResult = await executeQuery(query2);
  
        finalCount[a].completed = completedResult[0].completed;
      }
  
      console.log("finalCount", finalCount);
      res.json(finalCount);
    } catch (err) {
      console.error("Error", err);
      res.status(500).send("Server error");
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
  

const completedCount = async (req, res) => {
  console.log("complete count", req);
};

module.exports = {
  userCourseList,
  subTopicCount,
  completedCount,
};
 