const router = require('express').Router();

console.log('CHECK')


const Dashboard = require('../Dashboard Data/Dashboard');
const Adminuser = require('../Admin user/Admin_user');
const Admin_edit = require('../Admin edit/Admin_edit')

// DashboardData
router.get('/api/Dashboard', Dashboard.DashboardData);


router.get('/api/Dashboard1', Dashboard.GetDashData);



router.post('/api/table/data', Dashboard.tableData);
// Adminuser
router.get('/api/domain', Adminuser.Domain);
router.post('/api/select/domain', Adminuser.domainSelect);
router.post('/api/domain/Insert', Adminuser.domainInsert);
router.put('/api/domai/update/:domainId', Adminuser.updateDomain);
router.put('/api/course/update/:topicId', Adminuser.updateCourse);

router.get('/api/level/list', Adminuser.levelList);
router.post('/api/course/add', Adminuser.courseAdd);
router.get('/api/domai/course', Adminuser.GetDomain_Course);

// Admin_edit

router.post('/api/course/level',Admin_edit.courseLevel);
router.post('/api/get/subTopics',Admin_edit.getSubTopics);
router.post('/api/subTopics/add',Admin_edit.addSubTopic);
router.post('/api/subTopics/edit',Admin_edit.editSubTopic);


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









module.exports = router;