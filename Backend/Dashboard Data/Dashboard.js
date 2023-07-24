const connection = require('../Mysql connect/Mysql');

const DashboardData = async (req, res) => {
  try {
    console.log('DONE')
    // Find a Skill
    const skillQuery = 'SELECT DISTINCT skill FROM skills';
    // Find a Level
    const levelQuery = 'SELECT DISTINCT level FROM skills';
    // Find a count and level
    const countQuery = 'SELECT s.level, s.skill, COUNT(*) as count FROM skills s GROUP BY s.level, s.skill';

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




          const skillsArray = skillResults.map((item) => item.skill);
          const sortedSkills = skillsArray.sort();

          // Combine the count data with the skills and levels data
          const result = {
            skills: sortedSkills,
            levels: levelResults,
            counts: countResults,
          };

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



   const tableData = async(req,res) =>{
    console.log('CHECK=>>>>>>>>')
      try{
         const {skill,level} = req.body;
         console.log('req.body===>>>>',req.body)

          const sql = 'SELECT * from skills s WHERE s.skill = ? and s.level = ?'
           const value = [skill,level]

           connection.query(sql,value ,(error,result)=>{
            if (error) {
              console.error('Error patching user:', error.message);
              res.status(500).json({ error: 'Failed to patch user' });
            } else {
              console.log('User updated successfully');
              res.json({ message: 'User patched successfully', val : result });
            }
           })
      }
      catch(err){
        console.error('Error comparing passwords:', err);
        res.status(500).json({ error: 'Login failed' });
      }
   }


module.exports = {
  DashboardData,
  tableData
};
