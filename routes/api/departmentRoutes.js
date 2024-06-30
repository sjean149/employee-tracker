const router = require('express').Router();
const Department = require('../../models/department');

router.get('/', async (req,res)=>{
    try{
       const departmentData = await Department.findAll();
       res.status(200).json(departmentData);
    } catch (err) {
        console.error("There is an error with getting the departments");
        res.status(500).json(err);
    }
});

router.post('/', async (req,res)=>{
    try{
        const newDepartment = Department.create(req.body);
        res.status(200).json(newDepartment);
    } catch(err){
        console.error("Error posting a new department");
    }
});
module.exports = router;

