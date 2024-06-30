const router = require('express').Router();
const Role = require('../../models/role');

router.get('/', async (req, res)=>{
    
    try{
        const rolesData = await Role.findAll();
        res.status(200).json(rolesData);

    } catch (err){
        res.status(500).json(err);
    }
})

router.post('/', async (req, res)=>{
    try{
        const title = req.body.title;
        const salary = req.body.salary;
        const department = req.body.department;

        if(title && salary && department){
            const newRole = await Role.create(req.body)
            res.status(200).json(newRole);
        } else{
            res.status(204).json("Please enter title, salary, and department for this new role");
        }
        
    } catch(err){
        console.status(500).json(err)
    }
})

module.exports = router;
