const router = require('express').Router();

console.log('CHECK')

const Dashboard = require('../Dashboard Data/Dashboard');

router.get('/api/Dashboard',Dashboard.DashboardData);

router.post('/api/table/data',Dashboard.tableData);






module.exports = router ;