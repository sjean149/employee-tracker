const router = require('express').Router();
const apiRoutes = require('./api');

console.log('apiRoutes:', typeof apiRoutes);

router.use('/api', apiRoutes);


module.exports = router;

