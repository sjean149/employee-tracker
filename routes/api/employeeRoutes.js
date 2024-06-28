const Router = require('express').Router();
const Employee = require('../../models/employee');

router.get('/', async (req, res)=>{
    try{
        res.send("Working");
        const employeeData = await Employee.findall();
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