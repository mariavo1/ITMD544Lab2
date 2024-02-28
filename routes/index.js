const express = require('express');
const router = express.Router();
const { Types } = require('mongoose');

const { Employee } = require('../models/employee');

// Get all employees
router.get('/api/employees', async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get Single Employee
router.get('/api/employee/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add Employee
router.post('/api/employee/add', async (req, res) => {
    try {
        const emp = new Employee({
            name: req.body.name,
            email: req.body.email,
            salary: req.body.salary
        });
        const newEmployee = await emp.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update Employee
router.put('/api/employee/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const emp = {
            name: req.body.name,
            email: req.body.email,
            salary: req.body.salary
        };
        const updatedEmployee = await Employee.findByIdAndUpdate(id, emp, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(updatedEmployee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete Employee
router.delete('/api/employee/:id', async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(deletedEmployee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
