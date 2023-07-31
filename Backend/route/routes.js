const router = require('express').Router();

console.log('CHECK')



// dinesh-----------

const Dashboard = require('../Dashboard Data/Dashboard');
 router.get('/api/Dashboard',Dashboard.DashboardData);


router.post('/api/table/data',Dashboard.tableData);


 // nivetha starts -----------
const nivetha = require("../nivethaData/niviData")
const employeeData = require("../nivethaData/employeeData")


router.get('/domainTable',nivetha.domainTable)
router.get('/usersTable',nivetha.UsersTable)
router.get('/topicsTable',nivetha.topicsTable)
router.get('/subTopicsTable',nivetha.subTopicsTable)
router.get('/statusTable',nivetha.statusTable)


router.post('/InsertDomain',nivetha.InsertDomain)
router.post('/insertusers',nivetha.InsertUser)
router.post('/insertTopics',nivetha.InsertTopics)
router.post('/insertSubTopics',nivetha.InsertSubTopics)
router.post('/updatestatus',nivetha.updatestatus)


router.get('/courseList/:id',employeeData.userCourseList)
router.get('/subTopicCount',employeeData.subTopicCount)
router.get('/completedCount',employeeData.completedCount)



 // nivetha ends -----------



 //sai starts---

 const backend = require("../nivethaData/sai")
 router.get('/api/getdata',backend.getdata);
 
//  router.post('/api/updatestatus',backend.updatestatus);
//  router.post('/api/post',backend.NotcompletedPostdata);

 // sai ends------------





module.exports = router ;