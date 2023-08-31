const connection = require("../Mysql connect/Mysql");

const courseLevel = (req, res) => {
  try {
    console.log("req.body====>>>>>", req.body);

    const { course } = req.body;

    const Query = "select t.Level  from topics t where t.topic_name = ?";
    connection.query(Query, [course], (err, result) => {
      if (err) {
        res.send(err);
        console.error("Error executing INSERT query:", err);
        return;
      }
      console.log("Data  successfully!", result);

      const levelString = result[0].Level;

      // Parsing the 'Level' value into a JavaScript array using JSON.parse()
      const getCourseLevel = JSON.parse(levelString);
      console.log("levelArray", getCourseLevel);
      res.send(getCourseLevel);
    });
  } catch (err) {
    console.log("err", err);
  }
};

const getSubTopics = (req, res) => {
  try {
    console.log("req.body====>>>>>", req.body);
    const { level, course } = req.body;

    const topic_idQuery =
      "SELECT t.topic_id FROM topics t WHERE t.topic_name = ?";
    const level_idQuery = "SELECT l.level_id from levels l where l.Level = ? ";
    const subtopic_idQuery =
      "SELECT s.subTopic_name , s.subTopic_id FROM sub_topics s WHERE s.LEVEL = ? AND s.TOPIC_ID = ?";

    // Run the first query to get the topic_id
    connection.query(topic_idQuery, [course], (err, topicResults) => {
      if (err) throw err;

      // Extract the topic_id from the results
      const topic_id = topicResults[0].topic_id;

      console.log("topic_id:", topic_id);

      // Run the query to get the level_id
      connection.query(level_idQuery, [level], (err, levelResults) => {
        if (err) throw err;

        // Extract the level_id from the results
        const level_id = levelResults[0].level_id;

        console.log("level_id:", level_id);

        // Run the query to get the subtopic_name using level_id
        connection.query(
          subtopic_idQuery,
          [level_id, topic_id],
          (err, subtopicResults) => {
            if (err) throw err;

            // Extract the subtopic_name and subTopic_id from the results
            const subtopic_name = subtopicResults.map(
              (val) => val.subTopic_name
            );
            const subTopic_id = subtopicResults.map((val) => val.subTopic_id);

            console.log("subtopicResults:", subtopicResults);

            // Transform the data
            const data = subtopic_name.map((name, index) => ({
              subTopic_id: subTopic_id[index],
              subtopic_name: name,
            }));

            console.log("Transformed Data:", data);
            res.send(data);

            // Don't forget to close the connection when you're done with it
            //   connection.end();
          }
        );
      });
    });
  } catch (err) {
    console.log("err", err);
  }
};

const addSubTopic = (req, res) => {
  try {
    console.log("req.body===>>>>", req.body);
    const { addSubTopic, addLink, selectcourse, selectLevel } = req.body;

    const getTopicIdQuery = "SELECT topic_id FROM topics WHERE topic_name = ?";
    console.log("getTopicIdQuery===>>>>", getTopicIdQuery);
    const insertSubTopicQuery =
      "INSERT INTO sub_topics (subTopic_name, LEVEL, LINK, TOPIC_ID) VALUES (?,?,?,?)";
    const getLevelId = "SELECT level_id FROM levels WHERE Level = ?";
    console.log("getLevelId===>>>>", getLevelId);

    connection.query(getTopicIdQuery, [selectcourse], (err, courseResult) => {
      if (err) {
        console.log("Error retrieving domain_id:", err);
        res.status(500).json({ error: "Error retrieving domain_id" });
      } else {
        if (courseResult.length === 0) {
          console.log("Course not found for FRONTEND value:", courseResult);
          res.status(404).json({ message: "Course not found" });
        } else {
          const topicId = courseResult[0].topic_id;
          console.log("topicId===>>>>", topicId);

          connection.query(
            getLevelId,
            [selectLevel],
            (err, getLevelIdResult) => {
              if (err) {
                console.log("Error getting level ID:", err);
                res.status(500).json({ error: "Error getting level ID" });
              } else {
                // Assuming you'll perform some checks here based on getLevelIdResult
                const levelID = getLevelIdResult.map((val) => val.level_id);
                console.log("levelID=======>>>>>>:", levelID);
                connection.query(
                  insertSubTopicQuery,
                  [addSubTopic, levelID, addLink, topicId],
                  (err, result) => {
                    if (err) {
                      console.log(
                        "Error inserting data into sub_topics table:",
                        err
                      );
                      res.status(500).json({ error: "Error inserting data" });
                    } else {
                      console.log(
                        "Data inserted into sub_topics table:",
                        result
                      );
                      res.json({ data: result, message: "Value Insert" });
                    }
                  }
                );
              }
            }
          );
        }
      }
    });
  } catch (err) {
    console.log("err", err);
  }
};

const editSubTopic = (req, res) => {
  try {
    console.log("req.body=======>>>>>>>", req.body);

    const subTopicId = req.body.Id;
    const subTopicName = req.body.SubTopic;

    const updateQuery =
      "UPDATE sub_topics SET subTopic_name = ? WHERE subTopic_id = ?";

    connection.query(updateQuery, [subTopicName, subTopicId], (err, result) => {
      if (err) {
        res.send(err);
        console.error("Error executing INSERT query:", err);
        return;
      }
      console.log("Data inserted successfully!");
      res.send(result);
      console.log("Inserted row ID:", result.insertId);
    });
  } catch {}
};

const projectlist = (req, res) => {
  console.log("Inserted project");


    try {
      const { title, description, link, start_date, end_date, status ,Choose_domain,Add_course} = req.body;
        console.log('reqbody', req.body);
      const sqlquery = `INSERT INTO project (title, description, link, start_date, end_date, status,Choose_domain,Add_course) VALUES (?, ?, ?, ?, ?, ?,?,?)`;
  
      connection.query(sqlquery, [title, description, link, start_date, end_date,status,Choose_domain,Add_course], (err, results) => {
        if (err) {
          console.error("Error executing the query:", err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        res.json({results})
             });
    } catch (err) {
      console.error('Error executing the query:', err);
    }
  };

  const getProject = (req, res) => {
    try {
      console.log("req.body====>>>>>", req.body);
      const { domain , course } = req.body;
  
      const proj_idQuery =
        "SELECT p.proj_id FROM project p WHERE p.title = ?";
      const domain_idQuery = "SELECT d.domain_id from domain d where d.domain = ? ";
      const project_detailsQuery =
      "SELECT p.proj_id, p.title, p.description, p.start_date, p.end_date, p.status p.Choose_domain, p.Add_course FROM projects p WHERE p.domain_id = ? p.course_id=?";  
      // Run the first query to get the topic_id
      connection.query(proj_idQuery, [course], (err, projResults) => {
        if (err) throw err;
  
        // Extract the topic_id from the results
        const proj_id = projResults[0].proj_id;
  
        console.log("proj_id:", proj_id);
  
        // Run the query to get the level_id
        connection.query(proj_idQuery, [course], (err, domainResults) => {
          if (err) throw err;
  
          // Extract the level_id from the results
          const domain_id = domainResults[0].domain_id;
  
          console.log("domain_id:", domain_id);
  
          // Run the query to get the subtopic_name using level_id
          connection.query(
            project_detailsQuery,
            [domain_id, proj_id],
            (err, projdetailsResults) => {
              if (err) throw err;
  
              // Extract the subtopic_name and subTopic_id from the results
              const project_details = projdetailsResults.map((val) => ({
                proj_id: val.proj_id,
                title: val.title,
                description: val.description,
                start_date: val.start_date,
                end_date: val.end_date,
                status: val.status,
              })); 
              // Don't forget to close the connection when you're done with it
              //   connection.end();
              console.log("Project Details:", project_details);
            res.send(project_details);
            }
          );
        });
      });
    } catch (err) {
      console.log("err", err);
    }
  };
  
  const addProject = (req, res) => {
    try {
      console.log("req.body===>>>>", req.body);
      const { proj_id, title, description, link, start_date, end_date, status, Add_course, Choose_domain } = req.body;
  
      const getDomainIdQuery = "SELECT domain_id FROM domain WHERE domain_name = ?"; // Assuming you want to get domain_id
      console.log("getDomainIdQuery===>>>>", getDomainIdQuery);
      const insertProjectQuery =
        "INSERT INTO project (proj_id, title, description, link, start_date, end_date, status, Add_course, Choose_domain, domain_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  
      connection.query(getDomainIdQuery, [Choose_domain], (err, domainResult) => {
        if (err) {
          console.log("Error retrieving domain_id:", err);
          res.status(500).json({ error: "Error retrieving domain_id" });
        } else {
          if (domainResult.length === 0) {
            console.log("Domain not found for FRONTEND value:", domainResult);
            res.status(404).json({ message: "Domain not found" });
          } else {
            const domainId = domainResult[0].domain_id;
  
            // You also need to get courseId from the course, but I don't see a getCourseId query, so assuming you have it.
            const courseId = 1; // Replace with the actual courseId
  
            connection.query(
              insertProjectQuery,
              [proj_id, title, description, link, start_date, end_date, status, Add_course, Choose_domain, domainId],
              (err, result) => {
                if (err) {
                  console.log("Error inserting data into projects table:", err);
                  res.status(500).json({ error: "Error inserting data" });
                } else {
                  console.log("Data inserted into projects table:", result);
                  res.json({ data: result, message: "Project Insert" });
                }
              }
            );
          }
        }
      });
    } catch (err) {
      console.log("err", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  
  const editProject = (req, res) => {
    try {
      console.log("req.body=======>>>>>>>", req.body);
  
      const projectId = req.body.proj_id;
    const newTitle = req.body.title;
    const newDescription = req.body.description;
    const newStartDate = req.body.start_date;
    const newEndDate = req.body.end_date;
    const newStatus = req.body.status;
    const newAddCourse = req.body.Add_course;
    const newChoosedomain = req.body.Choose_domain;

    const updateQuery =
      "UPDATE projects SET title = ?, description = ?, start_date = ?, end_date = ?, status = ?, Add_course =?, Choose_domain =? WHERE proj_id = ?";

    connection.query(
      updateQuery,
      [newTitle,newAddCourse, newChoosedomain,newDescription, newStartDate, newEndDate, newStatus, projectId],
      (err, result) => {      
        if (err) {
          res.send(err);
          console.error("Error updating project:", err);
          return;
        }
        console.log("Data updated successfully!");
        res.send(result);
      });
    } catch {}
  };
 

module.exports = {
  courseLevel,
  getSubTopics,
  addSubTopic,
  editSubTopic,
  projectlist,
  getProject,
  addProject,
  editProject,  
};
