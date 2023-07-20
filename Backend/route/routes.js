const router = require('express').Router();

console.log('CHECK')

const Dashboard = require('../Dashboard Data/Dashboard');

router.get('/api/Dashboard',Dashboard.DashboardData);






module.exports = router ;