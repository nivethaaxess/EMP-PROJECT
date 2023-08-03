const router = require('express').Router();

// dinesh-----------

const Dashboard = require('../Dashboard Data/Dashboard');

    router.get('/api/Dashboard',Dashboard.DashboardData);
    router.post('/api/table/data',Dashboard.tableData);

 // employeeData starts -----------

const employeeData = require("../EmployeeData/employeeData")

    router.get('/courseList/:id',employeeData.userCourseList)
    router.get('/subTopicCount',employeeData.subTopicCount)
    router.post('/updatestatus',employeeData.updatestatus)
    router.post('/insertusers',employeeData.InsertUser)
    router.get('/api/getdata',employeeData.getdata);

 // employeeData ends -----------



module.exports = router ;