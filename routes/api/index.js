const router = require('express').Router();
const { route } = require('..');
const employeeRoutes = require('./employeeRoutes');

router.use('/employee', employeeRoutes);

module.exports = router;