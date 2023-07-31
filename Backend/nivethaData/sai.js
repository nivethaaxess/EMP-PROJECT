const collection = require("../Mysql connect/Mysql");


const getdata =async (req,res)=>{

  console.log('sai try method')

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
        
              // finalCount[course] = { [level] : {completed: completedList,inprogress : inprogressList }};
              finalCount = {completed,inprogress};
              console.log("finalCount", finalCount);
              res.json(finalCount);


  }
  catch (error){

    console.error('Error executing queries:', error);
    res.status(500).send('Error executing queries');
  }


  function executeQuery(query) {
    return new Promise((resolve, reject) => {
      collection.query(query, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }


}











  // const updatestatus = async (req, res) => {
  //   console.log('post data');
  //   try {
  //     const { subtopics_name, sub_topic_id ,status} = req.body;
  //     console.log('subtopic_name', subtopics_name);
  
 
  //     // Perform the update query
  //     const updateQuery = `
  //           UPDATE status s
  //           JOIN sub_topics t ON s.sub_topic_id = t.sub_topic_id
  //           SET s.status = 'completed'
  //           WHERE t.subtopics_name = ? AND t.sub_topic_id = ? AND s.status = 'Notcompleted';
  //         `;
  
  //     connection.query(updateQuery, [subtopics_name, sub_topic_id,], (updateError, updateResults) => {
  //         console.log('updateresults', updateResults);  
  //       if (updateError) {
  //         console.error('Error updating records:', updateError);
  //         connection.rollback(() => {
  //           res.status(500).json({ error: 'Failed to update records' });
  //         });
  //       } else {
  //         res.json({ subtopics_name, sub_topic_id});
  //       }
  //   })
  // }
       
  //       catch (error) {
  //     console.error('Error executing queries:', error);
  //     res.status(500).send('Error executing queries');
  //   }
  // };
  
  // const NotcompletedPostdata = async (req, res) => {
  //   try {
  //     const { subtopic_name, subTopic_id } = req.body;
  //     console.log('subtopic_name', subtopic_name);
  
  
  //     // Perform the update query
  //     const updateQuery = `
  //       UPDATE STATUS s
  //       JOIN SUBTOPICS t ON s.subTopic_id = t.subTopic_id
  //       SET s.status = 'Notcompleted'
  //       WHERE t.subtopic_name = ? AND t.subTopic_id = ? AND s.status = 'completed';
  //     `;
  
  //     connection.query(updateQuery, [subtopic_name, subTopic_id,], (updateError, updateResults) => {
  //       console.log('updateresults', updateResults);
  //       if (updateError) {
  //         console.error('Error updating records:', updateError);
  //         connection.rollback(() => {
  //           res.status(500).json({ error: 'Failed to update records' });
  //         });
  //       } else {
  //         res.json({ subtopic_name, subTopic_id });
  //       }
  //     })
  //   }
  
  //   catch (error) {
  //     console.error('Error executing queries:', error);
  //     res.status(500).send('Error executing queries');
  //   }
  // };
  
  
  
  
  

  module.exports = {
    getdata
  }
  
  
  
