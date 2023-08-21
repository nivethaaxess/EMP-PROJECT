const connection = require('../Mysql connect/Mysql');

const courseLevel = (req, res) => {
    try {
        console.log('req.body====>>>>>', req.body)

        const { course } = req.body;

        const Query = 'select t.Level  from topics t where t.topic_name = ?'
        connection.query(Query, [course], (err, result) => {
            if (err) {
                res.send(err)
                console.error('Error executing INSERT query:', err);
                return;
            }
            console.log('Data  successfully!', result);
         
            const levelString = result[0].Level;

            // Parsing the 'Level' value into a JavaScript array using JSON.parse()
            const getCourseLevel = JSON.parse(levelString);
            console.log('levelArray', getCourseLevel);
            res.send(getCourseLevel)

        });
    }
    catch (err) {
        console.log('err', err);
    }
}


   const getSubTopics = (req,res) =>{
    try {
      console.log('req.body====>>>>>', req.body);
      const { level, course } = req.body;
    
      const topic_idQuery = 'SELECT t.topic_id FROM topics t WHERE t.topic_name = ?';
      const level_idQuery = 'SELECT l.level_id from levels l where l.Level = ? ';
      const subtopic_idQuery = 'SELECT s.subTopic_name , s.subTopic_id FROM sub_topics s WHERE s.LEVEL = ? AND s.TOPIC_ID = ?';
    
      // Run the first query to get the topic_id
      connection.query(topic_idQuery, [course], (err, topicResults) => {
        if (err) throw err;
    
        // Extract the topic_id from the results
        const topic_id = topicResults[0].topic_id;
    
        console.log('topic_id:', topic_id);
    
        // Run the query to get the level_id
        connection.query(level_idQuery, [level], (err, levelResults) => {
          if (err) throw err;
    
          // Extract the level_id from the results
          const level_id = levelResults[0].level_id;
    
          console.log('level_id:', level_id);
    
          // Run the query to get the subtopic_name using level_id
          connection.query(subtopic_idQuery, [level_id, topic_id], (err, subtopicResults) => {
            if (err) throw err;
    
            // Extract the subtopic_name and subTopic_id from the results
            const subtopic_name = subtopicResults.map(val => val.subTopic_name);
            const subTopic_id = subtopicResults.map(val => val.subTopic_id);
    
            console.log('subtopicResults:', subtopicResults);
    
            // Transform the data
            const data = subtopic_name.map((name, index) => ({
              subTopic_id: subTopic_id[index],
              subtopic_name: name,
            }));
    
            console.log('Transformed Data:', data);
            res.send(data);
    
            // Don't forget to close the connection when you're done with it
            //   connection.end();
          });
        });
      });
    } catch (err) {
      console.log('err', err);
    }
   
    
    
    
    
    
    
   }

   const addSubTopic = (req,res) =>{
    try {
      console.log('req.body===>>>>', req.body);
      const { addSubTopic, addLink, selectcourse, selectLevel } = req.body;
  
      const getTopicIdQuery = 'SELECT topic_id FROM topics WHERE topic_name = ?';
      console.log('getTopicIdQuery===>>>>', getTopicIdQuery);
      const insertSubTopicQuery =
        'INSERT INTO sub_topics (subTopic_name, LEVEL, LINK, TOPIC_ID) VALUES (?,?,?,?)';
      const getLevelId = 'SELECT level_id FROM levels WHERE Level = ?';
      console.log('getLevelId===>>>>', getLevelId);
  
      connection.query(getTopicIdQuery, [selectcourse], (err, courseResult) => {
        if (err) {
          console.log('Error retrieving domain_id:', err);
          res.status(500).json({ error: 'Error retrieving domain_id' });
        } else {
          if (courseResult.length === 0) {
            console.log('Course not found for FRONTEND value:', courseResult);
            res.status(404).json({ message: 'Course not found' });
          } else {
            const topicId = courseResult[0].topic_id;
            console.log('topicId===>>>>', topicId);
  
            connection.query(getLevelId, [selectLevel], (err, getLevelIdResult) => {
              if (err) {
                console.log('Error getting level ID:', err);
                res.status(500).json({ error: 'Error getting level ID' });
              } else {
                // Assuming you'll perform some checks here based on getLevelIdResult
                     const levelID = getLevelIdResult.map(val => val.level_id)
                     console.log('levelID=======>>>>>>:', levelID);
                connection.query(
                  insertSubTopicQuery,
                  [addSubTopic,levelID, addLink, topicId],
                  (err, result) => { 
                    if (err) {
                      console.log('Error inserting data into sub_topics table:', err);
                      res.status(500).json({ error: 'Error inserting data' });
                    } else {
                      console.log('Data inserted into sub_topics table:', result);
                      res.json({ data: result, message: 'Value Insert' });
                    }
                  }
                );
              }
            });
          }
        }
      });
    }
    catch(err){
        console.log('err', err);
    }
   }

   const editSubTopic = (req,res) =>{
      try{
           console.log('req.body=======>>>>>>>',req.body);

           const subTopicId = req.body.Id;
           const subTopicName = req.body.SubTopic;

           const updateQuery = 'UPDATE sub_topics SET subTopic_name = ? WHERE subTopic_id = ?';
  
           connection.query(updateQuery, [subTopicName, subTopicId], (err, result) => {
             if (err) {
               res.send(err)
               console.error('Error executing INSERT query:', err); 
               return;
             } 
             console.log('Data inserted successfully!');
             res.send(result)
             console.log('Inserted row ID:', result.insertId);
           });

      }
      catch{

      }
   }




module.exports = { courseLevel , getSubTopics , addSubTopic , editSubTopic}