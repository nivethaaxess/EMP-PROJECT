const collection = require("../Mysql connect/Mysql");
const connection = require("../Mysql connect/Mysql");




const getdata = async (req, res) => {

    console.log("sai getdata ")
    try {    //sub_tpoic table
      console.log('sai try method')
      const sub_topics = `
        SELECT s.status, t.level, s.subTopic_id, t.subtopic_name
        FROM STATUS s
        JOIN SUBTOPICS t ON s.subTopic_id = t.subTopic_id
        WHERE t.level = 'basic';
    `;
      collection.query(sub_topics, (err, rows) => {
        if (err) {
          console.error('Error executing the query:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Data retrieved successfully:');
        console.log('RESULT===>>>>', rows);
        res.json(rows);
      });
    }
    catch (error) {
      console.error('Error executing queries:', error);
      res.status(500).send('Error executing queries');
    }
  }
  
  const postdata = async (req, res) => {
    console.log('post data');
    try {
      const { subtopics_name, sub_topic_id } = req.body;
      console.log('subtopic_name', subtopics_name);
  
  
      // Perform the update query
      const updateQuery = `
            UPDATE status s
            JOIN sub_topics t ON s.sub_topic_id = t.sub_topic_id
            SET s.status = 'completed'
            WHERE t.subtopics_name = ? AND t.sub_topic_id = ? AND s.status = 'Notcompleted';
          `;
  
      connection.query(updateQuery, [subtopics_name, sub_topic_id,], (updateError, updateResults) => {
          console.log('updateresults', updateResults);  
        if (updateError) {
          console.error('Error updating records:', updateError);
          connection.rollback(() => {
            res.status(500).json({ error: 'Failed to update records' });
          });
        } else {
          res.json({ subtopics_name, sub_topic_id});
        }
    })
  }
       
        catch (error) {
      console.error('Error executing queries:', error);
      res.status(500).send('Error executing queries');
    }
  };
  
  
  
  
  

  module.exports = {
    getdata,
    postdata
  }
  
  
  
