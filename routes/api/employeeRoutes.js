const router = require('express').Router();
const Employee = require('../../models/employee');

router.get('/', async (req, res)=>{
    
    try{
        const employeeData = await Employee.findAll();
        res.status(200).json(employeeData);

    } catch (err){
        res.status(500).json(err);
    }
})

router.post('/', async (req, res) =>{
    try {
        const newEmployee = await Employee.create(req.body);
        res.status(200).json(newEmployee);

    } catch (err) {
        res.status(400).json(err);

    }
})
console.log('Exporting router:', typeof router); 
module.exports = router;