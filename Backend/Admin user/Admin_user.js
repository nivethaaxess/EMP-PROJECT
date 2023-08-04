const connection = require('../Mysql connect/Mysql');

const Domain = (req, res) => {
  try {        
    console.log('DOMAIN ')
    const getDomain = 'select * from domain';
    const levelList = ''

    connection.query(getDomain, (err, queryRes) => {
      if (err) {
        console.log('ERROR1111====>>>', err);
        res.status(500).send({
          error: err
        })
      } else {
        console.log('SUCCESS====>>>',);
        console.log('queryRes==>>>', queryRes);
        res.send(queryRes)
      }
    })
  }
  catch (err) {
    console.log('ERROR==>>>', err);
    res.status(500).send('ERROR')
  }
}


const domainSelect = (req, res) => {
  try {
    console.log('req.body', req.body)
    const { domain } = req.body;
    const domainType = typeof domain;
    console.log('Domain type:', domainType);

    const getDomain = domain; // Replace with the desired domain name 

    const query = 'SELECT t.topic_name FROM topics t JOIN domain d ON t.domain_id = d.domain_id WHERE d.domain_name = ?';
    connection.query(query, [getDomain], (error, results) => {  
      if (error) { 
        res.send(error)
        console.error('Error executing query:', error); 
        return;
      }


      else {
        console.log('SUCCESS====>>>',);
        console.log('Topics:', results)

        res.send(results)
      }
    })



  }
  catch (err) {

  }
}

const domainInsert = (req, res) => {
  try {
    console.log('req===>>>>>', req.body)
    const { data } = req.body;
    console.log('data===>>>>>', data.data)
    const domainName = data.data;
    const insertQuery = 'INSERT INTO domain (domain_name) VALUES (?)';

    connection.query(insertQuery, [domainName], (err, result) => { 
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
  catch (err) {
    console.log('err==>>>', err)
  }
}
  
const updateDomain = (req, res) => {
  try {
    const domainId = req.params.domainId;
    const domain_name = req.body.domain_name;
 
    console.log('domainId==>>>', domainId)
    console.log('domain_name==>>>', domain_name)
   
    const updateQuery = 'UPDATE domain SET domain_name = ? WHERE domain_id = ?';

    connection.query(updateQuery, [domain_name, domainId], (err, result) => {
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
  catch(err) {

    console.log('err', err);
  }                 
}


const levelList = (req, res) => {
  try {
    console.log('JOHN CENA')

    const levelList = 'SELECT DISTINCT LEVEL FROM sub_topics';

    connection.query(levelList, (err, result) => {
      if (err) {
        res.send(err)
        console.error('Error executing INSERT query:', err);
        return;
      }
      console.log('Data get successfully!');
      res.send(result)
      console.log('Inserted row ID:', result);
    });
            
  }

  catch (err) {
    console.log('error', err)

  }



}

const courseAdd = async (req, res) => {
  try {
    const { data } = req.body;
    const domainValue = data.course_chooseDomain1;
    const addCourse = data.addCourse1;
    const checkBoxValues = data.checkBox_val1;

    console.log('domainValue=>>>>>>>>>>>:', domainValue);
    console.log('addCourse=>>>>>>>>>>>:', addCourse);
    console.log('checkBoxValues=>>>>>>>>>>>:', checkBoxValues);

    // First, retrieve the domain_id from the domain table based on the FRONTEND value
    const getDomainIdQuery = 'SELECT domain_id FROM domain WHERE domain_name = ?';

    // Then, insert data into the topics table
    const insertTopicQuery = 'INSERT INTO topics (topic_name, domain_id, Level) VALUES (?, ?, ?)';

    connection.query(getDomainIdQuery, [domainValue], async (err, domainResult) => {
      if (err) {
        console.log('Error retrieving domain_id:', err);
        return res.status(500).json({ error: 'Error retrieving domain_id' });
      }

      if (domainResult.length === 0) {
        console.log('Domain not found for FRONTEND value:', domainValue);
        return res.status(404).json({ error: 'Domain not found' });
      }

      const domainId = domainResult[0].domain_id;
      console.log('domainId:', domainId);

      // Convert the array to a string representation (JSON in this case)
      const levelValue = JSON.stringify(checkBoxValues);

      // Insert data into the topics table
      connection.query(insertTopicQuery, [addCourse, domainId, levelValue], async (err, result) => {
        if (err) {
          console.log('Error inserting data into topics table:', err);
          return res.status(500).json({ error: 'Error inserting data into topics table' });
        }

        console.log('Data inserted into topics table:', result);
        return res.status(200).json({ message: 'Data inserted into topics table successfully', data: result });
      });
    });
  } catch (err) {
    console.log('ERROR===>>>', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};                             
      
  

   
const GetDomain_Course = (req,res) =>{   
  try{

     const query = 'SELECT t.topic_name, d.domain_name , t.topic_id  FROM topics t  JOIN domain d ON t.domain_id = d.domain_id';

     connection.query(query, (err, result) => {
      if (err) {
        res.send(err)
        console.error('Error executing INSERT query:', err);
        return;
      }
      console.log('Data get successfully!');
      res.send(result)
      console.log('Inserted row ID:', result);
    });
      

  }
  catch(err){

       console.log('ERROR==>>>',err)
  }
}

const updateCourse = (req,res) =>{
     try{
      const topicId = req.params.topicId;
      const course_name = req.body.course_name;
  
      console.log('topicId==>>>', topicId)
      console.log('course_name==>>>', course_name)
  
      const updateQuery = 'UPDATE topics SET topic_name = ? WHERE topic_id = ?';
    
      connection.query(updateQuery, [course_name, topicId], (err, result) => {
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
     catch(err){
      console.log('err===>>',err);
     }
}


module.exports = { Domain, domainSelect, domainInsert, updateDomain, levelList, courseAdd , GetDomain_Course , updateCourse} 