const router = require("express").Router();

console.log("CHECK");

const Dashboard = require("../Dashboard Data/Dashboard");
const Adminuser = require("../Admin user/Admin_user");
const Admin_edit = require("../Admin edit/Admin_edit");

// DashboardData
router.get("/api/Dashboard", Dashboard.DashboardData);
router.get("/api/Dashboard_check", Dashboard.DashboardData_check);
// router.post('/api/table/data',Dashboard.tableData);
// router.post('/api/Dashboard/tableData',Dashboard.getTableData);
router.post("/api/table_data", Dashboard.dashTableData);

router.get("/api/Dashboard1", Dashboard.GetDashData);

router.post("/api/table/data", Dashboard.tableData);
// Adminuser
router.get("/api/domain", Adminuser.Domain);
router.post("/api/select/domain", Adminuser.domainSelect);
router.post("/api/domain/Insert", Adminuser.domainInsert);
router.put("/api/domai/update/:domainId", Adminuser.updateDomain);
router.put("/api/course/update/:topicId", Adminuser.updateCourse);

router.get("/api/level/list", Adminuser.levelList);
router.post("/api/course/add", Adminuser.courseAdd);
router.get("/api/domai/course", Adminuser.GetDomain_Course);

// Admin_edit

router.post("/api/course/level", Admin_edit.courseLevel);
router.post("s/api/get/subTopic", Admin_edit.getSubTopics);
router.post("/api/subTopics/add", Admin_edit.addSubTopic);
router.post("/api/subTopics/edit", Admin_edit.editSubTopic);
router.post("/api/project/list", Admin_edit.projectlist);
router.post("/api/project/get", Admin_edit.getProject);
router.post("/api/project/adds", Admin_edit.addProject);
router.post("/api/project/edits", Admin_edit.editProject);
router.post("/api/getform/forms", Admin_edit.projectForm);
router.post("/api/update/projectnew", Admin_edit.updateProjectNew);
router.get("/api/projectnew/:project_id", Admin_edit.getProjectNew);
router.post("/api/delete/project", Admin_edit.deleteProjectNew);

const employeeData = require("../EmployeeData/employeeData");

router.get("/courseList/:id", employeeData.userCourseList);
router.get("/subTopicCount", employeeData.subTopicCount);
router.get("/api/getdata", employeeData.getdata);
router.post("/updatestatus", employeeData.updatestatus);
router.post("/insertusers", employeeData.InsertUser);
router.post("/api/logindata", employeeData.logindata);
router.post("/api/domain", employeeData.domaingetdata);
router.post("/api/userchange", employeeData.Userchange);
router.put("/updateuser/:User_Id", employeeData.Userupdate);

// employeeData ends -----------

module.exports = router;
