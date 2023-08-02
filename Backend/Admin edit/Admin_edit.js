const connection = require('../Mysql connect/Mysql');

const courseLevel = (req, res) => {
    try {
        console.log('req.body====>>>>>', req.body)

        const { course } = req.body;

        const Query = 'select t.Level from topics t where t.topic_name = ?'
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
       try{
        console.log('req.body====>>>>>', req.body);
  const { level, course } = req.body;

  const topic_idQuery = 'SELECT t.topic_id FROM topics t WHERE t.topic_name = ?';
  const subtopic_idQuery = 'SELECT s.subTopic_name , s.subTopic_id FROM sub_topics s WHERE s.LEVEL = ? AND s.TOPIC_ID = ?';

  // Run the first query to get the topic_id
  connection.query(topic_idQuery, [course], (err, topicResults) => {
    if (err) throw err;

    // Extract the topic_id from the results
    const topic_id = topicResults[0].topic_id;

    console.log('topic_id :', topic_id);

    // Run the second query to get the subtopic_name
    connection.query(subtopic_idQuery, [level, topic_id], (err, subtopicResults) => {
      if (err) throw err;

      // Extract the subtopic_name from the results
      const subtopic_name = subtopicResults.map(val=> val.subTopic_name);
      const subTopic_id = subtopicResults.map(val => val.subTopic_id)
      console.log('subtopicResults:', subtopicResults); 
      // Now you have the subtopic_name, you can do whatever you want with it
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
       }
       catch(err){
        console.log('err', err);
       }
   }

   const addSubTopic = (req,res) =>{
    try{
     console.log('req.body===>>>>',req.body)
     const {addSubTopic , addLink , selectcourse , selectLevel} = req.body;

     const getTopicIdQuery = 'SELECT topic_id FROM topics WHERE topic_name = ?';

     // Then, insert data into the topics table with multiple value inserts
     const insertSubTopicQuery = 'INSERT INTO sub_topics (subTopic_name, LEVEL, LINK , TOPIC_ID) VALUES (?,?,?,?)';
 
     connection.query(getTopicIdQuery, [selectcourse], (err, courseResult) => {
       if (err) {
         console.log('Error retrieving domain_id:', err);
       } else {
         if (courseResult.length === 0) {
           console.log('course not found for FRONTEND value:', courseResult);
         } else {
           const topicId = courseResult[0].topic_id; 
        //    const topicData = checkBoxValues.map((val) => val); 
 
        //    const topicInsertData = [addCourse, domainId, topicData] 
 
        //    console.log('addCourse====>>>>>>>', addCourse);
           console.log('topicId====>>>>>>>', topicId);  
        //    console.log('checkBoxValues====>>>>>>>', checkBoxValues);
        //    const levelValue = JSON.stringify(checkBoxValues);
           connection.query(insertSubTopicQuery, [addSubTopic, selectLevel, addLink , topicId], (err, result) => {
             if (err) {
               console.log('Error inserting data into topics table:', err);
             } else {
               console.log('Data inserted into topics table:', result);
               res.send({
                data : result,
                message : 'Value Insert'
            })
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