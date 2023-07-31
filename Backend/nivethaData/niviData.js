const connection = require("../Mysql connect/Mysql");
const collection = require("../Mysql connect/Mysql");

const domainTable = async (req, res) => {

  try {
    let tableName = "DOMAIN";
    let query = ` CREATE table DOMAIN5 (
                domain_id int AUTO_INCREMENT PRIMARY KEY,
                 domain_name varchar(50) NOT NULL UNIQUE
            )`;
    collection.query(query, (err, rows) => {
      if (err) return res.status(500).send("table creation failed");
      return res.send(`table created with name ${tableName}`);
    });
  } catch {
    console.log("backend error in create table");
  }
};

const InsertDomain = async (req, res) => {
  try {
    let domain_name = req.body.name;

    console.log("domain_name", domain_name);

    let query = `INSERT INTO DOMAIN (domain_name) VALUES (?)`;

    connection.query(query, domain_name, (err, dbres) => {
      console.log("err", err);
      if (err) return res.status(500).send("domain name not inserted");
      return res.send("values inserted successfuly ");
    });
  } catch {
    res.send("server error");
  }
};

const UsersTable = async (req, res) => {
  try {
    let tableName = "USERS";
    let query = `
        CREATE TABLE ${tableName} (
            User_Id INT AUTO_INCREMENT PRIMARY KEY,
            First_name VARCHAR(50) NOT NULL,
            Last_name VARCHAR(50) NOT NULL,
            Email VARCHAR(100) NOT NULL,
            Password VARCHAR(255) NOT NULL,
            role varchar(50) not null,
            domain_id int not null,
            FOREIGN key (domain_id) REFERENCES DOMAIN(domain_id)
        );
        `;
    collection.query(query, (err, rows) => {
      console.log("err", err);
      if (err) return res.status(500).send("table creation failed");
      return res.send(`table created with name ${tableName}`);
    });
  } catch {
    console.log("server error");
  }
};

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
const topicsTable = async (req, res) => {
  try {
    let tableName = "TOPICS";
    let query = `
        CREATE TABLE ${tableName} (
            topic_id int AUTO_INCREMENT PRIMARY KEY,
            topic_name varchar(50) NOT NULL UNIQUE,
           domain_id int not null,
           FOREIGN key (domain_id) REFERENCES DOMAIN (domain_id)
        );
        `;
    collection.query(query, (err, rows) => {
      console.log("err", err);
      if (err) return res.status(500).send("table creation failed");
      return res.send(`table created with name ${tableName}`);
    });
  } catch {
    console.log("server error");
  }
};

const InsertTopics = async (req, res) => {
  try {
    let { topicName, domainName } = req.body;

    let query1 = `select domain_id from DOMAIN where domain_name = (?)`;

    connection.query(query1, domainName, (err, results) => {
      if (err) return res.status(500).send("topic name not inserted");

      let domain_id = results[0].domain_id;

      let query = `INSERT INTO TOPICS (topic_name ,domain_id) VALUES (?)`;

      let values = [topicName, domain_id];

      connection.query(query, [values], (err, result) => {
        if (err) return res.status(500).send("user not inserted");
        return res.send("uservalues inserted successfuly ");
      });
    });
  } catch {
    res.send("server error");
  }
};

const subTopicsTable = async (req, res) => {
  try {
    let tableName = "SUBTOPICS";
    let query = `
          CREATE TABLE ${tableName} (
            subTopic_id int AUTO_INCREMENT PRIMARY KEY,
            subTopic_name varchar(50) NOT NULL UNIQUE,
            LEVEL varchar(50) NOT NULL ,
            LINK varchar(200) ,
             TOPIC_ID INT NOT NULL ,
           FOREIGN key (TOPIC_ID) REFERENCES TOPICS(TOPIC_ID)
          );
          `;
    collection.query(query, (err, rows) => {
      console.log("err", err);
      if (err) return res.status(500).send("table creation failed");
      return res.send(`table created with name ${tableName}`);
    });
  } catch {
    console.log("server error");
  }
};

const InsertSubTopics = async (req, res) => {
  console.log("toppp", req.body);
  try {
    let { subTopicName, level, link, topicName } = req.body;

    level = level.toUpperCase();

    console.log("level", level);
    levelTopic =
      level == "BASIC" || level == "INTERMEDIATE" || level == "ADVANCE";
    console.log(levelTopic, "leveltopic");
    if (!levelTopic) return res.status(500).send("subtopic  not inserted");

    let query1 = `select topic_id from TOPICS where topic_name = (?)`;

    connection.query(query1, topicName, (err, results) => {
      console.log("err", err);
      if (err) return res.status(500).send("subtopic  not inserted");

      console.log("resuluts", results);

      let topic_id = results[0].topic_id;

      let query = `INSERT INTO SUBTOPICS (subTopic_name,LEVEL,LINK,TOPIC_ID) VALUES (?)`;

      let values = [subTopicName, level, link, topic_id];

      console.log("values", values);
      connection.query(query, [values], (err, result) => {
        console.log("errrrr", err);
        if (err) return res.status(500).send("user not inserted");
        return res.send("uservalues inserted successfuly ");
      });
    });
  } catch {
    res.send("server error");
  }
};

const statusTable = async (req, res) => {
  try {
    let tableName = "STATUS";
    let query = `

    CREATE table STATUS (
    status_id int AUTO_INCREMENT PRIMARY KEY,
    status varchar(50),
  	subTopic_id int,
    topic_id int,
    domain_id int,
    user_id int,
    FOREIGN key (subTopic_id) REFERENCES SUBTOPICS(subTopic_id),
     FOREIGN key (topic_id) REFERENCES TOPICS(TOPIC_ID),
     FOREIGN key (domain_id) REFERENCES DOMAIN(domain_id),
     FOREIGN key (user_id) REFERENCES USERS(user_id)
          );
          `;
    collection.query(query, (err, rows) => {
      console.log("err", err);
      if (err) return res.status(500).send("table creation failed");
      return res.send(`table created with name ${tableName}`);
    });
  } catch {
    console.log("server error");
  }
};



// const InsertStatus = async (req, res) => {

//     try {
//       let { subTopicName,userId} = req.body;

//       let query1 = `select subTopic_id from SUBTOPICS where subTopic_name = (?)`;
//       let query2 = `select TOPIC_ID from SUBTOPICS where subTopic_id = (?)`;
//       let query3 = `select DOMAIN_ID from TOPICS where Topic_id = (?)`;


//     let subTopic_id = await connection.query(query1, subTopicName)

//     let Topic_id = await connection.query(query2, subTopic_id)

//     Topic_id = Topic_id[0].TOPIC_ID;


//     let Domain_id = await connection.query(query3, Topic_id)
//     Domain_id = Domain_id[0].DOMAIN_ID;


//     let query = `INSERT INTO STATUS (status,subTopic_id ,topic_id,domain_id,user_id) VALUES (?)`

//     let values = ["completed",subTopic_id,Topic_id,Domain_id,userId]

//     console.log("values",values)

//         connection.query(query, [values], (err, result) => {
//           console.log("errrrr", err);
//           if (err) return res.status(500).send("user not inserted");
//           return res.send("status inserted successfuly ");
//         });
      


//     } catch (err){
//       console.log("catch err",err)
//       res.send("server error");
//     }
//   };
  
// const InsertStatus = async (req, res) => {
//   try {
//     let { subTopicName, userId } = req.body;

//     let query1 = `select subTopic_id from SUBTOPICS where subTopic_name = (?)`;
//     let query2 = `select TOPIC_ID from SUBTOPICS where subTopic_id = (?)`;
//     let query3 = `select DOMAIN_ID from TOPICS where Topic_id = (?)`;

//     connection.query(query1, subTopicName)
//       .then((subTopicIdResult) => {
//         let subTopicId = subTopicIdResult[0].subTopic_id;

//         return connection.query(query2, subTopicId);
//       })
//       .then((topicIdResult) => {
//         let topicId = topicIdResult[0].TOPIC_ID;
 
//         return connection.query(query3, topicId);
//       })
//       .then((domainIdResult) => {
//         let domainId = domainIdResult[0].DOMAIN_ID;

//         let query = `INSERT INTO STATUS (status, subTopic_id, topic_id, domain_id, user_id) VALUES (?)`;
//         let values = ["completed", subTopicId, topicId, domainId, userId];

//         console.log("values", values);

//         return new Promise((resolve, reject) => {
//           connection.query(query, [values], (err, result) => {
//             if (err) return reject(err);
//             resolve(result);
//           });
//         });
//       })
//       .then((result) => {
//         console.log("status inserted successfully");
//         return res.send("status inserted successfully");
//       })
//       .catch((err) => {
//         console.error("Error:", err);
//         return res.status(500).send("Server error");
//       });
//   } catch (err) {
//     console.log("catch err", err);
//     res.send("Server error");
//   }
// };



const updatestatus = async (req, res) => {
  try {
    // let { subTopicName, userId } = req.body;
   let  { subtopic_name, status,userId} = req.body

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
    let domainId = domainIdResult[0].DOMAIN_ID;

    let query,values;
if(status == "completed"){


   query = `INSERT INTO status (status, subTopic_id, topic_id, domain_id, user_id) VALUES (?)`;
   values = ["completed", subTopicId, topicId, domainId, userId];
   let insertResult = await runQuery(query, [values]);

   console.log("status inserted successfully");
   return res.send("status inserted successfully");

}else{

  query = `DELETE from status where subTopic_id = ? AND user_id = ? ;`;
  values = [subTopicId,userId];
  let insertResult = await runQuery(query, [values]);

  console.log("deleted successfully");
  return res.send("deleted successfully");
}


  } catch (err) {
    console.log("catch err", err);
    res.status(500).send("Server error");
  }
};

module.exports = {
  domainTable,
  InsertDomain,
  UsersTable,
  InsertUser,
  topicsTable,
  InsertTopics,
  subTopicsTable,
  InsertSubTopics,
  statusTable,
  updatestatus
};
