const connection = require('../Mysql connect/Mysql');

const DashboardData = async (req, res) => {
  try {
    console.log('DONE')
    // Find a Skill
    const skillQuery = 'SELECT DISTINCT topic_name FROM topics';
    // Find a Level
    const levelQuery = 'SELECT Level as level from levels';
    // Find a count and level
    // const countQuery = 'SELECT s.level, s.skill, COUNT(*) as count FROM skills s GROUP BY s.level, s.skill';

    const countQuery = 'SELECT  s.Level AS level, t.topic_name AS skills,      COUNT(DISTINCT s.subTopic_name) AS count FROM     sub_topics s  JOIN      topics t ON t.topic_id = s.TOPIC_ID  GROUP BY      t.topic_name, s.Level;'

    // Execute the queries
    connection.query(skillQuery, (error, skillResults) => {
      if (error) {
        console.error('Error executing skill query:', error);
        return res.status(500).send('Error fetching skill data');
      }

      connection.query(levelQuery, (error, levelResults) => {
        if (error) {
          console.error('Error executing level query:', error);
          return res.status(500).send('Error fetching level data');
        }

        connection.query(countQuery, (error, countResults) => {
          if (error) {
            console.error('Error executing count query:', error);
            return res.status(500).send('Error fetching count data');
          }




          const skillsArray = skillResults.map((item) => item.topic_name);
          console.log('skillResults===>>>>', skillResults)
          const sortedSkills = skillsArray;

          // Combine the count data with the skills and levels data
          const result = {
            skills: sortedSkills,
            levels: levelResults,
            counts: countResults,
          };

          console.log('result===>>>>', result)

          // If all queries are successful, send the results back as a response
          res.json(result);
        });
      });
    });
  } catch (error) {
    console.error('Error executing queries:', error);
    res.status(500).send('Error executing queries');
  }
};



const DashboardData_check = async (req, res) => {
  try {
    // const {skill,level} = req.body;
    // console.log('req.body===>>>>',req.body)

    const sql = 'SELECT t.topic_name, lv.level, COUNT(DISTINCT st.user_id) AS user_count FROM status st JOIN sub_topics sub ON st.subTopic_id = sub.subTopic_id JOIN topics t ON sub.topic_id = t.topic_id JOIN levels lv ON st.level = lv.level_id GROUP BY t.topic_name, lv.level ORDER BY t.topic_name, lv.level'
    // const value = [skill,level]

    connection.query(sql, (error, result) => {
      if (error) {
        console.error('Error patching user:', error.message);
        res.status(500).json({ error: 'Failed to patch user' });
      } else {
        console.log('User updated successfully');
        res.json({ message: 'User patched successfully', val: result });
      }
    })
  } catch (error) {
    console.error('Error executing queries:', error);
    res.status(500).send('Error executing queries');
  }
};





const tableData = async (req, res) => {
  console.log('CHECK=>>>>>>>>')
  try {
    const { skill, level } = req.body;
    console.log('req.body===>>>>', req.body)

    const sql = 'SELECT * from skills s WHERE s.skill = ? and s.level = ?'
    const value = [skill, level]

    connection.query(sql, value, (error, result) => {
      if (error) {
        console.error('Error patching user:', error.message);
        res.status(500).json({ error: 'Failed to patch user' });
      } else {
        console.log('User updated successfully');
        res.json({ message: 'User patched successfully', val: result });
      }
    })
  }
  catch (err) {
    console.error('Error comparing passwords:', err);
    res.status(500).json({ error: 'Login failed' });
  }
}

const GetDashData = (req, res) => {
  try {
    console.log('DINESH')
    const topicName_query = 'select * from topics';

    connection.query(topicName_query, (error, result) => {
      if (error) {
        console.error('Error patching user:', error.message);
        res.status(500).json({ error: 'Failed to patch user' });
      } else {
        const topic_name = result.map(val => val.topic_name)
        console.log('User updated successfully', result);
        res.json({
          message: 'User patched successfully',
          val: result,
          skills: topic_name

        });
      }
    })
  }
  catch (err) {

  }
}


const getTableData = (req, res) => {
  try {
    const { data } = req.body;
    console.log('data===>>>>', data);
    const query = `SELECT u.email, t.topic_name, lv.level, CONCAT('[', GROUP_CONCAT(DISTINCT st.subTopic_name ORDER BY st.subTopic_name ASC SEPARATOR ', '), ']') AS completed_subtopics FROM status s JOIN sub_topics st ON s.subTopic_id = st.subTopic_id JOIN topics t ON st.topic_id = t.topic_id JOIN levels lv ON s.level = lv.level_id JOIN user u ON s.user_id = u.user_id WHERE t.topic_name = ? GROUP BY u.email, t.topic_name, lv.level`;

    connection.query(query, data, (error, result) => {
      if (error) {
        console.error('Error patching user:', error.message);
        res.status(500).json({ error: 'Failed to patch user' });
      } else {
        console.log('successfully', result);
        res.json({ message: 'User patched successfully', val: result });
      }
    })

  }
  catch (err){
    console.log('err', err);
  }
}


const dashTableData = (req, res) => {
  // const {} =req.body;
  try {

    console.log('req====>>>>', req.body)

    const {skill , level} = req.body;

    const procedureName = 'GetTopicLevelData'

    const query = `CALL ${procedureName}(?, ?)`;

    // Call the stored procedure
    connection.query(query, [skill, level], (error, results) => {
      if (error) {
        console.error('Error calling stored procedure:', error);
        return;
      }
      const StoredData = results[0].map(row => ({ ...row }));

      console.log('Stored data:', StoredData);
             res.json({
              message :'Procedure Result',
               data : StoredData
             })
      // console.log('Stored procedure results:', Stored);
    });
  }
  catch (err) {
    console.log('req====>>>>', req)
  }
}


module.exports = {
  DashboardData,
  DashboardData_check,
  tableData,
  GetDashData,
  getTableData,
  dashTableData
};
