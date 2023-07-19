const router = require('express').Router();

const Dashboard = require('../Dashboard Data/Dashboard');

router.post('/api/Dashboard',Dashboard.DashboardData);






module.exports = router ;